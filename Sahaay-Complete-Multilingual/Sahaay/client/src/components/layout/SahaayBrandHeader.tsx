import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore.js';
import {
  FileSearch,
  ShieldAlert,
  User,
  LogOut,
  ChevronDown,
  Sparkles,
  UserCheck,
  Building,
} from 'lucide-react';
import { t } from '../../lib/i18n.js';

export const SahaayBrandHeader: React.FC = () => {
  const { user, logout, language, setAuth } = useAuthStore();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const switchDemoRole = async (role: 'CITIZEN' | 'OFFICER') => {
    const email = role === 'CITIZEN' ? 'citizen@sahaay.demo' : 'officer@sahaay.demo';
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: 'password123' }),
      });
      const data = await res.json();
      if (data.success) {
        setAuth(data.data.token, data.data.user);
        setShowUserMenu(false);
        if (role === 'OFFICER') {
          navigate('/officer');
        } else {
          navigate('/');
        }
      }
    } catch (err) {
      console.error('Failed to switch role', err);
    }
  };

  return (
    <div className="bg-white border-b border-[#DDE6EC] py-3.5 sm:py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Left: Institutional Sahaay Emblem & Typography */}
        <Link to="/" className="flex items-center space-x-3.5 group">
          {/* Sahaay Institutional Emblem */}
          <div className="w-11 h-11 rounded-xl bg-[#123B5D] border-2 border-[#E8B84A] text-white flex flex-col items-center justify-center shadow-soft shrink-0">
            <span className="font-extrabold text-xl leading-none text-[#E8B84A] font-serif">
              {t('emblemLetter', language)}
            </span>
            <span className="text-[8px] font-bold tracking-widest text-slate-200 mt-0.5 uppercase">
              {language === 'en' ? 'GOV' : t('appName', language).split(' ')[0]}
            </span>
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-black tracking-tight text-[#123B5D]">
                {t('appName', language)}
              </span>
              <span className="text-[11px] font-semibold px-2 py-0.5 bg-[#EAF3F8] text-[#123B5D] border border-[#DDE6EC] rounded-md">
                {user?.role === 'OFFICER' ? t('officerPortal', language) : t('citizenPortal', language)}
              </span>
            </div>
            <p className="text-xs font-semibold text-[#123B5D] tracking-tight">
              {t('tagline', language)}
            </p>
            <p className="text-[11px] text-[#667784] font-normal hidden sm:block">
              {t('portalSubtitle', language)}
            </p>
          </div>
        </Link>

        {/* Right: Public Administration Quick Service Actions */}
        <div className="flex items-center space-x-2.5 sm:space-x-3 self-end md:self-auto">
          {/* Find My Land Primary Header Button */}
          <Link
            to="/find-land"
            className="flex items-center space-x-1.5 px-3.5 py-2 bg-[#123B5D] hover:bg-[#1B4D78] text-white text-xs font-semibold rounded-lg shadow-soft transition cursor-pointer"
          >
            <FileSearch className="w-4 h-4 text-[#E8B84A]" />
            <span>{t('findMyLand', language)}</span>
          </Link>

          {/* Quick Notice OCR Button */}
          <Link
            to="/documents/analyze"
            className="hidden sm:flex items-center space-x-1.5 px-3.5 py-2 bg-[#FFF9F0] hover:bg-[#FFF3E0] text-[#123B5D] text-xs font-semibold rounded-lg border border-[#E8B84A] transition cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C7972D]" />
            <span>{t('understandDocument', language)}</span>
          </Link>

          {/* User Account / Demo Switcher Menu */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 p-1.5 pl-2.5 rounded-lg bg-[#F8FAFC] border border-[#DDE6EC] hover:bg-slate-100 transition text-left cursor-pointer"
              >
                <div className="w-7 h-7 rounded-full bg-[#123B5D] text-white flex items-center justify-center text-xs font-bold">
                  {user.name.charAt(0)}
                </div>
                <div className="hidden lg:block text-left pr-1">
                  <div className="text-xs font-bold text-[#123B5D] leading-tight truncate max-w-[120px]">
                    {user.name}
                  </div>
                  <div className="text-[10px] text-[#667784] font-medium">
                    {user.role === 'OFFICER' ? t('landOfficer', language) : t('landowner', language)}
                  </div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-[#667784]" />
              </button>

              {/* Dropdown Menu */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-white border border-[#DDE6EC] rounded-xl shadow-soft-lg py-2 z-50 animate-in fade-in duration-150">
                  <div className="px-3.5 py-2 border-b border-[#DDE6EC] bg-[#F8FAFC]">
                    <div className="text-xs font-bold text-[#123B5D]">{user.name}</div>
                    <div className="text-[11px] text-[#667784] truncate">{user.email}</div>
                    <div className="mt-1 inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-[#EAF3F8] text-[#123B5D]">
                      Role: {user.role}
                    </div>
                  </div>

                  {/* 1-Click Persona Switcher */}
                  <div className="p-2 border-b border-[#DDE6EC] space-y-1">
                    <span className="text-[10px] uppercase tracking-wider font-bold text-[#667784] px-2 block">
                      {t('switchRole', language)}
                    </span>
                    <button
                      onClick={() => switchDemoRole('CITIZEN')}
                      className={`w-full text-left px-2.5 py-1.5 text-xs rounded-lg flex items-center justify-between cursor-pointer transition ${
                        user.role === 'CITIZEN'
                          ? 'bg-[#EAF3F8] text-[#123B5D] font-bold'
                          : 'text-[#243746] hover:bg-slate-50 font-medium'
                      }`}
                    >
                      <span>🌾 {t('switchCitizen', language)}</span>
                      {user.role === 'CITIZEN' && <span className="text-[10px] text-[#123B5D]">Active</span>}
                    </button>
                    <button
                      onClick={() => switchDemoRole('OFFICER')}
                      className={`w-full text-left px-2.5 py-1.5 text-xs rounded-lg flex items-center justify-between cursor-pointer transition ${
                        user.role === 'OFFICER'
                          ? 'bg-[#EAF3F8] text-[#123B5D] font-bold'
                          : 'text-[#243746] hover:bg-slate-50 font-medium'
                      }`}
                    >
                      <span>🏛️ {t('switchOfficer', language)}</span>
                      {user.role === 'OFFICER' && <span className="text-[10px] text-[#123B5D]">Active</span>}
                    </button>
                  </div>

                  <div className="p-1">
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        logout();
                        navigate('/login');
                      }}
                      className="w-full text-left px-3 py-1.5 text-xs text-[#C62828] hover:bg-[#FBECEC] rounded-lg flex items-center space-x-2 font-semibold cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>{t('signOut', language)}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="px-3.5 py-2 rounded-lg bg-[#123B5D] hover:bg-[#1B4D78] text-white text-xs font-semibold shadow-soft cursor-pointer transition"
            >
              {t('signIn', language)}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
