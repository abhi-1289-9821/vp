export interface PanValidationResult {
  valid: boolean;
  panNumber: string;
  entityType?: string;
  message: string;
}

export interface FaceVerificationResult {
  matchScore: number; // 0 to 100
  status: 'VERIFIED' | 'MANUAL_REVIEW' | 'FAILED';
  isMatch: boolean;
  panFaceDetected: boolean;
  selfieFaceDetected: boolean;
  livenessScore: number; // 0 to 100
  confidence: number;
  message: string;
  details?: {
    faceQualityScore?: number;
    landmarkAlignmentScore?: number;
    lightingScore?: number;
    matchThreshold?: number;
    reviewReason?: string;
  };
}

export interface IFaceVerificationService {
  validatePan(panNumber: string): Promise<PanValidationResult>;
  verifyFaceMatch(
    panImagePath: string,
    selfieImagePath: string,
    options?: { panNumber?: string }
  ): Promise<FaceVerificationResult>;
}
