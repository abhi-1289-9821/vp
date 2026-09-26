import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Lock,
  FileText,
  UserCheck,
  Scale,
  Building2,
  AlertCircle,
  HelpCircle,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { useAuthStore } from '../store/authStore.js';
import { t } from '../lib/i18n.js';

export const PrivacyPolicyPage: React.FC = () => {
  const { language } = useAuthStore();

  const sections = [
    {
      id: 'collection',
      icon: FileText,
      title: t('privacySec1Title', language),
      body: t('privacySec1Body', language),
      items: [
        'Aadhaar / PAN card format identifiers for biometric de-duplication and direct statutory benefit entitlement verification.',
        'Cadastral survey numbers, village names, sub-districts, and land classification records.',
        'Official government gazette notifications, Section 11/19 declarations, and uploaded possession deeds.',
        'Grievance petitions, objection filings under Section 15, and correspondence records.',
      ],
    },
    {
      id: 'usage',
      icon: Scale,
      title: t('privacySec2Title', language),
      body: t('privacySec2Body', language),
      items: [
        'Cross-referencing citizen cadastral parcels against notified acquisition corridors and GIS boundary layers.',
        'Statutory compensation computation under the First Schedule (Sections 26 to 30) of the RFCTLARR Act 2013.',
        'Direct Benefit Transfer (DBT) disbursement routing through the Public Financial Management System (PFMS).',
        'Delivering real-time case status milestones, hearing alerts, and award finalization notices.',
      ],
    },
    {
      id: 'protection',
      icon: Lock,
      title: t('privacySec3Title', language),
      body: t('privacySec3Body', language),
      items: [
        'Role-Based Access Control (RBAC) strictly isolating citizen landowner data from unauthorized third parties.',
        'JSON Web Token (JWT) cryptographic signatures for session integrity and secure API authentication.',
        'Strict document MIME-type validation and isolated local filesystem storage with checksum verification.',
        'Comprehensive audit logging of all administrative review and grievance status modifications.',
      ],
    },
    {
      id: 'disclosure',
      icon: Building2,
      title: t('privacySec4Title', language),
      body: t('privacySec4Body', language),
      items: [
        'Competent Authority for Land Acquisition (CALA) and designated Sub-Divisional Magistrates (SDM).',
        'District Collectorates and State Land Revenue Commissionerates.',
        'Public Financial Management System (PFMS) for direct bank account credit.',
        'Land Acquisition, Rehabilitation and Resettlement Authority (LARRA) for statutory dispute adjudication.',
      ],
    },
    {
      id: 'rights',
      icon: UserCheck,
      title: t('privacySec5Title', language),
      body: t('privacySec5Body', language),
      items: [
        'Right to inspect recorded parcel area, survey demarcation, and ownership shares.',
        'Right to review detailed compensation break-ups, 100% Solatium, and 12% additional interest under Section 30(3).',
        'Right to file formal objections under Section 15 regarding public purpose or area discrepancy within 60 days.',
        'Right to upload supporting revenue records (Khasra/Khatauni/Sale Deed) for record rectification.',
      ],
    },
    {
      id: 'contact',
      icon: HelpCircle,
      title: t('privacySec6Title', language),
      body: t('privacySec6Body', language),
      items: [
        'Central Public Information Officer (CPIO): support@sahaay.gov.in',
        'National Land Acquisition Citizen Helpdesk: 1800-180-LAND (5263)',
        'Grievance Redressal Officer, Nirman Bhawan, New Delhi - 110011',
      ],
    },
  ];

  return (
    <article className="space-y-6" aria-labelledby="privacy-page-title">
      {/* Page Header Card */}
      <header className="soft-card p-6 sm:p-8 bg-gradient-to-br from-white to-[#F5FAFC] border-l-4 border-l-[#123B5D]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2.5">
              <div
                className="w-10 h-10 rounded-lg bg-[#123B5D] text-[#E8B84A] flex items-center justify-center font-bold shadow-soft"
                aria-hidden="true"
              >
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h1
                  id="privacy-page-title"
                  className="text-2xl sm:text-3xl font-extrabold text-[#123B5D] tracking-tight"
                >
                  {t('privacyTitle', language)}
                </h1>
                <p className="text-xs sm:text-sm text-[#667784] font-medium mt-0.5">
                  {t('privacySubtitle', language)}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 bg-[#EAF3F8] text-[#123B5D] px-3.5 py-1.5 rounded-full text-xs font-semibold self-start md:self-center">
            <Clock className="w-3.5 h-3.5 text-[#1B4D78]" aria-hidden="true" />
            <span>{t('privacyLastUpdated', language)}</span>
          </div>
        </div>

        {/* Demo Platform Statutory Alert */}
        <div
          className="mt-6 bg-[#FFF9F0] border border-[#E8B84A]/60 rounded-lg p-4 flex items-start space-x-3 text-xs text-[#243746]"
          role="note"
        >
          <AlertCircle className="w-4 h-4 text-[#E8B84A] shrink-0 mt-0.5" aria-hidden="true" />
          <p className="leading-relaxed">
            <strong className="font-bold text-[#123B5D]">Statutory Framework Notice: </strong>
            {t('privacyDemoNotice', language)}
          </p>
        </div>
      </header>

      {/* Main Privacy Sections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map((sec) => {
          const IconComp = sec.icon;
          return (
            <section
              key={sec.id}
              className="soft-card p-6 flex flex-col justify-between space-y-4"
              aria-labelledby={`sec-title-${sec.id}`}
            >
              <div className="space-y-3">
                <div className="flex items-center space-x-2.5">
                  <div
                    className="w-8 h-8 rounded-lg bg-[#EAF3F8] text-[#123B5D] flex items-center justify-center font-bold text-xs shrink-0"
                    aria-hidden="true"
                  >
                    <IconComp className="w-4 h-4" />
                  </div>
                  <h2
                    id={`sec-title-${sec.id}`}
                    className="text-base font-bold text-[#123B5D]"
                  >
                    {sec.title}
                  </h2>
                </div>

                <p className="text-xs text-[#667784] leading-relaxed">
                  {sec.body}
                </p>

                <ul className="space-y-1.5 pt-2 text-xs text-[#243746]">
                  {sec.items.map((item, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="text-[#2E7D5B] font-bold shrink-0 mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          );
        })}
      </div>

      {/* Citizen Action Footer Banner */}
      <nav
        className="soft-card p-6 bg-[#123B5D] text-white flex flex-col sm:flex-row items-center justify-between gap-4"
        aria-label="Privacy Quick Actions"
      >
        <div className="space-y-1 text-center sm:text-left">
          <h2 className="text-sm font-bold text-[#E8B84A] uppercase tracking-wider">
            Need Clarifications on Your Recorded Land Data?
          </h2>
          <p className="text-xs text-slate-200">
            You can verify parcel details, view compensation matrices, or submit a formal Section 15 objection.
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5 shrink-0">
          <Link
            to="/grievance"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#E8B84A] text-[#123B5D] rounded-lg text-xs font-bold hover:bg-[#d9a838] transition focus:outline-none focus:ring-2 focus:ring-[#E8B84A]"
          >
            <span>{t('navGrievances', language)}</span>
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </Link>
          <Link
            to="/contact-us"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#1B4D78] text-white rounded-lg text-xs font-bold hover:bg-[#1B4D78]/80 transition focus:outline-none focus:ring-2 focus:ring-white"
          >
            <span>{t('footerContactUs', language)}</span>
          </Link>
        </div>
      </nav>
    </article>
  );
};
