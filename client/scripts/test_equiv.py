import json
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('scripts/en_hi_dump.json', 'r', encoding='utf-8') as f:
    dump = json.load(f)
    ALL_KEYS = dump['keys']
    EN = dump['en']
    HI = dump['hi']

with open('scripts/extracted_base_maps.json', 'r', encoding='utf-8') as f:
    base = json.load(f)

# Key equivalence mapping between old 507 keys and active 493 keys
EQUIV = {
    'rejected': 'status_REJECTED',
    'underReview': 'status_UNDER_REVIEW',
    'pending': 'status_PENDING',
    'completed': 'status_COMPLETED',
    'inProgress': 'status_IN_PROGRESS',
    'verified': 'status_VERIFIED',
    'paid': 'status_PAID',
    'actionRequired': 'status_ACTION_REQUIRED',
    'enterSurveyNo': 'enterSurveyPlaceholder',
    'taluka': 'tehsil',
    'discrepancy': 'detectedDiscrepancyTitle',
    'acquiredArea': 'parcelAcquiredArea',
    'remainingArea': 'retainedAreaLabel',
    'landClassification': 'landTypeLabel',
    'ownershipType': 'ownershipTypeLabel',
    'marketValueRate': 'marketValue',
    'hectares': 'haUnit',
    'acres': 'acresUnit',
    'sqMeters': 'sqmUnit',
    'searchLandPrompt': 'landSearchSub',
    'noRecordsFound': 'noResults',
    'viewFullRecord': 'viewDetails',
    'downloadRecord': 'download',
    'discrepancyAlert': 'detectedDiscrepancyTitle',
    'discrepancyDescription': 'detectedDiscrepancyDesc',
    'raiseObjection': 'newGrievanceBtn',
    'acceptValuation': 'confirm',
    'requestRecheck': 'retry',
    'compensationBreakup': 'compCalculatorTitle',
    'solatium100': 'solatiumAmount',
    'additionalCompensation': 'interestAmount',
    'totalAwardAmount': 'totalCompAmount',
    'directBenefitTransfer': 'dbtStatusTitle',
    'pfmsReference': 'utrNumber',
    'bankAccountLinked': 'bankAccount',
    'disbursementStatus': 'paymentStatus',
    'rrEntitlements': 'rrTitle',
    'housingAllotment': 'rrHouseGrant',
    'subsistenceGrant': 'rrSubsistence',
    'resettlementAllowance': 'rrResettlement',
    'trainingAndEmployment': 'rrLivelihoodGrant',
    'documentIntelligence': 'docIntelTitle',
    'extractKeyData': 'extractedInfo',
    'statutoryCompliance': 'footerStatutoryTitle',
    'grievanceRedressal': 'grievanceTitle',
    'fileSection15Objection': 'serviceGrievanceTitle',
    'trackGrievance': 'navGrievances',
    'hearingScheduled': 'noticeHearingTitle',
    'hearingLocation': 'actionHearingSub',
    'uploadSupportingDocs': 'attachProof',
    'citizenDossier': 'navDocuments',
    'officerDashboard': 'officerDashboardTitle',
    'caseManagement': 'caseRegistryTitle',
    'issueNotices': 'bulkNoticeGeneration',
    'publishAward': 'generateAwardBtn',
    'sanctionPayment': 'approveCompBtn',
    'statutoryTimeLimits': 'timelineSectionSub',
    'section11Notification': 'section11Title',
    'section15Hearing': 'section15Title',
    'section19Declaration': 'section19Title',
    'section23Award': 'section23Title',
    'section38Possession': 'stage8Name'
}

print(f"Equivalence rules: {len(EQUIV)}")
