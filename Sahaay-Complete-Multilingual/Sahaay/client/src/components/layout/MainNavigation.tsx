import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore.js';
import { t } from '../../lib/i18n.js';
import {
  Home,
  Map,
  FileText,
  Coins,
  ShieldCheck,
  ShieldAlert,
  Search,
  Bell,
  Menu,
  X,
  Sparkles,
} from 'lucide-react';

interface MainNavigationProps {
  unreadCount?: number;
}

export const MainNavigation: React.FC<MainNavigationProps> = ({ unreadCount = 0 }) => {
  const { user, language } = useAuthStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const citizenNav = [
    { to: '/', label: t('navHome', language), icon: Home },
    { to: '/find-land', label: t('navFindLand', language), icon: Search },
    { to: '/map', label: t('navGisMap', language), icon: Map },
    { to: '/documents/analyze', label: t('navDocIntel', language), icon: Sparkles },
    { to: '/compensation', label: t('navCompensation', language), icon: Coins },
    { to: '/documents', label: t('navDocuments', language), icon: FileText },
    { to: '/actions', label: t('navActionCenter', language), icon: ShieldCheck },
    { to: '/grievance', label: t('navGrievances', language), icon: ShieldAlert },
  ];

  const officerNav = [
    { to: '/officer', label: t('navOfficerDashboard', language), icon: Home },
    { to: '/officer/cases', label: t('navCasesRegistry', language), icon: FileText },
    { to: '/officer/grievances', label: t('navGrievancesQueue', language), icon: ShieldAlert },
    { to: '/map', label: t('navGisMap', language), icon: Map },
    { to: '/find-land', label: t('navFindLand', language), icon: Search },
    { to: '/documents/analyze', label: t('navDocIntel', language), icon: Sparkles },
  ];

  const navItems = user?.role === 'OFFICER' ? officerNav : citizenNav;

  return (
    <nav className="bg-[#123B5D] text-white sticky top-0 z-40 shadow-soft border-b border-[#E8B84A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-11">
          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-1 overflow-x-auto h-full">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/' || item.to === '/officer'}
                className={({ isActive }) =>
                  `h-full inline-flex items-center px-3 text-xs font-semibold tracking-wide transition uppercase whitespace-nowrap border-b-2 ${
                    isActive
                      ? 'bg-[#1B4D78] text-[#E8B84A] border-[#E8B84A]'
                      : 'border-transparent text-slate-200 hover:bg-[#1B4D78]/60 hover:text-white'
                  }`
                }
              >
                <item.icon className="w-3.5 h-3.5 mr-1.5 opacity-85" />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>

          {/* Right: Notifications Quick Bell (Desktop) */}
          <div className="hidden md:flex items-center space-x-2">
            <NavLink
              to="/notifications"
              className={({ isActive }) =>
                `flex items-center space-x-1.5 px-3 py-1 text-xs font-semibold uppercase rounded-md transition ${
                  isActive ? 'bg-[#1B4D78] text-[#E8B84A]' : 'hover:bg-[#1B4D78]/60 text-slate-200'
                }`
              }
              title={t('navNotices', language)}
            >
              <Bell className="w-3.5 h-3.5 text-[#E8B84A]" />
              <span>{t('notifications', language)}</span>
              {unreadCount > 0 && (
                <span className="ml-1 bg-[#C62828] text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                  {unreadCount}
                </span>
              )}
            </NavLink>
          </div>

          {/* Mobile Bar View (Title + Hamburger) */}
          <div className="flex md:hidden items-center justify-between w-full h-full">
            <span className="text-xs font-bold tracking-wider text-[#E8B84A] uppercase">
              {user?.role === 'OFFICER' ? t('officerPortal', language) : t('citizenServices', language)}
            </span>

            <div className="flex items-center space-x-2">
              <NavLink
                to="/notifications"
                className="relative p-1.5 text-slate-200 hover:text-white"
              >
                <Bell className="w-4 h-4 text-[#E8B84A]" />
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 w-2 h-2 bg-[#C62828] rounded-full"></span>
                )}
              </NavLink>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1.5 rounded text-slate-200 hover:text-white hover:bg-[#1B4D78] transition cursor-pointer"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0C2840] border-t border-[#1B4D78] px-4 py-3 space-y-1 animate-in slide-in-from-top-2 duration-150">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/' || item.to === '/officer'}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center space-x-2.5 px-3 py-2.5 rounded-lg text-xs font-semibold tracking-wide uppercase transition ${
                  isActive
                    ? 'bg-[#123B5D] text-[#E8B84A] font-bold'
                    : 'text-slate-300 hover:bg-[#123B5D]/60 hover:text-white'
                }`
              }
            >
              <item.icon className="w-4 h-4 text-[#E8B84A]" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
};
