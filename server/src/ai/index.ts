import { IAIService } from './ai.interface';
import { MockAIService } from './mock.service';
import { OpenAIService } from './openai.service';

let aiInstance: IAIService | null = null;

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

export * from './ai.interface';
