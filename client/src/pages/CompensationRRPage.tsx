import React, { useState, useEffect } from 'react';
import { api } from '../services/api.js';
import { StatusBadge } from '../components/common/StatusBadge.js';
import { Coins, ShieldCheck, CheckCircle2, CreditCard, AlertCircle, Check } from 'lucide-react';
import { useAuthStore } from '../store/authStore.js';
import { useNavigate } from 'react-router-dom';
import { t } from '../lib/i18n.js';

export const CompensationRRPage: React.FC = () => {
  const { language } = useAuthStore();
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [, setLoading] = useState(true);

  useEffect(() => {
    api.getCitizenDashboard()
      .then((res: any) => {
        if (res.success) setDashboardData(res.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const primaryCase = dashboardData?.primaryCase;
  const comp = primaryCase?.compensationRecord;
  const rr = primaryCase?.rrRecord;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="soft-card p-6 space-y-1">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#123B5D] text-[#E8B84A] flex items-center justify-center font-bold text-xs shadow-soft">
            <Coins className="w-4 h-4" />
          </div>
          <h1 className="text-xl font-extrabold text-[#123B5D] tracking-tight">
            {t('compTitle', language)}
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-[#667784] mt-1">
          {t('compSub', language)}
        </p>
      </div>

      {comp ? (
        <div className="space-y-6">
          {/* Visual Progression */}
          <div className="soft-card p-6 space-y-4">
            <h2 className="text-sm font-bold text-[#123B5D] uppercase tracking-wider">
              {t('trackProgress', language)}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-xl bg-[#E8F4EC] border border-[#2E7D5B]/30 space-y-1">
                <span className="text-[10px] uppercase font-bold text-[#2E7D5B] block">1. {t('assessedCardTitle', language)}</span>
                <span className="text-sm font-bold text-[#2E7D5B] font-mono">₹{comp.totalAssessedINR.toLocaleString('en-IN')}</span>
                <span className="text-[11px] text-[#2E7D5B] block flex items-center gap-1"><Check className="w-3 h-3" /> {t('completed', language)}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#EAF3F8] border border-[#123B5D]/20 space-y-1">
                <span className="text-[10px] uppercase font-bold text-[#123B5D] block">2. {t('stageAward', language)}</span>
                <span className="text-sm font-bold text-[#123B5D]">Section 23 Sanction</span>
                <span className="text-[11px] text-[#123B5D] block">{t('inProgress', language)}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#DDE6EC] space-y-1 opacity-70">
                <span className="text-[10px] uppercase font-bold text-[#667784] block">3. {t('dbtStatus', language)}</span>
                <span className="text-sm font-bold text-[#243746]">{t('bankAccount', language)}</span>
                <span className="text-[11px] text-[#667784] block">{t('pending', language)}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#DDE6EC] space-y-1 opacity-70">
                <span className="text-[10px] uppercase font-bold text-[#667784] block">4. {t('completed', language)}</span>
                <span className="text-sm font-bold text-[#243746]">Treasury Receipt</span>
                <span className="text-[11px] text-[#667784] block">{t('pending', language)}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Main Compensation Table (8 Cols) */}
            <div className="lg:col-span-8 space-y-6">
              <div className="soft-card p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-[#DDE6EC] pb-3">
                  <div>
                    <h3 className="text-sm font-bold text-[#123B5D] uppercase tracking-wider">
                      {t('breakdownTitle', language)}
                    </h3>
                    <span className="text-xs text-[#667784]">
                      {t('caseReference', language)}: #{primaryCase.caseReference} • {t('surveyNo', language)}: #{primaryCase.parcel?.surveyNumber} ({primaryCase.parcel?.recordedAreaHa} ha)
                    </span>
                  </div>
                  <StatusBadge status={comp.assessmentStatus} />
                </div>

                {/* Total Highlight Card */}
                <div className="bg-[#123B5D] text-white p-5 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-soft">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#E8B84A]">
                      {t('totalCompensation', language)}
                    </span>
                    <div className="text-2xl font-black mt-0.5 font-mono text-white">
                      ₹{(comp.totalAssessedINR).toLocaleString('en-IN')}
                    </div>
                    <span className="text-xs text-slate-300">
                      {t('solatiumDesc', language)}
                    </span>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="text-[10px] text-slate-300 block uppercase font-bold">{t('dbtStatusLabel', language)}</span>
                    <span className="inline-block mt-1 text-xs font-bold px-2.5 py-0.5 bg-[#1B4D78] text-[#E8B84A] rounded">
                      {comp.paymentStatus}
                    </span>
                  </div>
                </div>

                {/* Breakdown List */}
                <div className="border border-[#DDE6EC] rounded-xl overflow-hidden text-xs">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="gov-table-header">
                        <th className="p-3">{t('details', language)}</th>
                        <th className="p-3">{t('breakdownSub', language)}</th>
                        <th className="p-3 text-right">INR (₹)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#DDE6EC]">
                      <tr className="hover:bg-slate-50">
                        <td className="p-3 font-semibold text-[#243746]">1. {t('baseMarketValueLabel', language)}</td>
                        <td className="p-3 text-[#667784]">{t('circleRateLabel', language)} × 2.0x (2.43 ha)</td>
                        <td className="p-3 font-bold text-right text-[#243746] font-mono">₹{(comp.landAssessmentINR).toLocaleString('en-IN')}</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="p-3 font-semibold text-[#243746]">2. {t('standingTreesAssets', language)}</td>
                        <td className="p-3 text-[#667784]">{t('horticultureAssessment', language)}</td>
                        <td className="p-3 font-bold text-right text-[#243746] font-mono">₹{(comp.assetAssessmentINR).toLocaleString('en-IN')}</td>
                      </tr>
                      <tr className="bg-[#EAF3F8] hover:bg-[#DDE6EC]">
                        <td className="p-3 font-bold text-[#123B5D]">3. {t('solatium', language)}</td>
                        <td className="p-3 text-[#123B5D] font-medium">{t('solatium100Sub', language)}</td>
                        <td className="p-3 font-black text-right text-[#123B5D] font-mono">₹{(comp.solatiumINR).toLocaleString('en-IN')}</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="p-3 font-semibold text-[#243746]">4. {t('additionalInterestLabel', language)}</td>
                        <td className="p-3 text-[#667784]">{t('sec303Interest', language)}</td>
                        <td className="p-3 font-bold text-right text-[#243746] font-mono">₹{(comp.interestINR).toLocaleString('en-IN')}</td>
                      </tr>
                      <tr className="bg-[#E8F4EC] font-black text-[#2E7D5B]">
                        <td className="p-3.5">{t('totalCompensation', language)}</td>
                        <td className="p-3.5">{t('sec30FinalAward', language)}</td>
                        <td className="p-3.5 text-right text-sm font-mono">₹{(comp.totalAssessedINR).toLocaleString('en-IN')}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* R&R Package Section */}
              {rr && (
                <div className="soft-card p-6 space-y-4">
                  <div className="flex items-center justify-between border-b border-[#DDE6EC] pb-3">
                    <div className="space-y-0.5">
                      <div className="flex items-center space-x-2">
                        <ShieldCheck className="w-4 h-4 text-[#123B5D]" />
                        <h3 className="text-sm font-bold text-[#123B5D] uppercase tracking-wider">
                          {t('rrTitle', language)}
                        </h3>
                      </div>
                      <p className="text-xs text-[#667784]">{t('rrSub', language)}</p>
                    </div>
                    <StatusBadge status={rr.assessmentStatus} />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#DDE6EC] space-y-1">
                      <span className="text-[#667784] text-xs block font-semibold">{t('landowner', language)}:</span>
                      <strong className="text-base text-[#123B5D]">{rr.familyMembersCount} {t('membersOnRecord', language)}</strong>
                    </div>
                    <div className="p-4 rounded-xl bg-[#E8F4EC] border border-[#2E7D5B]/30 space-y-1">
                      <span className="text-[#2E7D5B] text-xs block font-bold">{t('rrLivelihoodTitle', language)}:</span>
                      <strong className="text-base text-[#2E7D5B] font-mono">₹{(rr.livelihoodGrantINR).toLocaleString('en-IN')}</strong>
                    </div>
                  </div>

                  <p className="text-xs text-[#667784] bg-[#F8FAFC] p-3 rounded-lg border border-[#DDE6EC]">
                    {rr.remarks || t('rrLivelihoodDesc', language)}
                  </p>
                </div>
              )}
            </div>

            {/* PFMS Column (4 Cols) */}
            <div className="lg:col-span-4 space-y-4">
              <div className="soft-card p-6 space-y-4 text-xs">
                <div className="flex items-center space-x-2 border-b border-[#DDE6EC] pb-2">
                  <CreditCard className="w-4 h-4 text-[#123B5D]" />
                  <h3 className="font-bold text-[#123B5D] uppercase tracking-wider">
                    {t('dbtPfmsTitle', language)}
                  </h3>
                </div>

                <div className="space-y-2.5">
                  <div>
                    <span className="text-[#667784] block text-[11px]">{t('transactionRefLabel', language)}:</span>
                    <strong className="font-mono text-[#123B5D]">{comp.pfmsReference}</strong>
                  </div>
                  <div>
                    <span className="text-[#667784] block text-[11px]">{t('accountNoLabel', language)}:</span>
                    <strong className="text-[#243746]">{comp.bankAccountMasked}</strong>
                  </div>
                  <div>
                    <span className="text-[#667784] block text-[11px]">{t('ifscCodeLabel', language)}:</span>
                    <strong className="font-mono text-[#243746]">{comp.ifscCode}</strong>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#DDE6EC]">
                  <span className="inline-flex items-center gap-1 font-bold text-[#2E7D5B] bg-[#E8F4EC] px-2.5 py-1 text-[11px] rounded-md">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {t('aadhaarNpciActive', language)}
                  </span>
                </div>
              </div>

              <div className="bg-[#FFF9F0] border border-[#E8B84A]/60 p-5 rounded-xl text-[#123B5D] space-y-2.5 shadow-soft">
                <h4 className="font-bold uppercase text-xs flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-[#C7972D]" />
                  {t('catCompensation', language)}
                </h4>
                <p className="text-xs text-[#667784] leading-relaxed">
                  {t('statutoryRightsDesc', language)}
                </p>
                <button
                  onClick={() => navigate('/grievance/new?category=COMPENSATION_ISSUE')}
                  className="w-full py-2.5 bg-[#123B5D] hover:bg-[#1B4D78] text-white font-semibold text-xs rounded-lg transition cursor-pointer"
                >
                  {t('raiseGrievance', language)}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="soft-card p-10 text-center text-xs text-[#667784]">
          {t('noData', language)}
        </div>
      )}
    </div>
  );
};
