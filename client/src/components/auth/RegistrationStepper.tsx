import React from 'react';
import { Check, User, CreditCard, UploadCloud, Camera, ScanFace, CheckCircle2 } from 'lucide-react';
import { t } from '../../lib/i18n.js';
import { LanguageCode } from '../../locales/types.js';

interface RegistrationStepperProps {
  currentStep: number;
  language: LanguageCode;
  onStepClick?: (step: number) => void;
}

export const RegistrationStepper: React.FC<RegistrationStepperProps> = ({
  currentStep,
  language,
}) => {
  const steps = [
    { number: 1, label: t('regStep1Title', language), icon: User },
    { number: 2, label: t('regStep2Title', language), icon: CreditCard },
    { number: 3, label: t('regStep3Title', language), icon: UploadCloud },
    { number: 4, label: t('regStep4Title', language), icon: Camera },
    { number: 5, label: t('regStep5Title', language), icon: ScanFace },
    { number: 6, label: t('regStep6Title', language), icon: CheckCircle2 },
  ];

  return (
    <div className="w-full mb-6">
      {/* Step Indicators */}
      <div className="flex items-center justify-between relative">
        {/* Connecting Background Line */}
        <div className="absolute top-1/2 left-4 right-4 -translate-y-1/2 h-1 bg-[#E2E8F0] -z-0">
          <div
            className="h-full bg-gradient-to-r from-[#123B5D] to-[#047857] transition-all duration-500 ease-out"
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          />
        </div>

        {steps.map((s) => {
          const Icon = s.icon;
          const isCompleted = currentStep > s.number;
          const isCurrent = currentStep === s.number;

          return (
            <div key={s.number} className="relative z-10 flex flex-col items-center group">
              <div
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 shadow-sm ${
                  isCompleted
                    ? 'bg-[#047857] text-white ring-4 ring-[#047857]/15'
                    : isCurrent
                    ? 'bg-[#123B5D] text-white ring-4 ring-[#123B5D]/20 scale-105'
                    : 'bg-white border-2 border-[#CBD5E1] text-[#64748B]'
                }`}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4 stroke-[3]" />
                ) : (
                  <Icon className="w-4 h-4" />
                )}
              </div>
              <span
                className={`hidden sm:block text-[11px] font-semibold mt-1.5 whitespace-nowrap transition-colors ${
                  isCurrent
                    ? 'text-[#123B5D] font-bold'
                    : isCompleted
                    ? 'text-[#047857]'
                    : 'text-[#64748B]'
                }`}
              >
                {s.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Progress Info Header */}
      <div className="mt-3 sm:hidden text-center">
        <span className="text-xs font-bold text-[#123B5D]">
          {steps[currentStep - 1]?.label}
        </span>
        <span className="text-[11px] text-[#64748B] ml-2">
          (Step {currentStep} of 6)
        </span>
      </div>
    </div>
  );
};
