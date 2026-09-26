import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { api } from '../services/api.js';
import { StatusBadge } from '../components/common/StatusBadge.js';
import {
  ShieldAlert,
  Send,
  CheckCircle2,
  Clock,
  AlertTriangle,
  MessageSquareText,
  UserCheck,
  ChevronDown,
  ChevronUp,
  Scale,
  Plus,
} from 'lucide-react';
import { useAuthStore } from '../store/authStore.js';

export const GrievancePage: React.FC = () => {
  const { language } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const prefill = location.state || {};
  const [showForm, setShowForm] = useState(Boolean(prefill.title || searchParams.get('category')));

  const [category, setCategory] = useState(prefill.category || searchParams.get('category') || 'WRONG_AREA');
  const [title, setTitle] = useState(prefill.title || (searchParams.get('survey') ? `Area Inquiry for Survey #${searchParams.get('survey')}` : ''));
  const [description, setDescription] = useState(prefill.description || '');
  const [caseId, setCaseId] = useState(prefill.caseId || '');
  const [parcelId, setParcelId] = useState(prefill.parcelId || '');
  const [detectedDiscrepancy] = useState(prefill.detectedDiscrepancy || null);

  const [grievances, setGrievances] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const loadGrievances = () => {
    api.getGrievances()
      .then((res: any) => {
        if (res.success) setGrievances(res.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadGrievances();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSubmitting(true);

    try {
      const res = await api.createGrievance({
        category,
        title,
        description,
        caseId: caseId || undefined,
        parcelId: parcelId || undefined,
        detectedDiscrepancy,
      });

      if (res.success) {
        setSuccessMessage(`Grievance registered successfully! Statutory Tracking Reference: ${res.data.referenceNumber}`);
        setShowForm(false);
        setTitle('');
        setDescription('');
        loadGrievances();
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to submit grievance. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const categories = [
    { value: 'WRONG_AREA', label: 'Wrong Area Measurement (क्षेत्रफल विसंगति)' },
    { value: 'WRONG_SURVEY_NUMBER', label: 'Wrong Survey / Khasra Number (खसरा क्रमांक त्रुटि)' },
    { value: 'WRONG_OWNER', label: 'Wrong Owner / Khatedar Information (खातेदार नाम त्रुटि)' },
    { value: 'WRONG_MAP_LOCATION', label: 'Wrong Map Location / Cadastral Boundary (नक्शा सीमांकन विवाद)' },
    { value: 'COMPENSATION_ISSUE', label: 'Compensation Valuation Issue (मुआवजा / प्रतिकर आपत्ति)' },
    { value: 'DOCUMENT_ISSUE', label: 'Document Verification Issue (दस्तावेज़ सत्यापन)' },
    { value: 'OTHER', label: 'Other Clarification (अन्य आपत्ति)' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="soft-card p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#123B5D] text-[#E8B84A] flex items-center justify-center font-bold text-xs shadow-soft">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <h1 className="text-xl font-extrabold text-[#123B5D] tracking-tight">
              How can we help? (आपत्ति एवं शिकायत)
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-[#667784] mt-1">
            Submit statutory Section 15 objections under the RFCTLARR Act, 2013 directly to the Competent Land Acquisition Officer.
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="px-5 py-2.5 bg-[#123B5D] hover:bg-[#1B4D78] text-white font-semibold text-xs rounded-lg shadow-soft flex items-center space-x-2 transition self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4 text-[#E8B84A]" />
          <span>{showForm ? 'Close Objection Form' : 'Raise a Grievance'}</span>
        </button>
      </div>

      {successMessage && (
        <div className="bg-[#E8F4EC] border border-[#2E7D5B]/30 text-[#2E7D5B] p-4 rounded-xl text-xs font-semibold flex items-center justify-between shadow-soft">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>{successMessage}</span>
          </div>
          <button onClick={() => setSuccessMessage('')} className="cursor-pointer">✕</button>
        </div>
      )}

      {/* Grievance Submission Form */}
      {showForm && (
        <div className="soft-card p-6 sm:p-8 space-y-4 border-2 border-[#123B5D]">
          <div className="flex items-center space-x-2 border-b border-[#DDE6EC] pb-3">
            <Scale className="w-5 h-5 text-[#123B5D]" />
            <h3 className="text-base font-bold text-[#123B5D]">
              Register Statutory Section 15 Objection
            </h3>
          </div>

          {detectedDiscrepancy && (
            <div className="bg-[#FFF9F0] p-4 rounded-xl border border-[#E8B84A]/60 text-xs text-[#123B5D]">
              <strong className="block uppercase text-[10px] text-[#C7972D] font-bold">Attached Verification Discrepancy Evidence:</strong>
              <p className="mt-1">{detectedDiscrepancy.summary || JSON.stringify(detectedDiscrepancy)}</p>
            </div>
          )}

          {errorMessage && (
            <div className="bg-[#FBECEC] text-[#C62828] p-3 rounded-lg text-xs font-semibold border border-[#F5CACA]">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#123B5D] mb-1">
                Objection Category (आपत्ति श्रेणी) *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#DDE6EC] text-xs font-bold bg-[#F8FAFC] text-[#123B5D]"
              >
                {categories.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#123B5D] mb-1">
                Subject / Issue Title (विषय) *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Area measurement discrepancy between Gazette notice and Khasra record for Survey #1042"
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#DDE6EC] text-xs font-medium focus:outline-none focus:border-[#123B5D] bg-[#F8FAFC] text-[#243746]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#123B5D] mb-1">
                Grounds of Objection & Statement (विस्तृत विवरण) *
              </label>
              <textarea
                required
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="State your objection clearly. For example: Gazette notice states 2.73 ha, while certified Khasra record states 2.43 ha. Requesting physical joint demarcation."
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#DDE6EC] text-xs leading-relaxed focus:outline-none focus:border-[#123B5D] bg-[#F8FAFC] text-[#243746]"
              ></textarea>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-[#DDE6EC]">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 border border-[#DDE6EC] text-[#667784] hover:bg-slate-50 font-semibold text-xs rounded-lg cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-2 bg-[#123B5D] hover:bg-[#1B4D78] text-white font-semibold text-xs rounded-lg flex items-center space-x-1.5 shadow-soft cursor-pointer disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5 text-[#E8B84A]" />
                <span>{submitting ? 'Submitting...' : 'SUBMIT OBJECTION TO LAND OFFICER'}</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Grievances List / My Grievances */}
      <div className="soft-card p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between border-b border-[#DDE6EC] pb-3">
          <h2 className="text-base font-bold text-[#123B5D]">
            My Grievances & Objections Log ({grievances.length})
          </h2>
        </div>

        {grievances.length > 0 ? (
          <div className="space-y-4">
            {grievances.map((g) => (
              <div key={g.id} className="soft-card p-5 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#DDE6EC] pb-3">
                  <div className="flex items-center space-x-2.5">
                    <span className="font-mono font-bold text-[#123B5D] bg-[#EAF3F8] px-2.5 py-1 rounded-md border border-[#DDE6EC] text-xs">
                      #{g.referenceNumber}
                    </span>
                    <span className="text-xs text-[#667784]">
                      Filed: {new Date(g.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                  <StatusBadge status={g.status} />
                </div>

                <div className="space-y-1">
                  <h4 className="font-bold text-[#123B5D] text-sm">{g.title}</h4>
                  <p className="text-xs text-[#243746] leading-relaxed">{g.description}</p>
                </div>

                {g.officerResponse && (
                  <div className="bg-[#EAF3F8] border-l-4 border-[#123B5D] p-3.5 rounded-r-xl space-y-1.5 text-xs">
                    <div className="flex items-center justify-between font-bold text-[#123B5D]">
                      <span className="flex items-center gap-1.5">
                        <UserCheck className="w-4 h-4 text-[#123B5D]" />
                        Official Order / Response from Land Acquisition Officer:
                      </span>
                      {g.reviewedBy && (
                        <span className="text-[11px] text-[#667784] font-normal">Officer: <strong>{g.reviewedBy}</strong></span>
                      )}
                    </div>
                    <p className="text-[#243746] bg-white p-3 rounded-lg border border-[#DDE6EC] italic">
                      "{g.officerResponse}"
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-xs text-[#667784]">
            No grievances or objections filed yet.
          </div>
        )}
      </div>
    </div>
  );
};
