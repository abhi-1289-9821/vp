import React, { useState, useEffect } from 'react';
import { api } from '../services/api.js';
import { StatusBadge } from '../components/common/StatusBadge.js';
import { FileText, ChevronRight, Filter, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { t } from '../lib/i18n.js';
import { useAuthStore } from '../store/authStore.js';

export const OfficerCasesPage: React.FC = () => {
  const { language } = useAuthStore();
  const navigate = useNavigate();
  const [cases, setCases] = useState<any[]>([]);
  const [, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [stageFilter, setStageFilter] = useState('');
  const [selectedCaseForAdvance, setSelectedCaseForAdvance] = useState<any>(null);
  const [newStage, setNewStage] = useState('');
  const [remarks, setRemarks] = useState('');
  const [updating, setUpdating] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const loadCases = () => {
    api.getOfficerCases({ search, stage: stageFilter })
      .then((res: any) => {
        if (res.success) setCases(res.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadCases();
  }, [stageFilter]);

  const handleAdvanceStage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCaseForAdvance) return;
    setUpdating(true);

    try {
      const res = await api.updateCaseStage(selectedCaseForAdvance.id, {
        stage: newStage,
        remarks,
      });

      if (res.success) {
        setSuccessMsg(`Case #${selectedCaseForAdvance.caseReference} stage updated to ${newStage}.`);
        setSelectedCaseForAdvance(null);
        setRemarks('');
        loadCases();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdating(false);
    }
  };

  const stages = ['PROPOSAL', 'NOTIFICATION', 'VERIFICATION', 'AWARD', 'COMPENSATION', 'RR', 'POSSESSION', 'CLOSURE'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="soft-card p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#123B5D] text-[#E8B84A] flex items-center justify-center font-bold text-xs shadow-soft">
              <FileText className="w-4 h-4" />
            </div>
            <h1 className="text-xl font-extrabold text-[#123B5D] tracking-tight">
              {t('officerCasesTitle', language)}
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-[#667784] mt-1">
            {t('officerCasesSub', language)}
          </p>
        </div>

        <div className="text-xs font-mono bg-[#EAF3F8] px-3.5 py-1.5 rounded-lg border border-[#DDE6EC] text-[#123B5D] font-bold self-start sm:self-auto">
          {t('metricTotalCases', language)}: {cases.length}
        </div>
      </div>

      {successMsg && (
        <div className="bg-[#E8F4EC] border border-[#2E7D5B]/30 text-[#2E7D5B] p-4 rounded-xl text-xs font-semibold flex items-center justify-between shadow-soft">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>{successMsg}</span>
          </div>
          <button onClick={() => setSuccessMsg('')} className="cursor-pointer">✕</button>
        </div>
      )}

      {/* Advance Stage Modal */}
      {selectedCaseForAdvance && (
        <div className="soft-card p-6 sm:p-8 space-y-4 border-2 border-[#123B5D]">
          <div className="flex items-center justify-between border-b border-[#DDE6EC] pb-3">
            <h3 className="text-sm font-bold text-[#123B5D]">
              {t('saveStatusUpdateBtn', language)}: Case #{selectedCaseForAdvance.caseReference}
            </h3>
            <button
              onClick={() => setSelectedCaseForAdvance(null)}
              className="text-xs font-semibold text-[#667784] hover:text-[#123B5D] cursor-pointer"
            >
              ✕ {t('cancelGrievanceBtn', language)}
            </button>
          </div>

          <form onSubmit={handleAdvanceStage} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#123B5D] mb-1">
                {t('currentStageLabel', language)}
              </label>
              <select
                value={newStage}
                onChange={(e) => setNewStage(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#DDE6EC] text-xs font-bold bg-[#F8FAFC] text-[#123B5D]"
              >
                {stages.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#123B5D] mb-1">
                {t('caseOfficerNotesLabel', language)}
              </label>
              <textarea
                rows={3}
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder={t('grievanceDescPlaceholder', language)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#DDE6EC] text-xs font-medium bg-[#F8FAFC] text-[#243746]"
              ></textarea>
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setSelectedCaseForAdvance(null)}
                className="px-4 py-2 border border-[#DDE6EC] text-[#667784] font-semibold text-xs rounded-lg cursor-pointer hover:bg-slate-50"
              >
                {t('cancelGrievanceBtn', language)}
              </button>
              <button
                type="submit"
                disabled={updating}
                className="px-5 py-2 bg-[#123B5D] hover:bg-[#1B4D78] text-white font-semibold text-xs rounded-lg shadow-soft cursor-pointer disabled:opacity-50"
              >
                {updating ? t('status_PENDING', language) : t('saveStatusUpdateBtn', language)}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="soft-card p-5 flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && loadCases()}
            placeholder={t('searchCasePlaceholder', language)}
            className="w-full px-3.5 py-2.5 rounded-lg border border-[#DDE6EC] text-xs font-medium bg-[#F8FAFC] text-[#243746] focus:outline-none focus:border-[#123B5D]"
          />
        </div>

        <select
          value={stageFilter}
          onChange={(e) => setStageFilter(e.target.value)}
          className="px-3.5 py-2.5 rounded-lg border border-[#DDE6EC] text-xs font-bold bg-[#F8FAFC] text-[#123B5D]"
        >
          <option value="">{t('filterAllStages', language)}</option>
          {stages.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        <button
          onClick={() => loadCases()}
          className="px-5 py-2.5 bg-[#123B5D] hover:bg-[#1B4D78] text-white font-semibold text-xs rounded-lg shadow-soft cursor-pointer flex items-center justify-center space-x-1.5"
        >
          <Filter className="w-3.5 h-3.5 text-[#E8B84A]" />
          <span>{t('applyFilter', language)}</span>
        </button>
      </div>

      {/* Cases Registry List */}
      <div className="space-y-4">
        {cases.length > 0 ? (
          cases.map((c) => (
            <div
              key={c.id}
              className="soft-card p-6 space-y-4 hover:border-[#123B5D] transition"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#DDE6EC] pb-3">
                <div className="flex items-center space-x-2.5">
                  <span className="font-mono font-bold text-sm text-[#123B5D] bg-[#EAF3F8] px-2.5 py-1 rounded-md border border-[#DDE6EC]">
                    #{c.caseReference}
                  </span>
                  <span className="text-xs text-[#667784] font-medium">
                    {t('project', language)}: <strong className="text-[#123B5D]">{c.project?.name}</strong>
                  </span>
                </div>
                <StatusBadge status={c.stage} />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <span className="text-[#667784] block text-[11px]">{t('surveyParcelLabel', language)}:</span>
                  <span className="font-bold text-[#123B5D] font-mono">#{c.parcel?.surveyNumber}</span>
                </div>
                <div>
                  <span className="text-[#667784] block text-[11px]">{t('villageTehsilLabel', language)}:</span>
                  <span className="font-semibold text-[#243746]">{c.parcel?.village}, {c.parcel?.district}</span>
                </div>
                <div>
                  <span className="text-[#667784] block text-[11px]">{t('citizenPortal', language)}:</span>
                  <span className="font-semibold text-[#243746]">{c.citizen?.name}</span>
                </div>
                <div>
                  <span className="text-[#667784] block text-[11px]">{t('certifiedAreaLabel', language)}:</span>
                  <span className="font-bold text-[#2E7D5B] font-mono">{c.parcel?.recordedAreaHa} ha</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-[#DDE6EC] text-xs">
                <span className="text-[#667784] text-[11px]">
                  {t('grievances', language)}: <strong className="text-[#C7972D]">{c.grievances?.length || 0}</strong> • {t('documents', language)}: <strong>{c.documents?.length || 0}</strong>
                </span>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      setSelectedCaseForAdvance(c);
                      setNewStage(c.stage);
                    }}
                    className="px-3.5 py-1.5 border border-[#DDE6EC] bg-[#F8FAFC] hover:bg-slate-100 text-[#123B5D] font-semibold text-xs rounded-lg cursor-pointer"
                  >
                    {t('saveStatusUpdateBtn', language)}
                  </button>
                  <button
                    onClick={() => navigate(`/cases/${c.id}`)}
                    className="px-3.5 py-1.5 bg-[#123B5D] hover:bg-[#1B4D78] text-white font-semibold text-xs rounded-lg flex items-center space-x-1 cursor-pointer shadow-soft"
                  >
                    <span>{t('trackCaseBtn', language)}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#E8B84A]" />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="soft-card p-10 text-center text-xs text-[#667784]">
            {t('noParcelsFoundTitle', language)}
          </div>
        )}
      </div>
    </div>
  );
};
