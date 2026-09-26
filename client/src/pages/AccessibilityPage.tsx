import React from 'react';
import { Link } from 'react-router-dom';
import {
  Eye,
  Globe,
  Keyboard,
  Smartphone,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  ArrowRight,
  Sliders,
  Volume2,
} from 'lucide-react';
import { useAuthStore } from '../store/authStore.js';
import { t } from '../lib/i18n.js';

export const AccessibilityPage: React.FC = () => {
  const { language, setFontSize, fontSize } = useAuthStore();

  const handleFontSizeChange = (size: 'normal' | 'large' | 'larger') => {
    setFontSize(size);
    document.body.classList.remove('font-scale-sm', 'font-scale-base', 'font-scale-lg');
    if (size === 'normal') document.body.classList.add('font-scale-base');
    else if (size === 'large') document.body.classList.add('font-scale-lg');
    else if (size === 'larger') document.body.classList.add('font-scale-lg');
  };

  const features = [
    {
      id: 'languages',
      icon: Globe,
      title: t('accessFeature1Title', language),
      body: t('accessFeature1Body', language),
      highlights: [
        'All 22 Eighth Schedule Indian languages plus English supported.',
        'Bidirectional RTL (Right-to-Left) rendering for Urdu and Sindhi.',
        'Zero missing keys architecture ensuring instant fallback across all dialects.',
      ],
    },
    {
      id: 'fonts',
      icon: Sliders,
      title: t('accessFeature2Title', language),
      body: t('accessFeature2Body', language),
      highlights: [
        'Persistent text size controls (Normal, Large, Larger).',
        'WCAG AA compliant color contrast (> 4.5:1 for standard text).',
        'Distinct non-color status badges with clear text labels and icons.',
      ],
    },
    {
      id: 'keyboard',
      icon: Keyboard,
      title: t('accessFeature3Title', language),
      body: t('accessFeature3Body', language),
      highlights: [
        'Logical tab index ordering across all interactive components.',
        'High-visibility focus outlines on all buttons, links, and form fields.',
        'Escape key modal dismissals and keyboard-accessible GIS parcel popups.',
      ],
    },
    {
      id: 'screenreader',
      icon: Volume2,
      title: t('accessFeature4Title', language),
      body: t('accessFeature4Body', language),
      highlights: [
        'Semantic HTML5 structure (<header>, <nav>, <main>, <article>, <footer>).',
        'ARIA landmarks, aria-live status regions for asynchronous search results.',
        'Descriptive alt text for cadastral map icons, emblems, and document badges.',
      ],
    },
    {
      id: 'devices',
      icon: Smartphone,
      title: t('accessFeature5Title', language),
      body: t('accessFeature5Body', language),
      highlights: [
        'Fluid responsive layout adapting seamlessly from 320px mobile screens to 4K displays.',
        'Touch targets sized above 44x44px for effortless finger tapping.',
        'Zoomable viewports without horizontal content truncation or overlapping text.',
      ],
    },
  ];

  return (
    <article className="space-y-6" aria-labelledby="accessibility-page-title">
      {/* Page Header */}
      <header className="soft-card p-6 sm:p-8 bg-gradient-to-br from-white to-[#F5FAFC] border-l-4 border-l-[#123B5D]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2.5">
              <div
                className="w-10 h-10 rounded-lg bg-[#123B5D] text-[#E8B84A] flex items-center justify-center font-bold shadow-soft"
                aria-hidden="true"
              >
                <Eye className="w-5 h-5" />
              </div>
              <div>
                <h1
                  id="accessibility-page-title"
                  className="text-2xl sm:text-3xl font-extrabold text-[#123B5D] tracking-tight"
                >
                  {t('accessTitle', language)}
                </h1>
                <p className="text-xs sm:text-sm text-[#667784] font-medium mt-0.5">
                  {t('accessSubtitle', language)}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Interactive Font Sizer on the page */}
          <div className="bg-[#EAF3F8] p-2.5 rounded-lg border border-[#DDE6EC] flex items-center space-x-2 self-start md:self-center">
            <span className="text-[11px] font-bold text-[#123B5D] uppercase tracking-wider">
              Adjust Font:
            </span>
            <div className="flex items-center space-x-1" role="group" aria-label="Font size controls">
              <button
                type="button"
                onClick={() => handleFontSizeChange('normal')}
                className={`px-2 py-1 rounded text-xs font-bold transition ${
                  fontSize === 'normal'
                    ? 'bg-[#123B5D] text-[#E8B84A]'
                    : 'bg-white text-[#123B5D] hover:bg-slate-100'
                }`}
                aria-pressed={fontSize === 'normal'}
                aria-label="Set standard font size"
              >
                A
              </button>
              <button
                type="button"
                onClick={() => handleFontSizeChange('large')}
                className={`px-2 py-1 rounded text-xs font-bold transition ${
                  fontSize === 'large'
                    ? 'bg-[#123B5D] text-[#E8B84A]'
                    : 'bg-white text-[#123B5D] hover:bg-slate-100'
                }`}
                aria-pressed={fontSize === 'large'}
                aria-label="Set large font size"
              >
                A+
              </button>
              <button
                type="button"
                onClick={() => handleFontSizeChange('larger')}
                className={`px-2 py-1 rounded text-xs font-bold transition ${
                  fontSize === 'larger'
                    ? 'bg-[#123B5D] text-[#E8B84A]'
                    : 'bg-white text-[#123B5D] hover:bg-slate-100'
                }`}
                aria-pressed={fontSize === 'larger'}
                aria-label="Set extra large font size"
              >
                A++
              </button>
            </div>
          </div>
        </div>

        {/* Commitment Statement */}
        <div className="mt-6 bg-[#E8F4EC] border border-[#2E7D5B]/30 rounded-lg p-5 text-xs text-[#243746] space-y-2">
          <div className="flex items-center space-x-2 text-[#2E7D5B] font-bold">
            <CheckCircle2 className="w-4 h-4 shrink-0" aria-hidden="true" />
            <h2 className="text-sm">{t('accessCommitmentTitle', language)}</h2>
          </div>
          <p className="leading-relaxed">
            {t('accessCommitmentBody', language)}
          </p>
        </div>
      </header>

      {/* Accessibility Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feat) => {
          const IconComp = feat.icon;
          return (
            <section
              key={feat.id}
              className="soft-card p-6 flex flex-col justify-between space-y-4"
              aria-labelledby={`feat-title-${feat.id}`}
            >
              <div className="space-y-3">
                <div className="flex items-center space-x-2.5">
                  <div
                    className="w-8 h-8 rounded-lg bg-[#123B5D] text-[#E8B84A] flex items-center justify-center font-bold text-xs shrink-0"
                    aria-hidden="true"
                  >
                    <IconComp className="w-4 h-4" />
                  </div>
                  <h2
                    id={`feat-title-${feat.id}`}
                    className="text-sm font-bold text-[#123B5D]"
                  >
                    {feat.title}
                  </h2>
                </div>

                <p className="text-xs text-[#667784] leading-relaxed">
                  {feat.body}
                </p>

                <ul className="space-y-1.5 pt-2 text-xs text-[#243746]">
                  {feat.highlights.map((item, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="text-[#2E7D5B] font-bold shrink-0 mt-0.5">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          );
        })}
      </div>

      {/* Reporting Accessibility Issues */}
      <section
        className="soft-card p-6 border-l-4 border-l-[#E8B84A] bg-[#FFF9F0]"
        aria-labelledby="access-help-title"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <HelpCircle className="w-5 h-5 text-[#123B5D]" aria-hidden="true" />
              <h2 id="access-help-title" className="text-base font-bold text-[#123B5D]">
                {t('accessHelpTitle', language)}
              </h2>
            </div>
            <p className="text-xs text-[#243746] leading-relaxed max-w-3xl">
              {t('accessHelpBody', language)}
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5 shrink-0">
            <Link
              to="/feedback"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#123B5D] text-white rounded-lg text-xs font-bold hover:bg-[#1B4D78] transition focus:outline-none focus:ring-2 focus:ring-[#123B5D]"
            >
              <span>{t('footerFeedback', language)}</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
            <Link
              to="/contact-us"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-[#123B5D] text-[#123B5D] rounded-lg text-xs font-bold hover:bg-slate-50 transition focus:outline-none focus:ring-2 focus:ring-[#123B5D]"
            >
              <span>{t('footerContactUs', language)}</span>
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
};
