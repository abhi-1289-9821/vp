import React from 'react';
import { Globe, Phone, HelpCircle, ShieldCheck } from 'lucide-react';
import { useAuthStore } from '../../store/authStore.js';
import { Link } from 'react-router-dom';

export const UtilityBar: React.FC = () => {
  const { language, setLanguage, fontSize, setFontSize, user } = useAuthStore();

  const handleFontSizeChange = (size: 'normal' | 'large' | 'larger') => {
    setFontSize(size);
    document.body.classList.remove('font-scale-sm', 'font-scale-base', 'font-scale-lg');
    if (size === 'normal') document.body.classList.add('font-scale-base');
    else if (size === 'large') document.body.classList.add('font-scale-lg');
    else if (size === 'larger') document.body.classList.add('font-scale-lg');
  };

  return (
    <div className="bg-[#123B5D] text-white text-xs border-b border-[#1B4D78] select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex flex-wrap items-center justify-between gap-2">
        {/* Left: Administrative Label */}
        <div className="flex items-center space-x-2 text-[11px] sm:text-xs">
          <span className="font-bold text-[#E8B84A]">सहाय • SAHAAY</span>
          <span className="text-slate-400">|</span>
          <span className="text-slate-200 font-medium">Citizen Assistance Portal</span>
          <span className="hidden md:inline text-slate-400">•</span>
          <span className="hidden md:inline text-slate-300">Land Acquisition & Compensation Companion</span>
        </div>

        {/* Right: Accessibility Controls & Utilities */}
        <div className="flex items-center space-x-3 text-[11px] sm:text-xs">
          {/* Font Sizer Controls */}
          <div className="flex items-center space-x-1 border-r border-[#1B4D78] pr-3">
            <span className="text-slate-300 hidden sm:inline text-[10px] uppercase font-semibold mr-1">Text:</span>
            <button
              onClick={() => handleFontSizeChange('normal')}
              className={`px-1.5 py-0.5 rounded text-[11px] font-bold transition cursor-pointer ${
                fontSize === 'normal' ? 'bg-[#1B4D78] text-[#E8B84A]' : 'text-slate-300 hover:text-white'
              }`}
              title="Standard Font Size"
            >
              A-
            </button>
            <button
              onClick={() => handleFontSizeChange('large')}
              className={`px-1.5 py-0.5 rounded text-[11px] font-bold transition cursor-pointer ${
                fontSize === 'large' ? 'bg-[#1B4D78] text-[#E8B84A]' : 'text-slate-300 hover:text-white'
              }`}
              title="Medium Font Size"
            >
              A
            </button>
            <button
              onClick={() => handleFontSizeChange('larger')}
              className={`px-1.5 py-0.5 rounded text-[11px] font-bold transition cursor-pointer ${
                fontSize === 'larger' ? 'bg-[#1B4D78] text-[#E8B84A]' : 'text-slate-300 hover:text-white'
              }`}
              title="Large Font Size"
            >
              A+
            </button>
          </div>

          {/* Language Switcher */}
          <button
            onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
            className="flex items-center space-x-1 text-slate-200 hover:text-[#E8B84A] font-semibold transition border-r border-[#1B4D78] pr-3 cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5 text-[#E8B84A]" />
            <span>{language === 'en' ? 'हिन्दी' : 'English'}</span>
          </button>

          {/* Quick Help */}
          <Link
            to="/grievance"
            className="hidden sm:flex items-center space-x-1 text-slate-200 hover:text-white transition border-r border-[#1B4D78] pr-3"
          >
            <HelpCircle className="w-3.5 h-3.5 text-slate-300" />
            <span>Helpdesk</span>
          </Link>

          {/* Citizen Helpline */}
          <a
            href="tel:18001805263"
            className="hidden sm:flex items-center space-x-1 text-slate-200 hover:text-[#E8B84A] transition"
          >
            <Phone className="w-3.5 h-3.5 text-[#E8B84A]" />
            <span>1800-180-LAND</span>
          </a>

          {user && (
            <span className="bg-[#1B4D78] text-[#E8B84A] text-[10px] font-bold px-2 py-0.5 rounded uppercase">
              {user.role}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
