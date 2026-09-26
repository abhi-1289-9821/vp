import { IAIService, ExtractedDocumentData, DiscrepancyReport, RecordedParcelContext, DiscrepancyItem } from './ai.interface';
import { logger } from '../utils/logger';

export class MockAIService implements IAIService {
  async extractDocument(
    filePath: string,
    mimeType: string,
    originalName: string
  ): Promise<ExtractedDocumentData> {
    logger.info(`Mock AI analyzing document: ${originalName} (${mimeType})`);

    const lowerName = originalName.toLowerCase();

    // Secondary test cases
    if (lowerName.includes('1043') || lowerName.includes('award')) {
      return {
        surveyNumber: '1043',
        khasraNumber: '1043/2',
        village: 'Rampur',
        tehsil: 'Huzur',
        district: 'Bhopal',
        state: 'Madhya Pradesh',
        areaHa: 1.85,
        project: 'Highway Expansion Project',
        projectCode: 'NH-46-EXP',
        noticeDate: '2026-07-20',
        caseReference: 'ACQ-2026-MP-1043',
        documentType: 'AWARD_DOCUMENT',
        notificationSection: 'Section 23/30 Award',
        confidence: 0.94,
        rawText: `OFFICE OF THE COMPETENT AUTHORITY & LAND ACQUISITION OFFICER, BHOPAL CIRCLE. AWARD UNDER SECTION 23/30 OF RFCTLARR ACT 2013. Survey Khasra No: 1043/2, Village: Rampur, District: Bhopal. Total Area: 1.85 Hectares. Net Assessed Compensation: INR 28,50,000.`,
        plainLanguageExplanation:
          'This document is the Final Compensation Award under Section 23/30. It confirms the monetary valuation assessed for your land parcel and authorizes disbursement through PFMS Direct Benefit Transfer.',
        actionRequired: 'Verify PFMS bank account details and submit ECS mandate.',
        deadlineDate: '2026-10-30',
      };
    }

    if (lowerName.includes('khasra') || lowerName.includes('bhoomi') || lowerName.includes('patwari')) {
      return {
        surveyNumber: '1042',
        khasraNumber: '1042/1',
        village: 'Rampur',
        tehsil: 'Huzur',
        district: 'Bhopal',
        state: 'Madhya Pradesh',
        areaHa: 2.43,
        project: 'Highway Expansion Project',
        projectCode: 'NH-46-EXP',
        noticeDate: '2026-01-10',
        caseReference: 'ACQ-2026-MP-1042',
        documentType: 'LAND_RECORD',
        notificationSection: 'Khasra Khatauni B-1 Record',
        confidence: 0.98,
        rawText: `MADHYA PRADESH BHULEKH REVENUE RECORD. Form B-1 Khasra Record. Village: Rampur, Tehsil: Huzur, District: Bhopal. Khasra Survey: 1042. Khatedar: Rajesh Sharma S/o Ramesh Sharma. Recorded Area: 2.4300 Hectare. Classification: Irrigated Agricultural (Do-Fasli).`,
        plainLanguageExplanation:
          'This is your certified Land Revenue Record (Khasra B-1) showing ownership under Rajesh Sharma for 2.43 hectares in Rampur village.',
        actionRequired: 'Keep safely as proof of ownership.',
      };
    }

    // PRIMARY DEMO NOTICE: Gazette Notification Section 11(1) with 2.73 ha discrepancy
    return {
      surveyNumber: '1042',
      khasraNumber: '1042/1',
      village: 'Rampur',
      tehsil: 'Huzur',
      district: 'Bhopal',
      state: 'Madhya Pradesh',
      areaHa: 2.73, // Document says 2.73 ha, while DB has 2.43 ha
      project: 'Highway Expansion Project',
      projectCode: 'NH-46-EXP',
      noticeDate: '2026-08-12',
      caseReference: 'ACQ-2026-MP-1042',
      documentType: 'ACQUISITION_NOTICE',
      notificationSection: 'Section 11(1) of RFCTLARR Act, 2013',
      confidence: 0.96,
      rawText: `MADHYA PRADESH RAJPATRA (EXTRAORDINARY) GAZETTE NOTIFICATION
REVENUE & DISASTER MANAGEMENT DEPARTMENT, GOVT OF MP
NOTIFICATION UNDER SECTION 11(1) OF THE RIGHT TO FAIR COMPENSATION AND TRANSPARENCY IN LAND ACQUISITION, REHABILITATION AND RESETTLEMENT ACT, 2013.

Whereas it appears to the Appropriate Government that land is required for a public purpose, namely the Widening & 6-Laning of National Highway 46 (Bhopal-Hoshangabad Corridor) under PM GatiShakti.

SCHEDULE OF ACQUISITION:
District: Bhopal
Tehsil: Huzur
Village: Rampur
Survey / Khasra No.: 1042 (Part 1042/1)
Notified Area: 2.73 Hectares (Two point seven three hectares)
Recorded Khatedar: Shri Rajesh Sharma
Project Implementing Agency: National Highways Authority of India (NHAI)

Notice is hereby given that any person interested in any land which has been notified may within sixty days from the date of publication of this notification object to the acquisition, area measurement, or public purpose under Section 15(1).`,
      plainLanguageExplanation: `This official document is a Preliminary Land Acquisition Notice under Section 11(1) for the NH-46 Highway Expansion Project. 

Key Takeaways in Simple Words:
1. The government has published an official notification intending to acquire land for 6-laning the highway.
2. The notice specifies Survey No. 1042 in Village Rampur.
3. You have the legal right to inspect the survey map and file objections within 60 days regarding area measurement, boundaries, or compensation.
4. No private sale or construction should take place on notified portion during the acquisition process.`,
      actionRequired:
        'Verify notified survey boundaries against your physical land holdings and submit Section 15 objection if area measurement is incorrect.',
      deadlineDate: '2026-10-15',
    };
  }

