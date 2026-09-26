import { IAIService } from './ai.interface';
import { MockAIService } from './mock.service';
import { OpenAIService } from './openai.service';
import { IFaceVerificationService } from './face.interface';
import { MockFaceVerificationService } from './mockFace.service';

let aiInstance: IAIService | null = null;
let faceVerificationInstance: IFaceVerificationService | null = null;

export function getAIService(): IAIService {
  if (!aiInstance) {
    const provider = process.env.AI_PROVIDER?.toLowerCase() || 'mock';
    if (provider === 'openai' && process.env.OPENAI_API_KEY) {
      aiInstance = new OpenAIService(process.env.OPENAI_API_KEY);
    } else {
      aiInstance = new MockAIService();
    }
  }
  return aiInstance;
}

export function getFaceVerificationService(): IFaceVerificationService {
  if (!faceVerificationInstance) {
    // Pluggable biometric verification provider: mock, aws_rekognition, azure_face, google_vision, etc.
    faceVerificationInstance = new MockFaceVerificationService();
  }
  return faceVerificationInstance;
}

export * from './ai.interface';
export * from './face.interface';

