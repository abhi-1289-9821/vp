import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore.js';
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
  HelpCircle,
  FolderLock,
  Layers,
} from 'lucide-react';

interface MainNavigationProps {
  unreadCount?: number;
}

export const MainNavigation: React.FC<MainNavigationProps> = ({ unreadCount = 0 }) => {
  const { user } = useAuthStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const citizenNav = [
    { to: '/', label: 'HOME', icon: Home },
    { to: '/find-land', label: 'FIND MY LAND', icon: Search },
    { to: '/map', label: 'GIS MAP', icon: Map },
    { to: '/documents/analyze', label: 'DOC INTELLIGENCE', icon: Sparkles },
    { to: '/compensation', label: 'COMPENSATION & R&R', icon: Coins },
    { to: '/documents', label: 'DOCUMENTS', icon: FileText },
    { to: '/actions', label: 'ACTION CENTER', icon: ShieldCheck },
    { to: '/grievance', label: 'GRIEVANCES', icon: ShieldAlert },
  ];

  const officerNav = [
    { to: '/officer', label: 'OFFICER DASHBOARD', icon: Home },
    { to: '/officer/cases', label: 'CASES REGISTRY', icon: FileText },
    { to: '/officer/grievances', label: 'GRIEVANCES QUEUE', icon: ShieldAlert },
    { to: '/map', label: 'CADASTRAL GIS', icon: Map },
    { to: '/find-land', label: 'PARCEL SEARCH', icon: Search },
    { to: '/documents/analyze', label: 'DOC INTELLIGENCE', icon: Sparkles },
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
                  `h-full inline-flex items-center px-3.5 text-xs font-semibold tracking-wide transition uppercase whitespace-nowrap border-b-2 ${
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
              title="Notices & Alerts"
            >
              <Bell className="w-3.5 h-3.5 text-[#E8B84A]" />
              <span>NOTICES</span>
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
              {user?.role === 'OFFICER' ? 'OFFICER PORTAL' : 'CITIZEN SERVICES'}
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
