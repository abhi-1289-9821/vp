import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding SAHAAY database with demo records...');

  // Clean existing data in reverse relation order
  await prisma.auditLog.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.actionItem.deleteMany();
  await prisma.grievance.deleteMany();
  await prisma.rRRecord.deleteMany();
  await prisma.compensationRecord.deleteMany();
  await prisma.acquisitionEvent.deleteMany();
  await prisma.document.deleteMany();
  await prisma.acquisitionCase.deleteMany();
  await prisma.parcel.deleteMany();
  await prisma.project.deleteMany();
  await prisma.citizenProfile.deleteMany();
  await prisma.user.deleteMany();

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash('password123', salt);

  // 1. Create Users
  const citizen = await prisma.user.create({
    data: {
      email: 'citizen@sahaay.demo',
      passwordHash,
      name: 'Rajesh Sharma',
      role: 'CITIZEN',
      phone: '+91 98260 12345',
      profile: {
        create: {
          aadhaarMasked: 'XXXX-XXXX-8921',
          village: 'Rampur',
          tehsil: 'Huzur',
          district: 'Bhopal',
          state: 'Madhya Pradesh',
          preferredLanguage: 'en',
        },
      },
    },
    include: { profile: true },
  });

  const officer = await prisma.user.create({
    data: {
      email: 'officer@sahaay.demo',
      passwordHash,
      name: 'Vikram Chouhan',
      role: 'OFFICER',
      phone: '+91 75524 56789',
      designation: 'Competent Authority & Land Acquisition Officer (CALAO)',
      department: 'Revenue & Disaster Management Dept, Govt of MP',
    },
  });

  const admin = await prisma.user.create({
    data: {
      email: 'admin@sahaay.demo',
      passwordHash,
      name: 'System Administrator',
      role: 'ADMIN',
      phone: '+91 75524 99999',
      designation: 'Chief Technology Officer',
      department: 'Digital Governance & Revenue Systems',
    },
  });

  // 2. Create Infrastructure Project
  const project = await prisma.project.create({
    data: {
      name: 'NH-46 6-Laning Highway Expansion Project (Bhopal-Hoshangabad Corridor)',
      code: 'NH-46-EXP',
      description: 'Widening, strengthening, and 6-laning of National Highway 46 under PM GatiShakti National Master Plan.',
      department: 'National Highways Authority of India (NHAI)',
      status: 'ACTIVE',
      district: 'Bhopal',
      state: 'Madhya Pradesh',
      totalAreaHa: 148.5,
      budgetINR: 420000000.0,
      geometryGeoJson: JSON.stringify({
        type: 'Polygon',
        coordinates: [
          [
            [77.412, 23.258],
            [77.416, 23.259],
            [77.418, 23.264],
            [77.413, 23.263],
            [77.412, 23.258],
          ],
        ],
      }),
    },
  });

  // 3. Create Land Parcels
  const parcel1042 = await prisma.parcel.create({
    data: {
      surveyNumber: '1042',
      khasraNumber: '1042/1',
      village: 'Rampur',
      tehsil: 'Huzur',
      district: 'Bhopal',
      state: 'Madhya Pradesh',
      recordedAreaHa: 2.43,
      landType: 'Agricultural',
      currentStatus: 'Under Verification',
      centroidLat: 23.2599,
      centroidLng: 77.4126,
      coordinatesJson: JSON.stringify({
        type: 'Polygon',
        coordinates: [
          [
            [77.4126, 23.2599],
            [77.4145, 23.2608],
            [77.4152, 23.2589],
            [77.4131, 23.2582],
            [77.4126, 23.2599],
          ],
        ],
      }),
    },
  });

  const parcel1043 = await prisma.parcel.create({
    data: {
      surveyNumber: '1043',
      khasraNumber: '1043/2',
      village: 'Rampur',
      tehsil: 'Huzur',
      district: 'Bhopal',
      state: 'Madhya Pradesh',
      recordedAreaHa: 1.85,
      landType: 'Agricultural',
      currentStatus: 'Award Declared',
      centroidLat: 23.2612,
      centroidLng: 77.4148,
    },
  });

  const parcel1044 = await prisma.parcel.create({
    data: {
      surveyNumber: '1044',
      khasraNumber: '1044/1',
      village: 'Rampur',
      tehsil: 'Huzur',
      district: 'Bhopal',
      state: 'Madhya Pradesh',
      recordedAreaHa: 0.95,
      landType: 'Residential',
      currentStatus: 'Notification Issued',
      centroidLat: 23.2584,
      centroidLng: 77.4115,
    },
  });

  // 4. Create Primary Acquisition Case (ACQ-2026-MP-1042)
  const case1042 = await prisma.acquisitionCase.create({
    data: {
      caseReference: 'ACQ-2026-MP-1042',
      parcelId: parcel1042.id,
      projectId: project.id,
      citizenId: citizen.id,
      stage: 'VERIFICATION',
      status: 'ACTIVE',
      notificationSection: 'Section 11(1) of RFCTLARR Act, 2013',
      noticeDate: new Date('2026-08-12'),
      estimatedCompensationINR: 3840000.0,
      disbursedCompensationINR: 0.0,
      remarks: 'Preliminary Gazette notice published. Ground verification and objection period underway.',
    },
  });

  // Secondary Case for Parcel 1043
  const case1043 = await prisma.acquisitionCase.create({
    data: {
      caseReference: 'ACQ-2026-MP-1043',
      parcelId: parcel1043.id,
      projectId: project.id,
      citizenId: citizen.id,
      stage: 'AWARD',
      status: 'ACTIVE',
      notificationSection: 'Section 19 Declaration & Section 23 Award',
      noticeDate: new Date('2026-07-20'),
      estimatedCompensationINR: 2850000.0,
      disbursedCompensationINR: 0.0,
      remarks: 'Award declared under Section 23. Disbursement authorization pending bank mandate.',
    },
  });

  // 5. Create Acquisition Events / Timeline for Case 1042
  await prisma.acquisitionEvent.createMany({
    data: [
      {
        caseId: case1042.id,
        stage: 'PROPOSAL',
        title: 'Social Impact Assessment (SIA) & Project Proposal',
        description: 'SIA completed by the Multi-Disciplinary Expert Group with public hearing recommendations.',
        eventDate: new Date('2026-02-15'),
        status: 'COMPLETED',
      },
      {
        caseId: case1042.id,
        stage: 'NOTIFICATION',
        title: 'Section 11(1) Preliminary Gazette Notification',
        description: 'Gazette notification issued under Section 11(1) of the RFCTLARR Act, 2013.',
        eventDate: new Date('2026-08-12'),
        status: 'COMPLETED',
      },
      {
        caseId: case1042.id,
        stage: 'VERIFICATION',
        title: 'Cadastral Ground Verification & Section 15 Objections',
        description: 'Revenue survey inspection and submission of citizen objections regarding land boundaries/area.',
        eventDate: new Date('2026-09-01'),
        status: 'CURRENT',
      },
    ],
  });

  // 6. Create Seed Documents
  const docNotice = await prisma.document.create({
    data: {
      caseId: case1042.id,
      parcelId: parcel1042.id,
      uploaderId: citizen.id,
      title: 'Gazette Acquisition Notice Section 11(1)',
      documentType: 'ACQUISITION_NOTICE',
      fileUrl: '/storage/documents/demo-notice-1042.pdf',
      fileSize: 148520,
      mimeType: 'application/pdf',
      verificationStatus: 'DISCREPANCY_FOUND',
      extractedDataJson: JSON.stringify({
        surveyNumber: '1042',
        khasraNumber: '1042/1',
        village: 'Rampur',
        tehsil: 'Huzur',
        district: 'Bhopal',
        state: 'Madhya Pradesh',
        areaHa: 2.73,
        projectCode: 'NH-46-EXP',
        noticeDate: '2026-08-12',
        caseReference: 'ACQ-2026-MP-1042',
        notificationSection: 'Section 11(1) of RFCTLARR Act, 2013',
      }),
      rawText: 'MADHYA PRADESH RAJPATRA (EXTRAORDINARY) GAZETTE NOTIFICATION UNDER SECTION 11(1)... Notified Area: 2.73 Hectares. Survey: 1042/1.',
      plainLanguageExplanation: 'This official document is a Preliminary Land Acquisition Notice under Section 11(1) for the NH-46 Highway Expansion Project.',
      hasDiscrepancy: true,
      discrepancySummary: 'Area mismatch: The notice specifies 2.73 ha, but the registered land revenue record indicates 2.43 ha.',
      isDemo: true,
    },
  });

  await prisma.document.create({
    data: {
      caseId: case1042.id,
      parcelId: parcel1042.id,
      uploaderId: citizen.id,
      title: 'B-1 Khasra Land Revenue Record',
      documentType: 'LAND_RECORD',
      fileUrl: '/storage/documents/demo-khasra-1042.pdf',
      fileSize: 98450,
      mimeType: 'application/pdf',
      verificationStatus: 'VERIFIED',
      extractedDataJson: JSON.stringify({
        surveyNumber: '1042',
        khasraNumber: '1042/1',
        village: 'Rampur',
        tehsil: 'Huzur',
        district: 'Bhopal',
        areaHa: 2.43,
      }),
      rawText: 'MADHYA PRADESH BHULEKH REVENUE RECORD. Form B-1 Khasra Record. Village: Rampur, Tehsil: Huzur. Area: 2.43 Hectares.',
      plainLanguageExplanation: 'This is your certified Land Revenue Record (Khasra B-1) showing ownership under Rajesh Sharma for 2.43 hectares in Rampur village.',
      hasDiscrepancy: false,
      isDemo: true,
    },
  });

  // 7. Create Compensation Record for Case 1042
  await prisma.compensationRecord.create({
    data: {
      caseId: case1042.id,
      landAssessmentINR: 1600000.0,
      assetAssessmentINR: 320000.0,
      solatiumINR: 1600000.0, // 100% Solatium
      interestINR: 320000.0,  // 12% additional market value
      totalAssessedINR: 3840000.0,
      assessmentStatus: 'ASSESSED',
      paymentStatus: 'PROCESSING',
      assessmentDate: new Date('2026-08-20'),
      pfmsReference: 'PFMS-MP-2026-88194',
      bankAccountMasked: 'State Bank of India A/C ending in 4910',
      ifscCode: 'SBIN0001234',
      notes: 'Valuation calculated based on circle rates plus statutory multiplier and 100% solatium.',
    },
  });

  // 8. Create Rehabilitation & Resettlement (R&R) Record
  await prisma.rRRecord.create({
    data: {
      caseId: case1042.id,
      familyMembersCount: 4,
      displacedStatus: 'NOT_DISPLACED',
      assessmentStatus: 'ELIGIBLE',
      housingAssistanceINR: 0.0,
      livelihoodGrantINR: 50000.0,
      resettlementSiteName: null,
      allottedPlotNumber: null,
      remarks: 'Agricultural land acquisition without homestead displacement. Eligible for one-time subsistence & livelihood assistance.',
    },
  });

  // 9. Create Action Items
  await prisma.actionItem.createMany({
    data: [
      {
        caseId: case1042.id,
        citizenId: citizen.id,
        title: 'Review Area Discrepancy & File Section 15 Objection',
        description: 'The uploaded Section 11(1) notice indicates 2.73 ha while revenue records show 2.43 ha. Submit clarification to avoid compensation mismatch.',
        actionType: 'DISCREPANCY_REVIEW',
        status: 'ACTION_REQUIRED',
        deadline: new Date('2026-10-15'),
        documentId: docNotice.id,
      },
      {
        caseId: case1042.id,
        citizenId: citizen.id,
        title: 'Submit Aadhaar & Bank Details for PFMS Direct Benefit Transfer',
        description: 'Provide certified bank passbook copy matching Aadhaar name for compensation electronic transfer.',
        actionType: 'IDENTITY_VERIFICATION',
        status: 'IN_PROGRESS',
        deadline: new Date('2026-11-01'),
      },
    ],
  });

  // 10. Create Grievance
  await prisma.grievance.create({
    data: {
      referenceNumber: 'GR-2026-1042',
      caseId: case1042.id,
      parcelId: parcel1042.id,
      citizenId: citizen.id,
      category: 'WRONG_AREA',
      title: 'Discrepancy in Notified Area vs Khasra B-1 Record',
      description: 'Section 11(1) gazette notice lists 2.73 ha for Survey 1042/1, whereas my MP Bhulekh B-1 record shows 2.43 ha. Please conduct joint measurement.',
      detectedDiscrepancy: JSON.stringify({
        field: 'area',
        documentValue: '2.73 ha',
        recordedValue: '2.43 ha',
        severity: 'HIGH',
      }),
      status: 'SUBMITTED',
    },
  });

  // 11. Create Notifications for Citizen
  await prisma.notification.createMany({
    data: [
      {
        userId: citizen.id,
        caseId: case1042.id,
        title: 'Welcome to SAHAAY',
        message: 'Your citizen portal is active. You can track your land parcel, notices, compensation, and grievances directly.',
        type: 'STATUS_UPDATE',
        isRead: true,
      },
      {
        userId: citizen.id,
        caseId: case1042.id,
        title: 'Preliminary Notification Published (Section 11)',
        message: 'Gazette notice issued for NH-46 expansion involving Survey #1042/1 in Rampur village.',
        type: 'STATUS_UPDATE',
        isRead: true,
      },
      {
        userId: citizen.id,
        caseId: case1042.id,
        title: 'Action Required: Area Discrepancy Detected',
        message: 'Our automated document analysis identified a 0.30 ha difference between your notice and revenue records.',
        type: 'ACTION_REQUIRED',
        isRead: false,
      },
    ],
  });

  console.log('✅ Database seeded successfully with demo users:');
  console.log('   Citizen: citizen@sahaay.demo / password123');
  console.log('   Officer: officer@sahaay.demo / password123');
  console.log('   Admin:   admin@sahaay.demo / password123');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
