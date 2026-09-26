import React, { useState, useEffect } from 'react';
import { api } from '../services/api.js';
import { StatusBadge } from '../components/common/StatusBadge.js';
import { CheckSquare, Calendar, CheckCircle2, ArrowRight } from 'lucide-react';
import { t } from '../lib/i18n.js';
import { useAuthStore } from '../store/authStore.js';

export const ActionCenterPage: React.FC = () => {
  const { language } = useAuthStore();
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [, setLoading] = useState(true);
  const [completingId, setCompletingId] = useState<string | null>(null);

  const loadData = () => {
    api.getCitizenDashboard()
      .then((res: any) => {
        if (res.success) setDashboardData(res.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
  }, []);

  const primaryCase = dashboardData?.primaryCase;
  const actions = primaryCase?.actionItems || [];

  const handleCompleteAction = async (actionId: string) => {
    setCompletingId(actionId);
    try {
      await api.updateActionStatus(actionId, 'COMPLETED');
      loadData();
    } catch (err) {
      console.error(err);
    } finally {
      setCompletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="soft-card p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#123B5D] text-[#E8B84A] flex items-center justify-center font-bold text-xs shadow-soft">
              <CheckSquare className="w-4 h-4" />
            </div>
            <h1 className="text-xl font-extrabold text-[#123B5D] tracking-tight">
              {t('actionCenterTitle', language)}
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-[#667784] mt-1">
            {t('actionCenterSub', language)}
          </p>
        </div>

        <span className="px-3 py-1.5 bg-[#EAF3F8] text-[#123B5D] text-xs font-mono font-bold rounded-lg border border-[#DDE6EC] self-start sm:self-auto">
          {t('surveyParcelLabel', language)}: {primaryCase?.caseReference || 'SHY-2024-MP-0914'}
        </span>
      </div>

      {/* Action Items List */}
      <div className="space-y-4">
        {actions.length > 0 ? (
          actions.map((act: any, idx: number) => {
            const isDone = act.status === 'COMPLETED';

            return (
              <div
                key={act.id}
                className={`soft-card p-5 sm:p-6 transition ${
                  isDone
                    ? 'opacity-80 bg-[#F8FAFC]'
                    : 'border-[#E8B84A]/60 shadow-soft'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-2 max-w-3xl">
                    <div className="flex items-center space-x-3">
                      <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold font-mono ${
                        isDone
                          ? 'bg-[#E8F4EC] text-[#2E7D5B]'
                          : 'bg-[#FFF9F0] text-[#C7972D] border border-[#E8B84A]/60'
                      }`}>
                        {idx + 1}
                      </span>
                      <h3 className="text-sm font-bold text-[#123B5D]">{act.title}</h3>
                      <StatusBadge status={act.status} />
                    </div>

                    <p className="text-xs text-[#243746] leading-relaxed pl-10">
                      {act.description}
                    </p>

                    {act.deadline && (
                      <div className="flex items-center space-x-1.5 text-xs font-bold text-[#C62828] pl-10">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{t('actionDeadlineLabel', language)}: {new Date(act.deadline).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                      </div>
                    )}
                  </div>

                  <div className="self-end sm:self-center shrink-0">
                    {isDone ? (
                      <span className="inline-flex items-center space-x-1.5 text-xs font-semibold text-[#2E7D5B] bg-[#E8F4EC] px-3.5 py-2 rounded-lg border border-[#2E7D5B]/30">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>{t('status_COMPLETED', language)}</span>
                      </span>
                    ) : (
                      <button
                        onClick={() => handleCompleteAction(act.id)}
                        disabled={completingId === act.id}
                        className="inline-flex items-center space-x-1.5 px-4 py-2 bg-[#123B5D] hover:bg-[#1B4D78] text-white text-xs font-semibold rounded-lg shadow-soft transition cursor-pointer disabled:opacity-50"
                      >
                        {completingId === act.id ? (
                          <span>{t('status_PENDING', language)}...</span>
                        ) : (
                          <>
                            <span>{t('markCompleteBtn', language)}</span>
                            <ArrowRight className="w-3.5 h-3.5 text-[#E8B84A]" />
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="soft-card p-10 text-center text-[#667784] space-y-2">
            <CheckCircle2 className="w-8 h-8 text-[#2E7D5B] mx-auto" />
            <p className="text-xs font-bold text-[#123B5D]">{t('noPendingActionsTitle', language)}</p>
            <p className="text-xs text-[#667784]">{t('noPendingActionsDesc', language)}</p>
          </div>
        )}
      </div>
    </div>
  );
};
