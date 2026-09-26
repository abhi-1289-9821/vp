import React, { useState } from 'react';
import { CreditCard, CheckCircle2, AlertCircle, UploadCloud, FileText, Image as ImageIcon, ShieldCheck, X } from 'lucide-react';
import { t } from '../../lib/i18n.js';
import { LanguageCode } from '../../locales/types.js';
import { verificationService } from '../../services/verification.service.js';

interface PanVerificationStepProps {
  step: 2 | 3;
  panNumber: string;
  setPanNumber: (pan: string) => void;
  panFile: File | null;
  setPanFile: (file: File | null) => void;
  language: LanguageCode;
  onNext: () => void;
  onBack: () => void;
}

export const PanVerificationStep: React.FC<PanVerificationStepProps> = ({
  step,
  panNumber,
  setPanNumber,
  panFile,
  setPanFile,
  language,
  onNext,
  onBack,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [fileError, setFileError] = useState('');

  const panValidation = verificationService.validatePanFormat(panNumber);

  const handlePanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uppercase = e.target.value.toUpperCase().slice(0, 10);
    setPanNumber(uppercase);
  };

  const handleFile = (file: File) => {
    setFileError('');
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
    if (!validTypes.includes(file.type)) {
      setFileError('Please upload a valid image (JPG, PNG, WebP) or PDF document.');
      return;
    }
    if (file.size > 15 * 1024 * 1024) {
      setFileError('File size exceeds 15MB limit.');
      return;
    }
    setPanFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  // STEP 2: PAN Details Input
  if (step === 2) {
    return (
      <div className="space-y-5 animate-fadeIn">
        <div className="space-y-1">
          <h2 className="text-lg font-bold text-[#123B5D] flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-[#123B5D]" />
            {t('panNumberLabel', language)}
          </h2>
          <p className="text-xs text-[#64748B]">
            {t('regStep2Desc', language)}
          </p>
        </div>

        <div className="bg-[#F8FAFC] p-4 rounded-xl border border-[#DDE6EC] space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#123B5D] mb-1.5">
              {t('panNumberLabel', language)} <span className="text-[#C62828]">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                required
                maxLength={10}
                value={panNumber}
                onChange={handlePanChange}
                placeholder={t('panNumberPlaceholder', language)}
                className={`w-full px-4 py-3 rounded-lg border text-sm font-mono uppercase font-bold tracking-widest bg-white transition focus:outline-none ${
                  panNumber.length === 10
                    ? panValidation.valid
                      ? 'border-[#047857] text-[#047857] focus:ring-2 focus:ring-[#047857]/20'
                      : 'border-[#C62828] text-[#C62828] focus:ring-2 focus:ring-[#C62828]/20'
                    : 'border-[#CBD5E1] text-[#1E293B] focus:border-[#123B5D]'
                }`}
              />
              {panNumber.length === 10 && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  {panValidation.valid ? (
                    <CheckCircle2 className="w-5 h-5 text-[#047857]" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-[#C62828]" />
                  )}
                </div>
              )}
            </div>
            <p className="text-[11px] text-[#64748B] mt-1.5">
              {t('panFormatHelp', language)}
            </p>
          </div>

          {/* Validation Feedback Card */}
          {panNumber.length > 0 && (
            <div
              className={`p-3 rounded-lg border text-xs flex items-start gap-2.5 transition-all ${
                panValidation.valid
                  ? 'bg-[#E8F5E9] border-[#047857]/30 text-[#047857]'
                  : panNumber.length === 10
                  ? 'bg-[#FBECEC] border-[#C62828]/30 text-[#C62828]'
                  : 'bg-[#F1F5F9] border-[#CBD5E1] text-[#475569]'
              }`}
            >
              {panValidation.valid ? (
                <>
                  <ShieldCheck className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold">{t('panValidationSuccess', language)}</div>
                    <div className="text-[11px] opacity-90 mt-0.5">
                      Entity Category: <span className="font-semibold">{panValidation.entityType}</span>
                    </div>
                  </div>
                </>
              ) : panNumber.length === 10 ? (
                <>
                  <AlertCircle className="w-4 h-4 text-[#C62828] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold">{t('panValidationFailed', language)}</div>
                    <div className="text-[11px] opacity-90 mt-0.5">
                      Expected 5 letters, 4 digits, 1 letter. Example: <span className="font-mono font-bold">ABCPS1234K</span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-[11px] text-[#64748B]">
                  Entering PAN: {panNumber.length}/10 characters
                </div>
              )}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 py-2.5 px-4 rounded-lg border border-[#CBD5E1] text-[#475569] text-xs sm:text-sm font-semibold hover:bg-slate-50 transition cursor-pointer"
          >
            {t('regPrevStepBtn', language)}
          </button>
          <button
            type="button"
            disabled={!panValidation.valid}
            onClick={onNext}
            className="flex-1 py-2.5 px-4 rounded-lg bg-[#123B5D] hover:bg-[#1B4D78] text-white text-xs sm:text-sm font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed shadow-soft cursor-pointer"
          >
            {t('regNextStepBtn', language)}
          </button>
        </div>
      </div>
    );
  }

  // STEP 3: PAN Card Document Upload
  return (
    <div className="space-y-5 animate-fadeIn">
      <div className="space-y-1">
        <h2 className="text-lg font-bold text-[#123B5D] flex items-center gap-2">
          <UploadCloud className="w-5 h-5 text-[#123B5D]" />
          {t('panUploadTitle', language)}
        </h2>
        <p className="text-xs text-[#64748B]">
          {t('panUploadInstructions', language)}
        </p>
      </div>

      {fileError && (
        <div className="bg-[#FBECEC] border border-[#C62828]/30 rounded-lg p-3 text-xs text-[#C62828] font-medium flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{fileError}</span>
        </div>
      )}

      {/* Upload Zone or Preview */}
      {!panFile ? (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-xl p-6 text-center transition cursor-pointer ${
            dragActive
              ? 'border-[#123B5D] bg-[#F0F7FF]'
              : 'border-[#CBD5E1] bg-[#F8FAFC] hover:border-[#123B5D] hover:bg-slate-50'
          }`}
        >
          <input
            type="file"
            id="pan-upload"
            accept="image/jpeg,image/png,image/webp,application/pdf"
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
            className="hidden"
          />
          <label htmlFor="pan-upload" className="cursor-pointer block space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#123B5D]/10 text-[#123B5D] flex items-center justify-center mx-auto">
              <UploadCloud className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-[#123B5D]">
                {t('panUploadDropzone', language)}
              </p>
              <p className="text-[11px] text-[#64748B] mt-1">
                Supports JPG, PNG, WebP or PDF (Max 15MB)
              </p>
            </div>
            <span className="inline-block px-3 py-1.5 bg-[#123B5D] text-white text-xs font-semibold rounded-md shadow-sm">
              Browse Document
            </span>
          </label>
        </div>
      ) : (
        <div className="bg-[#F8FAFC] border border-[#DDE6EC] rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#047857]/10 text-[#047857] flex items-center justify-center">
                {panFile.type === 'application/pdf' ? (
                  <FileText className="w-5 h-5" />
                ) : (
                  <ImageIcon className="w-5 h-5" />
                )}
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-[#1E293B] truncate max-w-[200px] sm:max-w-xs">
                  {panFile.name}
                </p>
                <p className="text-[11px] text-[#64748B]">
                  {(panFile.size / (1024 * 1024)).toFixed(2)} MB • {panFile.type.split('/')[1]?.toUpperCase()}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setPanFile(null)}
              className="p-1.5 text-[#64748B] hover:text-[#C62828] hover:bg-red-50 rounded-md transition"
              title="Remove File"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Image Preview if image file */}
          {panFile.type.startsWith('image/') && (
            <div className="relative rounded-lg overflow-hidden border border-[#DDE6EC] max-h-48 bg-slate-100 flex items-center justify-center">
              <img
                src={URL.createObjectURL(panFile)}
                alt="PAN Card Preview"
                className="w-full h-auto max-h-48 object-contain"
              />
              <div className="absolute top-2 left-2 bg-[#047857] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                PAN Document Attached
              </div>
            </div>
          )}
        </div>
      )}

      {/* PAN Metadata Confirmation */}
      <div className="bg-[#F5FAFC] p-3 rounded-lg border border-[#DDE6EC] flex items-center justify-between text-xs">
        <span className="text-[#64748B]">Configured PAN Number:</span>
        <span className="font-mono font-bold text-[#123B5D] bg-white px-2 py-1 rounded border border-[#CBD5E1]">
          {panNumber}
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 py-2.5 px-4 rounded-lg border border-[#CBD5E1] text-[#475569] text-xs sm:text-sm font-semibold hover:bg-slate-50 transition cursor-pointer"
        >
          {t('regPrevStepBtn', language)}
        </button>
        <button
          type="button"
          disabled={!panFile}
          onClick={onNext}
          className="flex-1 py-2.5 px-4 rounded-lg bg-[#123B5D] hover:bg-[#1B4D78] text-white text-xs sm:text-sm font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed shadow-soft cursor-pointer"
        >
          {t('regNextStepBtn', language)}
        </button>
      </div>
    </div>
  );
};
