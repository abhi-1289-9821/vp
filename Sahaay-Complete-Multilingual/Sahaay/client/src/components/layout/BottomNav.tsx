import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Search, Map, FileText, CheckSquare, ShieldAlert } from 'lucide-react';
import { useAuthStore } from '../../store/authStore.js';
import { t } from '../../lib/i18n.js';

export const BottomNav: React.FC = () => {
  const { language, user } = useAuthStore();

  const citizenNav = [
    { to: '/', icon: Home, label: t('navHome', language) },
    { to: '/find-land', icon: Search, label: t('navFindLand', language) },
    { to: '/map', icon: Map, label: t('navGisMap', language) },
    { to: '/documents', icon: FileText, label: t('navDocuments', language) },
    { to: '/actions', icon: CheckSquare, label: t('navActionCenter', language) },
    { to: '/grievance', icon: ShieldAlert, label: t('navGrievances', language) },
  ];

  const officerNav = [
    { to: '/officer', icon: Home, label: t('navOfficerDashboard', language) },
    { to: '/officer/cases', icon: FileText, label: t('navCasesRegistry', language) },
    { to: '/officer/grievances', icon: ShieldAlert, label: t('navGrievancesQueue', language) },
    { to: '/map', icon: Map, label: t('navGisMap', language) },
    { to: '/find-land', icon: Search, label: t('navFindLand', language) },
  ];

  const navItems = user?.role === 'OFFICER' ? officerNav : citizenNav;

  return (
    <nav className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-slate-200 z-40 pb-safe sm:hidden shadow-lg">
      <div className={`grid ${user?.role === 'OFFICER' ? 'grid-cols-5' : 'grid-cols-6'} h-16 max-w-md mx-auto items-center`}>
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
