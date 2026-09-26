import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore.js';
import { api } from '../services/api.js';
import { StatusBadge } from '../components/common/StatusBadge.js';
import {
  Search,
  Map,
  Coins,
  ShieldAlert,
  ShieldCheck,
  ArrowRight,
  Clock,
  AlertCircle,
  Sparkles,
  ChevronRight,
  MapPin,
  CheckCircle2,
  FileSearch,
  Phone,
  ArrowUpRight,
  Download,
  Building,
  Calendar,
  Check,
  FileText,
  HelpCircle,
  Layers,
  UploadCloud,
  FileCheck2,
  User,
  ExternalLink,
  BellRing,
  FolderLock,
  FileCheck,
  Award,
  Landmark,
  Scale,
  Eye,
  Activity,
  FileSpreadsheet,
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

export const CitizenHomePage: React.FC = () => {
  const { language, user } = useAuthStore();
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [quickSurvey, setQuickSurvey] = useState('');

  useEffect(() => {
    api.getCitizenDashboard()
      .then((res: any) => {
        if (res.success) {
          setDashboardData(res.data);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const primaryCase = dashboardData?.primaryCase;
  const parcel = primaryCase?.parcel;
  const pendingActions = dashboardData?.pendingActions || [];

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
  ]  // Statutory Milestones
  const statutoryMilestones = [
    {
      step: 1,
      name: t('stage1Name', language),
      label: t('stage1Desc', language),
      status: 'completed',
      date: '14 Jun 2026',
    },
    {
      step: 2,
      name: t('stage2Name', language),
      label: t('stage2Desc', language),
      status: 'current',
      date: 'Active Phase',
    },
    {
      step: 3,
      name: t('stage3Name', language),
      label: t('stage3Desc', language),
      status: 'upcoming',
      date: 'Scheduled Oct 2026',
    },
    {
      step: 4,
      name: t('stage4Name', language),
      label: t('stage4Desc', language),
      status: 'upcoming',
      date: 'Pending',
    },
    {
      step: 5,
      name: t('stage5Name', language),
      label: t('stage5Desc', language),
      status: 'upcoming',
      date: 'Direct to Bank',
    },
  ];

  // Quick Action Tools
  const quickActionTools = [
    {
      title: t('serviceFindLandTitle', language),
      desc: t('serviceFindLandDesc', language),
      icon: Search,
      to: '/find-land',
      bg: 'bg-[#E8F5EC]',
      border: 'border-[#047857]/20',
      textColor: 'text-[#047857]',
      badge: t('badgeCertifiedKhasra', language),
    },
    {
      title: t('navGisMap', language),
      desc: t('cadastralMapSub', language),
      icon: Map,
      to: '/map',
      bg: 'bg-[#E8F5EC]',
      border: 'border-[#047857]/20',
      textColor: 'text-[#047857]',
      badge: t('heroSlide1Metric', language),
    },
    {
      title: t('navDocIntel', language),
      desc: t('sec1119OcrDesc', language),
      icon: Sparkles,
      to: '/documents/analyze',
      bg: 'bg-[#FFF4D6]',
      border: 'border-[#D97706]/30',
      textColor: 'text-[#D97706]',
      badge: t('docIntelShowcaseBadge', language),
    },
    {
      title: t('raiseGrievance', language),
      desc: t('serviceGrievanceDesc', language),
      icon: ShieldAlert,
      to: '/grievance',
      bg: 'bg-[#FEF2F2]',
      border: 'border-[#B91C1C]/20',
      textColor: 'text-[#B91C1C]',
      badge: t('active60DayWindow', language),
    },
  ];

  // Digital Locker Documents
  const legalDocuments = [
    {
      title: t('noticeGazetteTitle', language),
      ref: 'Gazette No. LAO-BPL-2026-402',
      date: '14 Jun 2026',
      size: '2.4 MB',
      type: t('gazetteTickerBadge', language),
      status: t('status_VERIFIED', language),
      statusColor: 'bg-[#E8F5EC] text-[#047857] border-[#047857]/20',
    },
    {
      title: t('noticeHearingTitle', language),
      ref: 'Notice Ref #REV/SDM/2026/894-B',
      date: '28 Jul 2026',
      size: '1.1 MB',
      type: t('hearingNoticeTitle', language),
      status: t('active', language),
      statusColor: 'bg-[#FFF4D6] text-[#D97706] border-[#D97706]/30',
    },
    {
      title: t('heroSlide1Title', language),
      ref: 'Cadastral Sheet #1042-Rampur',
      date: '18 Aug 2026',
      size: '4.8 MB',
      type: t('navGisMap', language),
      status: t('geoVerifiedBadge', language),
      statusColor: 'bg-[#EFF6FF] text-[#2563EB] border-[#2563EB]/20',
    },
    {
      title: t('rrTitle', language),
      ref: 'R&R Schedule Draft #RNR-2026-104',
      date: '02 Sep 2026',
      size: '850 KB',
      type: t('rfctlarrFormulaBadge', language),
      status: t('status_UNDER_REVIEW', language),
      statusColor: 'bg-[#FDF2F8] text-[#BE185D] border-[#BE185D]/20',
    },
  ];

  // Recent Official Activity Feed
  const recentActivities = [
    {
      id: 1,
      icon: Calendar,
      iconColor: 'bg-[#FFF4D6] text-[#D97706]',
      title: t('noticeHearingTitle', language),
      description: t('noticeHearingDesc', language),
      timestamp: '12 Oct 2026 • 11:00 AM',
      actionText: t('viewDetails', language),
      actionTo: '/notifications',
    },
    {
      id: 2,
      icon: CheckCircle2,
      iconColor: 'bg-[#E8F5EC] text-[#047857]',
      title: t('heroSlide2Title', language),
      description: t('heroSlide2Sub', language),
      timestamp: '18 Aug 2026',
      actionText: t('viewOnMap', language),
      actionTo: '/map',
    },
    {
      id: 3,
      icon: ShieldCheck,
      iconColor: 'bg-[#EFF6FF] text-[#2563EB]',
      title: t('dbtPfmsTitle', language),
      description: t('dbtPfmsSub', language),
      timestamp: '22 Jul 2026',
      actionText: t('viewCase', language),
      actionTo: '/compensation',
    },
  ];

  return (
    <div className="space-y-8 pb-12 text-[#2D1810]">
      {/* ================= 1. WELCOMING CITIZEN WORKSPACE BANNER ================= */}
      <section className="bg-gradient-to-r from-[#E8F5EC] via-[#FDFBF7] to-[#FFF4D6] border border-[#E6E2DA] rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
        {/* Subtle Cadastral Grid Texture */}
        <div className="absolute inset-0 bg-[radial-gradient(#E6E2DA_1px,transparent_1px)] [background-size:20px_20px] opacity-35 pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            {/* Identity Badge */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#047857] text-white text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#D97706] animate-pulse"></span>
                <span>{t('authLandownerWorkspace', language)}</span>
              </span>
              <span className="text-xs text-[#6B5E57] font-semibold">
                • {t('caseRefLabel', language)}: <strong className="text-[#2D1810] font-mono">{primaryCase?.caseReference || 'LAO/BPL/2026/894'}</strong>
              </span>
              <span className="text-xs text-[#047857] font-bold bg-white/80 px-2.5 py-0.5 rounded-full border border-[#047857]/20">
                {t('landownerIdLabel', language)}: #{user?.id?.slice(0, 8) || 'SAH-MP-1042'}
              </span>
            </div>

            <div className="space-y-1">
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#2D1810]">
                {t('welcomeBack', language)}, {user?.name || 'Rajesh Sharma'}
              </h1>
              <p className="text-xs sm:text-sm text-[#6B5E57] flex flex-wrap items-center gap-2">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#047857]" />
                  <span>{t('village', language)} <strong>{parcel?.village || 'Rampur'}</strong>, {t('tehsil', language)} <strong>{parcel?.district || 'Bhopal'}</strong></span>
                </span>
                <span>•</span>
                <span>{t('surveyParcelLabel', language)}: <strong className="text-[#047857] font-mono">#{parcel?.surveyNumber || '1042'}</strong></span>
                <span>•</span>
                <span>{t('recordedArea', language)}: <strong className="text-[#2D1810] font-mono">{parcel?.recordedAreaHa || '2.43'} Ha (6.00 Acres)</strong></span>
              </p>
            </div>
          </div>

          {/* Quick Header Actions */}
          <div className="flex flex-wrap items-center gap-3 self-start lg:self-center shrink-0">
            <Link
              to={primaryCase ? `/cases/${primaryCase.id}` : '/find-land'}
              className="px-5 py-2.5 bg-[#047857] hover:bg-[#065F46] text-white text-xs font-bold rounded-xl shadow-sm transition flex items-center space-x-1.5 cursor-pointer"
            >
              <Clock className="w-4 h-4 text-[#D97706]" />
              <span>{t('fullCaseDossier', language)}</span>
            </Link>

            <Link
              to="/documents"
              className="px-4 py-2.5 bg-white hover:bg-[#F8F7F4] text-[#2D1810] text-xs font-bold rounded-xl border border-[#E6E2DA] shadow-sm transition flex items-center space-x-1.5 cursor-pointer"
            >
              <FolderLock className="w-4 h-4 text-[#047857]" />
              <span>{t('digitalLocker', language)}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ================= 2. QUICK ACTIONS TOOLBAR ================= */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActionTools.map((tool, idx) => (
          <Link
            key={idx}
            to={tool.to}
            className={`bg-white border ${tool.border} hover:border-[#047857] rounded-2xl p-4 flex flex-col justify-between shadow-sm hover:shadow-md hover:-translate-y-0.5 transition cursor-pointer group space-y-3`}
          >
            <div className="flex items-center justify-between">
              <div className={`w-10 h-10 rounded-xl ${tool.bg} ${tool.textColor} flex items-center justify-center shrink-0 group-hover:scale-105 transition`}>
                <tool.icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-[#6B5E57] bg-[#F8F7F4] px-2 py-0.5 rounded-md border border-[#E6E2DA]">
                {tool.badge}
              </span>
            </div>
            <div>
              <h3 className="text-xs font-bold text-[#2D1810] group-hover:text-[#047857] transition flex items-center justify-between">
                <span>{tool.title}</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#D97706] group-hover:translate-x-1 transition" />
              </h3>
              <p className="text-[11px] text-[#6B5E57] mt-0.5">
                {tool.desc}
              </p>
            </div>
          </Link>
        ))}
      </section>

      {/* Priority Action Required Strip */}
      {pendingActions.length > 0 && (
        <section className="bg-[#FFF4D6] border border-[#D97706]/40 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-sm">
          <div className="flex items-center space-x-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#D97706] text-white flex items-center justify-center shrink-0 shadow-sm">
              <AlertCircle className="w-4 h-4" />
            </div>
            <div>
              <strong className="text-[#D97706] block font-bold">
                {t('actionRequiredStrip', language)} ({pendingActions.length} {t('pendingTaskCount', language)}):
              </strong>
              <span className="text-[#2D1810] font-medium">
                {pendingActions[0]?.title || t('actionSubmitBankDesc', language)}
              </span>
            </div>
          </div>
          <Link
            to="/actions"
            className="px-4 py-2 bg-[#047857] hover:bg-[#065F46] text-white text-xs font-bold rounded-xl shadow-sm transition flex items-center space-x-1 self-end sm:self-auto shrink-0 cursor-pointer"
          >
            <span>{t('reviewTaskBtn', language)}</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#D97706]" />
          </Link>
        </section>
      )}

      {/* ================= 3. OPERATIONAL KPI METRICS BAR ================= */}
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {/* Metric 1 */}
        <div className="bg-white border border-[#E6E2DA] rounded-2xl p-4 shadow-sm space-y-1">
          <span className="text-[10px] font-bold text-[#6B5E57] uppercase tracking-wider block">
            {t('surveyedPlot', language)}
          </span>
          <div className="text-lg font-black text-[#2D1810] font-mono">
            #{parcel?.surveyNumber || '1042'}
          </div>
          <span className="text-xs text-[#6B5E57] block truncate">
            {parcel?.village || 'Rampur'} • {parcel?.recordedAreaHa || '2.43'} ha
          </span>
        </div>

        {/* Metric 2 */}
        <div className="bg-white border border-[#E6E2DA] rounded-2xl p-4 shadow-sm space-y-1">
          <span className="text-[10px] font-bold text-[#6B5E57] uppercase tracking-wider block">
            {t('statutoryStage', language)}
          </span>
          <div className="pt-0.5">
            <StatusBadge status={primaryCase?.stage || 'VERIFICATION'} />
          </div>
          <span className="text-[10px] text-[#6B5E57] block pt-1">
            {t('section1115Active', language)}
          </span>
        </div>

        {/* Metric 3 */}
        <div className="bg-white border border-[#E6E2DA] rounded-2xl p-4 shadow-sm space-y-1">
          <span className="text-[10px] font-bold text-[#6B5E57] uppercase tracking-wider block">
            {t('assessedAward', language)}
          </span>
          <div className="text-lg font-black text-[#047857] font-mono">
            ₹38,40,000
          </div>
          <span className="text-[10px] text-[#6B5E57] block">
            {t('solatiumMandated', language)}
          </span>
        </div>

        {/* Metric 4 */}
        <div className="bg-white border border-[#E6E2DA] rounded-2xl p-4 shadow-sm space-y-1">
          <span className="text-[10px] font-bold text-[#6B5E57] uppercase tracking-wider block">
            {t('rrGrant', language)}
          </span>
          <div className="text-lg font-black text-[#2D1810] font-mono">
            ₹5,00,000
          </div>
          <span className="text-[10px] text-[#6B5E57] block">
            {t('schedule2Entitlement', language)}
          </span>
        </div>

        {/* Metric 5 */}
        <div className="bg-white border border-[#E6E2DA] rounded-2xl p-4 shadow-sm space-y-1 col-span-2 sm:col-span-1">
          <span className="text-[10px] font-bold text-[#6B5E57] uppercase tracking-wider block">
            {t('disbursalChannel', language)}
          </span>
          <div className="text-base font-bold text-[#047857] flex items-center gap-1 pt-0.5">
            <CheckCircle2 className="w-4 h-4 text-[#047857]" />
            <span>{t('directDbt', language)}</span>
          </div>
          <span className="text-[10px] text-[#6B5E57] block">
            {t('pfmsLinked', language)}
          </span>
        </div>
      </section>

      {/* ================= 4. MAIN WORKSPACE (7 COLS : 5 COLS) ================= */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (7 cols): Milestone Tracker + Compensation Dossier + Documents + Khasra Search */}
        <div className="lg:col-span-7 space-y-6">
          {/* Card 1: Statutory Acquisition Milestone Lifecycle */}
          <div className="bg-white border border-[#E6E2DA] rounded-3xl p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-[#E6E2DA] pb-3">
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold text-[#D97706] uppercase tracking-wider block">
                  {t('statutoryLifecycleBadge', language)}
                </span>
                <h2 className="text-base sm:text-lg font-black text-[#2D1810]">
                  {t('milestoneTrackerTitle', language)}
                </h2>
              </div>
              <span className="text-xs font-bold text-[#047857] bg-[#E8F5EC] px-2.5 py-1 rounded-md border border-[#047857]/20">
                {t('phase2of5Active', language)}
              </span>
            </div>

            {/* Step Progress Timeline */}
            <div className="space-y-3">
              <div className="grid grid-cols-5 gap-1.5 text-center text-[10px]">
                {statutoryMilestones.map((ms) => (
                  <div key={ms.step} className="space-y-1">
                    <div
                      className={`h-2.5 rounded-full ${
                        ms.status === 'completed'
                          ? 'bg-[#047857]'
                          : ms.status === 'current'
                          ? 'bg-[#D97706]'
                          : 'bg-[#E6E2DA]'
                      }`}
                    ></div>
                    <span className="font-bold block text-[#2D1810] truncate">{ms.name}</span>
                    <span className="text-[9px] text-[#6B5E57] hidden sm:block truncate">{ms.label}</span>
                  </div>
                ))}
              </div>

              <div className="bg-[#F8F7F4] border border-[#E6E2DA] rounded-2xl p-4 text-xs space-y-2">
                <div className="flex items-center justify-between text-[#2D1810]">
                  <strong className="font-bold flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#D97706]" />
                    <span>{t('currentStageSec15', language)}</span>
                  </strong>
                  <span className="text-[11px] font-bold text-[#047857]">{t('active60DayWindow', language)}</span>
                </div>
                <p className="text-[#6B5E57] leading-relaxed">
                  {t('sec15StageDesc', language)}
                </p>
                <div className="pt-1 flex flex-wrap items-center gap-3">
                  <Link
                    to="/grievance"
                    className="text-xs font-bold text-[#047857] hover:underline flex items-center gap-1"
                  >
                    <span>{t('lodgeSec15Objection', language)}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#D97706]" />
                  </Link>
                  <span className="text-[#E6E2DA]">|</span>
                  <Link
                    to="/notifications"
                    className="text-xs font-semibold text-[#6B5E57] hover:text-[#2D1810]"
                  >
                    {t('viewHearingSummons', language)}
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Detailed Parcel & Statutory Valuation Dossier */}
          <div className="bg-white border border-[#E6E2DA] rounded-3xl p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-[#E6E2DA] pb-3">
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold text-[#047857] uppercase tracking-wider block">
                  {t('badgeStatutoryFormula', language)}
                </span>
                <h2 className="text-base sm:text-lg font-black text-[#2D1810]">
                  {t('breakdownTitle', language)}
                </h2>
              </div>
              <Link
                to="/compensation"
                className="text-xs font-bold text-[#047857] hover:underline flex items-center gap-1"
              >
                <span>{t('viewDetails', language)}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#D97706]" />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-[#F8F7F4] p-3.5 rounded-2xl border border-[#E6E2DA]">
                <span className="text-[11px] text-[#6B5E57] block">{t('notifiedAcqArea', language)}:</span>
                <span className="font-bold text-[#2D1810] text-sm font-mono">2.43 Hectares</span>
                <span className="text-[10px] text-[#6B5E57] block">6.00 Acres • {t('doubleCropped', language)}</span>
              </div>

              <div className="bg-[#F8F7F4] p-3.5 rounded-2xl border border-[#E6E2DA]">
                <span className="text-[11px] text-[#6B5E57] block">{t('marketValueAssessment', language)}:</span>
                <span className="font-bold text-[#2D1810] text-sm font-mono">₹19,20,000</span>
                <span className="text-[10px] text-[#6B5E57] block">{t('circleRateMultiplier', language)}: 1.00</span>
              </div>

              <div className="bg-[#E8F5EC] p-3.5 rounded-2xl border border-[#047857]/20">
                <span className="text-[11px] text-[#047857] font-semibold block">{t('solatium100Label', language)}:</span>
                <span className="font-bold text-[#047857] text-sm font-mono">+₹19,20,000</span>
                <span className="text-[10px] text-[#047857] block">{t('sec301StatutoryRule', language)}</span>
              </div>

              <div className="bg-[#FFF4D6] p-3.5 rounded-2xl border border-[#D97706]/30">
                <span className="text-[11px] text-[#D97706] font-semibold block">{t('rrGrantLabel', language)}:</span>
                <span className="font-bold text-[#D97706] text-sm font-mono">₹5,00,000</span>
                <span className="text-[10px] text-[#6B5E57] block">{t('resettlementMandatory', language)}</span>
              </div>

              <div className="col-span-2 bg-[#047857] text-white p-4 sm:p-5 rounded-2xl flex items-center justify-between shadow-sm">
                <div>
                  <span className="text-xs text-slate-200 block">{t('totalAssessedStatutoryAward', language)}:</span>
                  <span className="text-2xl font-black font-mono">₹38,40,000</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] bg-white text-[#047857] px-2.5 py-1 rounded-md font-bold uppercase block shadow-sm">
                    {t('pfmsVerified', language)}
                  </span>
                  <span className="text-[11px] text-slate-200 block mt-1">{t('disbursalDirectBank', language)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Digital Locker & Legal Documents */}
          <div className="bg-white border border-[#E6E2DA] rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-[#E6E2DA] pb-3">
              <div className="flex items-center space-x-2">
                <FolderLock className="w-5 h-5 text-[#047857]" />
                <div>
                  <h3 className="text-sm font-bold text-[#2D1810]">
                    {t('verifiedLegalDocs', language)}
                  </h3>
                  <p className="text-xs text-[#6B5E57]">
                    {t('officialFilesStored', language)}
                  </p>
                </div>
              </div>
              <Link
                to="/documents"
                className="text-xs font-bold text-[#047857] hover:underline"
              >
                {t('viewAllFiles', language)}
              </Link>
            </div>

            <div className="space-y-2.5">
              {legalDocuments.map((doc, idx) => (
                <div
                  key={idx}
                  className="bg-[#F8F7F4] border border-[#E6E2DA] hover:border-[#047857]/40 rounded-2xl p-3.5 flex items-center justify-between transition group"
                >
                  <div className="flex items-center space-x-3 overflow-hidden">
                    <div className="w-9 h-9 rounded-xl bg-white border border-[#E6E2DA] flex items-center justify-center text-[#047857] shrink-0 group-hover:scale-105 transition">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div className="overflow-hidden">
                      <h4 className="text-xs font-bold text-[#2D1810] group-hover:text-[#047857] transition truncate">
                        {doc.title}
                      </h4>
                      <div className="flex items-center space-x-2 text-[11px] text-[#6B5E57]">
                        <span>{doc.ref}</span>
                        <span>•</span>
                        <span>{doc.size}</span>
                        <span>•</span>
                        <span>{doc.date}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 shrink-0 ml-3">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${doc.statusColor}`}>
                      {doc.status}
                    </span>
                    <Link
                      to="/documents"
                      className="p-1.5 text-[#6B5E57] hover:text-[#047857] bg-white border border-[#E6E2DA] rounded-lg transition"
                      title={t('download', language)}
                    >
                      <Download className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card 4: Quick Search Additional Khasra Records */}
          <div className="bg-white border border-[#E6E2DA] rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex items-center space-x-2 border-b border-[#E6E2DA] pb-3">
              <Search className="w-5 h-5 text-[#047857]" />
              <div>
                <h3 className="text-sm font-bold text-[#2D1810]">
                  {t('searchAdditionalKhasra', language)}
                </h3>
                <p className="text-xs text-[#6B5E57]">
                  {t('searchAdditionalKhasraDesc', language)}
                </p>
              </div>
            </div>

            <form onSubmit={handleQuickSearch} className="grid grid-cols-1 sm:grid-cols-12 gap-3">
              <div className="sm:col-span-9">
                <input
                  type="text"
                  value={quickSurvey}
                  onChange={(e) => setQuickSurvey(e.target.value)}
                  placeholder={t('searchPlaceholderLanding', language)}
                  className="w-full px-4 py-2.5 border border-[#E6E2DA] rounded-xl text-xs sm:text-sm font-medium focus:outline-none focus:border-[#047857] bg-[#F8F7F4] text-[#2D1810]"
                />
              </div>

              <div className="sm:col-span-3">
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-[#047857] hover:bg-[#065F46] text-white text-xs sm:text-sm font-bold rounded-xl flex items-center justify-center space-x-1.5 shadow-sm cursor-pointer transition"
                >
                  <Search className="w-4 h-4 text-[#D97706]" />
                  <span>{t('searchRecordsBtn', language)}</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column (5 cols): Cadastral Leaflet GIS + Activity Feed + Notice OCR + SDM Contact */}
        <div className="lg:col-span-5 space-y-6">
          {/* Card A: Interactive Cadastral GIS Workspace */}
          <div className="bg-white border border-[#E6E2DA] rounded-3xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-[#E6E2DA] pb-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-[#E8F5EC] text-[#047857] flex items-center justify-center font-bold">
                  <Map className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#2D1810]">
                    {t('navGisMap', language)} #{parcel?.surveyNumber || '1042'}
                  </h3>
                  <span className="text-[11px] text-[#6B5E57]">
                    {t('geoVerifiedBadge', language)} • NH-46
                  </span>
                </div>
              </div>
              <Link
                to="/map"
                className="text-xs font-bold text-[#047857] hover:underline"
              >
                {t('expandMap', language)}
              </Link>
            </div>

            {/* Embedded Live Leaflet Map */}
            <div className="h-64 w-full rounded-2xl overflow-hidden border border-[#E6E2DA] relative">
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
                      <strong className="text-[#047857] block">
                        #{parcel?.surveyNumber || '1042'}
                      </strong>
                      <div>{parcel?.village || 'Rampur'}, {parcel?.district || 'Bhopal'}</div>
                      <div className="font-bold text-[#047857]">{t('recordedArea', language)}: {parcel?.recordedAreaHa || '2.43'} ha</div>
                    </div>
                  </Popup>
                </Marker>
              </MapContainer>
            </div>

            <Link
              to="/map"
              className="w-full py-2.5 px-4 bg-[#047857] hover:bg-[#065F46] text-white text-xs font-bold rounded-xl shadow-sm transition flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>{t('launchFullGis', language)}</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#D97706]" />
            </Link>
          </div>

          {/* Card B: Recent Case Activity & Notifications */}
          <div className="bg-white border border-[#E6E2DA] rounded-3xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-[#E6E2DA] pb-3">
              <div className="flex items-center space-x-2">
                <BellRing className="w-4 h-4 text-[#047857]" />
                <h3 className="text-sm font-bold text-[#2D1810]">
                  {t('officialSummonsActivity', language)}
                </h3>
              </div>
              <Link
                to="/notifications"
                className="text-xs font-bold text-[#047857] hover:underline"
              >
                {t('allNotices', language)}
              </Link>
            </div>

            <div className="space-y-3">
              {recentActivities.map((act) => (
                <div
                  key={act.id}
                  className="bg-[#F8F7F4] border border-[#E6E2DA] rounded-2xl p-3.5 space-y-2 text-xs"
                >
                  <div className="flex items-start space-x-2.5">
                    <div className={`w-7 h-7 rounded-lg ${act.iconColor} flex items-center justify-center shrink-0 mt-0.5`}>
                      <act.icon className="w-3.5 h-3.5" />
                    </div>
                    <div className="space-y-0.5">
                      <h4 className="font-bold text-[#2D1810]">{act.title}</h4>
                      <p className="text-[11px] text-[#6B5E57] leading-relaxed">
                        {act.description}
                      </p>
                      <span className="text-[10px] text-[#D97706] font-semibold block pt-0.5">
                        {act.timestamp}
                      </span>
                    </div>
                  </div>
                  <div className="pt-1 border-t border-[#E6E2DA]/60 flex justify-end">
                    <Link
                      to={act.actionTo}
                      className="text-[11px] font-bold text-[#047857] hover:underline flex items-center gap-1"
                    >
                      <span>{act.actionText}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-[#D97706]" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card C: Notice OCR & Legal Document Intelligence */}
          <div className="bg-[#FFF4D6] border border-[#D97706]/40 rounded-3xl p-5 space-y-3.5 shadow-sm">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-[#D97706] text-white flex items-center justify-center shadow-sm">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#2D1810]">
                  {t('sec1119OcrTitle', language)}
                </h3>
                <span className="text-[11px] text-[#6B5E57]">
                  {t('sec1119OcrSub', language)}
                </span>
              </div>
            </div>

            <p className="text-xs text-[#6B5E57] leading-relaxed">
              {t('sec1119OcrDesc', language)}
            </p>

            <Link
              to="/documents/analyze"
              className="w-full py-2.5 px-4 bg-white hover:bg-[#F8F7F4] text-[#2D1810] border border-[#D97706]/40 text-xs font-bold rounded-xl shadow-sm transition flex items-center justify-center space-x-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#D97706]" />
              <span>{t('analyzeGazetteNotice', language)}</span>
            </Link>
          </div>

          {/* Card D: Sub-Divisional Magistrate Land Acquisition Office Contact */}
          <div className="bg-white border border-[#E6E2DA] rounded-3xl p-5 space-y-3 shadow-sm text-xs">
            <div className="flex items-center space-x-2 border-b border-[#E6E2DA] pb-2 font-bold text-[#2D1810]">
              <Building className="w-4 h-4 text-[#047857]" />
              <span>{t('calaTitle', language)}</span>
            </div>
            <div className="space-y-1.5 text-[#6B5E57]">
              <div><strong>{t('officeLabel', language)}:</strong> {t('officeSdmRev', language)}</div>
              <div><strong>{t('district', language)}:</strong> Collectorate Campus, Bhopal, MP</div>
              <div><strong>{t('helpdesk', language)}:</strong> 1800-180-5263 • <span className="text-[#047857] font-semibold">{t('tollFree', language)}</span></div>
            </div>
            <div className="pt-1">
              <Link
                to="/grievance"
                className="w-full py-2 px-3 bg-[#F8F7F4] hover:bg-[#E6E2DA] text-[#047857] border border-[#047857]/30 text-xs font-bold rounded-xl transition flex items-center justify-center space-x-1 cursor-pointer"
              >
                <ShieldAlert className="w-3.5 h-3.5 text-[#D97706]" />
                <span>{t('submitGrievanceCollectorate', language)}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
