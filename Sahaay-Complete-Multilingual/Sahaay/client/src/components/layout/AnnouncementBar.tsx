import React from 'react';
import { Volume2 } from 'lucide-react';
import { useAuthStore } from '../../store/authStore.js';
import { t } from '../../lib/i18n.js';

export const AnnouncementBar: React.FC = () => {
  const { language } = useAuthStore();

  return (
    <div className="bg-[#F5FAFC] border-b border-[#DDE6EC] text-xs overflow-hidden flex items-stretch h-8">
      {/* Ticker Badge */}
      <div className="bg-[#E8B84A] text-[#123B5D] font-extrabold px-3 py-1 flex items-center space-x-1.5 shrink-0 z-10 shadow-soft uppercase tracking-wider text-[11px]">
        <Volume2 className="w-3.5 h-3.5 text-[#123B5D]" />
        <span>{t('noticeLabel', language)}</span>
      </div>

      {/* Scrolling / Content Area */}
      <div className="flex-1 overflow-hidden relative flex items-center px-2">
        <div className="animate-ticker text-[#243746] font-medium text-xs flex items-center space-x-8">
          <span className="flex items-center space-x-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E8B84A]"></span>
            <span>{t('tickerAdvisory', language)}</span>
          </span>

          <span className="text-slate-300">•</span>

          <span className="flex items-center space-x-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2E7D5B]"></span>
            <span>{t('tickerDocIntel', language)}</span>
          </span>

          <span className="text-slate-300">•</span>

          <span className="flex items-center space-x-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#123B5D]"></span>
            <span>{t('tickerObjections', language)}</span>
          </span>

          <span className="text-slate-300">•</span>

          <span className="flex items-center space-x-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E8B84A]"></span>
            <span>{t('tickerDbt', language)}</span>
          </span>
        </div>
      </div>
    </div>
  );
};
