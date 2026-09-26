export type LanguageCode =
  | 'en' // English
  | 'as' // Assamese
  | 'bn' // Bengali
  | 'brx' // Bodo
  | 'doi' // Dogri
  | 'gu' // Gujarati
  | 'hi' // Hindi
  | 'kn' // Kannada
  | 'ks' // Kashmiri
  | 'kok' // Konkani
  | 'mai' // Maithili
  | 'ml' // Malayalam
  | 'mni' // Manipuri
  | 'mr' // Marathi
  | 'ne' // Nepali
  | 'or' // Odia
  | 'pa' // Punjabi
  | 'sa' // Sanskrit
  | 'sat' // Santali
  | 'sd' // Sindhi
  | 'ta' // Tamil
  | 'te' // Telugu
  | 'ur'; // Urdu

export interface LanguageInfo {
  code: LanguageCode;
  name: string;
  nativeName: string;
  displayLabel: string;
  dir?: 'ltr' | 'rtl';
}

export interface TranslationSchema {
  // Brand & Core
  appName: string;
  emblemLetter: string;
  tagline: string;
  heroSub: string;
  portalSubtitle: string;
  citizenPortal: string;
  officerPortal: string;
  demoMode: string;
  signIn: string;
  signOut: string;
  landowner: string;
  landOfficer: string;
  switchRole: string;
  switchCitizen: string;
  switchOfficer: string;
  welcomeBack: string;

  // Navigation
  navHome: string;
  navFindLand: string;
  navGisMap: string;
  navDocIntel: string;
  navCompensation: string;
  navDocuments: string;
  navActionCenter: string;
  navGrievances: string;
  navNotices: string;
  navOfficerDashboard: string;
  navCasesRegistry: string;
  navGrievancesQueue: string;
  citizenServices: string;
  quickActions: string;

  // Common Controls & Badges
  submit: string;
  save: string;
  cancel: string;
  edit: string;
  delete: string;
  search: string;
  filter: string;
  back: string;
  next: string;
  close: string;
  view: string;
  download: string;
  upload: string;
  export: string;
  refresh: string;
  print: string;
  loading: string;
  actions: string;
  details: string;
  status: string;
  viewDetails: string;
  viewOnMap: string;
  viewCase: string;
  trackProgress: string;
  proceed: string;
  confirm: string;
  retry: string;
  clearAll: string;
  applyFilter: string;
  active: string;
  pending: string;
  completed: string;
  resolved: string;
  inProgress: string;
  actionRequired: string;
  verified: string;
  all: string;
  noData: string;
  noResults: string;
  loadingData: string;
  somethingWentWrong: string;
  tryAgain: string;
  errorOccurred: string;
  help: string;
  helpdesk: string;
  helpline: string;
  tollFree: string;
  rightsReserved: string;

  // Status Badges
  status_ACTIVE: string;
  status_COMPLETED: string;
  status_VERIFIED: string;
  status_PAID: string;
  status_SANCTIONED: string;
  status_RESOLVED: string;
  status_ELIGIBLE: string;
  status_VERIFICATION: string;
  status_IN_PROGRESS: string;
  status_UNDER_REVIEW: string;
  status_CURRENT: string;
  status_PROCESSING: string;
  status_ASSESSED: string;
  status_APPROVED: string;
  status_ACTION_REQUIRED: string;
  status_DISCREPANCY_FOUND: string;
  status_DISPUTED: string;
  status_REJECTED: string;
  status_HIGH: string;
  status_SUBMITTED: string;
  status_PENDING: string;
  status_UNPAID: string;
  status_UPCOMING: string;
  status_PROPOSAL: string;
  status_NOTIFICATION: string;

  // Auth / Login
  welcomeTitle: string;
  welcomeSub: string;
  demoAccountsTitle: string;
  demoBadge: string;
  demoCitizenTitle: string;
  demoCitizenSub: string;
  demoOfficerTitle: string;
  demoOfficerSub: string;
  tabSignIn: string;
  tabRegister: string;
  fullNameLabel: string;
  fullNamePlaceholder: string;
  villageLabel: string;
  districtLabel: string;
  emailLabel: string;
  emailPlaceholder: string;
  passwordLabel: string;
  passwordPlaceholder: string;
  verifyingBtn: string;
  createAccountBtn: string;
  signInBtn: string;
  trustBadge: string;
  authFailedError: string;

