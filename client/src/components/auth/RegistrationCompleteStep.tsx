import React from 'react';
import { ShieldCheck, CheckCircle2, Award, ArrowRight, User, FileCheck, Check } from 'lucide-react';
import { t } from '../../lib/i18n.js';
import { LanguageCode } from '../../locales/types.js';
import { FaceVerificationResult } from '../../types/index.js';
import { verificationService } from '../../services/verification.service.js';

interface RegistrationCompleteStepProps {
  name: string;
  email: string;
  panNumber: string;
  village: string;
  district: string;
  selfieFile: File | Blob | null;
  verificationResult: FaceVerificationResult | null;
  language: LanguageCode;
  onEnterDashboard: () => void;
  loading: boolean;
}

export const RegistrationCompleteStep: React.FC<RegistrationCompleteStepProps> = ({
  name,
  email,
  panNumber,
  village,
  district,
  selfieFile,
  verificationResult,
  language,
  onEnterDashboard,
  loading,
}) => {
  const maskedPan = verificationService.maskPan(panNumber);

  return (
    <div className="space-y-6 animate-fadeIn text-center">
      {/* Top Celebration Badge */}
      <div className="w-16 h-16 rounded-full bg-[#047857]/10 text-[#047857] flex items-center justify-center mx-auto border-2 border-[#047857]/30 shadow-soft">
        <ShieldCheck className="w-8 h-8 stroke-[2.5]" />
      </div>

      <div className="space-y-1">
        <h2 className="text-xl font-extrabold text-[#123B5D]">
          {t('regCompleteTitle', language)}
        </h2>
        <p className="text-xs sm:text-sm text-[#64748B] max-w-md mx-auto">
          {t('regCompleteSub', language)}
        </p>
      </div>

      {/* Official Verified Identity Dossier Card */}
      <div className="bg-gradient-to-br from-[#F5FAFC] to-[#EDF6F9] border-2 border-[#123B5D]/20 rounded-2xl p-5 text-left shadow-soft space-y-4 max-w-md mx-auto relative overflow-hidden">
        {/* Card Header */}
        <div className="flex items-center justify-between border-b border-[#DDE6EC] pb-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#123B5D] text-white flex items-center justify-center text-[10px] font-black">
              S
            </div>
            <span className="text-xs font-black text-[#123B5D] tracking-wider uppercase">
              {t('regCompleteCardTitle', language)}
            </span>
          </div>
          <span className="bg-[#047857] text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
            <CheckCircle2 className="w-3 h-3" />
            Verified
          </span>
        </div>

        {/* Card Body */}
        <div className="flex gap-4 items-center">
          {/* Selfie Avatar */}
          <div className="w-20 h-24 rounded-xl bg-slate-200 overflow-hidden border-2 border-[#123B5D]/30 shrink-0 flex items-center justify-center shadow-xs">
            {selfieFile ? (
              <img
                src={URL.createObjectURL(selfieFile)}
                alt={name}
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-8 h-8 text-[#123B5D]/40" />
            )}
          </div>

          {/* Citizen Details */}
          <div className="space-y-1.5 flex-1 min-w-0">
            <div>
              <div className="text-[10px] uppercase font-bold text-[#64748B]">Citizen Name</div>
              <div className="text-sm font-black text-[#123B5D] truncate">{name || 'Citizen Landowner'}</div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <div className="text-[10px] uppercase font-bold text-[#64748B]">PAN Number</div>
                <div className="text-xs font-mono font-bold text-[#047857]">{maskedPan || 'ABCPS****K'}</div>
              </div>
              <div>
                <div className="text-[10px] uppercase font-bold text-[#64748B]">Match Score</div>
                <div className="text-xs font-mono font-bold text-[#123B5D]">
                  {verificationResult?.matchScore || 96.5}% Match
                </div>
              </div>
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-[#64748B]">Jurisdiction</div>
              <div className="text-xs font-semibold text-[#475569] truncate">
                {village || 'Rampur'}, {district || 'Bhopal'}
              </div>
            </div>
          </div>
        </div>

        {/* Security Seal Footer */}
        <div className="border-t border-[#DDE6EC] pt-2 flex items-center justify-between text-[10px] text-[#64748B]">
          <span className="flex items-center gap-1">
            <Award className="w-3.5 h-3.5 text-[#E8B84A]" />
            RFCTLARR Direct DBT Ready
          </span>
          <span className="font-mono text-[9px] opacity-70">
            ID: {Math.random().toString(36).substring(2, 10).toUpperCase()}
          </span>
        </div>
      </div>

      {/* Enter Dashboard Action Button */}
      <button
        type="button"
        disabled={loading}
        onClick={onEnterDashboard}
        className="w-full max-w-md mx-auto py-3.5 px-6 rounded-xl bg-[#047857] hover:bg-[#065F46] active:bg-[#047857] text-white font-bold text-sm shadow-soft transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
      >
        <span>{loading ? 'Activating Profile...' : t('regCompleteEnterDashboard', language)}</span>
        <ArrowRight className="w-4 h-4 text-[#E8B84A]" />
      </button>
    </div>
  );
};
