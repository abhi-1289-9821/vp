import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Search, Map, FileText, CheckSquare, MessageSquareText, ShieldAlert } from 'lucide-react';
import { useAuthStore } from '../../store/authStore.js';
import { t } from '../../lib/i18n.js';

export const BottomNav: React.FC = () => {
  const { language, user } = useAuthStore();

  const citizenNav = [
    { to: '/', icon: Home, label: t('myLand', language) === 'मेरी भूमि (GIS)' ? 'होम' : 'Home' },
    { to: '/find-land', icon: Search, label: t('findMyLand', language) },
    { to: '/map', icon: Map, label: 'GIS Map' },
    { to: '/documents', icon: FileText, label: t('documents', language) },
    { to: '/actions', icon: CheckSquare, label: t('actions', language) },
    { to: '/grievance', icon: ShieldAlert, label: 'Grievance' },
  ];

  const officerNav = [
    { to: '/officer', icon: Home, label: 'Dashboard' },
    { to: '/officer/cases', icon: FileText, label: 'Cases' },
    { to: '/officer/grievances', icon: ShieldAlert, label: 'Grievances' },
    { to: '/map', icon: Map, label: 'GIS Cadastre' },
    { to: '/find-land', icon: Search, label: 'Search' },
  ];

  const navItems = user?.role === 'OFFICER' ? officerNav : citizenNav;

  return (
    <nav className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-slate-200 z-40 pb-safe sm:hidden shadow-lg">
      <div className="grid grid-cols-6 h-16 max-w-md mx-auto items-center">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center h-full text-[10px] font-medium transition ${
                isActive
                  ? 'text-blue-900 font-bold'
                  : 'text-slate-500 hover:text-slate-900'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div
                  className={`p-1 rounded-xl transition ${
                    isActive ? 'bg-blue-100 text-blue-900' : ''
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                </div>
                <span className="truncate max-w-[50px] mt-0.5">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};