  // Citizen Home
  heroBadge: string;
  heroTitle: string;
  heroDesc: string;
  findLandBtn: string;
  trackCaseBtn: string;
  understandDocBtn: string;
  badgeStatutoryFormula: string;
  badgeCertifiedKhasra: string;
  badgeSection15: string;
  surveyParcelLabel: string;
  villageTehsilLabel: string;
  currentStageLabel: string;
  currentStage: string;
  viewCadastralMapBtn: string;
  discrepancyBannerTitle: string;
  discrepancyBannerDesc: string;
  reviewDiscrepancyBtn: string;
  timelineSectionTitle: string;
  timelineSectionSub: string;
  stage1Name: string;
  stage2Name: string;
  stage3Name: string;
  stage4Name: string;
  stage5Name: string;
  stage6Name: string;
  stage7Name: string;
  stage8Name: string;
  stage1Desc: string;
  stage2Desc: string;
  stage3Desc: string;
  stage4Desc: string;
  stage5Desc: string;
  stage6Desc: string;
  stage7Desc: string;
  stage8Desc: string;
  servicesSectionTitle: string;
  servicesSectionSub: string;
  serviceFindLandTitle: string;
  serviceFindLandDesc: string;
  serviceTrackCaseTitle: string;
  serviceTrackCaseDesc: string;
  serviceUnderstandDocTitle: string;
  serviceUnderstandDocDesc: string;
  serviceCheckCompTitle: string;
  serviceCheckCompDesc: string;
  serviceRRTitle: string;
  serviceRRDesc: string;
  serviceDiscrepancyTitle: string;
  serviceDiscrepancyDesc: string;
  serviceGrievanceTitle: string;
  serviceGrievanceDesc: string;
  serviceNoticesTitle: string;
  serviceNoticesDesc: string;
  cadastralMapTitle: string;
  cadastralMapSub: string;
  openFullMapBtn: string;
  recentNoticesTitle: string;
  recentNoticesSub: string;
  viewAllNoticesBtn: string;
  noticeHearingTitle: string;
  noticeHearingDesc: string;
  noticeGazetteTitle: string;
  noticeGazetteDesc: string;
  noticeAwardTitle: string;
  noticeAwardDesc: string;
  noticeDateLabel: string;
  supportSectionTitle: string;
  supportSectionDesc: string;
  supportHelplineTitle: string;
  supportHelplineSub: string;
  callNowBtn: string;
  supportFaqTitle: string;
  supportFaqSub: string;
  viewFaqBtn: string;

  // Land Search / Find My Land
  findMyLand: string;
  myLand: string;
  surveyNo: string;
  khasraNo: string;
  village: string;
  tehsil: string;
  district: string;
  state: string;
  recordedArea: string;
  documentArea: string;
  project: string;
  department: string;
  caseReference: string;
  noticeDate: string;
  notificationSection: string;
  timeline: string;
  viewOnGis: string;
  landSearchTitle: string;
  landSearchSub: string;
  searchBySurveyTitle: string;
  enterSurveyPlaceholder: string;
  searchLandBtn: string;
  searchingLandBtn: string;
  filterByVillage: string;
  filterByDistrict: string;
  allVillages: string;
  allDistricts: string;
  searchResultsHeading: string;
  parcelsFoundCount: string;
  noParcelsFoundTitle: string;
  noParcelsFoundDesc: string;
  parcelSurveyNo: string;
  parcelKhasraNo: string;
  parcelVillage: string;
  parcelDistrict: string;
  parcelArea: string;
  parcelLandType: string;
  parcelStatus: string;
  associatedProject: string;
  viewCadastralGis: string;
  viewAcquisitionCase: string;
  quickTipTitle: string;
  quickTipDesc: string;

