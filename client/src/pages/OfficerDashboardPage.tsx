import React, { useState, useEffect } from 'react';
import { api } from '../services/api.js';
import { StatusBadge } from '../components/common/StatusBadge.js';
import {
  Briefcase,
  FileCheck,
  ShieldAlert,
  AlertTriangle,
  Send,
  CheckCircle2,
  Clock,
  ArrowRight,
  User,
  MapPin,
  Sparkles,
  Building,
} from 'lucide-react';
import { useAuthStore } from '../store/authStore.js';
import { useNavigate } from 'react-router-dom';

export const OfficerDashboardPage: React.FC = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedGrievance, setSelectedGrievance] = useState<any>(null);
  const [officerResponseText, setOfficerResponseText] = useState('');
  const [grievanceStatus, setGrievanceStatus] = useState('RESOLVED');
  const [submittingGrievance, setSubmittingGrievance] = useState(false);
  const [actionSuccess, setActionSuccess] = useState('');

  const loadOfficerData = () => {
    api.getOfficerDashboard()
      .then((res: any) => {
        if (res.success) {
          setDashboardData(res.data);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadOfficerData();
  }, []);

  const handleUpdateGrievance = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedGrievance) return;
    setSubmittingGrievance(true);

    try {
      const res = await api.updateGrievanceStatus(selectedGrievance.id, {
        status: grievanceStatus,
        officerResponse: officerResponseText,
      });

      if (res.success) {
        setActionSuccess(`Grievance #${selectedGrievance.referenceNumber} status updated to ${grievanceStatus}. Citizen has been notified in real-time.`);
        setSelectedGrievance(null);
        setOfficerResponseText('');
        loadOfficerData();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmittingGrievance(false);
    }
  };

  const stats = dashboardData?.stats;
  const recentCases = dashboardData?.recentCases || [];
  const pendingGrievances = dashboardData?.pendingGrievances || [];

  return (
    <div className="space-y-6">
      {/* Institutional Officer Header */}
      <div className="soft-card overflow-hidden">
        <div className="bg-[#123B5D] text-white p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#1B4D78] text-[#E8B84A] flex items-center justify-center font-bold shadow-soft">
              <Building className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-extrabold tracking-tight">
                Land Acquisition Officer (LAO) Workspace
              </h1>
              <p className="text-xs text-slate-200 mt-0.5">
                Officer: <strong className="text-white">{user?.name}</strong> • {user?.designation || 'Special Land Acquisition Officer (Bhopal Circle)'}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2.5 self-start sm:self-auto">
            <button
              onClick={() => navigate('/officer/cases')}
              className="px-3.5 py-2 bg-[#1B4D78] hover:bg-[#1B4D78]/80 text-white text-xs font-semibold rounded-lg border border-white/20 cursor-pointer shadow-soft"
            >
              Cases Registry
            </button>
            <button
              onClick={() => navigate('/map')}
              className="px-3.5 py-2 bg-[#E8B84A] hover:bg-[#C7972D] text-[#123B5D] text-xs font-bold rounded-lg shadow-soft cursor-pointer transition"
            >
              Cadastral GIS Map
            </button>
          </div>
        </div>

        <div className="p-4 bg-[#F8FAFC] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-[#667784] border-t border-[#DDE6EC]">
          <span className="font-mono text-[11px]">
            Authorized Authority: Competent Authority for Land Acquisition (CALA) • RFCTLARR 2013 Compliance
          </span>
          <span className="text-[11px] font-bold text-[#2E7D5B] flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#2E7D5B]"></span>
            Operational Session Active
          </span>
        </div>
      </div>

      {/* Action Success Alert */}
      {actionSuccess && (
        <div className="bg-[#E8F4EC] border border-[#2E7D5B]/30 text-[#2E7D5B] p-4 rounded-xl text-xs font-semibold flex items-center justify-between shadow-soft">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>{actionSuccess}</span>
          </div>
          <button onClick={() => setActionSuccess('')} className="cursor-pointer">✕</button>
        </div>
      )}

      {/* KPI Stats Grid */}
      {stats && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="soft-card p-5 space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#667784] block">
              Total Active Cases
            </span>
            <span className="text-2xl font-black text-[#123B5D] font-mono">{stats.activeCases}</span>
            <span className="text-xs text-[#667784] block">Corridor Acquisitions</span>
          </div>

          <div className="soft-card p-5 space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#123B5D] block">
              Pending Verification
            </span>
            <span className="text-2xl font-black text-[#123B5D] font-mono">{stats.pendingVerifications}</span>
            <span className="text-xs text-[#667784] block">Ground Demarcation</span>
          </div>

          <div className="soft-card p-5 space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#C7972D] block">
              Open Grievances
            </span>
            <span className="text-2xl font-black text-[#C7972D] font-mono">{stats.openGrievances}</span>
            <span className="text-xs text-[#667784] block">Section 15 Objections</span>
          </div>

          <div className="soft-card p-5 space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#C62828] block">
              Discrepancies Flagged
            </span>
            <span className="text-2xl font-black text-[#C62828] font-mono">{stats.detectedDiscrepancies}</span>
            <span className="text-xs text-[#667784] block">AI Notice vs Record</span>
          </div>
        </div>
      )}

      {/* Review Grievance Modal */}
      {selectedGrievance && (
        <div className="soft-card p-6 sm:p-8 space-y-4 border-2 border-[#123B5D]">
          <div className="flex items-center justify-between border-b border-[#DDE6EC] pb-3">
            <div className="flex items-center space-x-2">
              <ShieldAlert className="w-5 h-5 text-[#123B5D]" />
              <h3 className="text-sm font-bold text-[#123B5D]">
                Statutory Redressal Order: Grievance #{selectedGrievance.referenceNumber}
              </h3>
            </div>
            <button
              onClick={() => setSelectedGrievance(null)}
              className="text-xs font-semibold text-[#667784] hover:text-[#123B5D] cursor-pointer"
            >
              ✕ Close
            </button>
          </div>

          <div className="bg-[#F8FAFC] p-4 rounded-xl border border-[#DDE6EC] space-y-2 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div>
                <span className="text-[#667784] text-[11px] block">Citizen / Khatedar:</span>
                <span className="font-bold text-[#123B5D]">{selectedGrievance.citizen?.name} ({selectedGrievance.citizen?.phone})</span>
              </div>
              <div>
                <span className="text-[#667784] text-[11px] block">Statutory Category:</span>
                <span className="font-bold text-[#C7972D]">{selectedGrievance.category}</span>
              </div>
              <div>
                <span className="text-[#667784] text-[11px] block">Filing Date:</span>
                <span className="font-bold text-[#243746]">{new Date(selectedGrievance.createdAt).toLocaleDateString('en-IN')}</span>
              </div>
            </div>
            <div className="pt-2 border-t border-[#DDE6EC]">
              <span className="font-bold block text-[#243746] mb-1">Citizen Statement:</span>
              <p className="leading-relaxed bg-white p-3 rounded-lg border border-[#DDE6EC] text-[#243746]">
                "{selectedGrievance.description}"
              </p>
            </div>
          </div>

          <form onSubmit={handleUpdateGrievance} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#123B5D] mb-1">
                Official Redressal Action Status
              </label>
              <select
                value={grievanceStatus}
                onChange={(e) => setGrievanceStatus(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#DDE6EC] text-xs font-bold bg-[#F8FAFC] text-[#123B5D]"
              >
                <option value="UNDER_REVIEW">UNDER REVIEW (Joint Demarcation Deputed)</option>
                <option value="RESPONSE_ADDED">RESPONSE ADDED (Clarification & Hearing Order Issued)</option>
                <option value="RESOLVED">RESOLVED (Record Corrected / Gazette Corrigendum Ordered)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#123B5D] mb-1">
                Statutory Order Remarks & Officer Findings (Transmitted to Citizen)
              </label>
              <textarea
                required
                rows={3}
                value={officerResponseText}
                onChange={(e) => setOfficerResponseText(e.target.value)}
                placeholder="e.g. Joint field verification conducted with Patwari on 26-Sep-2026. Area discrepancy confirmed as 2.43 ha. Section 11 corrigendum submitted to Revenue Board."
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#DDE6EC] text-xs font-medium bg-[#F8FAFC] text-[#243746]"
              ></textarea>
            </div>

            <div className="flex justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setSelectedGrievance(null)}
                className="px-4 py-2 border border-[#DDE6EC] text-[#667784] font-semibold text-xs rounded-lg cursor-pointer hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submittingGrievance}
                className="px-5 py-2 bg-[#123B5D] hover:bg-[#1B4D78] text-white font-semibold text-xs rounded-lg flex items-center space-x-1.5 shadow-soft cursor-pointer disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5 text-[#E8B84A]" />
                <span>{submittingGrievance ? 'Recording Order...' : 'Submit Resolution Order & Transmit'}</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Grievance Queue */}
      <div className="soft-card p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-[#DDE6EC] pb-3">
          <div className="flex items-center space-x-2">
            <ShieldAlert className="w-4 h-4 text-[#C7972D]" />
            <h3 className="text-sm font-bold text-[#123B5D]">
              Pending Citizen Grievances & Section 15 Objections ({pendingGrievances.length})
            </h3>
          </div>
        </div>

        <div className="divide-y divide-[#DDE6EC]">
          {pendingGrievances.length > 0 ? (
            pendingGrievances.map((g: any) => (
              <div
                key={g.id}
                className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs first:pt-0 last:pb-0"
              >
                <div className="space-y-1 max-w-3xl">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono font-bold text-[#123B5D] bg-[#EAF3F8] px-2.5 py-0.5 rounded-md border border-[#DDE6EC]">
                      #{g.referenceNumber}
                    </span>
                    <h4 className="font-bold text-[#123B5D]">{g.title}</h4>
                    <StatusBadge status={g.status} />
                  </div>
                  <p className="text-[#243746] line-clamp-1">{g.description}</p>
                  <span className="text-[11px] text-[#667784] block">
                    Citizen: <strong>{g.citizen?.name}</strong> • Phone: {g.citizen?.phone} • Filed: {new Date(g.createdAt).toLocaleDateString('en-IN')}
                  </span>
                </div>

                <button
                  onClick={() => {
                    setSelectedGrievance(g);
                    setOfficerResponseText(g.officerResponse || 'Joint field survey conducted. Record updated in accordance with ground demarcation.');
                  }}
                  className="px-3.5 py-1.5 bg-[#123B5D] hover:bg-[#1B4D78] text-white font-semibold text-xs rounded-lg shrink-0 cursor-pointer shadow-soft self-start sm:self-auto"
                >
                  Review & Pass Order →
                </button>
              </div>
            ))
          ) : (
            <div className="text-center py-6 text-xs text-[#667784]">
              No pending citizen grievances in the queue.
            </div>
          )}
        </div>
      </div>

      {/* Active Corridor Acquisition Cases */}
      <div className="soft-card p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-[#DDE6EC] pb-3">
          <h3 className="text-sm font-bold text-[#123B5D]">
            Corridor Land Acquisition Cases ({recentCases.length})
          </h3>
          <button
            onClick={() => navigate('/officer/cases')}
            className="text-xs font-semibold text-[#123B5D] hover:underline cursor-pointer"
          >
            View Full Registry →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recentCases.map((c: any) => (
            <div
              key={c.id}
              className="p-5 rounded-xl border border-[#DDE6EC] bg-[#F8FAFC] hover:border-[#123B5D] transition space-y-3 text-xs"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-[#123B5D]">#{c.caseReference}</span>
                <StatusBadge status={c.stage} />
              </div>

              <div>
                <h4 className="font-bold text-[#123B5D] text-sm">{c.project?.name}</h4>
                <p className="text-[#667784] mt-0.5">
                  Survey #{c.parcel?.surveyNumber} • {c.parcel?.village} ({c.parcel?.recordedAreaHa} ha)
                </p>
                <span className="text-[11px] text-[#667784] block mt-1">
                  Khatedar: <strong>{c.citizen?.name}</strong> ({c.citizen?.phone})
                </span>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-[#DDE6EC]">
                <button
                  onClick={() => navigate(`/cases/${c.id}`)}
                  className="text-xs font-bold text-[#123B5D] hover:underline cursor-pointer"
                >
                  Inspect Case Dossier →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
