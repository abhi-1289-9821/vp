import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore.js';
import { LANGUAGES } from './lib/i18n.js';
import { Layout } from './components/layout/Layout.js';

// Pages
import { LoginPage } from './pages/LoginPage.js';
import { PublicLandingPage } from './pages/PublicLandingPage.js';
import { CitizenHomePage } from './pages/CitizenHomePage.js';
import { FindMyLandPage } from './pages/FindMyLandPage.js';
import { MyLandGISPage } from './pages/MyLandGISPage.js';
import { DocumentIntelligencePage } from './pages/DocumentIntelligencePage.js';
import { DocumentLockerPage } from './pages/DocumentLockerPage.js';
import { CaseDetailPage } from './pages/CaseDetailPage.js';
import { CompensationRRPage } from './pages/CompensationRRPage.js';
import { ActionCenterPage } from './pages/ActionCenterPage.js';
import { GrievancePage } from './pages/GrievancePage.js';
import { NotificationCenterPage } from './pages/NotificationCenterPage.js';
import { OfficerDashboardPage } from './pages/OfficerDashboardPage.js';
import { OfficerCasesPage } from './pages/OfficerCasesPage.js';

// Protected Route Guard for personalized data
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const token = useAuthStore((state) => state.token);
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

// Officer Route Guard
const OfficerRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { token, user } = useAuthStore();
  if (!token) return <Navigate to="/login" replace />;
  if (user?.role !== 'OFFICER' && user?.role !== 'ADMIN') {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

export const App: React.FC = () => {
  const { language, token, user } = useAuthStore();

  // Sync RTL and lang attribute with html root
  useEffect(() => {
    const langInfo = LANGUAGES.find((l) => l.code === language);
    const isRtl = langInfo?.dir === 'rtl' || language === 'ur' || language === 'sd';
    document.documentElement.setAttribute('dir', isRtl ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', language);
  }, [language]);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      {/* Main Application Layout Shell */}
      <Route path="/" element={<Layout />}>
        <Route index element={token && user ? <CitizenHomePage /> : <PublicLandingPage />} />
        <Route path="find-land" element={<FindMyLandPage />} />
        <Route path="map" element={<MyLandGISPage />} />
        <Route path="documents/analyze" element={<DocumentIntelligencePage />} />
        <Route
          path="documents"
          element={
            <ProtectedRoute>
              <DocumentLockerPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="cases/:id"
          element={
            <ProtectedRoute>
              <CaseDetailPage />
            </ProtectedRoute>
          }
        />
        <Route path="compensation" element={<CompensationRRPage />} />
        <Route path="actions" element={<ActionCenterPage />} />
        <Route path="grievance" element={<GrievancePage />} />
        <Route path="grievance/new" element={<GrievancePage />} />
        <Route path="notifications" element={<NotificationCenterPage />} />

        {/* Officer Operational Routes */}
        <Route
          path="officer"
          element={
            <OfficerRoute>
              <OfficerDashboardPage />
            </OfficerRoute>
          }
        />
        <Route
          path="officer/cases"
          element={
            <OfficerRoute>
              <OfficerCasesPage />
            </OfficerRoute>
          }
        />
        <Route
          path="officer/grievances"
          element={
            <OfficerRoute>
              <OfficerDashboardPage />
            </OfficerRoute>
          }
        />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