  // GIS Map
  gisTitle: string;
  gisSub: string;
  legendTitle: string;
  legendNotified: string;
  legendCadastral: string;
  legendHighway: string;
  legendDisputed: string;
  layerSatellite: string;
  layerCadastral: string;
  layerProjectCorridor: string;
  parcelInfoTitle: string;
  clickParcelPrompt: string;
  selectedSurveyNo: string;
  selectedKhasra: string;
  selectedVillage: string;
  selectedDistrict: string;
  selectedRecordedArea: string;
  selectedLandType: string;
  selectedStatus: string;
  openCaseBtn: string;
  measureDistance: string;
  resetMap: string;

  // Case Details
  caseDetailTitle: string;
  caseDetailSub: string;
  caseId: string;
  projectTitle: string;
  departmentTitle: string;
  notifiedSectionLabel: string;
  gazetteDateLabel: string;
  projectDescTitle: string;
  financialSummaryTitle: string;
  totalAssessedComp: string;
  disbursedComp: string;
  balanceComp: string;
  compensationNoticeBadge: string;
  discrepancyAlertSectionTitle: string;
  officialDocumentsTitle: string;
  noticeDocumentName: string;
  khasraDocumentName: string;
  awardDocumentName: string;
  statutoryRightsTitle: string;
  statutoryRightsDesc: string;
  fileSection15GrievanceBtn: string;

  // Document Intelligence
  docIntelTitle: string;
  docIntelSub: string;
  uploadNotice: string;
  understandDocument: string;
  potentialDiscrepancy: string;
  reportDiscrepancy: string;
  plainSummary: string;
  aiAnalysis: string;
  uploadDropzoneTitle: string;
  uploadDropzoneSub: string;
  supportedFormatsText: string;
  analyzingDocumentText: string;
  sampleDocumentsTitle: string;
  loadSample1Title: string;
  loadSample1Desc: string;
  loadSample2Title: string;
  loadSample2Desc: string;
  analysisCompleteTitle: string;
  documentTypeLabel: string;
  confidenceScoreLabel: string;
  extractedInfoTitle: string;
  notifiedAreaLabel: string;
  certifiedAreaLabel: string;
  varianceDetectedBadge: string;
  discrepancySummaryTitle: string;
  plainSummaryTitle: string;
  actionRecommendationsTitle: string;
  saveToLockerBtn: string;
  fileGrievanceBtn: string;

  // Document Locker
  documents: string;
  lockerTitle: string;
  lockerSub: string;
  uploadNewDocBtn: string;
  filterAllDocs: string;
  filterNotices: string;
  filterRecords: string;
  filterAwards: string;
  docNameHeader: string;
  docTypeHeader: string;
  docDateHeader: string;
  docSizeHeader: string;
  docActionHeader: string;
  downloadDocBtn: string;
  viewDocBtn: string;
  noDocsInLockerTitle: string;
  noDocsInLockerDesc: string;

  // Compensation & R&R
  compensation: string;
  rr: string;
  totalCompensation: string;
  solatium: string;
  solatiumDesc: string;
  dbtStatus: string;
  disbursedAmount: string;
  remainingAmount: string;
  bankAccount: string;
  rehabilitationBenefits: string;
  compTitle: string;
  compSub: string;
  assessedCardTitle: string;
  disbursedCardTitle: string;
  pendingCardTitle: string;
  breakdownTitle: string;
  breakdownSub: string;
  circleRateLabel: string;
  multiplierFactorLabel: string;
  baseMarketValueLabel: string;
  solatium100Label: string;
  solatium100Sub: string;
  additionalInterestLabel: string;
  netAwardCompensation: string;
  dbtPfmsTitle: string;
  dbtPfmsSub: string;
  bankNameLabel: string;
  accountNoLabel: string;
  ifscCodeLabel: string;
  dbtStatusLabel: string;
  transactionRefLabel: string;
  rrTitle: string;
  rrSub: string;
  rrHouseTitle: string;
  rrHouseDesc: string;
  rrLivelihoodTitle: string;
  rrLivelihoodDesc: string;
  rrResettlementTitle: string;
  rrResettlementDesc: string;
  rrSkillTitle: string;
  rrSkillDesc: string;
  downloadScheduleBtn: string;

