import React from 'react';
import { AlertTriangle, ArrowRight, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { DiscrepancyResult } from '../../types/index.js';
import { useAuthStore } from '../../store/authStore.js';
import { t } from '../../lib/i18n.js';

interface DiscrepancyAlertProps {
  discrepancy: DiscrepancyResult;
  caseId?: string;
  parcelId?: string;
  surveyNumber?: string;
  onReportClick?: () => void;
}

export const DiscrepancyAlert: React.FC<DiscrepancyAlertProps> = ({
  discrepancy,
  caseId,
  parcelId,
  surveyNumber,
  onReportClick,
}) => {
  const { language } = useAuthStore();
  const navigate = useNavigate();

  if (!discrepancy || !discrepancy.hasDiscrepancy) {
    return (
      <div className="bg-[#E8F4EC] border border-[#2E7D5B]/30 rounded-xl p-4 text-xs">
        <div className="flex items-start space-x-3">
          <CheckCircle2 className="w-5 h-5 text-[#2E7D5B] shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-[#2E7D5B] text-sm">
              {t('verificationConsistentTitle', language)}
            </h4>
            <p className="text-[#243746] mt-0.5">
              {t('verificationConsistentDesc', language)}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const handleReport = () => {
    if (onReportClick) {
      onReportClick();
      return;
    }

    const state = {
      category: 'WRONG_AREA',
      title: `${t('catWrongArea', language)} - #${surveyNumber || '1042'}`,
      description: discrepancy.summary,
      detectedDiscrepancy: discrepancy,
      caseId,
      parcelId,
    };

    navigate('/grievance/new', { state });
  };

  return (
    <div className="bg-[#FFF9F0] border border-[#E8B84A]/60 rounded-xl p-5 sm:p-6 shadow-soft space-y-4 text-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E8B84A]/30 pb-3">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-lg bg-[#FFF0D4] text-[#C7972D] flex items-center justify-center font-bold shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-base font-bold text-[#123B5D] tracking-tight">
              {t('potentialDiscrepancy', language)}
            </h4>
            <span className="text-xs text-[#667784]">
              {t('verificationSub', language)}
            </span>
          </div>
        </div>

        <span className="self-start sm:self-auto bg-[#FBECEC] text-[#C62828] border border-[#F5CACA] font-bold px-2.5 py-1 text-[11px] uppercase tracking-wider rounded-md">
          {t('actionRequired', language)}
        </span>
      </div>

      {/* Comparative Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {discrepancy.discrepancies.map((item, idx) => (
          <div key={idx} className="bg-white border border-[#DDE6EC] rounded-lg p-4 space-y-2.5 shadow-soft">
            <div className="flex justify-between items-center text-[11px] font-bold text-[#667784] uppercase">
              <span>{item.field} {t('verificationLabel', language)}</span>
              <span className="text-[#C62828] font-bold">{item.severity} {t('varianceLabel', language)}</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-[#FFF9F0] border border-[#E8B84A]/30 p-2.5 rounded-md">
                <span className="text-[10px] text-[#667784] font-semibold block uppercase">
                  {t('documentArea', language)}:
                </span>
                <span className="text-sm font-bold text-[#123B5D] font-mono">{item.documentValue}</span>
              </div>
              <div className="bg-[#F8FAFC] border border-[#DDE6EC] p-2.5 rounded-md">
                <span className="text-[10px] text-[#667784] font-semibold block uppercase">
                  {t('recordedArea', language)}:
                </span>
                <span className="text-sm font-bold text-[#2E7D5B] font-mono">{item.recordedValue}</span>
              </div>
            </div>

            <p className="text-[#243746] text-xs leading-relaxed pt-1">
              {item.message}
            </p>
          </div>
        ))}
      </div>

      {/* Legal Guidance Box */}
      <div className="bg-white p-3.5 rounded-lg border border-[#DDE6EC] text-xs text-[#667784] leading-relaxed space-y-1">
        <p className="font-semibold text-[#123B5D]">
          ℹ️ {t('statutoryRightsTitle', language)}:
        </p>
        <p>
          {t('statutoryRightsDesc', language)}
        </p>
      </div>

      {/* Action CTA */}
      <div className="pt-1 flex flex-col sm:flex-row gap-2">
        <button
          onClick={handleReport}
          className="bg-[#123B5D] hover:bg-[#1B4D78] text-white font-semibold text-xs py-2.5 px-4 rounded-lg shadow-soft transition flex items-center justify-center space-x-2 cursor-pointer"
        >
          <ShieldAlert className="w-4 h-4 text-[#E8B84A]" />
          <span>{t('reportDiscrepancy', language)}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
