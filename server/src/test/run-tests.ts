import { getAIService } from '../ai';
import { prisma } from '../db';

async function runTests() {
  console.log('🧪 Starting SAHAAY Automated End-to-End Test Suite...\n');
  let passed = 0;
  let total = 0;

  function assert(condition: boolean, testName: string) {
    total++;
    if (condition) {
      console.log(`  ✓ PASS: ${testName}`);
      passed++;
    } else {
      console.error(`  ✗ FAIL: ${testName}`);
    }
  }

  try {
    // 1. Database Connectivity & Demo Seed Verification
    console.log('1. Database & Demo Seed Checks:');
    const citizen = await prisma.user.findUnique({
      where: { email: 'citizen@sahaay.demo' },
      include: { profile: true },
    });
    assert(citizen !== null, 'Citizen user exists in database');
    assert(citizen?.name === 'Rajesh Sharma', 'Primary demo citizen is Rajesh Sharma');

    const officer = await prisma.user.findUnique({
      where: { email: 'officer@sahaay.demo' },
    });
    assert(officer !== null && officer.role === 'OFFICER', 'Land Officer user exists with ROLE=OFFICER');

    // 2. Parcel & Case Retrieval
    console.log('\n2. Cadastral Parcel & Acquisition Case:');
    const parcel1042 = await prisma.parcel.findFirst({
      where: { surveyNumber: '1042' },
      include: { cases: { include: { project: true, compensationRecord: true } } },
    });
    assert(parcel1042 !== null, 'Primary parcel #1042 found');
    assert(parcel1042?.recordedAreaHa === 2.43, 'Primary parcel recorded area is 2.43 ha');
    assert((parcel1042?.cases?.length ?? 0) > 0, 'Acquisition case linked to parcel #1042');

    const acqCase = parcel1042?.cases[0];
    assert(acqCase?.caseReference === 'ACQ-2026-MP-1042', 'Case reference is ACQ-2026-MP-1042');
    assert(acqCase?.stage === 'VERIFICATION', 'Acquisition stage is VERIFICATION');
    assert(acqCase?.compensationRecord?.totalAssessedINR === 3840000.0, 'Total assessed compensation is ₹38,40,000');

    // 3. AI Document Intelligence & Extraction
    console.log('\n3. AI Extraction & OCR Pipeline:');
    const ai = getAIService();
    const extractedNotice = await ai.extractDocument('', 'application/pdf', 'Gazette_Notice_Sec11_Survey1042.pdf');
    assert(extractedNotice.surveyNumber === '1042', 'Extracted survey number is 1042');
    assert(extractedNotice.areaHa === 2.73, 'Extracted notice area is 2.73 ha');
    assert(Boolean(extractedNotice.notificationSection?.includes('Section 11(1)')), 'Extracted section is Section 11(1)');

    // 4. Discrepancy Detection Engine
    console.log('\n4. Discrepancy Detection:');
    const discrepancy = await ai.detectDiscrepancies(extractedNotice, {
      surveyNumber: parcel1042?.surveyNumber,
      village: parcel1042?.village,
      district: parcel1042?.district,
      recordedAreaHa: parcel1042?.recordedAreaHa,
    });
    assert(discrepancy.hasDiscrepancy === true, 'Discrepancy detected between notice and database');
    assert(discrepancy.discrepancies.some(d => d.field === 'area'), 'Area mismatch discrepancy identified');
    assert(discrepancy.discrepancies[0].documentValue === '2.73 ha', 'Document area identified as 2.73 ha');
    assert(discrepancy.discrepancies[0].recordedValue === '2.43 ha', 'Recorded area identified as 2.43 ha');

    // 5. Grievance Creation & Reference Code
    console.log('\n5. Citizen Grievance Workflow:');
    const newRef = `GR-TEST-${Date.now()}`;
    const grievance = await prisma.grievance.create({
      data: {
        referenceNumber: newRef,
        citizenId: citizen!.id,
        caseId: acqCase!.id,
        parcelId: parcel1042!.id,
        category: 'WRONG_AREA',
        title: 'Area Discrepancy for Survey 1042 Test',
        description: 'Notice states 2.73 ha but revenue record is 2.43 ha.',
        status: 'SUBMITTED',
      },
    });
    assert(grievance !== null, 'Grievance record created with reference code');
    assert(grievance.status === 'SUBMITTED', 'Grievance initial status is SUBMITTED');

    // 6. Officer Resolution & Notification Workflow
    console.log('\n6. Officer Redressal & Notification:');
    const updatedGrievance = await prisma.grievance.update({
      where: { id: grievance.id },
      data: {
        status: 'RESOLVED',
        officerResponse: 'Field survey completed. Area verified as 2.43 ha and corrigendum published.',
        reviewedBy: 'Vikram Chouhan (LAO)',
        resolvedAt: new Date(),
      },
    });
    assert(updatedGrievance.status === 'RESOLVED', 'Officer updated grievance status to RESOLVED');
    assert(updatedGrievance.officerResponse !== null, 'Officer response attached to grievance');

    // Create notification for citizen
    const notif = await prisma.notification.create({
      data: {
        userId: citizen!.id,
        caseId: acqCase!.id,
        title: 'Grievance Resolved',
        message: `Your grievance #${newRef} has been resolved by the Land Acquisition Officer.`,
        type: 'GRIEVANCE_UPDATE',
      },
    });
    assert(notif !== null && notif.isRead === false, 'In-app notification generated for citizen');

    // Clean up test grievance & notification
    await prisma.notification.delete({ where: { id: notif.id } });
    await prisma.grievance.delete({ where: { id: grievance.id } });

    console.log('\n=======================================================');
    console.log(`🏁 TEST RESULTS: ${passed}/${total} checks passed!`);
    console.log('=======================================================\n');

    if (passed === total) {
      process.exit(0);
    } else {
      process.exit(1);
    }
  } catch (err) {
    console.error('Test execution failed with error:', err);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

runTests();
