import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { api } from '../services/api.js';
import { StatusBadge } from '../components/common/StatusBadge.js';
import {
  Search,
  Map,
  ArrowRight,
  Sparkles,
  AlertTriangle,
} from 'lucide-react';
import { useAuthStore } from '../store/authStore.js';
import { t } from '../lib/i18n.js';

export const FindMyLandPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { language } = useAuthStore();

  const [activeTab, setActiveTab] = useState<'survey' | 'qr' | 'gps'>('survey');
  const [searchQuery] = useState(searchParams.get('q') || '');
  const [surveyNumber, setSurveyNumber] = useState(searchParams.get('survey') || '');
  const [village, setVillage] = useState(searchParams.get('village') || '');
  const [district, setDistrict] = useState(searchParams.get('district') || '');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const initialSurvey = searchParams.get('survey') || '1042';
    setSurveyNumber(initialSurvey);
    handleSearch(initialSurvey);
  }, []);

  const handleSearch = async (overrideSurvey?: string) => {
    const surveyToUse = overrideSurvey !== undefined ? overrideSurvey : surveyNumber;
    setLoading(true);
    setHasSearched(true);

    try {
      const res = await api.searchParcels({
        survey: surveyToUse,
        village,
        district,
        q: searchQuery,
      });

      if (res.success) {
        setResults(res.data);
      }
    } catch (err) {
      console.error(err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleChipClick = (surveyVal: string) => {
    setSurveyNumber(surveyVal);
    handleSearch(surveyVal);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-[#DDE6EC] shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#123B5D] text-[#E8B84A] flex items-center justify-center font-bold text-xs shadow-soft">
              <Search className="w-4 h-4" />
            </div>
            <h1 className="text-xl font-extrabold text-[#123B5D] tracking-tight">
              {t('landSearchTitle', language)}
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-[#667784] mt-1">
            {t('landSearchSub', language)}
          </p>
        </div>

        <button
          onClick={() => navigate('/documents/analyze')}
          className="px-4 py-2.5 bg-[#FFF9F0] hover:bg-[#FFF3E0] text-[#123B5D] border border-[#E8B84A] text-xs font-semibold rounded-lg flex items-center space-x-1.5 transition self-start sm:self-auto cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-[#C7972D]" />
          <span>{t('understandDocument', language)}</span>
        </button>
      </div>

      {/* Search Form Card */}
      <div className="soft-card p-6 space-y-4">
        {/* Search Mode Tabs */}
        <div className="flex border-b border-[#DDE6EC] gap-2 pb-2">
          <button
            onClick={() => setActiveTab('survey')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition cursor-pointer ${
              activeTab === 'survey'
                ? 'bg-[#EAF3F8] text-[#123B5D]'
                : 'text-[#667784] hover:text-[#123B5D]'
            }`}
          >
            {t('surveyNo', language)}
          </button>
          <button
            onClick={() => setActiveTab('qr')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition cursor-pointer ${
              activeTab === 'qr'
                ? 'bg-[#EAF3F8] text-[#123B5D]'
                : 'text-[#667784] hover:text-[#123B5D]'
            }`}
          >
            {t('caseReference', language)}
          </button>
          <button
            onClick={() => setActiveTab('gps')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition cursor-pointer ${
              activeTab === 'gps'
                ? 'bg-[#EAF3F8] text-[#123B5D]'
                : 'text-[#667784] hover:text-[#123B5D]'
            }`}
          >
            {t('navGisMap', language)}
          </button>
        </div>

        {activeTab === 'survey' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#123B5D] mb-1">
                  {t('surveyNo', language)} *
                </label>
                <input
                  type="text"
                  value={surveyNumber}
                  onChange={(e) => setSurveyNumber(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder={t('enterSurveyPlaceholder', language)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#DDE6EC] text-xs font-medium focus:outline-none focus:border-[#123B5D] bg-[#F8FAFC] text-[#243746]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#123B5D] mb-1">
                  {t('village', language)}
                </label>
                <input
                  type="text"
                  value={village}
                  onChange={(e) => setVillage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder={t('village', language)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#DDE6EC] text-xs font-medium focus:outline-none focus:border-[#123B5D] bg-[#F8FAFC] text-[#243746]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#123B5D] mb-1">
                  {t('district', language)}
                </label>
                <input
                  type="text"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder={t('district', language)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#DDE6EC] text-xs font-medium focus:outline-none focus:border-[#123B5D] bg-[#F8FAFC] text-[#243746]"
                />
              </div>
            </div>

            {/* Test Chips */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#667784] pt-1">
              <span className="font-semibold">{t('quickTipTitle', language)}:</span>
              <button
                type="button"
                onClick={() => handleChipClick('1042')}
                className="px-2.5 py-1 bg-[#EAF3F8] hover:bg-[#DDE6EC] rounded-md font-mono font-bold text-[#123B5D] cursor-pointer"
              >
                #1042 (Rampur)
              </button>
              <button
                type="button"
                onClick={() => handleChipClick('1043')}
                className="px-2.5 py-1 bg-[#EAF3F8] hover:bg-[#DDE6EC] rounded-md font-mono font-bold text-[#123B5D] cursor-pointer"
              >
                #1043 (Rampur)
              </button>
              <button
                type="button"
                onClick={() => handleChipClick('88/1')}
                className="px-2.5 py-1 bg-[#EAF3F8] hover:bg-[#DDE6EC] rounded-md font-mono font-bold text-[#123B5D] cursor-pointer"
              >
                #88/1 (Kolar Kalan)
              </button>
              <button
                type="button"
                onClick={() => handleChipClick('142')}
                className="px-2.5 py-1 bg-[#EAF3F8] hover:bg-[#DDE6EC] rounded-md font-mono font-bold text-[#123B5D] cursor-pointer"
              >
                #142 (Bagsevaniya)
              </button>
            </div>

            <button
              onClick={() => handleSearch()}
              disabled={loading}
              className="px-6 py-2.5 bg-[#123B5D] hover:bg-[#1B4D78] text-white text-xs font-semibold rounded-lg flex items-center space-x-2 shadow-soft cursor-pointer disabled:opacity-50"
            >
              <Search className="w-4 h-4 text-[#E8B84A]" />
              <span>{loading ? t('searchingLandBtn', language) : t('searchLandBtn', language)}</span>
            </button>
          </div>
        )}

        {activeTab === 'qr' && (
          <div className="space-y-3 max-w-md">
            <label className="block text-xs font-semibold text-[#123B5D]">
              {t('caseReference', language)}
            </label>
            <input
              type="text"
              placeholder="e.g. ACQ-2026-MP-1042"
              defaultValue="ACQ-2026-MP-1042"
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#DDE6EC] text-xs font-mono font-bold bg-[#F8FAFC]"
            />
            <button
              onClick={() => navigate('/cases/ACQ-2026-MP-1042')}
              className="px-5 py-2.5 bg-[#123B5D] text-white text-xs font-semibold rounded-lg cursor-pointer"
            >
              {t('viewCase', language)}
            </button>
          </div>
        )}

        {activeTab === 'gps' && (
          <div className="space-y-3 max-w-md text-xs text-[#667784]">
            <p>
              GPS centroid: <strong>23.2625° N, 77.4150° E</strong> ({t('parcelVillagePrompt', language)}).
            </p>
            <button
              onClick={() => navigate('/map')}
              className="px-5 py-2.5 bg-[#123B5D] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer"
            >
              <Map className="w-4 h-4 text-[#E8B84A]" />
              <span>{t('viewOnGis', language)}</span>
            </button>
          </div>
        )}
      </div>

      {/* Results Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-[#DDE6EC] pb-2">
          <h2 className="text-sm font-bold text-[#123B5D] uppercase tracking-wider">
            {t('searchResultsHeading', language)} ({results.length})
          </h2>
        </div>

        {results.length > 0 ? (
          <div className="space-y-4">
            {results.map((parcel) => {
              const matchedCase = parcel.cases?.[0];

              return (
                <div
                  key={parcel.id}
                  className="soft-card p-5 sm:p-6 space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#DDE6EC] pb-4">
                    <div className="flex items-center space-x-3.5">
                      <div className="w-11 h-11 rounded-xl bg-[#123B5D] text-[#E8B84A] font-mono font-bold flex items-center justify-center text-xs shadow-soft">
                        #{parcel.surveyNumber}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="text-base font-bold text-[#123B5D]">
                            {t('surveyNo', language)} #{parcel.surveyNumber} {parcel.khasraNumber && `(${parcel.khasraNumber})`}
                          </h3>
                          <StatusBadge status={parcel.currentStatus} />
                        </div>
                        <p className="text-xs text-[#667784] mt-0.5">
                          {t('village', language)}: <strong>{parcel.village}</strong> • {t('tehsil', language)}: <strong>{parcel.tehsil}</strong> • {t('district', language)}: <strong>{parcel.district}</strong>
                        </p>
                      </div>
                    </div>

                    <div className="text-left sm:text-right text-xs">
                      <span className="text-[#667784] block">{t('recordedArea', language)}</span>
                      <span className="text-lg font-extrabold text-[#2E7D5B] font-mono">{parcel.recordedAreaHa} ha</span>
                      <span className="text-[11px] text-[#667784] block">({parcel.landType})</span>
                    </div>
                  </div>

                  {matchedCase ? (
                    <div className="bg-[#F5FAFC] border border-[#DDE6EC] rounded-xl p-4 text-xs space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <span className="text-[10px] font-bold text-[#667784] uppercase block">
                            {t('associatedProject', language)}
                          </span>
                          <span className="font-bold text-[#123B5D] text-sm">
                            {matchedCase.project?.name || 'Highway Expansion Project'}
                          </span>
                        </div>
                        <span className="font-mono font-bold text-[#123B5D] bg-white px-2.5 py-1 rounded-md border border-[#DDE6EC]">
                          {matchedCase.caseReference}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#DDE6EC]">
                        <span className="text-[#667784]">
                          {t('currentStage', language)}: <strong>{matchedCase.stage}</strong>
                        </span>
                        {matchedCase.estimatedCompensationINR > 0 && (
                          <span className="text-[#667784]">
                            {t('totalCompensation', language)}: <strong className="text-[#2E7D5B]">₹{(matchedCase.estimatedCompensationINR).toLocaleString('en-IN')}</strong>
                          </span>
                        )}
                      </div>

                      <div className="pt-1 flex flex-wrap gap-2.5">
                        <button
                          onClick={() => navigate(`/cases/${matchedCase.id}`)}
                          className="px-4 py-2 bg-[#123B5D] hover:bg-[#1B4D78] text-white font-semibold text-xs rounded-lg flex items-center space-x-1.5 cursor-pointer shadow-soft"
                        >
                          <span>{t('viewCase', language)}</span>
                          <ArrowRight className="w-3.5 h-3.5 text-[#E8B84A]" />
                        </button>
                        <button
                          onClick={() => navigate('/map')}
                          className="px-4 py-2 bg-white border border-[#DDE6EC] hover:bg-[#F8FAFC] text-[#123B5D] font-semibold text-xs rounded-lg flex items-center space-x-1.5 cursor-pointer shadow-soft"
                        >
                          <Map className="w-3.5 h-3.5 text-[#123B5D]" />
                          <span>{t('viewOnGis', language)}</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-[#667784] bg-[#F8FAFC] p-3 rounded-lg border border-[#DDE6EC]">
                      {t('noParcelsFoundDesc', language)}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          hasSearched && !loading && (
            <div className="bg-white border border-[#DDE6EC] rounded-xl p-8 text-center space-y-3">
              <AlertTriangle className="w-8 h-8 text-[#C7972D] mx-auto" />
              <h3 className="text-sm font-bold text-[#123B5D]">{t('noParcelsFoundTitle', language)}</h3>
              <p className="text-xs text-[#667784] max-w-sm mx-auto">
                {t('noParcelsFoundDesc', language)}
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

