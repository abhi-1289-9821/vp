import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { UtilityBar } from './UtilityBar.js';
import { SahaayBrandHeader } from './SahaayBrandHeader.js';
import { MainNavigation } from './MainNavigation.js';
import { AnnouncementBar } from './AnnouncementBar.js';
import { Footer } from './Footer.js';
import { useAuthStore } from '../../store/authStore.js';
import { api } from '../../services/api.js';

export const Layout: React.FC = () => {
  const { user } = useAuthStore();
  const [unreadCount, setUnreadCount] = useState(0);
  const location = useLocation();

  useEffect(() => {
    if (user) {
      api.getNotifications()
        .then((res: any) => {
          if (res.success) {
            setUnreadCount(res.unreadCount || 0);
          }
        })
        .catch(() => {});
    }
  }, [user, location.pathname]);

  const isPublicLanding = location.pathname === '/' && !user;

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col font-sans text-[#2D1810]">
      {/* 1. Top Utility Bar */}
      <UtilityBar />

      {/* 2. Institutional Branding Header */}
      <SahaayBrandHeader />

      {/* 3. Main Navigation Bar */}
      <MainNavigation unreadCount={unreadCount} />

      {/* 4. Notice Announcement Ticker */}
      <AnnouncementBar />

      {/* 5. Main Content Area */}
      {isPublicLanding ? (
        <main className="flex-1 w-full">
          <Outlet />
        </main>
      ) : (
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <Outlet />
        </main>
      )}

      {/* 6. Public Service Footer */}
      <Footer />
    </div>
  );
};
