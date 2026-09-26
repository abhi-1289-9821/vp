import React, { useState, useEffect } from 'react';
import { api } from '../services/api.js';
import { StatusBadge } from '../components/common/StatusBadge.js';
import { Coins, ShieldCheck, CheckCircle2, CreditCard, Scale, AlertCircle, ArrowRight, Users, Check } from 'lucide-react';
import { useAuthStore } from '../store/authStore.js';
import { useNavigate } from 'react-router-dom';

export const CompensationRRPage: React.FC = () => {
  const { language } = useAuthStore();
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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
            Compensation & R&R Entitlements (प्रतिकर एवं पुनर्वास)
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-[#667784] mt-1">
          Statutory valuation schedules under the First & Second Schedules of the RFCTLARR Act, 2013.
        </p>
      </div>

      {comp ? (
        <div className="space-y-6">
          {/* Visual Progression: Assessed -> Awarded -> Paid -> Pending */}
          <div className="soft-card p-6 space-y-4">
            <h2 className="text-sm font-bold text-[#123B5D] uppercase tracking-wider">
              Disbursement Progression
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-xl bg-[#E8F4EC] border border-[#2E7D5B]/30 space-y-1">
                <span className="text-[10px] uppercase font-bold text-[#2E7D5B] block">1. Assessed</span>
                <span className="text-sm font-bold text-[#2E7D5B] font-mono">₹{comp.totalAssessedINR.toLocaleString('en-IN')}</span>
                <span className="text-[11px] text-[#2E7D5B] block flex items-center gap-1"><Check className="w-3 h-3" /> Complete</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#EAF3F8] border border-[#123B5D]/20 space-y-1">
                <span className="text-[10px] uppercase font-bold text-[#123B5D] block">2. Award Status</span>
                <span className="text-sm font-bold text-[#123B5D]">Section 23 Sanction</span>
                <span className="text-[11px] text-[#123B5D] block">In Progress</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#DDE6EC] space-y-1 opacity-70">
                <span className="text-[10px] uppercase font-bold text-[#667784] block">3. PFMS DBT Release</span>
                <span className="text-sm font-bold text-[#243746]">Bank Mandate</span>
                <span className="text-[11px] text-[#667784] block">Queued</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#DDE6EC] space-y-1 opacity-70">
                <span className="text-[10px] uppercase font-bold text-[#667784] block">4. Final Settlement</span>
                <span className="text-sm font-bold text-[#243746]">Treasury Receipt</span>
                <span className="text-[11px] text-[#667784] block">Pending Award</span>
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
                      Statutory Award Breakdown
                    </h3>
                    <span className="text-xs text-[#667784]">
                      Case #{primaryCase.caseReference} • Survey #{primaryCase.parcel?.surveyNumber} ({primaryCase.parcel?.recordedAreaHa} ha)
                    </span>
                  </div>
                  <StatusBadge status={comp.assessmentStatus} />
                </div>

                {/* Total Highlight Card */}
                <div className="bg-[#123B5D] text-white p-5 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-soft">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#E8B84A]">
                      Total Assessed Compensation Award
                    </span>
                    <div className="text-2xl font-black mt-0.5 font-mono text-white">
                      ₹{(comp.totalAssessedINR).toLocaleString('en-IN')}
                    </div>
                    <span className="text-xs text-slate-300">
                      Calculated strictly under RFCTLARR Section 26 to 30
                    </span>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="text-[10px] text-slate-300 block uppercase font-bold">Disbursement Status</span>
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
                        <th className="p-3">Component</th>
                        <th className="p-3">Statutory Formula Basis</th>
                        <th className="p-3 text-right">Amount (₹ INR)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#DDE6EC]">
                      <tr className="hover:bg-slate-50">
                        <td className="p-3 font-semibold text-[#243746]">1. Base Land Assessment</td>
                        <td className="p-3 text-[#667784]">Circle Rate × Rural Multiplier 2.0x (2.43 ha)</td>
                        <td className="p-3 font-bold text-right text-[#243746] font-mono">₹{(comp.landAssessmentINR).toLocaleString('en-IN')}</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="p-3 font-semibold text-[#243746]">2. Assets & Standing Trees</td>
                        <td className="p-3 text-[#667784]">Horticulture and structural boundary assessment</td>
                        <td className="p-3 font-bold text-right text-[#243746] font-mono">₹{(comp.assetAssessmentINR).toLocaleString('en-IN')}</td>
                      </tr>
                      <tr className="bg-[#EAF3F8] hover:bg-[#DDE6EC]">
                        <td className="p-3 font-bold text-[#123B5D]">3. 100% Solatium (तोषण)</td>
                        <td className="p-3 text-[#123B5D] font-medium">Mandatory 100% statutory solatium under Section 30(1)</td>
                        <td className="p-3 font-black text-right text-[#123B5D] font-mono">₹{(comp.solatiumINR).toLocaleString('en-IN')}</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="p-3 font-semibold text-[#243746]">4. 12% Additional Market Value</td>
                        <td className="p-3 text-[#667784]">Interest from date of notification to award inquiry</td>
                        <td className="p-3 font-bold text-right text-[#243746] font-mono">₹{(comp.interestINR).toLocaleString('en-IN')}</td>
                      </tr>
                      <tr className="bg-[#E8F4EC] font-black text-[#2E7D5B]">
                        <td className="p-3.5">Total Compensation Assessed</td>
                        <td className="p-3.5">Section 30 Final Statutory Award</td>
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
                          Rehabilitation & Resettlement (R&R)
                        </h3>
                      </div>
                      <p className="text-xs text-[#667784]">Track rehabilitation support and related progress under Schedule II</p>
                    </div>
                    <StatusBadge status={rr.assessmentStatus} />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#DDE6EC] space-y-1">
                      <span className="text-[#667784] text-xs block font-semibold">Verified Family Members:</span>
                      <strong className="text-base text-[#123B5D]">{rr.familyMembersCount} Members on Record</strong>
                    </div>
                    <div className="p-4 rounded-xl bg-[#E8F4EC] border border-[#2E7D5B]/30 space-y-1">
                      <span className="text-[#2E7D5B] text-xs block font-bold">One-Time Livelihood Grant:</span>
                      <strong className="text-base text-[#2E7D5B] font-mono">₹{(rr.livelihoodGrantINR).toLocaleString('en-IN')}</strong>
                    </div>
                  </div>

                  <p className="text-xs text-[#667784] bg-[#F8FAFC] p-3 rounded-lg border border-[#DDE6EC]">
                    {rr.remarks || 'Eligible for One-time Livelihood Rehabilitation Assistance under Schedule II.'}
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
                    PFMS Direct Benefit Transfer
                  </h3>
                </div>

                <div className="space-y-2.5">
                  <div>
                    <span className="text-[#667784] block text-[11px]">PFMS Reference ID:</span>
                    <strong className="font-mono text-[#123B5D]">{comp.pfmsReference}</strong>
                  </div>
                  <div>
                    <span className="text-[#667784] block text-[11px]">Aadhaar-Linked Account:</span>
                    <strong className="text-[#243746]">{comp.bankAccountMasked}</strong>
                  </div>
                  <div>
                    <span className="text-[#667784] block text-[11px]">IFSC Code:</span>
                    <strong className="font-mono text-[#243746]">{comp.ifscCode}</strong>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#DDE6EC]">
                  <span className="inline-flex items-center gap-1 font-bold text-[#2E7D5B] bg-[#E8F4EC] px-2.5 py-1 text-[11px] rounded-md">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Aadhaar NPCI Mapping Active
                  </span>
                </div>
              </div>

              <div className="bg-[#FFF9F0] border border-[#E8B84A]/60 p-5 rounded-xl text-[#123B5D] space-y-2.5 shadow-soft">
                <h4 className="font-bold uppercase text-xs flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-[#C7972D]" />
                  Valuation Discrepancy?
                </h4>
                <p className="text-xs text-[#667784] leading-relaxed">
                  If structural or tree assessments are missing from the draft award, file a Section 15 objection for re-inspection.
                </p>
                <button
                  onClick={() => navigate('/grievance/new?category=COMPENSATION_ISSUE')}
                  className="w-full py-2.5 bg-[#123B5D] hover:bg-[#1B4D78] text-white font-semibold text-xs rounded-lg transition cursor-pointer"
                >
                  File Valuation Inquiry
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="soft-card p-10 text-center text-xs text-[#667784]">
          No compensation records linked yet.
        </div>
      )}
    </div>
  );
};
