export interface ExtractedDocumentData {
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
  documentType?: string;
  notificationSection?: string;
  confidence?: number;
  rawText?: string;
  plainLanguageExplanation?: string;
  actionRequired?: string;
  deadlineDate?: string;
}

export interface DiscrepancyItem {
  field: string;
  documentValue: string;
  recordedValue: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH';
  message: string;
}

export interface DiscrepancyReport {
  hasDiscrepancy: boolean;
  discrepancies: DiscrepancyItem[];
  summary: string;
  recommendedAction: string;
}

export interface RecordedParcelContext {
  surveyNumber?: string;
  village?: string;
  district?: string;
  recordedAreaHa?: number;
  projectCode?: string;
  projectName?: string;
}

export interface IAIService {
  extractDocument(filePath: string, mimeType: string, originalName: string): Promise<ExtractedDocumentData>;
  explainDocument(rawText: string, docType: string, language?: string): Promise<string>;
  detectDiscrepancies(extracted: ExtractedDocumentData, recorded: RecordedParcelContext): Promise<DiscrepancyReport>;
}
