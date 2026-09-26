import React, { useState } from 'react';
import { Bell, Globe, User, LogOut, ChevronDown, ShieldCheck, MapPin, Sparkles, Briefcase, FileSearch } from 'lucide-react';
import { useAuthStore } from '../../store/authStore.js';
import { useNavigate, Link } from 'react-router-dom';
import { t } from '../../lib/i18n.js';

interface HeaderProps {
  unreadCount?: number;
}

export const Header: React.FC<HeaderProps> = ({ unreadCount = 0 }) => {
  const { user, logout, language, setLanguage, setAuth } = useAuthStore();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

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
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      {/* Indian National Tricolor Ribbon */}
      <div className="tricolor-bar"></div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Tagline */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white flex items-center justify-center shadow-md shadow-blue-900/20 group-hover:scale-105 transition">
              <span className="font-extrabold text-xl tracking-tight">स</span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-black tracking-tight text-blue-950 font-sans">
                  SAHAAY
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 hidden sm:inline-block">
                  {user?.role === 'OFFICER' ? 'Officer Portal' : 'Citizen Companion'}
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-500 tracking-tight hidden sm:block">
                {t('tagline', language)}
              </p>
            </div>
          </Link>

          {/* Right Navigation & Tools */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Quick Find Land CTA on header */}
            <Link
              to="/find-land"
              className="hidden md:flex items-center space-x-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-blue-50 text-blue-800 hover:bg-blue-100 transition border border-blue-200"
            >
              <FileSearch className="w-3.5 h-3.5 text-blue-700" />
              <span>{t('findMyLand', language)}</span>
            </Link>

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 px-2.5 py-1.5 text-xs font-bold rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800 transition"
              title="Toggle Language / भाषा बदलें"
            >
              <Globe className="w-3.5 h-3.5 text-slate-600" />
              <span>{language === 'en' ? 'हिन्दी' : 'English'}</span>
            </button>

            {/* Notification Bell */}
            <Link
              to="/notifications"
              className="relative p-2 rounded-xl text-slate-600 hover:text-blue-900 hover:bg-blue-50 transition"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-orange-600 text-white font-bold text-[10px] rounded-full flex items-center justify-center animate-pulse">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </Link>

            {/* User Profile Menu */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 p-1.5 pl-2 rounded-xl border border-slate-200 hover:border-blue-300 bg-slate-50 hover:bg-blue-50/50 transition text-left"
                >
                  <div className="w-7 h-7 rounded-lg bg-blue-800 text-white flex items-center justify-center text-xs font-bold">
                    {user.name.charAt(0)}
                  </div>
                  <div className="hidden lg:block text-xs">
                    <p className="font-semibold text-slate-900 leading-tight truncate max-w-[110px]">
                      {user.name}
                    </p>
                    <p className="text-[10px] text-slate-500 font-medium">
                      {user.role}
                    </p>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs font-bold text-slate-900">{user.name}</p>
                      <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                      <span className="inline-block mt-1 text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                        {user.role}
                      </span>
                    </div>

                    {/* Fast Demo Role Switcher */}
                    <div className="px-3 py-2 border-b border-slate-100 bg-slate-50/70">
                      <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1.5">
                        Quick Demo Switcher
                      </span>
                      <div className="grid grid-cols-2 gap-1.5">
                        <button
                          onClick={() => switchDemoRole('CITIZEN')}
                          className={`text-xs py-1.5 px-2 rounded-lg font-medium transition text-center ${
                            user.role === 'CITIZEN'
                              ? 'bg-blue-900 text-white font-semibold'
                              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          Citizen
                        </button>
                        <button
                          onClick={() => switchDemoRole('OFFICER')}
                          className={`text-xs py-1.5 px-2 rounded-lg font-medium transition text-center ${
                            user.role === 'OFFICER'
                              ? 'bg-blue-900 text-white font-semibold'
                              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          Officer
                        </button>
                      </div>
                    </div>

                    <div className="py-1">
                      {user.role === 'OFFICER' ? (
                        <Link
                          to="/officer"
                          onClick={() => setShowUserMenu(false)}
                          className="flex items-center space-x-2 px-4 py-2 text-xs text-slate-700 hover:bg-slate-100 font-medium"
                        >
                          <Briefcase className="w-4 h-4 text-blue-700" />
                          <span>Officer Workspace</span>
                        </Link>
                      ) : (
                        <Link
                          to="/"
                          onClick={() => setShowUserMenu(false)}
                          className="flex items-center space-x-2 px-4 py-2 text-xs text-slate-700 hover:bg-slate-100 font-medium"
                        >
                          <User className="w-4 h-4 text-blue-700" />
                          <span>Citizen Home</span>
                        </Link>
                      )}

                      <Link
                        to="/find-land"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center space-x-2 px-4 py-2 text-xs text-slate-700 hover:bg-slate-100 font-medium"
                      >
                        <FileSearch className="w-4 h-4 text-amber-600" />
                        <span>Find My Land</span>
                      </Link>

                      <button
                        onClick={() => {
                          logout();
                          setShowUserMenu(false);
                          navigate('/login');
                        }}
                        className="w-full flex items-center space-x-2 px-4 py-2 text-xs text-red-600 hover:bg-red-50 font-medium text-left"
                      >
                        <LogOut className="w-4 h-4 text-red-600" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="text-xs font-bold px-4 py-2 rounded-xl bg-blue-900 text-white hover:bg-blue-800 transition shadow-sm"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
