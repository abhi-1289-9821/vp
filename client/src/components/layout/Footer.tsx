import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';
import { useAuthStore } from '../../store/authStore.js';
import { t } from '../../lib/i18n.js';

export const Footer: React.FC = () => {
  const { language } = useAuthStore();

  return (
    <footer className="bg-[#123B5D] text-slate-300 text-xs border-t-2 border-[#E8B84A] mt-16">
      {/* Top Footer Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Col 1: Institutional Identity */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-[#E8B84A] bg-[#FDFBF7] flex items-center justify-center shrink-0">
              <img
                src="/images/sahaay_logo.png"
                alt="SAHAAY Emblem"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="text-lg font-black text-white tracking-tight">
                {t('appName', language)}
              </span>
              <p className="text-[10px] text-slate-300 leading-tight">
                {t('citizenPortal', language)}
              </p>
            </div>
          </div>

          <p className="text-slate-300 text-xs leading-relaxed">
            {t('footerTagline', language)}
            <br />
            {t('footerDescription', language)}
          </p>

          <div className="pt-1 text-[11px] text-[#E8B84A] font-semibold">
            {t('footerHelplineLabel', language)}
          </div>
        </div>

        {/* Col 2: Citizen Services */}
        <div className="space-y-2.5">
          <h4 className="text-white font-bold text-xs uppercase tracking-wider border-b border-[#1B4D78] pb-1.5">
            {t('footerServicesTitle', language)}
          </h4>
          <ul className="space-y-1.5 text-xs text-slate-300">
            <li>
              <Link to="/find-land" className="hover:text-[#E8B84A] transition flex items-center gap-1">
                <span>• {t('footerServiceFindLand', language)}</span>
              </Link>
            </li>
            <li>
              <Link to="/documents/analyze" className="hover:text-[#E8B84A] transition flex items-center gap-1">
                <span>• {t('footerServiceDocIntel', language)}</span>
              </Link>
            </li>
            <li>
              <Link to="/map" className="hover:text-[#E8B84A] transition flex items-center gap-1">
                <span>• {t('footerServiceGis', language)}</span>
              </Link>
            </li>
            <li>
              <Link to="/compensation" className="hover:text-[#E8B84A] transition flex items-center gap-1">
                <span>• {t('footerServiceComp', language)}</span>
              </Link>
            </li>
            <li>
              <Link to="/actions" className="hover:text-[#E8B84A] transition flex items-center gap-1">
                <span>• {t('footerServiceActions', language)}</span>
              </Link>
            </li>
            <li>
              <Link to="/grievance" className="hover:text-[#E8B84A] transition flex items-center gap-1">
                <span>• {t('footerServiceGrievances', language)}</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 3: Statutory Framework */}
        <div className="space-y-2.5">
          <h4 className="text-white font-bold text-xs uppercase tracking-wider border-b border-[#1B4D78] pb-1.5">
            {t('footerStatutoryTitle', language)}
          </h4>
          <ul className="space-y-1.5 text-xs text-slate-300">
            <li>
              <span className="text-slate-200 font-semibold">• {t('footerStatutoryAct', language)}</span>
            </li>
            <li>
              <span className="text-slate-200">• {t('footerStatutorySec11', language)}</span>
            </li>
            <li>
              <span className="text-slate-200">• {t('footerStatutorySec15', language)}</span>
            </li>
            <li>
              <span className="text-slate-200">• {t('footerStatutorySec19', language)}</span>
            </li>
            <li>
              <span className="text-slate-200">• {t('footerStatutorySec23', language)}</span>
            </li>
            <li>
              <span className="text-slate-200">• {t('footerStatutoryPfms', language)}</span>
            </li>
          </ul>
        </div>

        {/* Col 4: Public Administration Support */}
        <div className="space-y-2.5">
          <h4 className="text-white font-bold text-xs uppercase tracking-wider border-b border-[#1B4D78] pb-1.5">
            {t('footerAssistanceTitle', language)}
          </h4>
          <div className="space-y-2 text-xs text-slate-300">
            <div className="flex items-start space-x-2">
              <MapPin className="w-4 h-4 text-[#E8B84A] shrink-0 mt-0.5" />
              <span>{t('footerAddress', language)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-[#E8B84A] shrink-0" />
              <span>{t('footerTollFree', language)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4 text-[#E8B84A] shrink-0" />
              <span>{t('footerEmail', language)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Compliance & Disclaimer Bar */}
      <div className="bg-[#0C2840] border-t border-[#1B4D78] py-3 text-center text-[11px] text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            {t('footerCopyright', language)}
          </span>
          <span className="text-[#E8B84A] font-medium">
            {t('footerDemoDisclaimer', language)}
          </span>
        </div>
      </div>
    </footer>
  );
};
