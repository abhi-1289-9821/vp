import React from 'react';
import { Link } from 'react-router-dom';
import {
  FileCheck,
  Scale,
  Shield,
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  Clock,
  ArrowRight,
  Gavel,
} from 'lucide-react';
import { useAuthStore } from '../store/authStore.js';
import { t } from '../lib/i18n.js';

export const TermsAndConditionsPage: React.FC = () => {
  const { language } = useAuthStore();

  const sections = [
    {
      id: 'acceptance',
      icon: FileCheck,
      title: t('termsSec1Title', language),
      body: t('termsSec1Body', language),
      points: [
        'Applicability across all citizen landowners, tenant cultivators, and designated revenue officers.',
        'Compliance with the RFCTLARR Act 2013 and Information Technology Act 2000.',
        'Acknowledgment that digital notices on SAHAAY serve companion and facilitation objectives.',
      ],
    },
    {
      id: 'purpose',
      icon: BookOpen,
      title: t('termsSec2Title', language),
      body: t('termsSec2Body', language),
      points: [
        'Cadastral parcel discovery using survey numbers, village references, and interactive GIS overlays.',
        'OCR-assisted Gazette notification analysis and automated discrepancy detection.',
        'Transparent multi-tier compensation estimation under First Schedule statutory parameters.',
        'Grievance lodging and procedural milestone monitoring.',
      ],
    },
    {
      id: 'responsibilities',
      icon: Shield,
      title: t('termsSec3Title', language),
      body: t('termsSec3Body', language),
      points: [
        'Safekeeping of one-time login credentials, mobile OTPs, and profile identity information.',
        'Uploading genuine, un-tampered revenue records and gazette notifications.',
        'Prompt reporting of unauthorized access or noticed discrepancies.',
      ],
    },
    {
      id: 'accuracy',
      icon: AlertTriangle,
      title: t('termsSec4Title', language),
      body: t('termsSec4Body', language),
      points: [
        'Official Gazette notifications published by the District Collectorate remain the final legal instruments.',
        'Calculated compensation awards are statutory estimates based on available Circle Rates and Solatium factors.',
        'Discrepancy flags detected by Document Intelligence require formal officer review.',
      ],
    },
    {
      id: 'liability',
      icon: Scale,
      title: t('termsSec5Title', language),
      body: t('termsSec5Body', language),
      points: [
        'SAHAAY is not liable for indirect losses resulting from external data sync delays or network interruptions.',
        'Platform discrepancy flags do not automatically modify official land revenue records without administrative order.',
        'Disputes regarding land boundaries are subject to adjudication under Section 64 of the Act.',
      ],
    },
    {
      id: 'acceptable-use',
      icon: CheckCircle2,
      title: t('termsSec6Title', language),
      body: t('termsSec6Body', language),
      points: [
        'Prohibition of automated scraping, reverse engineering, or denial-of-service attempts.',
        'Strict prohibition against submitting fraudulent claims or forged revenue documents.',
        'Respectful and factual communication in grievance submissions and officer responses.',
      ],
    },
    {
      id: 'governing-law',
      icon: Gavel,
      title: t('termsSec7Title', language),
      body: t('termsSec7Body', language),
      points: [
        'Governed exclusively by the statutory laws of the Republic of India.',
        'Subject to the jurisdiction of the Land Acquisition, Rehabilitation & Resettlement Authority (LARRA).',
        'Appellate remedies lie before the High Court of the respective State as provided under Section 74.',
      ],
    },
  ];

  return (
    <article className="space-y-6" aria-labelledby="terms-page-title">
      {/* Page Header Card */}
      <header className="soft-card p-6 sm:p-8 bg-gradient-to-br from-white to-[#F5FAFC] border-l-4 border-l-[#123B5D]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2.5">
              <div
                className="w-10 h-10 rounded-lg bg-[#123B5D] text-[#E8B84A] flex items-center justify-center font-bold shadow-soft"
                aria-hidden="true"
              >
                <Scale className="w-5 h-5" />
              </div>
              <div>
                <h1
                  id="terms-page-title"
                  className="text-2xl sm:text-3xl font-extrabold text-[#123B5D] tracking-tight"
                >
                  {t('termsTitle', language)}
                </h1>
                <p className="text-xs sm:text-sm text-[#667784] font-medium mt-0.5">
                  {t('termsSubtitle', language)}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 bg-[#EAF3F8] text-[#123B5D] px-3.5 py-1.5 rounded-full text-xs font-semibold self-start md:self-center">
            <Clock className="w-3.5 h-3.5 text-[#1B4D78]" aria-hidden="true" />
            <span>{t('termsLastUpdated', language)}</span>
          </div>
        </div>
      </header>

      {/* Main Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map((sec) => {
          const IconComp = sec.icon;
          return (
            <section
              key={sec.id}
              className="soft-card p-6 flex flex-col justify-between space-y-4"
              aria-labelledby={`terms-sec-${sec.id}`}
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
                    id={`terms-sec-${sec.id}`}
                    className="text-base font-bold text-[#123B5D]"
                  >
                    {sec.title}
                  </h2>
                </div>

                <p className="text-xs text-[#667784] leading-relaxed">
                  {sec.body}
                </p>

                <ul className="space-y-1.5 pt-2 text-xs text-[#243746]">
                  {sec.points.map((pt, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="text-[#123B5D] font-bold shrink-0 mt-0.5">•</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          );
        })}
      </div>

      {/* Bottom Nav Banner */}
      <nav
        className="soft-card p-6 bg-[#123B5D] text-white flex flex-col sm:flex-row items-center justify-between gap-4"
        aria-label="Terms Related Links"
      >
        <div className="space-y-1 text-center sm:text-left">
          <h2 className="text-sm font-bold text-[#E8B84A] uppercase tracking-wider">
            Review Associated Statutory Safeguards
          </h2>
          <p className="text-xs text-slate-200">
            Learn more about data privacy standards and accessibility accommodations on SAHAAY.
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5 shrink-0">
          <Link
            to="/privacy-policy"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#E8B84A] text-[#123B5D] rounded-lg text-xs font-bold hover:bg-[#d9a838] transition focus:outline-none focus:ring-2 focus:ring-[#E8B84A]"
          >
            <span>{t('footerPrivacyPolicy', language)}</span>
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </Link>
          <Link
            to="/accessibility"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#1B4D78] text-white rounded-lg text-xs font-bold hover:bg-[#1B4D78]/80 transition focus:outline-none focus:ring-2 focus:ring-white"
          >
            <span>{t('footerAccessibility', language)}</span>
          </Link>
        </div>
      </nav>
    </article>
  );
};