  // Action Center
  actionCenterTitle: string;
  actionCenterSub: string;
  filterAllActions: string;
  filterPendingActions: string;
  filterCompletedActions: string;
  actionDeadlineLabel: string;
  statutorySectionLabel: string;
  markCompleteBtn: string;
  viewStepGuideBtn: string;
  actionVerifyBoundaryTitle: string;
  actionVerifyBoundaryDesc: string;
  actionSubmitBankTitle: string;
  actionSubmitBankDesc: string;
  actionSection15Title: string;
  actionSection15Desc: string;
  noPendingActionsTitle: string;
  noPendingActionsDesc: string;

  // Grievance Management
  grievances: string;
  raiseGrievance: string;
  grievanceType: string;
  objections: string;
  grievanceTitle: string;
  grievanceSub: string;
  raiseNewGrievanceBtn: string;
  myGrievancesListTitle: string;
  newGrievanceFormTitle: string;
  newGrievanceFormSub: string;
  selectCaseLabel: string;
  grievanceCategoryLabel: string;
  catWrongArea: string;
  catCompensation: string;
  catSolatium: string;
  catDbt: string;
  catRR: string;
  catDelay: string;
  catOther: string;
  grievanceSubjectLabel: string;
  grievanceSubjectPlaceholder: string;
  grievanceDescLabel: string;
  grievanceDescPlaceholder: string;
  attachNoticeLabel: string;
  submitGrievanceBtn: string;
  submittingGrievanceBtn: string;
  cancelGrievanceBtn: string;
  grievanceSuccessToast: string;
  ticketNoHeader: string;
  ticketCategoryHeader: string;
  ticketDateHeader: string;
  ticketStatusHeader: string;
  ticketOfficerResponseHeader: string;
  noGrievancesTitle: string;
  noGrievancesDesc: string;

  // Notification Center
  notifications: string;
  notificationsTitle: string;
  notificationsSub: string;
  markAllReadBtn: string;
  filterAllNotices: string;
  filterUnreadNotices: string;
  hearingNoticeTitle: string;
  hearingNoticeDesc: string;
  gazetteNoticeTitle: string;
  gazetteNoticeDesc: string;
  dbtNoticeTitle: string;
  dbtNoticeDesc: string;
  viewNoticeCaseBtn: string;
  noNotificationsTitle: string;
  noNotificationsDesc: string;

  // Officer Portal & Cases
  officerDashTitle: string;
  officerDashSub: string;
  metricTotalCases: string;
  metricPendingVerification: string;
  metricDisbursedAmount: string;
  metricOpenGrievances: string;
  quickCaseReviewTitle: string;
  recentGrievancesTitle: string;
  reviewCaseBtn: string;
  scheduleHearingBtn: string;
  approveVerificationBtn: string;
  rejectGrievanceBtn: string;
  resolveGrievanceBtn: string;
  officerCasesTitle: string;
  officerCasesSub: string;
  searchCasePlaceholder: string;
  filterAllStages: string;
  stageVerification: string;
  stageHearing: string;
  stageAward: string;
  stagePayment: string;
  stagePossession: string;
  caseOfficerNotesLabel: string;
  saveStatusUpdateBtn: string;

  // Announcement Bar
  noticeLabel: string;
  tickerAdvisory: string;
  tickerDocIntel: string;
  tickerObjections: string;
  tickerDbt: string;

  // Footer
  footerTagline: string;
  footerDescription: string;
  footerHelplineLabel: string;
  footerServicesTitle: string;
  footerServiceFindLand: string;
  footerServiceDocIntel: string;
  footerServiceGis: string;
  footerServiceComp: string;
  footerServiceActions: string;
  footerServiceGrievances: string;
  footerStatutoryTitle: string;
  footerStatutoryAct: string;
  footerStatutorySec11: string;
  footerStatutorySec15: string;
  footerStatutorySec19: string;
  footerStatutorySec23: string;
  footerStatutoryPfms: string;
  footerAssistanceTitle: string;
  footerAddress: string;
  footerTollFree: string;
  footerEmail: string;
  footerCopyright: string;
  footerDemoDisclaimer: string;

  // Discrepancy & Verification
  verificationConsistentTitle: string;
  verificationConsistentDesc: string;
  verificationSub: string;
  verificationLabel: string;
  varianceLabel: string;
  parcelVillagePrompt: string;

