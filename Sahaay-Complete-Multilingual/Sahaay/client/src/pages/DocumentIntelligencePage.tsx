import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api.js';
import { DiscrepancyAlert } from '../components/common/DiscrepancyAlert.js';
import {
  Upload,
  Sparkles,
  FileCheck,
  RefreshCw,
  Info,
  Scale,
} from 'lucide-react';
import { useAuthStore } from '../store/authStore.js';
import { t } from '../lib/i18n.js';

export const DocumentIntelligencePage: React.FC = () => {
  const { language } = useAuthStore();
  const navigate = useNavigate();

  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [error, setError] = useState('');
  const [activeSample, setActiveSample] = useState<string | null>(null);

  const demoSamples = [
    {
      id: 'demo-notice-1042',
      title: t('loadSample1Title', language),
      sub: t('loadSample1Desc', language),
      filename: 'Gazette_Notice_Sec11_Survey1042.pdf',
      type: 'ACQUISITION_NOTICE',
    },
    {
      id: 'demo-khasra-1042',
      title: t('loadSample2Title', language),
      sub: t('loadSample2Desc', language),
      filename: 'Khasra_B1_Survey1042.pdf',
      type: 'LAND_RECORD',
    },
    {
      id: 'demo-award-1043',
      title: t('serviceCheckCompTitle', language),
      sub: t('serviceCheckCompDesc', language),
      filename: 'Award_Order_Survey1043.pdf',
      type: 'AWARD_DOCUMENT',
    },
  ];

  const handleFileUpload = async (selectedFile: File) => {
    setError('');
    setAnalyzing(true);
    setAnalysisResult(null);

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('title', selectedFile.name);

    try {
      const res = await api.uploadDocument(formData);
      if (res.success) {
        setAnalysisResult(res.data);
      }
    } catch (err: any) {
      setError(err.message || t('status_REJECTED', language));
    } finally {
      setAnalyzing(false);
    }
  };

  const handleSampleSelect = (sample: typeof demoSamples[0]) => {
    setActiveSample(sample.id);
    const mockFile = new File(['%PDF-1.4 sample'], sample.filename, { type: 'application/pdf' });
    handleFileUpload(mockFile);
  };

  const extracted = analysisResult?.extractedData;
  const matchedParcel = analysisResult?.matchedParcel;
  const matchedCase = analysisResult?.matchedCase;
  const discrepancyResult = analysisResult?.discrepancyResult;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="soft-card p-6 space-y-1">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#123B5D] text-[#E8B84A] flex items-center justify-center font-bold text-xs shadow-soft">
            <Sparkles className="w-4 h-4" />
          </div>
          <h1 className="text-xl font-extrabold text-[#123B5D] tracking-tight">
            {t('docIntelTitle', language)}
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-[#667784] mt-1">
          {t('docIntelSub', language)}
        </p>
      </div>

      {/* 1-Click Evaluation Notice Fixtures */}
      <div className="bg-[#FFF9F0] border border-[#E8B84A]/60 rounded-xl p-5 space-y-3 shadow-soft">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-[#123B5D] flex items-center gap-1.5">
            <FileCheck className="w-4 h-4 text-[#C7972D]" />
            {t('sampleDocumentsTitle', language)}
          </span>
          <span className="text-[10px] bg-white border border-[#E8B84A] text-[#123B5D] font-bold px-2 py-0.5 rounded">
            {t('demoMode', language)}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {demoSamples.map((sample) => (
            <button
              key={sample.id}
              onClick={() => handleSampleSelect(sample)}
              disabled={analyzing}
              className={`p-3.5 rounded-lg border text-left transition flex flex-col justify-between cursor-pointer ${
                activeSample === sample.id
                  ? 'bg-[#123B5D] text-white border-[#123B5D] shadow-soft'
                  : 'bg-white border-[#DDE6EC] hover:border-[#123B5D] text-[#243746]'
              }`}
            >
              <div>
                <span className="text-xs font-bold block">{sample.title}</span>
                <span className="text-[11px] opacity-80 block mt-1 leading-snug">
                  {sample.sub}
                </span>
              </div>
              <span className={`inline-block mt-3 text-[10px] font-bold self-end px-2 py-0.5 rounded ${
                activeSample === sample.id ? 'bg-[#E8B84A] text-[#123B5D]' : 'bg-[#F1F5F9] text-[#243746]'
              }`}>
                {activeSample === sample.id && analyzing ? t('status_PENDING', language) : t('understandDocument', language)} →
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Manual Upload Drop Area */}
      <div className="soft-card border-2 border-dashed border-[#DDE6EC] hover:border-[#123B5D] transition p-8 text-center space-y-3">
        <input
          type="file"
          id="file-upload"
          accept=".pdf,image/png,image/jpeg,image/webp"
          onChange={(e) => {
            if (e.target.files?.[0]) {
              setActiveSample(null);
              handleFileUpload(e.target.files[0]);
            }
          }}
          className="hidden"
        />
        <label htmlFor="file-upload" className="cursor-pointer block space-y-2">
          <Upload className="w-10 h-10 text-[#123B5D] mx-auto opacity-80" />
          <span className="text-sm font-bold text-[#123B5D] block">
            {t('uploadDropzoneTitle', language)}
          </span>
          <span className="text-xs text-[#667784] block">
            {t('supportedFormatsText', language)}
          </span>
        </label>
      </div>

      {error && (
        <div className="bg-[#FBECEC] border border-[#C62828]/30 rounded-lg text-[#C62828] p-3.5 text-xs font-semibold">
          {error}
        </div>
      )}

      {analyzing && (
        <div className="soft-card p-8 text-center space-y-3">
          <RefreshCw className="w-8 h-8 text-[#123B5D] animate-spin mx-auto" />
          <p className="text-xs font-bold text-[#123B5D]">
            {t('analyzingDocumentText', language)}
          </p>
        </div>
      )}

      {/* Analysis Results Display */}
      {analysisResult && extracted && (
        <div className="space-y-6">
          {/* Extracted Details Card */}
          <div className="soft-card p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#DDE6EC] pb-3">
              <div className="flex items-center space-x-2">
                <Scale className="w-4 h-4 text-[#123B5D]" />
                <h3 className="text-sm font-bold text-[#123B5D] uppercase tracking-wider">
                  {t('extractedInfoTitle', language)}
                </h3>
              </div>
              <span className="text-xs font-mono font-bold bg-[#EAF3F8] text-[#123B5D] px-2.5 py-0.5 rounded-md border border-[#DDE6EC]">
                {t('confidenceScoreLabel', language)}: {(extracted.confidence * 100).toFixed(0)}%
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
              <div className="bg-[#F8FAFC] p-3 rounded-lg border border-[#DDE6EC]">
                <span className="text-[10px] text-[#667784] font-semibold uppercase block">{t('surveyParcelLabel', language)}</span>
                <span className="text-sm font-bold text-[#123B5D] mt-0.5 block font-mono">
                  #{extracted.surveyNumber}
                </span>
              </div>

              <div className="bg-[#F8FAFC] p-3 rounded-lg border border-[#DDE6EC]">
                <span className="text-[10px] text-[#667784] font-semibold uppercase block">{t('village', language)}</span>
                <span className="text-xs font-semibold text-[#243746] mt-0.5 block">{extracted.village}</span>
              </div>

              <div className="bg-[#F8FAFC] p-3 rounded-lg border border-[#DDE6EC]">
                <span className="text-[10px] text-[#667784] font-semibold uppercase block">{t('district', language)}</span>
                <span className="text-xs font-semibold text-[#243746] mt-0.5 block">{extracted.district}</span>
              </div>

              <div className={`p-3 rounded-lg border ${
                discrepancyResult?.hasDiscrepancy ? 'bg-[#FFF9F0] border-[#E8B84A]/60' : 'bg-[#F8FAFC] border-[#DDE6EC]'
              }`}>
                <span className="text-[10px] text-[#667784] font-semibold uppercase block">{t('notifiedAreaLabel', language)}</span>
                <span className={`text-sm font-bold mt-0.5 block ${
                  discrepancyResult?.hasDiscrepancy ? 'text-[#C7972D]' : 'text-[#2E7D5B]'
                }`}>
                  {extracted.areaHa} ha
                </span>
              </div>

              <div className="bg-[#F8FAFC] p-3 rounded-lg border border-[#DDE6EC]">
                <span className="text-[10px] text-[#667784] font-semibold uppercase block">{t('project', language)}</span>
                <span className="text-xs font-semibold text-[#243746] truncate mt-0.5 block">{extracted.project}</span>
              </div>

              <div className="bg-[#F8FAFC] p-3 rounded-lg border border-[#DDE6EC]">
                <span className="text-[10px] text-[#667784] font-semibold uppercase block">{t('timelineSectionTitle', language)}</span>
                <span className="text-xs font-semibold text-[#243746] mt-0.5 block">{extracted.noticeDate || '12/08/2026'}</span>
              </div>
            </div>

            {matchedParcel && (
              <div className="bg-[#E8F4EC] border border-[#2E7D5B]/30 rounded-xl p-4 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="font-bold text-[#2E7D5B] block">
                    ✓ {t('badgeCertifiedKhasra', language)}:
                  </span>
                  <span className="text-[#243746]">
                    {t('surveyParcelLabel', language)} #{matchedParcel.surveyNumber} ({t('certifiedAreaLabel', language)}: <strong>{matchedParcel.recordedAreaHa} ha</strong>)
                  </span>
                </div>

                <div className="flex gap-2">
                  {matchedCase && (
                    <button
                      onClick={() => navigate(`/cases/${matchedCase.id}`)}
                      className="px-3.5 py-1.5 bg-[#123B5D] hover:bg-[#1B4D78] text-white font-semibold text-xs rounded-lg cursor-pointer"
                    >
                      {t('trackCaseBtn', language)} →
                    </button>
                  )}
                  <button
                    onClick={() => navigate('/map')}
                    className="px-3.5 py-1.5 bg-white border border-[#2E7D5B]/40 text-[#2E7D5B] font-semibold text-xs rounded-lg cursor-pointer"
                  >
                    {t('navGisMap', language)}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* DISCREPANCY ALERT BOX */}
          {discrepancyResult && (
            <DiscrepancyAlert
              discrepancy={discrepancyResult}
              caseId={matchedCase?.id}
              parcelId={matchedParcel?.id}
              surveyNumber={matchedParcel?.surveyNumber || extracted.surveyNumber}
            />
          )}

          {/* Plain Language Summary */}
          <div className="soft-card p-6 space-y-3">
            <div className="flex items-center space-x-2 border-b border-[#DDE6EC] pb-2">
              <Info className="w-4 h-4 text-[#123B5D]" />
              <h3 className="text-sm font-bold text-[#123B5D]">
                {t('plainSummaryTitle', language)}
              </h3>
            </div>

            <div className="bg-[#F8FAFC] p-4 rounded-xl border border-[#DDE6EC] text-xs text-[#243746] leading-relaxed whitespace-pre-line font-normal">
              {extracted.plainLanguageExplanation}
            </div>

            {extracted.actionRequired && (
              <div className="bg-[#EAF3F8] border border-[#DDE6EC] rounded-xl p-3.5 text-xs text-[#123B5D]">
                <span className="font-bold block uppercase text-[10px]">{t('actionRecommendationsTitle', language)}:</span>
                <p className="mt-0.5 font-medium">{extracted.actionRequired}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
