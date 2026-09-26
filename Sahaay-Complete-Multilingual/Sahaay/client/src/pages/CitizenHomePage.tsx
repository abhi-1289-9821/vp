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
  Check,
} from 'lucide-react';
import { MapContainer, TileLayer, Polygon, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { t } from '../lib/i18n.js';

const miniMarkerIcon = new L.DivIcon({
  className: 'custom-leaflet-marker',
  html: `<div style="background-color:#123B5D; color:#E8B84A; border-radius:6px; width:26px; height:26px; display:flex; align-items:center; justify-content:center; border:2px solid #E8B84A; box-shadow:0 2px 6px rgba(0,0,0,0.25); font-weight:bold; font-size:12px;">📍</div>`,
  iconSize: [26, 26],
  iconAnchor: [13, 26],
});

export const CitizenHomePage: React.FC = () => {
  const { language } = useAuthStore();
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
  ];

  const citizenServices = [
    {
      title: t('serviceFindLandTitle', language),
      desc: t('serviceFindLandDesc', language),
      icon: Search,
      to: '/find-land',
      bgTint: 'bg-[#EAF3F8]',
      iconColor: 'text-[#123B5D]',
    },
    {
      title: t('serviceTrackCaseTitle', language),
      desc: t('serviceTrackCaseDesc', language),
      icon: Clock,
      to: primaryCase ? `/cases/${primaryCase.id}` : '/find-land',
      bgTint: 'bg-[#FFF9F0]',
      iconColor: 'text-[#C7972D]',
    },
    {
      title: t('serviceUnderstandDocTitle', language),
      desc: t('serviceUnderstandDocDesc', language),
      icon: Sparkles,
      to: '/documents/analyze',
      bgTint: 'bg-[#FFF9F0]',
      iconColor: 'text-[#123B5D]',
    },
    {
      title: t('serviceCheckCompTitle', language),
      desc: t('serviceCheckCompDesc', language),
      icon: Coins,
      to: '/compensation',
      bgTint: 'bg-[#E8F4EC]',
      iconColor: 'text-[#2E7D5B]',
    },
    {
      title: t('serviceRRTitle', language),
      desc: t('serviceRRDesc', language),
      icon: ShieldCheck,
      to: '/compensation',
      bgTint: 'bg-[#EAF3F8]',
      iconColor: 'text-[#123B5D]',
    },
    {
      title: t('serviceDiscrepancyTitle', language),
      desc: t('serviceDiscrepancyDesc', language),
      icon: AlertCircle,
      to: '/documents/analyze',
      bgTint: 'bg-[#FBECEC]',
      iconColor: 'text-[#C62828]',
    },
    {
      title: t('serviceGrievanceTitle', language),
      desc: t('serviceGrievanceDesc', language),
      icon: ShieldAlert,
      to: '/grievance',
      bgTint: 'bg-[#FFF9F0]',
      iconColor: 'text-[#C7972D]',
    },
    {
      title: t('serviceNoticesTitle', language),
      desc: t('serviceNoticesDesc', language),
      icon: AlertCircle,
      to: '/notifications',
      bgTint: 'bg-[#EAF3F8]',
      iconColor: 'text-[#123B5D]',
    },
  ];

  return (
    <div className="space-y-12 sm:space-y-16">
      {/* ================= 1. CITIZEN-FIRST HERO SECTION ================= */}
      <section className="bg-white border border-[#DDE6EC] rounded-xl shadow-soft overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          {/* Left Column (7 cols): Copy & Primary CTAs */}
          <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-[#EAF3F8] border border-[#DDE6EC] px-3 py-1 rounded-md text-xs font-semibold text-[#123B5D]">
                <span className="w-2 h-2 rounded-full bg-[#E8B84A]"></span>
                <span>{t('heroBadge', language)}</span>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-[#E8B84A] block">
                  {t('appName', language)}
                </span>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#123B5D] tracking-tight leading-tight">
                  {t('heroTitle', language)}
                </h1>
              </div>

              <p className="text-sm sm:text-base text-[#667784] font-normal leading-relaxed max-w-2xl">
                {t('heroDesc', language)}
              </p>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                to="/find-land"
                className="px-5 py-3 bg-[#123B5D] hover:bg-[#1B4D78] text-white text-xs sm:text-sm font-semibold rounded-lg shadow-soft transition flex items-center space-x-2 cursor-pointer"
              >
                <Search className="w-4 h-4 text-[#E8B84A]" />
                <span>{t('findLandBtn', language)}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              {primaryCase ? (
                <Link
                  to={`/cases/${primaryCase.id}`}
                  className="px-5 py-3 bg-white hover:bg-[#F8FAFC] text-[#123B5D] text-xs sm:text-sm font-semibold rounded-lg border border-[#DDE6EC] shadow-soft transition flex items-center space-x-2 cursor-pointer"
                >
                  <Clock className="w-4 h-4 text-[#E8B84A]" />
                  <span>{t('trackCaseBtn', language)} (#{primaryCase.caseReference})</span>
                </Link>
              ) : (
                <Link
                  to="/find-land"
                  className="px-5 py-3 bg-white hover:bg-[#F8FAFC] text-[#123B5D] text-xs sm:text-sm font-semibold rounded-lg border border-[#DDE6EC] shadow-soft transition flex items-center space-x-2 cursor-pointer"
                >
                  <Clock className="w-4 h-4 text-[#E8B84A]" />
                  <span>{t('trackCaseBtn', language)}</span>
                </Link>
              )}

              <Link
                to="/documents/analyze"
                className="px-4 py-3 bg-[#FFF9F0] hover:bg-[#FFF3E0] text-[#123B5D] text-xs sm:text-sm font-semibold rounded-lg border border-[#E8B84A] transition flex items-center space-x-1.5 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#C7972D]" />
                <span>{t('understandDocBtn', language)}</span>
              </Link>
            </div>

            {/* Micro reassurance badges */}
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-[#667784] border-t border-[#DDE6EC]/60">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#2E7D5B]" />
                {t('badgeStatutoryFormula', language)}
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#2E7D5B]" />
                {t('badgeCertifiedKhasra', language)}
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#2E7D5B]" />
                {t('badgeSection15', language)}
              </span>
            </div>
          </div>

          {/* Right Column (5 cols): Authentic Indian Land Photography with Floating UI Overlay */}
          <div className="lg:col-span-5 relative min-h-[320px] lg:min-h-full bg-slate-100 flex items-center justify-center overflow-hidden">
            <img
              src="/images/hero_land.jpg"
              alt="Indian agricultural land parcel"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            {/* Soft gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#123B5D]/70 via-[#123B5D]/20 to-transparent"></div>

            {/* Floating Live Parcel Dossier Pill */}
            <div className="relative z-10 m-4 sm:m-6 w-full max-w-sm bg-white/95 backdrop-blur-sm border border-white/80 p-4 rounded-xl shadow-soft-lg space-y-3">
              <div className="flex items-center justify-between border-b border-[#DDE6EC] pb-2">
                <div className="flex items-center space-x-1.5">
                  <MapPin className="w-4 h-4 text-[#123B5D]" />
                  <span className="text-xs font-bold text-[#123B5D]">
                    {t('surveyParcelLabel', language)} #{parcel?.surveyNumber || '1042'}
                  </span>
                </div>
                <StatusBadge status={primaryCase?.stage || 'VERIFICATION'} />
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-[#667784] text-[11px] block">{t('villageTehsilLabel', language)}:</span>
                  <span className="font-semibold text-[#243746]">{parcel?.village || 'Rampur'}, {parcel?.district || 'Bhopal'}</span>
                </div>
                <div>
                  <span className="text-[#667784] text-[11px] block">{t('recordedArea', language)}:</span>
                  <span className="font-bold text-[#2E7D5B] font-mono">{parcel?.recordedAreaHa || '2.43'} ha</span>
                </div>
                <div className="col-span-2 pt-1 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[#667784] text-[11px]">{t('totalAssessedComp', language)}:</span>
                  <span className="font-bold text-[#123B5D]">₹38,40,000</span>
                </div>
              </div>

              <Link
                to="/map"
                className="w-full py-1.5 px-3 bg-[#EAF3F8] hover:bg-[#DDE6EC] text-[#123B5D] text-xs font-semibold rounded-md flex items-center justify-center space-x-1 transition cursor-pointer"
              >
                <span>{t('viewCadastralMapBtn', language)}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Action strip if pending verification action exists */}
        {pendingActions.length > 0 && (
          <div className="bg-[#FFF9F0] border-t border-[#E8B84A]/60 px-6 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-[#C7972D] shrink-0" />
              <span className="text-[#243746] font-medium">
                <strong>{t('actionRequired', language)} ({pendingActions.length} {t('pending', language)}):</strong> {pendingActions[0]?.title}
              </span>
            </div>
            <Link
              to="/actions"
              className="text-[#123B5D] hover:text-[#1B4D78] font-bold text-xs uppercase tracking-wider flex items-center gap-1 self-end sm:self-auto cursor-pointer"
            >
              <span>{t('viewDetails', language)}</span>
              <ChevronRight className="w-3.5 h-3.5 text-[#E8B84A]" />
            </Link>
          </div>
        )}
      </section>

      {/* ================= 2. CITIZEN SERVICES ================= */}
      <section className="space-y-6">
        <div className="text-center sm:text-left space-y-1">
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#123B5D] tracking-tight">
            {t('servicesSectionTitle', language)}
          </h2>
          <p className="text-xs sm:text-sm text-[#667784]">
            {t('servicesSectionSub', language)}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {citizenServices.map((service, idx) => (
            <Link
              key={idx}
              to={service.to}
              className="soft-card p-5 flex flex-col justify-between group cursor-pointer"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className={`w-10 h-10 rounded-lg ${service.bgTint} ${service.iconColor} flex items-center justify-center transition group-hover:scale-105`}>
                    <service.icon className="w-5 h-5" />
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#667784] group-hover:translate-x-1 group-hover:text-[#123B5D] transition" />
                </div>

                <div>
                  <h3 className="text-sm font-bold text-[#123B5D] group-hover:text-[#1B4D78] transition">
                    {service.title}
                  </h3>
                  <p className="text-xs text-[#667784] mt-1 leading-relaxed">
                    {service.desc}
                  </p>
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-[#DDE6EC] flex items-center text-xs font-semibold text-[#123B5D]">
                <span>{t('viewDetails', language)}</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1 text-[#E8B84A]" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ================= 3. QUICK STATUS / DASHBOARD OVERVIEW ================= */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-[#DDE6EC] pb-2">
          <div className="space-y-0.5">
            <h2 className="text-lg sm:text-xl font-extrabold text-[#123B5D] tracking-tight">
              {t('timelineSectionTitle', language)}
            </h2>
            <p className="text-xs text-[#667784]">
              {t('timelineSectionSub', language)}
            </p>
          </div>
          {primaryCase && (
            <Link
              to={`/cases/${primaryCase.id}`}
              className="text-xs font-semibold text-[#123B5D] hover:underline flex items-center gap-1"
            >
              <span>{t('viewCase', language)}</span>
              <ChevronRight className="w-3.5 h-3.5 text-[#E8B84A]" />
            </Link>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
          {/* Card 1: My Land */}
          <div className="soft-card p-4 space-y-1">
            <span className="text-[11px] font-semibold text-[#667784] uppercase tracking-wider block">
              {t('myLand', language)}
            </span>
            <div className="text-base font-bold text-[#123B5D] font-mono">
              #{parcel?.surveyNumber || '1042'}
            </div>
            <span className="text-xs text-[#667784] block truncate">
              {parcel?.village || 'Rampur'} • {parcel?.recordedAreaHa || '2.43'} ha
            </span>
          </div>

          {/* Card 2: Acquisition Stage */}
          <div className="soft-card p-4 space-y-1">
            <span className="text-[11px] font-semibold text-[#667784] uppercase tracking-wider block">
              {t('status', language)}
            </span>
            <div className="pt-0.5">
              <StatusBadge status={primaryCase?.stage || 'VERIFICATION'} />
            </div>
            <span className="text-[11px] text-[#667784] block pt-1">
              RFCTLARR 2013
            </span>
          </div>

          {/* Card 3: Compensation */}
          <div className="soft-card p-4 space-y-1">
            <span className="text-[11px] font-semibold text-[#667784] uppercase tracking-wider block">
              {t('compensation', language)}
            </span>
            <div className="text-base font-bold text-[#2E7D5B] font-mono">
              ₹38,40,000
            </div>
            <span className="text-[11px] text-[#667784] block">
              {t('solatium', language)}
            </span>
          </div>

          {/* Card 4: R&R Grant */}
          <div className="soft-card p-4 space-y-1">
            <span className="text-[11px] font-semibold text-[#667784] uppercase tracking-wider block">
              {t('rr', language)}
            </span>
            <div className="text-base font-bold text-[#123B5D] font-mono">
              ₹5,00,000
            </div>
            <span className="text-[11px] text-[#667784] block">
              Schedule II
            </span>
          </div>

          {/* Card 5: Pending Actions */}
          <div className="soft-card p-4 space-y-1 col-span-2 sm:col-span-1">
            <span className="text-[11px] font-semibold text-[#667784] uppercase tracking-wider block">
              {t('actions', language)}
            </span>
            <div className="text-base font-bold text-[#C7972D] font-mono">
              {pendingActions.length} {t('pending', language)}
            </div>
            <span className="text-[11px] text-[#667784] block">
              {t('actionRequired', language)}
            </span>
          </div>
        </div>
      </section>

      {/* ================= 4. GIS MAP PREVIEW ================= */}
      <section className="bg-white border border-[#DDE6EC] rounded-xl shadow-soft overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Left info panel (5 cols) */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 bg-[#EAF3F8] text-[#123B5D] rounded-md text-xs font-semibold">
                <Map className="w-3.5 h-3.5 text-[#E8B84A]" />
                <span>{t('cadastralMapTitle', language)}</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-extrabold text-[#123B5D] tracking-tight">
                {t('cadastralMapSub', language)}
              </h2>

              <p className="text-xs sm:text-sm text-[#667784] leading-relaxed">
                {t('gisSub', language)}
              </p>

              <div className="space-y-2 pt-2 text-xs">
                <div className="flex items-center space-x-2 text-[#243746]">
                  <span className="w-2 h-2 rounded-full bg-[#2E7D5B]"></span>
                  <span><strong>{t('legendNotified', language)}:</strong> #{parcel?.surveyNumber || '1042'} (2.43 ha)</span>
                </div>
                <div className="flex items-center space-x-2 text-[#243746]">
                  <span className="w-2 h-2 rounded-full bg-[#123B5D]"></span>
                  <span><strong>{t('legendHighway', language)}</strong></span>
                </div>
              </div>
            </div>

            <Link
              to="/map"
              className="inline-flex items-center space-x-2 px-4 py-2.5 bg-[#123B5D] hover:bg-[#1B4D78] text-white text-xs font-semibold rounded-lg shadow-soft transition cursor-pointer self-start"
            >
              <span>{t('openFullMapBtn', language)}</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#E8B84A]" />
            </Link>
          </div>

          {/* Right Leaflet Map Preview (7 cols) */}
          <div className="lg:col-span-7 h-72 sm:h-96 relative border-t lg:border-t-0 lg:border-l border-[#DDE6EC]">
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
                  color: '#2E7D5B',
                  fillColor: '#2E7D5B',
                  fillOpacity: 0.35,
                  weight: 3,
                }}
              />
              <Marker position={[23.2625, 77.4150]} icon={miniMarkerIcon}>
                <Popup>
                  <div className="text-xs p-1">
                    <strong>{t('surveyNo', language)}: #{parcel?.surveyNumber || '1042'}</strong>
                    <br />
                    {t('village', language)}: {parcel?.village || 'Rampur'}
                    <br />
                    {t('recordedArea', language)}: {parcel?.recordedAreaHa || '2.43'} ha
                  </div>
                </Popup>
              </Marker>
            </MapContainer>

            {/* Floating Info Pill */}
            <div className="absolute top-3 right-3 z-[1000] bg-white/95 backdrop-blur-sm border border-[#DDE6EC] p-3 rounded-lg shadow-soft text-xs space-y-1">
              <div className="font-bold text-[#123B5D]">#{parcel?.surveyNumber || '1042'}</div>
              <div className="text-[11px] text-[#667784]">{parcel?.village || 'Rampur'}, {parcel?.district || 'Bhopal'}</div>
              <div className="text-[11px] font-semibold text-[#2E7D5B]">{t('recordedArea', language)}: 2.43 ha</div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 5. FAST SURVEY SEARCH WIDGET ================= */}
      <section className="soft-card p-6 sm:p-8 space-y-4">
        <div className="flex items-center space-x-2 border-b border-[#DDE6EC] pb-3">
          <Search className="w-5 h-5 text-[#123B5D]" />
          <div>
            <h3 className="text-base font-bold text-[#123B5D]">
              {t('searchBySurveyTitle', language)}
            </h3>
            <p className="text-xs text-[#667784]">
              {t('landSearchSub', language)}
            </p>
          </div>
        </div>

        <form onSubmit={handleQuickSearch} className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-9">
            <input
              type="text"
              value={quickSurvey}
              onChange={(e) => setQuickSurvey(e.target.value)}
              placeholder={t('enterSurveyPlaceholder', language)}
              className="w-full px-4 py-2.5 border border-[#DDE6EC] rounded-lg text-xs sm:text-sm font-medium focus:outline-none focus:border-[#123B5D] bg-[#F8FAFC] text-[#243746]"
            />
          </div>

          <div className="sm:col-span-3">
            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-[#123B5D] hover:bg-[#1B4D78] text-white text-xs sm:text-sm font-semibold rounded-lg flex items-center justify-center space-x-1.5 shadow-soft cursor-pointer transition"
            >
              <Search className="w-4 h-4 text-[#E8B84A]" />
              <span>{t('searchLandBtn', language)}</span>
            </button>
          </div>
        </form>
      </section>

      {/* ================= 6. DOCUMENT INTELLIGENCE ================= */}
      <section className="bg-[#FFF9F0] border border-[#E8B84A]/60 rounded-xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C7972D] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              {t('aiAnalysis', language)}
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#123B5D] tracking-tight">
              {t('docIntelTitle', language)}
            </h2>
            <p className="text-xs sm:text-sm text-[#667784]">
              {t('docIntelSub', language)}
            </p>
          </div>

          <Link
            to="/documents/analyze"
            className="px-4 py-2.5 bg-[#123B5D] hover:bg-[#1B4D78] text-white text-xs font-semibold rounded-lg shadow-soft transition cursor-pointer self-start sm:self-auto shrink-0"
          >
            {t('understandDocBtn', language)}
          </Link>
        </div>
      </section>

      {/* ================= 7. GRIEVANCE & CITIZEN SUPPORT ================= */}
      <section className="bg-white border border-[#DDE6EC] rounded-xl shadow-soft overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-12 items-center">
          <div className="md:col-span-7 p-6 sm:p-8 space-y-4">
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 bg-[#FFF9F0] text-[#C7972D] rounded-md text-xs font-semibold">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>{t('badgeSection15', language)}</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-extrabold text-[#123B5D] tracking-tight">
              {t('supportSectionTitle', language)}
            </h2>

            <p className="text-xs sm:text-sm text-[#667784] leading-relaxed max-w-xl">
              {t('supportSectionDesc', language)}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                to="/grievance"
                className="px-5 py-2.5 bg-[#123B5D] hover:bg-[#1B4D78] text-white text-xs font-semibold rounded-lg shadow-soft transition flex items-center space-x-2 cursor-pointer"
              >
                <span>{t('raiseGrievance', language)}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#E8B84A]" />
              </Link>

              <a
                href="tel:18001805263"
                className="px-4 py-2.5 bg-[#EAF3F8] hover:bg-[#DDE6EC] text-[#123B5D] text-xs font-semibold rounded-lg transition"
              >
                {t('callNowBtn', language)}
              </a>
            </div>
          </div>

          <div className="md:col-span-5 relative h-48 md:h-full min-h-[220px]">
            <img
              src="/images/community.jpg"
              alt="Indian rural community consultation"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/20 to-transparent"></div>
          </div>
        </div>
      </section>
    </div>
  );
};
