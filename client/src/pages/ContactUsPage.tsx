import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  Building,
  CheckCircle2,
  FileQuestion,
  HelpCircle,
  AlertCircle,
  Headphones,
} from 'lucide-react';
import { useAuthStore } from '../store/authStore.js';
import { t } from '../lib/i18n.js';

export const ContactUsPage: React.FC = () => {
  const { language } = useAuthStore();

  const [category, setCategory] = useState('SURVEY_ENQUIRY');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [reference, setReference] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Simulate reliable citizen enquiry submission
    setTimeout(() => {
      const generatedRef = `ENQ-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      setSubmittedRef(generatedRef);
      setSubmitting(false);
    }, 600);
  };

  const handleReset = () => {
    setSubmittedRef(null);
    setName('');
    setPhone('');
    setEmail('');
    setReference('');
    setSubject('');
    setMessage('');
  };

  return (
    <article className="space-y-6" aria-labelledby="contact-page-title">
      {/* Page Header */}
      <header className="soft-card p-4 sm:p-8 bg-gradient-to-br from-white to-[#F5FAFC] border-l-4 border-l-[#123B5D]">
        <div className="flex items-center space-x-2.5">
          <div
            className="w-10 h-10 rounded-lg bg-[#123B5D] text-[#E8B84A] flex items-center justify-center font-bold shadow-soft shrink-0"
            aria-hidden="true"
          >
            <Headphones className="w-5 h-5" />
          </div>
          <div>
            <h1
              id="contact-page-title"
              className="text-xl sm:text-3xl font-extrabold text-[#123B5D] tracking-tight"
            >
              {t('contactTitle', language)}
            </h1>
            <p className="text-xs sm:text-sm text-[#667784] font-medium mt-0.5">
              {t('contactSubtitle', language)}
            </p>
          </div>
        </div>
      </header>

      {/* Grid: Directory Info & Interactive Enquiry Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Official Administrative Directory */}
        <section
          className="lg:col-span-5 space-y-4"
          aria-labelledby="dir-title"
        >
          {/* Helpdesk Card */}
          <div className="soft-card p-4 sm:p-6 space-y-4">
            <div className="flex items-center space-x-2 border-b border-[#DDE6EC] pb-3">
              <Building className="w-5 h-5 text-[#123B5D]" aria-hidden="true" />
              <h2 id="dir-title" className="text-sm font-bold text-[#123B5D] uppercase tracking-wider">
                {t('contactDirectoryTitle', language)}
              </h2>
            </div>

            <div className="space-y-3 text-xs text-[#243746]">
              <div className="bg-[#EAF3F8] p-3.5 rounded-lg border border-[#DDE6EC] space-y-1.5">
                <span className="font-bold text-[#123B5D] block">
                  {t('contactHelpdeskTitle', language)}
                </span>
                <div className="flex items-center space-x-2 text-[#123B5D] font-bold">
                  <Phone className="w-4 h-4 text-[#E8B84A]" aria-hidden="true" />
                  <span>{t('contactTollFree', language)}</span>
                </div>
                <div className="flex items-center space-x-2 text-[#667784] text-[11px]">
                  <Clock className="w-3.5 h-3.5 text-[#1B4D78]" aria-hidden="true" />
                  <span>{t('contactTiming', language)}</span>
                </div>
              </div>

              {/* Physical Address */}
              <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                <div className="flex items-start space-x-2">
                  <MapPin className="w-4 h-4 text-[#123B5D] shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <span className="font-bold text-[#123B5D] block">
                      {t('contactHQ', language)}
                    </span>
                    <p className="text-slate-600 mt-0.5">
                      {t('contactHQAddress', language)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Email Desks */}
              <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
                <span className="font-bold text-[#123B5D] block">
                  Designated Email Support
                </span>
                <div className="space-y-1.5 text-slate-700">
                  <div className="flex items-center space-x-2">
                    <Mail className="w-3.5 h-3.5 text-[#1B4D78]" aria-hidden="true" />
                    <span>{t('contactEmailSupport', language)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="w-3.5 h-3.5 text-[#1B4D78]" aria-hidden="true" />
                    <span>{t('contactEmailGrievance', language)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="w-3.5 h-3.5 text-[#1B4D78]" aria-hidden="true" />
                    <span>{t('contactEmailRTI', language)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick FAQ note */}
          <div className="soft-card p-4 sm:p-5 bg-[#FFF9F0] border-l-4 border-l-[#E8B84A] text-xs space-y-1.5">
            <div className="flex items-center space-x-2 font-bold text-[#123B5D]">
              <FileQuestion className="w-4 h-4 text-[#E8B84A]" aria-hidden="true" />
              <span>Looking for Formal Objections?</span>
            </div>
            <p className="text-slate-700 leading-relaxed">
              If your inquiry concerns a dispute on land area, award rate, or village notification under Section 15 of the Act, please submit a formal grievance.
            </p>
          </div>
        </section>

        {/* Right Column: Interactive Enquiry Form */}
        <section
          className="lg:col-span-7"
          aria-labelledby="enquiry-form-title"
        >
          <div className="soft-card p-4 sm:p-8">
            <div className="border-b border-[#DDE6EC] pb-4 mb-6">
              <h2
                id="enquiry-form-title"
                className="text-lg font-extrabold text-[#123B5D]"
              >
                {t('contactFormTitle', language)}
              </h2>
              <p className="text-xs text-[#667784] mt-1">
                {t('contactFormDesc', language)}
              </p>
            </div>

            {submittedRef ? (
              <div
                className="p-6 bg-[#E8F4EC] border border-[#2E7D5B]/40 rounded-xl text-center space-y-4"
                role="status"
                aria-live="polite"
              >
                <div className="w-12 h-12 rounded-full bg-[#2E7D5B] text-white flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" aria-hidden="true" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-[#2E7D5B]">
                    {t('contactSuccessToast', language)}
                  </h3>
                  <div className="text-lg font-mono font-black text-[#123B5D] bg-white py-1.5 px-4 rounded-lg inline-block border border-slate-300">
                    {submittedRef}
                  </div>
                  <p className="text-xs text-slate-600 max-w-md mx-auto pt-2">
                    Our citizen assistance desk will review your query within 2 working days. You can reference this token in future communications.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-4 py-2 bg-[#123B5D] text-white rounded-lg text-xs font-bold hover:bg-[#1B4D78] transition focus:outline-none focus:ring-2 focus:ring-[#123B5D] min-h-[44px]"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Category Select */}
                <div>
                  <label
                    htmlFor="contact-category"
                    className="block text-xs font-bold text-[#123B5D] mb-1"
                  >
                    {t('contactCategoryLabel', language)} *
                  </label>
                  <select
                    id="contact-category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                    className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-[#DDE6EC] bg-white text-[#243746] focus:outline-none focus:ring-2 focus:ring-[#123B5D] min-h-[44px]"
                  >
                    <option value="SURVEY_ENQUIRY">Land Survey & Parcel Boundary Inquiry</option>
                    <option value="COMPENSATION_ENQUIRY">Compensation Calculation & Solatium Inquiry</option>
                    <option value="DOCUMENT_ENQUIRY">Document Intelligence & Gazette Record Verification</option>
                    <option value="TECHNICAL_SUPPORT">Portal Access, Login & Navigation Support</option>
                    <option value="OTHER">General Administrative Inquiry</option>
                  </select>
                </div>

                {/* Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-bold text-[#123B5D] mb-1"
                    >
                      {t('contactNameLabel', language)} *
                    </label>
                    <input
                      type="text"
                      id="contact-name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="e.g. Rajesh Sharma"
                      className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-[#DDE6EC] bg-white text-[#243746] focus:outline-none focus:ring-2 focus:ring-[#123B5D] min-h-[44px]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-phone"
                      className="block text-xs font-bold text-[#123B5D] mb-1"
                    >
                      {t('contactPhoneLabel', language)} *
                    </label>
                    <input
                      type="tel"
                      id="contact-phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      placeholder="e.g. 9876543210"
                      className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-[#DDE6EC] bg-white text-[#243746] focus:outline-none focus:ring-2 focus:ring-[#123B5D] min-h-[44px]"
                    />
                  </div>
                </div>

                {/* Email & Case Reference */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-bold text-[#123B5D] mb-1"
                    >
                      {t('contactEmailLabel', language)} *
                    </label>
                    <input
                      type="email"
                      id="contact-email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="name@example.com"
                      className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-[#DDE6EC] bg-white text-[#243746] focus:outline-none focus:ring-2 focus:ring-[#123B5D]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-ref"
                      className="block text-xs font-bold text-[#123B5D] mb-1"
                    >
                      {t('contactRefLabel', language)}
                    </label>
                    <input
                      type="text"
                      id="contact-ref"
                      value={reference}
                      onChange={(e) => setReference(e.target.value)}
                      placeholder="e.g. 1042 or ACQ-2026-MP-1042"
                      className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-[#DDE6EC] bg-white text-[#243746] focus:outline-none focus:ring-2 focus:ring-[#123B5D]"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label
                    htmlFor="contact-subject"
                    className="block text-xs font-bold text-[#123B5D] mb-1"
                  >
                    {t('contactSubjectLabel', language)} *
                  </label>
                  <input
                    type="text"
                    id="contact-subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                    placeholder="Brief summary of your query"
                    className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-[#DDE6EC] bg-white text-[#243746] focus:outline-none focus:ring-2 focus:ring-[#123B5D]"
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-bold text-[#123B5D] mb-1"
                  >
                    {t('contactMessageLabel', language)} *
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    placeholder="Provide relevant details regarding your parcel, notice number, or assistance requirement..."
                    className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-[#DDE6EC] bg-white text-[#243746] focus:outline-none focus:ring-2 focus:ring-[#123B5D]"
                  />
                </div>

                {/* Demo Platform Advisory */}
                <div className="flex items-start space-x-2 text-[11px] text-slate-500 bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <AlertCircle className="w-4 h-4 text-[#1B4D78] shrink-0 mt-0.5" aria-hidden="true" />
                  <p>{t('contactDemoNotice', language)}</p>
                </div>

                {/* Submit Action */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-[#123B5D] text-white rounded-lg text-xs font-bold hover:bg-[#1B4D78] transition shadow-soft disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-[#123B5D]"
                  >
                    <Send className="w-3.5 h-3.5 text-[#E8B84A]" aria-hidden="true" />
                    <span>{submitting ? t('loading', language) : t('contactSubmitBtn', language)}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </section>
      </div>
    </article>
  );
};