  async explainDocument(rawText: string, docType: string, language = 'en'): Promise<string> {
    if (language === 'hi') {
      return `यह दस्तावेज़ धारा 11(1) के अंतर्गत भू-अधिग्रहण की प्रारंभिक अधिसूचना है। सरकार ने राष्ट्रीय राजमार्ग (NH-46) के चौड़ीकरण हेतु ग्राम रामपुर के खसरा नंबर 1042 की भूमि को चिह्नित किया है। आपके पास खसरा क्षेत्रफल का सत्यापन करने और 60 दिनों के भीतर अपनी आपत्ति दर्ज करने का कानूनी अधिकार है।`;
    }
    return `This document is a formal statutory notice issued by the Land Acquisition Authority under the RFCTLARR Act, 2013. It notifies that your parcel is included in the project alignment corridor. You are entitled to review compensation schedules and submit clarifications before final award declaration.`;
  }

  async detectDiscrepancies(
    extracted: ExtractedDocumentData,
    recorded: RecordedParcelContext
  ): Promise<DiscrepancyReport> {
    const discrepancies: DiscrepancyItem[] = [];

    // Check Area Discrepancy
    if (extracted.areaHa !== undefined && recorded.recordedAreaHa !== undefined) {
      const diff = Math.abs(extracted.areaHa - recorded.recordedAreaHa);
      const diffPct = (diff / recorded.recordedAreaHa) * 100;

      if (diff > 0.01) {
        discrepancies.push({
          field: 'area',
          documentValue: `${extracted.areaHa} ha`,
          recordedValue: `${recorded.recordedAreaHa} ha`,
          severity: diffPct > 5 ? 'HIGH' : 'MEDIUM',
          message: `Area mismatch: The uploaded document states ${extracted.areaHa} ha, but the official Land Revenue Record indicates ${recorded.recordedAreaHa} ha (Difference: ${extracted.areaHa > recorded.recordedAreaHa ? '+' : '-'}${diff.toFixed(2)} ha / ${diffPct.toFixed(1)}%).`,
        });
      }
    }

    // Check Survey Number
    if (
      extracted.surveyNumber &&
      recorded.surveyNumber &&
      extracted.surveyNumber.trim() !== recorded.surveyNumber.trim()
    ) {
      discrepancies.push({
        field: 'surveyNumber',
        documentValue: extracted.surveyNumber,
        recordedValue: recorded.surveyNumber,
        severity: 'HIGH',
        message: `Survey Number mismatch: Document lists #${extracted.surveyNumber}, but case record is #${recorded.surveyNumber}.`,
      });
    }

    // Check Village
    if (
      extracted.village &&
      recorded.village &&
      !recorded.village.toLowerCase().includes(extracted.village.toLowerCase()) &&
      !extracted.village.toLowerCase().includes(recorded.village.toLowerCase())
    ) {
      discrepancies.push({
        field: 'village',
        documentValue: extracted.village,
        recordedValue: recorded.village,
        severity: 'MEDIUM',
        message: `Village name variance: Document states "${extracted.village}", record states "${recorded.village}".`,
      });
    }

    const hasDiscrepancy = discrepancies.length > 0;
    const summary = hasDiscrepancy
      ? `Potential Discrepancy: We detected ${discrepancies.length} variance(s) between your uploaded document and the Land Revenue database. Please verify against your physical survey or report an issue for Land Officer review.`
      : 'All extracted fields match the official land registry and acquisition records perfectly.';

    const recommendedAction = hasDiscrepancy
      ? 'Click "Report Discrepancy" below to submit a 1-click grievance directly to the Land Acquisition Officer for physical verification.'
      : 'No action required. Your land records are consistent with statutory records.';

    return {
      hasDiscrepancy,
      discrepancies,
      summary,
      recommendedAction,
    };
  }
}
