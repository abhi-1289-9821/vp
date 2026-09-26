import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore.js';
import {
  Search,
  Map,
  Coins,
  ShieldAlert,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  MapPin,
  Phone,
  Landmark,
  Scale,
  BellRing,
  FolderLock,
  Layers,
  CheckCircle2,
  ExternalLink,
  LogIn,
  UserPlus,
  FileSearch,
  Play,
  Pause,
  Compass,
  Calendar,
  Building2,
  FileCheck,
  Award,
  Globe2,
  HelpCircle,
  FileText,
  Lock,
} from 'lucide-react';
import { MapContainer, TileLayer, Polygon, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { t } from '../lib/i18n.js';

const miniMarkerIcon = new L.DivIcon({
  className: 'custom-leaflet-marker',
  html: `<div style="background-color:#047857; color:#FFFFFF; border-radius:6px; width:28px; height:28px; display:flex; align-items:center; justify-content:center; border:2px solid #D97706; box-shadow:0 2px 8px rgba(4,120,87,0.35); font-weight:bold; font-size:13px;">📍</div>`,
  iconSize: [28, 28],
  iconAnchor: [14, 28],
});

export const PublicLandingPage: React.FC = () => {
  const { language } = useAuthStore();
  const navigate = useNavigate();
  const [quickSurvey, setQuickSurvey] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickSurvey.trim()) {
      navigate(`/find-land?survey=${encodeURIComponent(quickSurvey.trim())}`);
    } else {
      navigate('/find-land');
    }
  };

  const centerPosition: [number, number] = [23.2625, 77.4150];
  const parcelCoords: [number, number][] = [
    [23.2610, 77.4130],
    [23.2640, 77.4130],
    [23.2640, 77.4170],
    [23.2610, 77.4170],
  ];

  // 5 Full-Width Responsive Hero Slides
  const heroSlides = [
    {
      id: 'slide-1',
      tag: t('heroSlide1Tag', language),
      badge: t('heroSlide1Badge', language),
      title: t('heroSlide1Title', language),
      subtitle: t('heroSlide1Sub', language),
      image: '/images/cadastral_gis_parcels.jpg',
      ctaText: t('heroSlide1Cta', language),
      ctaLink: '/find-land',
      secondaryText: t('heroSlide1Sec', language),
      secondaryLink: '/map',
      metric: t('heroSlide1Metric', language),
      metricLabel: t('heroSlide1MetricLabel', language),
    },
    {
      id: 'slide-2',
      tag: t('heroSlide2Tag', language),
      badge: t('heroSlide2Badge', language),
      title: t('heroSlide2Title', language),
      subtitle: t('heroSlide2Sub', language),
      image: '/images/survey_fieldwork.jpg',
      ctaText: t('heroSlide2Cta', language),
      ctaLink: '/map',
      secondaryText: t('heroSlide2Sec', language),
      secondaryLink: '/find-land',
      metric: t('heroSlide2Metric', language),
      metricLabel: t('heroSlide2MetricLabel', language),
    },
    {
      id: 'slide-3',
      tag: t('heroSlide3Tag', language),
      badge: t('heroSlide3Badge', language),
      title: t('heroSlide3Title', language),
      subtitle: t('heroSlide3Sub', language),
      image: '/images/drone_cadastral_mapping.jpg',
      ctaText: t('heroSlide3Cta', language),
      ctaLink: '/map',
      secondaryText: t('heroSlide3Sec', language),
      secondaryLink: '/find-land',
      metric: t('heroSlide3Metric', language),
      metricLabel: t('heroSlide3MetricLabel', language),
    },
    {
      id: 'slide-4',
      tag: t('heroSlide4Tag', language),
      badge: t('heroSlide4Badge', language),
      title: t('heroSlide4Title', language),
      subtitle: t('heroSlide4Sub', language),
      image: '/images/digital_land_records.jpg',
      ctaText: t('heroSlide4Cta', language),
      ctaLink: '/compensation',
      secondaryText: t('heroSlide4Sec', language),
      secondaryLink: '/compensation',
      metric: t('heroSlide4Metric', language),
      metricLabel: t('heroSlide4MetricLabel', language),
    },
    {
      id: 'slide-5',
      tag: t('heroSlide5Tag', language),
      badge: t('heroSlide5Badge', language),
      title: t('heroSlide5Title', language),
      subtitle: t('heroSlide5Sub', language),
      image: '/images/survey.jpg',
      ctaText: t('heroSlide5Cta', language),
      ctaLink: '/find-land',
      secondaryText: t('heroSlide5Sec', language),
      secondaryLink: '/grievance',
      metric: t('heroSlide5Metric', language),
      metricLabel: t('heroSlide5MetricLabel', language),
    },
  ];

  // Auto-rotate every 5 seconds (5000ms) unless paused
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused, heroSlides.length]);

  // Featured Public Services (Mapped strictly 1:1 to existing routes)
  const quickAccessServices = [
    {
      title: t('serviceFindLandTitle', language),
      desc: t('serviceFindLandDesc', language),
      icon: Search,
      to: '/find-land',
      badge: t('search', language),
      image: '/images/digital_land_records.jpg',
      highlight: true,
    },
    {
      title: t('navGisMap', language),
      desc: t('cadastralMapSub', language),
      icon: Map,
      to: '/map',
      badge: t('navGisMap', language),
      image: '/images/cadastral_gis_parcels.jpg',
      highlight: false,
    },
    {
      title: t('serviceUnderstandDocTitle', language),
      desc: t('serviceUnderstandDocDesc', language),
      icon: Sparkles,
      to: '/documents/analyze',
      badge: t('navDocIntel', language),
      image: '/images/login_hero.jpg',
      highlight: false,
    },
    {
      title: t('serviceCheckCompTitle', language),
      desc: t('serviceCheckCompDesc', language),
      icon: Coins,
      to: '/compensation',
      badge: t('badgeStatutoryFormula', language),
      image: '/images/hero_land.jpg',
      highlight: false,
    },
    {
      title: t('serviceGrievanceTitle', language),
      desc: t('serviceGrievanceDesc', language),
      icon: ShieldAlert,
      to: '/grievance',
      badge: t('badgeSection15', language),
      image: '/images/community.jpg',
      highlight: false,
    },
    {
      title: t('navActionCenter', language),
      desc: t('actionCenterSub', language),
      icon: ShieldCheck,
      to: '/actions',
      badge: t('navActionCenter', language),
      image: '/images/survey_fieldwork.jpg',
      highlight: false,
    },
    {
      title: t('serviceNoticesTitle', language),
      desc: t('serviceNoticesDesc', language),
      icon: BellRing,
      to: '/notifications',
      badge: t('gazetteTickerBadge', language),
      image: '/images/survey.jpg',
      highlight: false,
    },
    {
      title: t('navDocuments', language),
      desc: t('lockerSub', language),
      icon: FolderLock,
      to: '/documents',
      badge: t('badgeCertifiedKhasra', language),
      image: '/images/drone_cadastral_mapping.jpg',
      highlight: false,
    },
  ];

  // Trust & Transparency Cards
  const trustCards = [
    {
      icon: Scale,
      title: t('trust1Title', language),
      subtitle: t('trust1Sub', language),
      description: t('trust1Desc', language),
      badge: t('trust1Badge', language),
      image: '/images/digital_land_records.jpg',
    },
    {
      icon: Layers,
      title: t('trust2Title', language),
      subtitle: t('trust2Sub', language),
      description: t('trust2Desc', language),
      badge: t('trust2Badge', language),
      image: '/images/cadastral_gis_parcels.jpg',
    },
    {
      icon: Landmark,
      title: t('trust3Title', language),
      subtitle: t('trust3Sub', language),
      description: t('trust3Desc', language),
      badge: t('trust3Badge', language),
      image: '/images/community.jpg',
    },
    {
      icon: Lock,
      title: t('trust4Title', language),
      subtitle: t('trust4Sub', language),
      description: t('trust4Desc', language),
      badge: t('trust4Badge', language),
      image: '/images/survey_fieldwork.jpg',
    },
  ];

  // Official Statutory Notices Feed
  const officialNotices = [
    {
      id: 'not-01',
      title: t('noticeGazetteTitle', language),
      corridor: t('noticeGazetteDesc', language),
      date: '24 Sep 2026',
      department: `${t('authorityLabel', language)}: ${t('officeSdmRev', language)}`,
      category: t('stage1Name', language),
      status: t('active60DayWindow', language),
      to: '/notifications',
    },
    {
      id: 'not-02',
      title: t('noticeHearingTitle', language),
      corridor: t('noticeHearingDesc', language),
      date: '18 Sep 2026',
      department: `${t('authorityLabel', language)}: ${t('officeSdmRev', language)}`,
      category: t('stage2Name', language),
      status: t('status_PENDING', language),
      to: '/notifications',
    },
    {
      id: 'not-03',
      title: t('noticeAwardTitle', language),
      corridor: t('noticeAwardDesc', language),
      date: '10 Sep 2026',
      department: `${t('authorityLabel', language)}: ${t('calaTitle', language)}`,
      category: t('stage4Name', language),
      status: t('status_SANCTIONED', language),
      to: '/compensation',
    },
  ];

  const activeSlide = heroSlides[currentSlide];

  return (
    <div className="w-full flex flex-col space-y-0 text-[#2D1810]">
      {/* ================= 1. FULL-WIDTH RESPONSIVE HERO CAROUSEL ================= */}
      <section
        className="relative w-full min-h-[520px] sm:min-h-[560px] lg:min-h-[600px] bg-[#0C2840] text-white flex flex-col justify-between overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Full-Bleed Carousel Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={activeSlide.image}
            alt={activeSlide.title}
            className="w-full h-full object-cover object-center transition-all duration-1000 ease-out opacity-40 scale-105"
          />
          {/* Subtle Dark Gradient Overlay for High Readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0C2840]/95 via-[#0C2840]/80 to-[#047857]/40"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C2840] via-transparent to-[#0C2840]/50"></div>
          {/* Subtle Cadastral Grid Texture */}
          <div className="absolute inset-0 bg-[radial-gradient(#E6E2DA_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none"></div>
        </div>

        {/* Hero Content (Centered Max-Width) */}
        <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-6 flex-1 flex flex-col justify-center space-y-5">
          {/* Government Authority Badge */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-black tracking-wider uppercase bg-[#D97706] text-[#2D1810] shadow-sm">
              {activeSlide.badge}
            </span>
            <span className="text-xs font-semibold text-slate-300 hidden sm:inline">
              • {activeSlide.tag}
            </span>
          </div>

          {/* Headline & Description */}
          <div className="space-y-2 max-w-3xl">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              {activeSlide.title}
            </h1>
            <p className="text-xs sm:text-sm lg:text-base text-slate-200 font-normal leading-relaxed max-w-2xl">
              {activeSlide.subtitle}
            </p>
          </div>

          {/* Integrated Fast Khasra / Survey Search Bar */}
          <div className="pt-1 max-w-2xl">
            <form
              onSubmit={handleQuickSearch}
              className="bg-white/95 backdrop-blur-md p-2 rounded-2xl border border-white/50 shadow-xl flex flex-col sm:flex-row items-center gap-2"
            >
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-[#6B5E57]" />
                <input
                  type="text"
                  value={quickSurvey}
                  onChange={(e) => setQuickSurvey(e.target.value)}
                  placeholder={t('searchPlaceholderLanding', language)}
                  className="w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm bg-white rounded-xl text-[#2D1810] font-semibold placeholder-[#6B5E57]/70 border border-[#E6E2DA] focus:outline-none focus:border-[#047857] focus:ring-2 focus:ring-[#047857]/30"
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2.5 bg-[#047857] hover:bg-[#065F46] active:bg-[#034d38] text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition flex items-center justify-center space-x-2 shrink-0 cursor-pointer"
              >
                <span>{t('searchRecordsBtn', language)}</span>
                <ArrowRight className="w-4 h-4 text-[#D97706]" />
              </button>
            </form>

            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300 mt-2 pl-2">
              <span className="font-semibold text-[#D97706]">{t('quickLookup', language)}:</span>
              <button
                type="button"
                onClick={() => {
                  setQuickSurvey('1042');
                  navigate('/find-land?survey=1042');
                }}
                className="underline hover:text-white cursor-pointer"
              >
                {t('khasraNo', language)} #1042 (Rampur)
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => {
                  setQuickSurvey('1043');
                  navigate('/find-land?survey=1043');
                }}
                className="underline hover:text-white cursor-pointer"
              >
                {t('surveyNo', language)} #1043
              </button>
              <span>•</span>
              <Link to="/map" className="underline hover:text-white">
                {t('navGisMap', language)}
              </Link>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Link
              to="/login"
              className="px-5 py-2.5 bg-[#047857] hover:bg-[#065F46] text-white text-xs sm:text-sm font-bold rounded-xl shadow-lg transition flex items-center space-x-2 cursor-pointer"
            >
              <LogIn className="w-4 h-4 text-[#D97706]" />
              <span>{t('signIn', language)}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/login?tab=register"
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold rounded-xl border border-white/30 backdrop-blur-md transition flex items-center space-x-1.5 cursor-pointer"
            >
              <UserPlus className="w-4 h-4 text-[#D97706]" />
              <span>{t('registerLandowner', language)}</span>
            </Link>

            <Link
              to={activeSlide.ctaLink}
              className="px-4 py-2.5 bg-[#D97706] hover:bg-[#B45309] text-[#2D1810] text-xs sm:text-sm font-bold rounded-xl transition flex items-center space-x-1.5 cursor-pointer"
            >
              <Compass className="w-4 h-4" />
              <span>{activeSlide.ctaText}</span>
            </Link>
          </div>
        </div>

        {/* Carousel Bottom Control Strip & Indicators */}
        <div className="relative z-10 border-t border-white/10 bg-black/35 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            {/* Thumbnails / Slide Selectors */}
            <div className="flex items-center space-x-2 overflow-x-auto py-0.5">
              {heroSlides.map((slide, idx) => (
                <button
                  key={slide.id}
                  onClick={() => setCurrentSlide(idx)}
                  className={`text-left px-3 py-1.5 rounded-lg text-xs transition cursor-pointer flex items-center space-x-2 shrink-0 ${
                    idx === currentSlide
                      ? 'bg-[#047857] text-white font-bold ring-2 ring-[#D97706]'
                      : 'bg-white/10 hover:bg-white/20 text-slate-300 font-medium'
                  }`}
                >
                  <span className="font-mono text-[10px] text-[#D97706]">{idx + 1}</span>
                  <span className="truncate max-w-[110px] sm:max-w-[150px]">{slide.title.split(' ')[0]} {slide.title.split(' ')[1] || ''}</span>
                </button>
              ))}
            </div>

            {/* Controls & Dot Indicators */}
            <div className="flex items-center space-x-3 self-end sm:self-auto">
              <div className="flex items-center space-x-1.5">
                {heroSlides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      idx === currentSlide ? 'w-6 bg-[#D97706]' : 'w-2 bg-white/40 hover:bg-white/70'
                    }`}
                    aria-label={`${t('view', language)} ${idx + 1}`}
                  />
                ))}
              </div>

              <div className="flex items-center space-x-1 pl-2 border-l border-white/20">
                <button
                  onClick={() => setIsPaused(!isPaused)}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 transition cursor-pointer"
                  title={isPaused ? 'Resume' : 'Pause'}
                >
                  {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={() => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 transition cursor-pointer"
                  aria-label={t('back', language)}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 transition cursor-pointer"
                  aria-label={t('next', language)}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 2. FEATURED SERVICES (WHITE BACKGROUND SECTION) ================= */}
      <section className="w-full bg-white py-14 sm:py-18 border-b border-[#E6E2DA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[#E6E2DA] pb-4">
            <div className="space-y-1">
              <div className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-[#047857]">
                <Landmark className="w-4 h-4" />
                <span>{t('servicesDirectoryBadge', language)}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#2D1810] tracking-tight">
                {t('servicesSectionTitle', language)}
              </h2>
              <p className="text-xs sm:text-sm text-[#6B5E57]">
                {t('servicesSectionSub', language)}
              </p>
            </div>
            <div className="text-xs text-[#6B5E57] font-semibold bg-[#F8F7F4] px-3 py-1 rounded-md border border-[#E6E2DA]">
              {t('dilrmpCompliant', language)}
            </div>
          </div>

          {/* 8-Card Service Grid with Rich Imagery and Hover Elevation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {quickAccessServices.map((service, idx) => (
              <Link
                key={idx}
                to={service.to}
                className={`bg-white border rounded-2xl overflow-hidden flex flex-col justify-between group cursor-pointer transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-1 ${
                  service.highlight
                    ? 'border-[#047857]/50 ring-2 ring-[#047857]/15'
                    : 'border-[#E6E2DA] hover:border-[#047857]/50'
                }`}
              >
                {/* Card Photo Header */}
                <div className="relative h-28 w-full overflow-hidden bg-slate-100">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2D1810]/80 via-[#2D1810]/30 to-transparent"></div>
                  <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between">
                    <div className="w-8 h-8 rounded-lg bg-[#047857] text-white flex items-center justify-center shadow-md">
                      <service.icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white/90 text-[#2D1810] backdrop-blur-sm shadow-sm">
                      {service.badge}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1.5">
                    <h3 className="text-sm font-bold text-[#2D1810] group-hover:text-[#047857] transition leading-snug">
                      {service.title}
                    </h3>
                    <p className="text-xs text-[#6B5E57] leading-relaxed">
                      {service.desc}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#E6E2DA] flex items-center justify-between text-xs font-bold text-[#047857]">
                    <span>{t('accessService', language)}</span>
                    <ChevronRight className="w-4 h-4 text-[#D97706] group-hover:translate-x-1 transition" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 3. CADASTRAL GIS & DIGITAL SPATIAL RECORDS (SOFT CREAM BACKGROUND) ================= */}
      <section className="w-full bg-[#F8F7F4] py-14 sm:py-18 border-b border-[#E6E2DA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Content Left */}
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-white border border-[#E6E2DA] text-[#047857] rounded-md text-xs font-bold shadow-sm">
                <Layers className="w-3.5 h-3.5 text-[#D97706]" />
                <span>{t('spatialIntelligenceBadge', language)}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-[#2D1810] tracking-tight">
                {t('cadastralShowcaseTitle', language)}
              </h2>

              <p className="text-xs sm:text-sm text-[#6B5E57] leading-relaxed">
                {t('cadastralShowcaseDesc', language)}
              </p>

              {/* Satellite Map Visual with Annotation Tags */}
              <div className="relative rounded-2xl overflow-hidden border border-[#E6E2DA] shadow-md group bg-white">
                <img
                  src="/images/cadastral_gis_parcels.jpg"
                  alt="Cadastral GIS Satellite Map"
                  className="w-full h-56 sm:h-64 object-cover object-center group-hover:scale-102 transition duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2D1810]/75 via-transparent to-transparent"></div>

                {/* Floating Layer Tags */}
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-md text-[11px] font-bold text-[#047857] border border-[#E6E2DA] shadow-sm flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#047857]"></span>
                  <span>{t('activeCadastralLayer', language)}</span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                  <div>
                    <span className="font-bold block">{t('village', language)} Rampur & Vetalwadi</span>
                    <span className="text-[11px] text-slate-200">Scale: 1:5000 • {t('heroSlide1Metric', language)}</span>
                  </div>
                  <Link
                    to="/map"
                    className="px-3 py-1.5 bg-[#047857] hover:bg-[#065F46] text-white text-xs font-bold rounded-lg shadow-sm transition flex items-center space-x-1"
                  >
                    <span>{t('openGisMap', language)}</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Interactive Leaflet Map Right */}
            <div className="lg:col-span-6 bg-white border border-[#E6E2DA] rounded-3xl p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-[#E6E2DA] pb-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-lg bg-[#E8F5EC] text-[#047857] flex items-center justify-center font-bold">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#2D1810]">
                      {t('interactiveCadastralViewer', language)} (#1042)
                    </h3>
                    <span className="text-[11px] text-[#6B5E57]">
                      {t('village', language)} Rampur, {t('tehsil', language)} Bhopal • {t('recordedArea', language)}: 2.43 Ha (6.00 Acres)
                    </span>
                  </div>
                </div>
                <span className="text-[10px] bg-[#E8F5EC] text-[#047857] px-2 py-0.5 rounded font-bold border border-[#047857]/30">
                  {t('geoVerifiedBadge', language)}
                </span>
              </div>

              {/* Embedded Leaflet Map */}
              <div className="h-64 sm:h-72 w-full rounded-2xl overflow-hidden border border-[#E6E2DA] relative">
                <MapContainer
                  center={centerPosition}
                  zoom={15}
                  scrollWheelZoom={false}
                  className="h-full w-full"
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Polygon
                    positions={parcelCoords}
                    pathOptions={{
                      color: '#047857',
                      fillColor: '#047857',
                      fillOpacity: 0.35,
                      weight: 3,
                    }}
                  />
                  <Marker position={[23.2625, 77.4150]} icon={miniMarkerIcon}>
                    <Popup>
                      <div className="text-xs p-1 space-y-1">
                        <strong className="text-[#047857] text-sm block">
                          {t('surveyParcelLabel', language)}: #1042
                        </strong>
                        <div>{t('village', language)}: Rampur, {t('district', language)}: Bhopal</div>
                        <div className="font-bold text-[#047857]">
                          {t('recordedArea', language)}: 2.43 Ha (approx. 6.00 Acres)
                        </div>
                        <div className="text-[10px] text-[#6B5E57] pt-1 border-t border-slate-200">
                          {t('heroSlide1MetricLabel', language)}
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>

              {/* Cadastral Legend & Action Link */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 text-xs">
                <div className="flex items-center space-x-3 text-[#2D1810]">
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#047857]"></span>
                    <span>{t('notifiedPlot', language)}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#D97706]"></span>
                    <span>{t('nhCorridor', language)}</span>
                  </span>
                </div>
                <Link
                  to="/map"
                  className="text-[#047857] hover:text-[#065F46] font-bold flex items-center gap-1"
                >
                  <span>{t('launchFullGis', language)}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#D97706]" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 4. DOCUMENT INTELLIGENCE & NOTICE OCR (WHITE BACKGROUND SECTION) ================= */}
      <section className="w-full bg-white py-14 sm:py-18 border-b border-[#E6E2DA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#F8F7F4] border border-[#E6E2DA] rounded-3xl p-6 sm:p-10 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Image Left */}
            <div className="lg:col-span-5 rounded-2xl overflow-hidden border border-[#E6E2DA] shadow-md bg-white">
              <img
                src="/images/digital_land_records.jpg"
                alt="Digital Land Records Interface"
                className="w-full h-64 sm:h-80 object-cover"
              />
            </div>

            {/* Content Right */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-[#FFF4D6] border border-[#D97706]/40 text-[#D97706] rounded-md text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t('docIntelShowcaseBadge', language)}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-[#2D1810] tracking-tight">
                {t('docIntelShowcaseTitle', language)}
              </h2>

              <p className="text-xs sm:text-sm text-[#6B5E57] leading-relaxed">
                {t('docIntelShowcaseDesc', language)}
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                <div className="bg-white p-3.5 rounded-xl border border-[#E6E2DA]">
                  <strong className="text-[#2D1810] block mb-1">{t('instantOcrTitle', language)}</strong>
                  <span className="text-[#6B5E57]">{t('instantOcrDesc', language)}</span>
                </div>
                <div className="bg-white p-3.5 rounded-xl border border-[#E6E2DA]">
                  <strong className="text-[#2D1810] block mb-1">{t('discrepancyAlertsTitle', language)}</strong>
                  <span className="text-[#6B5E57]">{t('discrepancyAlertsDesc', language)}</span>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link
                  to="/documents/analyze"
                  className="px-6 py-3 bg-[#047857] hover:bg-[#065F46] text-white text-xs sm:text-sm font-bold rounded-xl shadow-sm transition flex items-center space-x-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-[#D97706]" />
                  <span>{t('analyzeNoticeBtn', language)}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/find-land"
                  className="px-5 py-3 bg-white hover:bg-[#F8F7F4] text-[#2D1810] text-xs sm:text-sm font-semibold rounded-xl border border-[#E6E2DA] transition"
                >
                  {t('lookupRorBtn', language)}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 5. FAIR COMPENSATION & SOLATIUM (LIGHT GREEN SECTION) ================= */}
      <section className="w-full bg-[#E8F5EC] py-14 sm:py-18 border-b border-[#E6E2DA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Content Left */}
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-white border border-[#047857]/30 text-[#047857] rounded-md text-xs font-bold shadow-sm">
                <Coins className="w-3.5 h-3.5 text-[#D97706]" />
                <span>{t('compShowcaseBadge', language)}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-[#2D1810] tracking-tight">
                {t('compShowcaseTitle', language)}
              </h2>

              <p className="text-xs sm:text-sm text-[#6B5E57] leading-relaxed">
                {t('compShowcaseDesc', language)}
              </p>

              <div className="space-y-2.5 pt-1 text-xs">
                <div className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#2D1810]">{t('ruralMultiplierTitle', language)}:</strong> {t('ruralMultiplierDesc', language)}
                  </div>
                </div>
                <div className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#2D1810]">{t('solatium100Feature', language)}:</strong> {t('solatium100FeatureDesc', language)}
                  </div>
                </div>
                <div className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#2D1810]">{t('rrGrantsTitle', language)}:</strong> {t('rrGrantsDesc', language)}
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/compensation"
                  className="px-6 py-3 bg-[#047857] hover:bg-[#065F46] text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition inline-flex items-center space-x-2"
                >
                  <span>{t('openCompCalcBtn', language)}</span>
                  <ArrowRight className="w-4 h-4 text-[#D97706]" />
                </Link>
              </div>
            </div>

            {/* Compensation Card Right */}
            <div className="lg:col-span-6 bg-white border border-[#E6E2DA] rounded-3xl p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-[#E6E2DA] pb-3">
                <h3 className="text-sm font-bold text-[#2D1810]">
                  {t('sampleCompCalcTitle', language)} (#1042)
                </h3>
                <span className="text-[10px] bg-[#E8F5EC] text-[#047857] px-2 py-0.5 rounded font-bold">
                  {t('rfctlarrFormulaBadge', language)}
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between p-2.5 bg-[#F8F7F4] rounded-xl border border-[#E6E2DA]">
                  <span className="text-[#6B5E57]">{t('marketValueLabel', language)}:</span>
                  <span className="font-bold text-[#2D1810] font-mono">₹19,20,000</span>
                </div>
                <div className="flex justify-between p-2.5 bg-[#E8F5EC] rounded-xl border border-[#047857]/20">
                  <span className="text-[#047857] font-semibold">+ {t('solatiumMandatoryLabel', language)}:</span>
                  <span className="font-bold text-[#047857] font-mono">+₹19,20,000</span>
                </div>
                <div className="flex justify-between p-2.5 bg-[#FFF4D6] rounded-xl border border-[#D97706]/30">
                  <span className="text-[#D97706] font-semibold">+ {t('rrGrantLabel', language)}:</span>
                  <span className="font-bold text-[#D97706] font-mono">+₹5,00,000</span>
                </div>
                <div className="flex justify-between p-4 bg-[#047857] text-white rounded-xl shadow-sm">
                  <div>
                    <span className="text-xs text-slate-200 block">{t('totalStatutoryEntitlement', language)}:</span>
                    <span className="text-xl font-black font-mono">₹38,40,000</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] bg-white text-[#047857] px-2 py-0.5 rounded font-bold uppercase block">
                      {t('directDbtBadge', language)}
                    </span>
                    <span className="text-[11px] text-slate-200 mt-1 block">{t('pfmsLinked', language)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 6. TRUST & TRANSPARENCY PILLARS (WARM CREAM SECTION) ================= */}
      <section className="w-full bg-[#FDFBF7] py-14 sm:py-18 border-b border-[#E6E2DA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <div className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-[#047857]">
              <ShieldCheck className="w-4 h-4 text-[#047857]" />
              <span>{t('institutionalPillarsBadge', language)}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#2D1810] tracking-tight">
              {t('trustSectionTitle', language)}
            </h2>
            <p className="text-xs sm:text-sm text-[#6B5E57] leading-relaxed">
              {t('trustSectionDesc', language)}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {trustCards.map((card, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#E6E2DA] rounded-2xl overflow-hidden flex flex-col justify-between shadow-sm hover:border-[#047857]/50 hover:shadow-md transition"
              >
                <div className="h-28 w-full overflow-hidden bg-slate-100 relative">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2D1810]/75 to-transparent"></div>
                  <div className="absolute bottom-2 left-3">
                    <span className="font-mono font-bold text-white text-xs bg-[#047857] px-2 py-0.5 rounded">
                      {card.badge}
                    </span>
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-1.5 text-[#047857]">
                      <card.icon className="w-4 h-4" />
                      <span className="text-[11px] font-bold uppercase tracking-wider">{card.subtitle}</span>
                    </div>
                    <h3 className="text-sm font-bold text-[#2D1810] leading-snug">
                      {card.title}
                    </h3>
                    <p className="text-xs text-[#6B5E57] leading-relaxed pt-1">
                      {card.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 7. OFFICIAL STATUTORY NOTICES (WHITE BACKGROUND SECTION) ================= */}
      <section className="w-full bg-white py-14 sm:py-18 border-b border-[#E6E2DA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E6E2DA] pb-4">
            <div className="space-y-1">
              <div className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-[#D97706]">
                <BellRing className="w-4 h-4" />
                <span>{t('gazetteTickerBadge', language)}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-[#2D1810] tracking-tight">
                {t('recentGazetteTitle', language)}
              </h2>
            </div>

            <Link
              to="/notifications"
              className="text-xs font-bold text-[#047857] hover:text-[#065F46] flex items-center gap-1 self-start sm:self-auto"
            >
              <span>{t('viewAllGazetteNotices', language)}</span>
              <ChevronRight className="w-3.5 h-3.5 text-[#D97706]" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {officialNotices.map((notice) => (
              <div
                key={notice.id}
                className="bg-[#F8F7F4] border border-[#E6E2DA] rounded-2xl p-5 flex flex-col justify-between space-y-3 hover:border-[#047857]/40 transition shadow-sm"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#E8F5EC] text-[#047857] border border-[#047857]/20">
                      {notice.category}
                    </span>
                    <span className="text-xs text-[#6B5E57] flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#D97706]" />
                      {notice.date}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-[#2D1810] leading-snug">
                    {notice.title}
                  </h4>

                  <p className="text-xs text-[#6B5E57]">
                    {notice.corridor}
                  </p>
                  <p className="text-[11px] text-[#6B5E57] italic">
                    {notice.department}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E6E2DA] flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#FFF4D6] text-[#D97706] border border-[#D97706]/30">
                    {notice.status}
                  </span>
                  <Link
                    to={notice.to}
                    className="text-xs font-bold text-[#047857] hover:underline flex items-center gap-1"
                  >
                    <span>{t('readOrderBtn', language)}</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 8. CITIZEN ASSISTANCE, HELPLINE & ROADMAP (LIGHT GOLD SECTION) ================= */}
      <section className="w-full bg-[#FFF4D6] py-14 sm:py-18">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-[#E6E2DA] rounded-3xl shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-center">
            <div className="lg:col-span-8 p-6 sm:p-10 lg:p-12 space-y-5">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-[#FFF4D6] border border-[#D97706]/40 text-[#D97706] rounded-md text-xs font-bold">
                <Phone className="w-3.5 h-3.5" />
                <span>{t('nationalHelplineBadge', language)}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-[#2D1810] tracking-tight">
                {t('supportSectionTitle', language)}
              </h2>

              <p className="text-xs sm:text-sm text-[#6B5E57] leading-relaxed max-w-2xl">
                {t('supportSectionDesc', language)}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  to="/grievance"
                  className="px-6 py-3 bg-[#047857] hover:bg-[#065F46] text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition flex items-center space-x-2 cursor-pointer"
                >
                  <ShieldAlert className="w-4 h-4 text-[#D97706]" />
                  <span>{t('raiseGrievance', language)}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <a
                  href="tel:18001805263"
                  className="px-5 py-3 bg-[#F8F7F4] hover:bg-[#E6E2DA] text-[#2D1810] text-xs sm:text-sm font-bold rounded-xl border border-[#E6E2DA] flex items-center space-x-2 transition"
                >
                  <Phone className="w-4 h-4 text-[#047857]" />
                  <span>{t('tollFree', language)}: 1800-180-5263</span>
                </a>

                <Link
                  to="/login"
                  className="px-5 py-3 bg-white hover:bg-[#F8F7F4] text-[#047857] text-xs sm:text-sm font-bold rounded-xl border border-[#047857]/40 flex items-center space-x-1.5 transition"
                >
                  <LogIn className="w-3.5 h-3.5 text-[#047857]" />
                  <span>{t('landownerSignIn', language)}</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4 bg-[#F8F7F4] border-t lg:border-t-0 lg:border-l border-[#E6E2DA] p-6 sm:p-10 space-y-4">
              <h3 className="text-xs font-bold text-[#2D1810] uppercase tracking-wider border-b border-[#E6E2DA] pb-2">
                {t('roadmapTitle', language)}
              </h3>
              <ol className="space-y-3 text-xs text-[#6B5E57]">
                <li className="flex items-start space-x-2.5">
                  <span className="w-6 h-6 rounded-full bg-[#047857] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    1
                  </span>
                  <div>
                    <strong className="text-[#2D1810] block">{t('roadmapStep1Title', language)}:</strong>
                    {t('roadmapStep1Desc', language)}
                  </div>
                </li>
                <li className="flex items-start space-x-2.5">
                  <span className="w-6 h-6 rounded-full bg-[#047857] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    2
                  </span>
                  <div>
                    <strong className="text-[#2D1810] block">{t('roadmapStep2Title', language)}:</strong>
                    {t('roadmapStep2Desc', language)}
                  </div>
                </li>
                <li className="flex items-start space-x-2.5">
                  <span className="w-6 h-6 rounded-full bg-[#047857] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    3
                  </span>
                  <div>
                    <strong className="text-[#2D1810] block">{t('roadmapStep3Title', language)}:</strong>
                    {t('roadmapStep3Desc', language)}
                  </div>
                </li>
                <li className="flex items-start space-x-2.5">
                  <span className="w-6 h-6 rounded-full bg-[#047857] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    4
                  </span>
                  <div>
                    <strong className="text-[#2D1810] block">{t('roadmapStep4Title', language)}:</strong>
                    {t('roadmapStep4Desc', language)}
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