  // Landing Page Hero Carousel
  heroSlide1Tag: string;
  heroSlide1Badge: string;
  heroSlide1Title: string;
  heroSlide1Sub: string;
  heroSlide1Cta: string;
  heroSlide1Sec: string;
  heroSlide1Metric: string;
  heroSlide1MetricLabel: string;

  heroSlide2Tag: string;
  heroSlide2Badge: string;
  heroSlide2Title: string;
  heroSlide2Sub: string;
  heroSlide2Cta: string;
  heroSlide2Sec: string;
  heroSlide2Metric: string;
  heroSlide2MetricLabel: string;

  heroSlide3Tag: string;
  heroSlide3Badge: string;
  heroSlide3Title: string;
  heroSlide3Sub: string;
  heroSlide3Cta: string;
  heroSlide3Sec: string;
  heroSlide3Metric: string;
  heroSlide3MetricLabel: string;

  heroSlide4Tag: string;
  heroSlide4Badge: string;
  heroSlide4Title: string;
  heroSlide4Sub: string;
  heroSlide4Cta: string;
  heroSlide4Sec: string;
  heroSlide4Metric: string;
  heroSlide4MetricLabel: string;

  heroSlide5Tag: string;
  heroSlide5Badge: string;
  heroSlide5Title: string;
  heroSlide5Sub: string;
  heroSlide5Cta: string;
  heroSlide5Sec: string;
  heroSlide5Metric: string;
  heroSlide5MetricLabel: string;

  // Landing Page Sections & Features
  searchPlaceholderLanding: string;
  searchRecordsBtn: string;
  quickLookup: string;
  registerLandowner: string;
  servicesDirectoryBadge: string;
  servicesDirectorySub: string;
  dilrmpCompliant: string;
  accessService: string;
  spatialIntelligenceBadge: string;
  cadastralShowcaseTitle: string;
  cadastralShowcaseDesc: string;
  activeCadastralLayer: string;
  openGisMap: string;
  launchFullGis: string;
  interactiveCadastralViewer: string;
  geoVerifiedBadge: string;
  notifiedPlot: string;
  nhCorridor: string;
  docIntelShowcaseBadge: string;
  docIntelShowcaseTitle: string;
  docIntelShowcaseDesc: string;
  instantOcrTitle: string;
  instantOcrDesc: string;
  discrepancyAlertsTitle: string;
  discrepancyAlertsDesc: string;
  analyzeNoticeBtn: string;
  lookupRorBtn: string;
  compShowcaseBadge: string;
  compShowcaseTitle: string;
  compShowcaseDesc: string;
  ruralMultiplierTitle: string;
  ruralMultiplierDesc: string;
  solatium100Feature: string;
  solatium100FeatureDesc: string;
  rrGrantsTitle: string;
  rrGrantsDesc: string;
  openCompCalcBtn: string;
  sampleCompCalcTitle: string;
  rfctlarrFormulaBadge: string;
  marketValueLabel: string;
  solatiumMandatoryLabel: string;
  rrGrantLabel: string;
  totalStatutoryEntitlement: string;
  directDbtBadge: string;
  pfmsLinked: string;
  institutionalPillarsBadge: string;
  trustSectionTitle: string;
  trustSectionDesc: string;
  trust1Title: string;
  trust1Sub: string;
  trust1Desc: string;
  trust1Badge: string;
  trust2Title: string;
  trust2Sub: string;
  trust2Desc: string;
  trust2Badge: string;
  trust3Title: string;
  trust3Sub: string;
  trust3Desc: string;
  trust3Badge: string;
  trust4Title: string;
  trust4Sub: string;
  trust4Desc: string;
  trust4Badge: string;
  gazetteTickerBadge: string;
  recentGazetteTitle: string;
  viewAllGazetteNotices: string;
  readOrderBtn: string;
  authorityLabel: string;
  nationalHelplineBadge: string;
  landownerSignIn: string;
  roadmapTitle: string;
  roadmapStep1Title: string;
  roadmapStep1Desc: string;
  roadmapStep2Title: string;
  roadmapStep2Desc: string;
  roadmapStep3Title: string;
  roadmapStep3Desc: string;
  roadmapStep4Title: string;
  roadmapStep4Desc: string;

