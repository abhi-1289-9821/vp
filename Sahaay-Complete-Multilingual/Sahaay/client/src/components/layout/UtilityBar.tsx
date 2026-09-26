import React, { useState, useRef, useEffect } from 'react';
import { Globe, Phone, HelpCircle, ChevronDown, Check, Search } from 'lucide-react';
import { useAuthStore } from '../../store/authStore.js';
import { LANGUAGES, LanguageCode, t } from '../../lib/i18n.js';
import { Link } from 'react-router-dom';

export const UtilityBar: React.FC = () => {
  const { language, setLanguage, fontSize, setFontSize, user } = useAuthStore();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleFontSizeChange = (size: 'normal' | 'large' | 'larger') => {
    setFontSize(size);
    document.body.classList.remove('font-scale-sm', 'font-scale-base', 'font-scale-lg');
    if (size === 'normal') document.body.classList.add('font-scale-base');
    else if (size === 'large') document.body.classList.add('font-scale-lg');
    else if (size === 'larger') document.body.classList.add('font-scale-lg');
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLangInfo = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  const filteredLanguages = LANGUAGES.filter(
    (l) =>
      l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.nativeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.displayLabel.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-[#123B5D] text-white text-xs border-b border-[#1B4D78] select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex flex-wrap items-center justify-between gap-2">
        {/* Left: Administrative Label */}
        <div className="flex items-center space-x-2 text-[11px] sm:text-xs">
          <span className="font-bold text-[#E8B84A]">
            {language === 'en' ? 'SAHAAY' : `${currentLangInfo.nativeName} • SAHAAY`}
          </span>
          <span className="text-slate-400">|</span>
          <span className="text-slate-200 font-medium">
            {language === 'en' ? 'Citizen Assistance Portal' : t('citizenPortal', language)}
          </span>
          <span className="hidden md:inline text-slate-400">•</span>
          <span className="hidden md:inline text-slate-300">
            {language === 'en'
              ? 'Land Acquisition & Compensation Companion'
              : t('heroSub', language)}
          </span>
        </div>

        {/* Right: Accessibility Controls & Utilities */}
        <div className="flex items-center space-x-3 text-[11px] sm:text-xs">
          {/* Font Sizer Controls */}
          <div className="flex items-center space-x-1 border-r border-[#1B4D78] pr-3">
            <span className="text-slate-300 hidden sm:inline text-[10px] uppercase font-semibold mr-1">
              Text:
            </span>
            <button
              onClick={() => handleFontSizeChange('normal')}
              className={`px-1.5 py-0.5 rounded text-[11px] font-bold transition cursor-pointer ${
                fontSize === 'normal'
                  ? 'bg-[#1B4D78] text-[#E8B84A]'
                  : 'text-slate-300 hover:text-white'
              }`}
              title="Standard Font Size"
            >
              A-
            </button>
            <button
              onClick={() => handleFontSizeChange('large')}
              className={`px-1.5 py-0.5 rounded text-[11px] font-bold transition cursor-pointer ${
                fontSize === 'large'
                  ? 'bg-[#1B4D78] text-[#E8B84A]'
                  : 'text-slate-300 hover:text-white'
              }`}
              title="Medium Font Size"
            >
              A
            </button>
            <button
              onClick={() => handleFontSizeChange('larger')}
              className={`px-1.5 py-0.5 rounded text-[11px] font-bold transition cursor-pointer ${
                fontSize === 'larger'
                  ? 'bg-[#1B4D78] text-[#E8B84A]'
                  : 'text-slate-300 hover:text-white'
              }`}
              title="Large Font Size"
            >
              A+
            </button>
          </div>

          {/* 23 Languages Dropdown Switcher */}
          <div className="relative border-r border-[#1B4D78] pr-3" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center space-x-1.5 text-slate-200 hover:text-[#E8B84A] font-semibold transition cursor-pointer bg-[#1B4D78]/50 hover:bg-[#1B4D78] px-2 py-0.5 rounded-md"
              title="Select Language (23 Official Languages Supported)"
            >
              <Globe className="w-3.5 h-3.5 text-[#E8B84A]" />
              <span className="max-w-[130px] truncate">{currentLangInfo.displayLabel}</span>
              <ChevronDown className="w-3 h-3 text-slate-300" />
            </button>

            {/* Language Selection Modal / Dropdown */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-1.5 w-72 sm:w-80 bg-white text-[#243746] rounded-xl shadow-2xl border border-[#DDE6EC] z-50 overflow-hidden animate-in fade-in duration-150">
                <div className="p-2.5 bg-[#123B5D] text-white flex items-center justify-between border-b border-[#1B4D78]">
                  <div className="flex items-center space-x-2">
                    <Globe className="w-4 h-4 text-[#E8B84A]" />
                    <span className="font-bold text-xs">Select Language / भाषा चुनें</span>
                  </div>
                  <span className="text-[10px] bg-[#E8B84A] text-[#123B5D] px-1.5 py-0.5 rounded-full font-bold">
                    23 Languages
                  </span>
                </div>

                {/* Filter Search Input */}
                <div className="p-2 border-b border-[#DDE6EC] bg-[#F8FAFC]">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 absolute left-2.5 top-2 text-[#667784]" />
                    <input
                      type="text"
                      placeholder="Search language / भाषा खोजें..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-8 pr-3 py-1 text-xs rounded-md border border-[#DDE6EC] focus:outline-none focus:border-[#123B5D] bg-white text-[#243746]"
                      autoFocus
                    />
                  </div>
                </div>

                {/* Language Options List */}
                <div className="max-h-64 overflow-y-auto divide-y divide-[#DDE6EC]/50">
                  {filteredLanguages.map((l, index) => {
                    const isSelected = l.code === language;
                    return (
                      <button
                        key={l.code}
                        onClick={() => {
                          setLanguage(l.code);
                          setDropdownOpen(false);
                          setSearchTerm('');
                        }}
                        className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-[#EAF3F8] transition cursor-pointer ${
                          isSelected ? 'bg-[#EAF3F8] text-[#123B5D] font-bold' : 'text-[#243746]'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <span className="text-[10px] font-mono text-[#667784] w-4">
                            {index + 1}.
                          </span>
                          <span className="font-medium text-[#123B5D]">{l.name}</span>
                          <span className="text-slate-400">•</span>
                          <span className="font-bold text-slate-700">{l.nativeName}</span>
                        </div>
                        {isSelected && <Check className="w-4 h-4 text-[#2E7D5B] shrink-0" />}
                      </button>
                    );
                  })}
                  {filteredLanguages.length === 0 && (
                    <div className="p-4 text-center text-xs text-[#667784]">
                      No languages match "{searchTerm}"
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Quick Help */}
          <Link
            to="/grievance"
            className="hidden sm:flex items-center space-x-1 text-slate-200 hover:text-white transition border-r border-[#1B4D78] pr-3"
          >
            <HelpCircle className="w-3.5 h-3.5 text-slate-300" />
            <span>{t('helpdesk', language)}</span>
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
