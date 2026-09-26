import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api.js';
import { StatusBadge } from '../components/common/StatusBadge.js';
import {
  FileText,
  Clock,
  Coins,
  ShieldCheck,
  CheckSquare,
  ShieldAlert,
  Map,
  ArrowRight,
  ChevronRight,
  CheckCircle2,
  Calendar,
  AlertCircle,
  ExternalLink,
  Download,
  Scale,
  MapPin,
  FileCheck,
} from 'lucide-react';
import { useAuthStore } from '../store/authStore.js';

export const CaseDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { language } = useAuthStore();

  const [caseData, setCaseData] = useState<any>(null);
  const [timelineData, setTimelineData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'timeline' | 'compensation' | 'rr' | 'documents' | 'actions'>('timeline');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      Promise.all([
        api.getCaseById(id),
        api.getCaseTimeline(id),
      ])
        .then(([caseRes, timelineRes]: any) => {
          if (caseRes.success) setCaseData(caseRes.data);
          if (timelineRes.success) setTimelineData(timelineRes.data);
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) {
    return (
      <div className="soft-card p-12 text-center text-xs text-[#667784]">
        Loading statutory acquisition case dossier...
      </div>
    );
  }

  if (!caseData) {
    return (
      <div className="soft-card p-10 text-center space-y-3">
        <h3 className="text-base font-bold text-[#123B5D]">Case not found</h3>
        <p className="text-xs text-[#667784]">The requested acquisition case could not be retrieved.</p>
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-[#123B5D] text-white text-xs font-semibold rounded-lg"
        >
          Return to Home
        </button>
      </div>
    );
  }

  const parcel = caseData.parcel;
  const project = caseData.project;
  const comp = caseData.compensationRecord;
  const rr = caseData.rrRecord;
  const actions = caseData.actionItems || [];
  const docs = caseData.documents || [];

  return (
    <div className="space-y-6">
      {/* Top Dossier Header Card */}
      <div className="soft-card overflow-hidden">
        <div className="bg-[#123B5D] text-white p-5 sm:p-6 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-[#1B4D78] text-[#E8B84A] flex items-center justify-center font-bold shadow-soft">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#E8B84A] block">
                Official Case Dossier
              </span>
              <h1 className="text-lg sm:text-xl font-black tracking-tight">
                Case #{caseData.caseReference}
              </h1>
            </div>
          </div>
          <StatusBadge status={caseData.stage} />
        </div>

        <div className="p-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs bg-[#F8FAFC] border-b border-[#DDE6EC]">
          <div>
            <span className="text-[#667784] block font-semibold text-[11px]">Project Name:</span>
            <span className="font-bold text-[#123B5D] block truncate mt-0.5">{project?.name}</span>
          </div>
          <div>
            <span className="text-[#667784] block font-semibold text-[11px]">Survey / Khasra:</span>
            <span className="font-mono font-bold text-[#243746] block mt-0.5">#{parcel?.surveyNumber}</span>
          </div>
          <div>
            <span className="text-[#667784] block font-semibold text-[11px]">Location:</span>
            <span className="font-semibold text-[#243746] block mt-0.5">{parcel?.village}, {parcel?.district}</span>
          </div>
          <div>
            <span className="text-[#667784] block font-semibold text-[11px]">Recorded Area:</span>
            <span className="font-bold text-[#2E7D5B] block mt-0.5">{parcel?.recordedAreaHa} ha (Agricultural)</span>
          </div>
        </div>

        <div className="p-4 bg-white flex flex-wrap gap-2.5 text-xs">
          <button
            onClick={() => navigate('/map')}
            className="px-3.5 py-2 bg-white border border-[#DDE6EC] hover:bg-[#F8FAFC] text-[#123B5D] font-semibold rounded-lg flex items-center space-x-1.5 cursor-pointer shadow-soft"
          >
            <Map className="w-4 h-4 text-[#123B5D]" />
            <span>View on Cadastral Map</span>
          </button>
          <button
            onClick={() => navigate(`/grievance/new?caseId=${caseData.id}&survey=${parcel?.surveyNumber}`)}
            className="px-3.5 py-2 bg-[#FFF9F0] border border-[#E8B84A] hover:bg-[#FFF3E0] text-[#123B5D] font-semibold rounded-lg flex items-center space-x-1.5 cursor-pointer"
          >
            <ShieldAlert className="w-4 h-4 text-[#C7972D]" />
            <span>File Section 15 Objection</span>
          </button>
        </div>
      </div>

      {/* Tabs Navigation Bar */}
      <div className="flex border-b border-[#DDE6EC] bg-white rounded-xl p-1 shadow-soft overflow-x-auto gap-1 text-xs">
        <button
          onClick={() => setActiveTab('timeline')}
          className={`px-4 py-2 font-bold rounded-lg transition whitespace-nowrap cursor-pointer ${
            activeTab === 'timeline'
              ? 'bg-[#123B5D] text-white shadow-soft'
              : 'text-[#667784] hover:text-[#123B5D] hover:bg-slate-50'
          }`}
        >
          Acquisition Journey (8 Stages)
        </button>

        <button
          onClick={() => setActiveTab('compensation')}
          className={`px-4 py-2 font-bold rounded-lg transition whitespace-nowrap cursor-pointer ${
            activeTab === 'compensation'
              ? 'bg-[#123B5D] text-white shadow-soft'
              : 'text-[#667784] hover:text-[#123B5D] hover:bg-slate-50'
          }`}
        >
          Compensation Schedule
        </button>

        <button
          onClick={() => setActiveTab('rr')}
          className={`px-4 py-2 font-bold rounded-lg transition whitespace-nowrap cursor-pointer ${
            activeTab === 'rr'
              ? 'bg-[#123B5D] text-white shadow-soft'
              : 'text-[#667784] hover:text-[#123B5D] hover:bg-slate-50'
          }`}
        >
          R&R Entitlements
        </button>

        <button
          onClick={() => setActiveTab('documents')}
          className={`px-4 py-2 font-bold rounded-lg transition whitespace-nowrap cursor-pointer ${
            activeTab === 'documents'
              ? 'bg-[#123B5D] text-white shadow-soft'
              : 'text-[#667784] hover:text-[#123B5D] hover:bg-slate-50'
          }`}
        >
          Documents ({docs.length})
        </button>

        <button
          onClick={() => setActiveTab('actions')}
          className={`px-4 py-2 font-bold rounded-lg transition whitespace-nowrap cursor-pointer ${
            activeTab === 'actions'
              ? 'bg-[#123B5D] text-white shadow-soft'
              : 'text-[#667784] hover:text-[#123B5D] hover:bg-slate-50'
          }`}
        >
          Action Items ({actions.length})
        </button>
      </div>

      {/* TAB 1: Acquisition Journey Timeline */}
      {activeTab === 'timeline' && timelineData && (
        <div className="soft-card p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-[#DDE6EC] pb-3">
            <div>
              <h3 className="text-sm font-bold text-[#123B5D] uppercase tracking-wider">
                RFCTLARR Act, 2013 Statutory Pipeline
              </h3>
              <p className="text-xs text-[#667784]">
                Sequence of legal milestones from Social Impact Assessment to Final Case Closure
              </p>
            </div>
            <span className="text-xs bg-[#EAF3F8] text-[#123B5D] font-bold px-3 py-1 rounded-md border border-[#DDE6EC]">
              Active Stage: {timelineData.currentStage}
            </span>
          </div>

          <div className="relative pl-6 space-y-5 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#DDE6EC]">
            {timelineData.timeline.map((step: any, idx: number) => {
              const isCompleted = step.status === 'COMPLETED';
              const isCurrent = step.status === 'CURRENT';

              return (
                <div key={idx} className="relative">
                  <div
                    className={`absolute -left-6 top-1.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shadow-soft ${
                      isCompleted
                        ? 'bg-[#2E7D5B] text-white'
                        : isCurrent
                        ? 'bg-[#123B5D] text-[#E8B84A] ring-2 ring-[#E8B84A]'
                        : 'bg-white border border-[#DDE6EC] text-[#667784]'
                    }`}
                  >
                    {isCompleted ? '✓' : idx + 1}
                  </div>

                  <div className={`p-4 sm:p-5 rounded-xl border text-xs transition ${
                    isCurrent
                      ? 'bg-[#F5FAFC] border-[#123B5D] shadow-soft'
                      : isCompleted
                      ? 'bg-[#F8FAFC] border-[#DDE6EC]'
                      : 'bg-white border-[#DDE6EC] opacity-70'
                  }`}>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h4 className="text-xs font-bold text-[#123B5D] uppercase">
                        {step.title}
                      </h4>
                      <StatusBadge status={step.status} />
                    </div>

                    <p className="text-[#243746] mt-1.5 leading-relaxed">
                      {step.details || step.description}
                    </p>

                    {step.date && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#667784] mt-2">
                        <Calendar className="w-3.5 h-3.5 text-[#123B5D]" />
                        {new Date(step.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: Compensation Schedule */}
      {activeTab === 'compensation' && comp && (
        <div className="soft-card p-6 sm:p-8 space-y-5">
          <div className="flex items-center justify-between border-b border-[#DDE6EC] pb-3">
            <div>
              <h3 className="text-sm font-bold text-[#123B5D]">
                Statutory Compensation Award Breakdown
              </h3>
              <p className="text-xs text-[#667784]">
                Calculated according to First Schedule of RFCTLARR Act, 2013
              </p>
            </div>
            <StatusBadge status={comp.paymentStatus} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#DDE6EC] space-y-1">
              <span className="text-[#667784] text-[11px] block uppercase font-semibold">Base Land Value:</span>
              <span className="text-base font-bold text-[#123B5D] font-mono">₹{comp.baseLandValueINR.toLocaleString('en-IN')}</span>
              <span className="text-[10px] text-[#667784] block">Market Value * Multiplication Factor</span>
            </div>
            <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#DDE6EC] space-y-1">
              <span className="text-[#667784] text-[11px] block uppercase font-semibold">100% Solatium (Sec 30):</span>
              <span className="text-base font-bold text-[#2E7D5B] font-mono">+₹{comp.solatiumINR.toLocaleString('en-IN')}</span>
              <span className="text-[10px] text-[#667784] block">100% statutory solatium grant</span>
            </div>
            <div className="p-4 rounded-xl bg-[#E8F4EC] border border-[#2E7D5B]/30 space-y-1">
              <span className="text-[#2E7D5B] text-[11px] block uppercase font-bold">Total Assessed Award:</span>
              <span className="text-lg font-extrabold text-[#2E7D5B] font-mono">₹{comp.totalAmountINR.toLocaleString('en-IN')}</span>
              <span className="text-[10px] text-[#2E7D5B] block">DBT via PFMS (Aadhaar Seeded)</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: R&R Entitlements */}
      {activeTab === 'rr' && rr && (
        <div className="soft-card p-6 sm:p-8 space-y-5">
          <div className="flex items-center justify-between border-b border-[#DDE6EC] pb-3">
            <div>
              <h3 className="text-sm font-bold text-[#123B5D]">
                Rehabilitation & Resettlement (Schedule II)
              </h3>
              <p className="text-xs text-[#667784]">
                Statutory family entitlement package and resettlement grants
              </p>
            </div>
            <StatusBadge status={rr.status} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#DDE6EC] space-y-1">
              <span className="text-[#667784] text-[11px] block uppercase font-semibold">Livelihood & Subsistence Grant:</span>
              <span className="text-base font-bold text-[#123B5D] font-mono">₹{rr.subsistenceGrantINR?.toLocaleString('en-IN') || '5,00,000'}</span>
            </div>
            <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#DDE6EC] space-y-1">
              <span className="text-[#667784] text-[11px] block uppercase font-semibold">Resettlement Housing Status:</span>
              <span className="text-sm font-bold text-[#243746]">{rr.housingSupport || 'Eligible for Pradhan Mantri Awas / Constructed Unit'}</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: Documents */}
      {activeTab === 'documents' && (
        <div className="soft-card p-6 sm:p-8 space-y-4">
          <h3 className="text-sm font-bold text-[#123B5D] border-b border-[#DDE6EC] pb-2">
            Certified Case Documents ({docs.length})
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {docs.map((doc: any) => (
              <div key={doc.id} className="p-4 rounded-xl bg-[#F8FAFC] border border-[#DDE6EC] flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-[#123B5D]">{doc.title}</h4>
                  <span className="text-[11px] text-[#667784]">{doc.documentType}</span>
                </div>
                <a
                  href={doc.fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 bg-white border border-[#DDE6EC] hover:bg-slate-50 text-[#123B5D] text-xs font-semibold rounded-md shadow-soft"
                >
                  View
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: Actions */}
      {activeTab === 'actions' && (
        <div className="soft-card p-6 sm:p-8 space-y-4">
          <h3 className="text-sm font-bold text-[#123B5D] border-b border-[#DDE6EC] pb-2">
            Mandatory Action Checklist ({actions.length})
          </h3>
          <div className="space-y-3">
            {actions.map((act: any) => (
              <div key={act.id} className="p-4 rounded-xl border border-[#DDE6EC] bg-[#F8FAFC] flex items-center justify-between">
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-[#123B5D]">{act.title}</h4>
                  <p className="text-[11px] text-[#667784]">{act.description}</p>
                </div>
                <StatusBadge status={act.status} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