  // Citizen Home & Dashboard
  authLandownerWorkspace: string;
  caseRefLabel: string;
  landownerIdLabel: string;
  fullCaseDossier: string;
  digitalLocker: string;
  active60DayWindow: string;
  actionRequiredStrip: string;
  pendingTaskCount: string;
  reviewTaskBtn: string;
  surveyedPlot: string;
  statutoryStage: string;
  section1115Active: string;
  assessedAward: string;
  solatiumMandated: string;
  rrGrant: string;
  schedule2Entitlement: string;
  disbursalChannel: string;
  directDbt: string;
  statutoryLifecycleBadge: string;
  milestoneTrackerTitle: string;
  phase2of5Active: string;
  currentStageSec15: string;
  sec15StageDesc: string;
  lodgeSec15Objection: string;
  viewHearingSummons: string;
  notifiedAcqArea: string;
  doubleCropped: string;
  marketValueAssessment: string;
  circleRateMultiplier: string;
  sec301StatutoryRule: string;
  resettlementMandatory: string;
  totalAssessedStatutoryAward: string;
  pfmsVerified: string;
  disbursalDirectBank: string;
  verifiedLegalDocs: string;
  officialFilesStored: string;
  viewAllFiles: string;
  searchAdditionalKhasra: string;
  searchAdditionalKhasraDesc: string;
  expandMap: string;
  officialSummonsActivity: string;
  allNotices: string;
  sec1119OcrTitle: string;
  sec1119OcrSub: string;
  sec1119OcrDesc: string;
  analyzeGazetteNotice: string;
  calaTitle: string;
  officeLabel: string;
  officeSdmRev: string;
  submitGrievanceCollectorate: string;

  // Compensation Breakdown Details
  standingTreesAssets: string;
  horticultureAssessment: string;
  sec303Interest: string;
  sec30FinalAward: string;
  membersOnRecord: string;
  aadhaarNpciActive: string;

  // Registration Flow Steps & PAN / Biometric Verification
  regStep1Title: string;
  regStep2Title: string;
  regStep3Title: string;
  regStep4Title: string;
  regStep5Title: string;
  regStep6Title: string;
  regStep1Desc: string;
  regStep2Desc: string;
  regStep3Desc: string;
  regStep4Desc: string;
  regStep5Desc: string;
  regStep6Desc: string;

  panNumberLabel: string;
  panNumberPlaceholder: string;
  panValidationSuccess: string;
  panValidationFailed: string;
  panEntityIndividual: string;
  panUploadTitle: string;
  panUploadInstructions: string;
  panUploadDropzone: string;
  panUploadChange: string;
  panFormatHelp: string;

  selfieStepTitle: string;
  selfieInstructions: string;
  selfieCaptureTab: string;
  selfieUploadTab: string;
  selfieCameraStart: string;
  selfieCameraCapturing: string;
  selfieCameraRetake: string;
  selfieCaptureBtn: string;
  selfieCameraPermissionError: string;
  selfieAlignFacePrompt: string;

  faceVerificationTitle: string;
  faceVerificationRunning: string;
  faceVerificationScanning: string;
  faceMatchScoreLabel: string;
  faceMatchStatusVerified: string;
  faceMatchStatusManual: string;
  faceMatchStatusFailed: string;
  faceCheckPanDetected: string;
  faceCheckSelfieDetected: string;
  faceCheckLiveness: string;
  faceCheckLandmarks: string;

  regCompleteTitle: string;
  regCompleteSub: string;
  regCompleteCardTitle: string;
  regCompleteEnterDashboard: string;
  regNextStepBtn: string;
  regPrevStepBtn: string;
  regVerifyBtn: string;

  // Dashboard Identity Verification Status
  dashboardIdentityTitle: string;
  dashboardPanVerifiedBadge: string;
  dashboardFaceVerifiedBadge: string;
  dashboardVerificationPendingBadge: string;
  dashboardManualReviewBadge: string;
  dashboardIdentityVerifiedSub: string;
  dashboardIdentityPendingSub: string;
  dashboardViewVerificationDetails: string;
}

