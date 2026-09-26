import React from 'react';
import { clsx } from 'clsx';
import { useAuthStore } from '../../store/authStore.js';
import { t } from '../../lib/i18n.js';

interface StatusBadgeProps {
  status: string;
  className?: string;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className, size = 'sm' }) => {
  const { language } = useAuthStore();
  const normalized = (status || '').toUpperCase().replace(/\s+/g, '_');

  let bg = 'bg-[#F1F5F9] text-[#667784] border-[#DDE6EC]';

  if (['ACTIVE', 'COMPLETED', 'VERIFIED', 'PAID', 'SANCTIONED', 'RESOLVED', 'ELIGIBLE'].includes(normalized)) {
    bg = 'bg-[#E8F4EC] text-[#2E7D5B] border-[#C3E6D5]';
  } else if (['VERIFICATION', 'IN_PROGRESS', 'UNDER_REVIEW', 'CURRENT', 'PROCESSING', 'ASSESSED', 'APPROVED'].includes(normalized)) {
    bg = 'bg-[#EAF3F8] text-[#123B5D] border-[#C2DBEC]';
  } else if (['ACTION_REQUIRED', 'DISCREPANCY_FOUND', 'DISPUTED', 'REJECTED', 'HIGH'].includes(normalized)) {
    bg = 'bg-[#FFF9F0] text-[#C7972D] border-[#F4DCAC]';
  } else if (['SUBMITTED', 'PENDING', 'UNPAID', 'UPCOMING', 'PROPOSAL', 'NOTIFICATION'].includes(normalized)) {
    bg = 'bg-[#F5FAFC] text-[#123B5D] border-[#DDE6EC]';
  }

  const translationKey = `status_${normalized}` as any;
  const translatedText = t(translationKey, language);
  const displayText = translatedText && translatedText !== translationKey
    ? translatedText
    : status.replace(/_/g, ' ').toUpperCase();

  return (
    <span
      className={clsx(
        'inline-flex items-center font-bold tracking-wide rounded-md border text-[11px] leading-tight select-none',
        size === 'sm' ? 'px-2 py-0.5' : 'px-2.5 py-1 text-xs',
        bg,
        className
      )}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 opacity-80"></span>
      {displayText}
    </span>
  );
};
