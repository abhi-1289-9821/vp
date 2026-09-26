export interface User {
  id: string;
  email: string;
  name: string;
  role: 'CITIZEN' | 'OFFICER' | 'ADMIN';
  phone?: string;
  designation?: string;
  department?: string;
  profile?: CitizenProfile;
}

export interface CitizenProfile {
  id: string;
  userId: string;
  aadhaarMasked?: string;
  panNumber?: string;
  panDocumentUrl?: string;
  panStatus?: 'PENDING' | 'VERIFIED' | 'REJECTED';
  selfieUrl?: string;
  faceMatchScore?: number;
  faceMatchStatus?: 'PENDING' | 'VERIFIED' | 'MANUAL_REVIEW' | 'FAILED';
  village?: string;
  tehsil?: string;
  district?: string;
  state?: string;
  preferredLanguage: string;
}

export interface PanValidationResult {
  valid: boolean;
  panNumber: string;
  entityType?: string;
  message: string;
}

export interface FaceVerificationResult {
  matchScore: number;
  status: 'VERIFIED' | 'MANUAL_REVIEW' | 'FAILED';
  isMatch: boolean;
  panFaceDetected: boolean;
  selfieFaceDetected: boolean;
  livenessScore: number;
  confidence: number;
  message: string;
  details?: {
    faceQualityScore?: number;
    landmarkAlignmentScore?: number;
    lightingScore?: number;
    matchThreshold?: number;
    reviewReason?: string;
  };
  panDocumentUrl?: string;
  selfieUrl?: string;
}

export interface Project {
  id: string;
  name: string;
  code: string;
  description?: string;
  department: string;
  status: string;
  district: string;
  state: string;
  totalAreaHa: number;
  budgetINR: number;
  geometryGeoJson?: string;
}

export interface Parcel {
  id: string;
  surveyNumber: string;
  khasraNumber?: string;
  village: string;
  tehsil: string;
  district: string;
  state: string;
  recordedAreaHa: number;
  landType: string;
  currentStatus: string;
  coordinatesJson?: string;
  centroidLat?: number;
  centroidLng?: number;
  cases?: AcquisitionCase[];
}

export interface AcquisitionCase {
  id: string;
  caseReference: string;
  parcelId: string;
  parcel: Parcel;
  projectId: string;
  project: Project;
  citizenId: string;
  citizen?: { id: string; name: string; email?: string; phone?: string };
  stage: 'PROPOSAL' | 'NOTIFICATION' | 'VERIFICATION' | 'AWARD' | 'COMPENSATION' | 'RR' | 'POSSESSION' | 'CLOSURE';
  status: 'ACTIVE' | 'PENDING' | 'COMPLETED' | 'DISPUTED';
  notificationSection: string;
  noticeDate?: string;
  estimatedCompensationINR: number;
  disbursedCompensationINR: number;
  remarks?: string;
  events?: AcquisitionEvent[];
  documents?: DocumentItem[];
  compensationRecord?: CompensationRecord;
  rrRecord?: RRRecord;
  actionItems?: ActionItem[];
  grievances?: Grievance[];
  createdAt: string;
  updatedAt: string;
}

export interface AcquisitionEvent {
  id: string;
  caseId: string;
  stage: string;
  title: string;
  description: string;
  eventDate: string;
  status: 'COMPLETED' | 'CURRENT' | 'UPCOMING';
  documentId?: string;
  document?: DocumentItem;
}

export interface DocumentItem {
  id: string;
  caseId?: string;
  parcelId?: string;
  uploaderId: string;
  title: string;
  documentType: string;
  fileUrl: string;
  fileSize: number;
  mimeType: string;
  verificationStatus: 'PENDING' | 'VERIFIED' | 'DISCREPANCY_FOUND' | 'REJECTED';
  extractedDataJson?: string;
  rawText?: string;
  plainLanguageExplanation?: string;
  hasDiscrepancy: boolean;
  discrepancySummary?: string;
  isDemo: boolean;
  createdAt: string;
}

export interface CompensationRecord {
  id: string;
  caseId: string;
  landAssessmentINR: number;
  assetAssessmentINR: number;
  solatiumINR: number;
  interestINR: number;
  totalAssessedINR: number;
  assessmentStatus: 'PENDING' | 'ASSESSED' | 'APPROVED' | 'DISBURSED';
  paymentStatus: 'UNPAID' | 'PROCESSING' | 'PAID';
  assessmentDate?: string;
  paymentDate?: string;
  pfmsReference?: string;
  bankAccountMasked?: string;
  ifscCode?: string;
  notes?: string;
}

export interface RRRecord {
  id: string;
  caseId: string;
  familyMembersCount: number;
  displacedStatus: 'NOT_DISPLACED' | 'DISPLACED' | 'RESETTLED';
  assessmentStatus: 'PENDING' | 'ELIGIBLE' | 'SANCTIONED';
  housingAssistanceINR: number;
  livelihoodGrantINR: number;
  resettlementSiteName?: string;
  allottedPlotNumber?: string;
  remarks?: string;
}

export interface Grievance {
  id: string;
  referenceNumber: string;
  caseId?: string;
  case?: { id: string; caseReference: string; project?: { name: string } };
  parcelId?: string;
  parcel?: Parcel;
  citizenId: string;
  citizen?: { id: string; name: string; phone?: string; email?: string };
  category: string;
  title: string;
  description: string;
  detectedDiscrepancy?: string;
  attachmentUrl?: string;
  status: 'SUBMITTED' | 'UNDER_REVIEW' | 'RESPONSE_ADDED' | 'RESOLVED';
  officerResponse?: string;
  reviewedBy?: string;
  resolvedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ActionItem {
  id: string;
  caseId: string;
  case?: { id: string; caseReference: string; parcel?: Parcel };
  citizenId: string;
  title: string;
  description: string;
  actionType: string;
  status: 'ACTION_REQUIRED' | 'IN_PROGRESS' | 'COMPLETED' | 'NO_ACTION_REQUIRED';
  deadline?: string;
  documentId?: string;
  createdAt: string;
}

export interface NotificationItem {
  id: string;
  userId: string;
  caseId?: string;
  title: string;
  message: string;
  type: 'NEW_DOCUMENT' | 'ACTION_REQUIRED' | 'DEADLINE_APPROACHING' | 'STATUS_UPDATE' | 'COMPENSATION_UPDATE' | 'GRIEVANCE_UPDATE';
  isRead: boolean;
  metadata?: string;
  createdAt: string;
}

export interface ExtractedData {
  surveyNumber?: string;
  khasraNumber?: string;
  village?: string;
  tehsil?: string;
  district?: string;
  state?: string;
  areaHa?: number;
  project?: string;
  projectCode?: string;
  noticeDate?: string;
  caseReference?: string;
  documentType: string;
  notificationSection?: string;
  confidence: number;
  rawText: string;
  plainLanguageExplanation: string;
  actionRequired?: string;
  deadlineDate?: string;
}

export interface DiscrepancyResult {
  hasDiscrepancy: boolean;
  discrepancies: Array<{
    field: string;
    documentValue: any;
    recordedValue: any;
    severity: 'HIGH' | 'MEDIUM' | 'LOW';
    message: string;
  }>;
  summary: string;
  recommendedAction: string;
}
