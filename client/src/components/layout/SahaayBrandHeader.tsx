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
  LogIn,
  UserPlus,
  Landmark,
} from 'lucide-react';
import { t } from '../../lib/i18n.js';

export const SahaayBrandHeader: React.FC = () => {
  const { user, logout, language } = useAuthStore();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <div className="bg-white border-b border-[#E5E0D8] py-3.5 sm:py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Left: Institutional Sahaay Emblem & Typography */}
        <Link to="/" className="flex items-center space-x-3.5 group">
          {/* Sahaay Institutional Emblem */}
          <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-[#D97706]/50 shadow-md shrink-0 bg-[#FDFBF7] flex items-center justify-center group-hover:border-[#D97706] transition-all">
            <img
              src="/images/sahaay_logo.png"
              alt="SAHAAY Official Emblem"
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform"
            />
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-black tracking-tight text-[#2D1810]">
                {t('appName', language)}
              </span>
              <span className="text-[11px] font-bold px-2.5 py-0.5 bg-[#ECFDF5] text-[#047857] border border-[#047857]/30 rounded-md">
                {user?.role === 'OFFICER' ? t('officerPortal', language) : t('citizenPortal', language)}
              </span>
            </div>
            <p className="text-xs font-semibold text-[#2D1810] tracking-tight">
              {t('tagline', language)}
            </p>
            <p className="text-[11px] text-[#6B5E57] font-normal hidden sm:block">
              {t('portalSubtitle', language)}
            </p>
          </div>
        </Link>

        {/* Right: Public Administration Quick Service Actions & Prominent Sign In */}
        <div className="flex items-center space-x-2.5 sm:space-x-3 self-end md:self-auto">
          {/* Find My Land Primary Header Button */}
          <Link
            to="/find-land"
            className="flex items-center space-x-1.5 px-3.5 py-2 bg-[#FDFBF7] hover:bg-[#F4F0E8] text-[#2D1810] border border-[#E5E0D8] text-xs font-bold rounded-lg shadow-sm transition cursor-pointer"
          >
            <FileSearch className="w-4 h-4 text-[#047857]" />
            <span>{t('findMyLand', language)}</span>
          </Link>

          {/* Quick Notice OCR Button */}
          <Link
            to="/documents/analyze"
            className="hidden sm:flex items-center space-x-1.5 px-3.5 py-2 bg-[#FFFBEB] hover:bg-[#FEF3C7] text-[#2D1810] text-xs font-bold rounded-lg border border-[#D97706]/40 transition cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
            <span>{t('understandDocument', language)}</span>
          </Link>

          {/* User Account / Profile Menu OR Prominent Sign In Button */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 p-1.5 pl-2.5 rounded-lg bg-[#FDFBF7] border border-[#E5E0D8] hover:bg-[#F4F0E8] transition text-left cursor-pointer"
              >
                <div className="w-7 h-7 rounded-full bg-[#047857] text-white flex items-center justify-center text-xs font-bold">
                  {user.name.charAt(0)}
                </div>
                <div className="hidden lg:block text-left pr-1">
                  <div className="text-xs font-bold text-[#2D1810] leading-tight truncate max-w-[120px]">
                    {user.name}
                  </div>
                  <div className="text-[10px] text-[#6B5E57] font-medium">
                    {user.role === 'OFFICER' ? t('landOfficer', language) : t('landowner', language)}
                  </div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-[#6B5E57]" />
              </button>

              {/* Secure User Profile Dropdown Menu */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-white border border-[#E5E0D8] rounded-xl shadow-lg py-2 z-50 animate-in fade-in duration-150">
                  {/* Account Header */}
                  <div className="px-3.5 py-2 border-b border-[#E5E0D8] bg-[#FDFBF7]">
                    <div className="text-xs font-bold text-[#2D1810]">{user.name}</div>
                    <div className="text-[11px] text-[#6B5E57] truncate">{user.email}</div>
                    <div className="mt-1 flex items-center gap-1.5 flex-wrap">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-[#ECFDF5] text-[#047857] border border-[#047857]/20">
                        {user.role === 'OFFICER' ? t('landOfficer', language) : t('landowner', language)}
                      </span>
                      {user.profile?.panStatus === 'VERIFIED' && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-[#E8F5E9] text-[#047857] border border-[#047857]/30">
                          ✓ Verified
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Navigation Links */}
                  <div className="p-1 border-b border-[#E5E0D8] space-y-0.5">
                    {user.role === 'OFFICER' ? (
                      <Link
                        to="/officer"
                        onClick={() => setShowUserMenu(false)}
                        className="w-full text-left px-3 py-1.5 text-xs text-[#2D1810] hover:bg-[#FDFBF7] rounded-lg flex items-center space-x-2 font-medium"
                      >
                        <Building className="w-3.5 h-3.5 text-[#047857]" />
                        <span>{t('navOfficerDashboard', language)}</span>
                      </Link>
                    ) : (
                      <Link
                        to="/"
                        onClick={() => setShowUserMenu(false)}
                        className="w-full text-left px-3 py-1.5 text-xs text-[#2D1810] hover:bg-[#FDFBF7] rounded-lg flex items-center space-x-2 font-medium"
                      >
                        <User className="w-3.5 h-3.5 text-[#047857]" />
                        <span>{t('navHome', language)}</span>
                      </Link>
                    )}

                    <Link
                      to="/find-land"
                      onClick={() => setShowUserMenu(false)}
                      className="w-full text-left px-3 py-1.5 text-xs text-[#2D1810] hover:bg-[#FDFBF7] rounded-lg flex items-center space-x-2 font-medium"
                    >
                      <FileSearch className="w-3.5 h-3.5 text-[#D97706]" />
                      <span>{t('findMyLand', language)}</span>
                    </Link>
                  </div>

                  {/* Sign Out */}
                  <div className="p-1">
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        logout();
                        navigate('/login');
                      }}
                      className="w-full text-left px-3 py-1.5 text-xs text-[#B91C1C] hover:bg-[#FEF2F2] rounded-lg flex items-center space-x-2 font-semibold cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>{t('signOut', language)}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              {/* Prominent Register Button */}
              <Link
                to="/login?tab=register"
                className="px-3.5 py-2 rounded-lg bg-white hover:bg-[#FDFBF7] text-[#2D1810] border border-[#E5E0D8] text-xs font-bold shadow-sm transition hidden sm:flex items-center space-x-1.5 cursor-pointer"
              >
                <UserPlus className="w-3.5 h-3.5 text-[#047857]" />
                <span>{t('tabRegister', language)}</span>
              </Link>

              {/* Prominent Sign In Button */}
              <Link
                to="/login"
                className="px-4 py-2 rounded-lg bg-[#047857] hover:bg-[#065F46] active:bg-[#034d38] text-white text-xs font-bold shadow-sm cursor-pointer transition flex items-center space-x-1.5"
              >
                <LogIn className="w-3.5 h-3.5 text-[#D97706]" />
                <span>{t('signIn', language)}</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
