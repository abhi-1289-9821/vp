import React, { useState } from 'react';
import {
  MessageSquareHeart,
  Star,
  Send,
  CheckCircle2,
  AlertCircle,
  ThumbsUp,
  Sparkles,
  HeartHandshake,
} from 'lucide-react';
import { useAuthStore } from '../store/authStore.js';
import { t } from '../lib/i18n.js';

export const FeedbackPage: React.FC = () => {
  const { language } = useAuthStore();

  const [userType, setUserType] = useState('LANDOWNER');
  const [featureTopic, setFeatureTopic] = useState('FIND_LAND');
  const [overallRating, setOverallRating] = useState(5);
  const [clarityRating, setClarityRating] = useState(5);
  const [easeRating, setEaseRating] = useState(5);
  const [comments, setComments] = useState('');
  const [recommend, setRecommend] = useState<'YES' | 'NO'>('YES');
  const [submitting, setSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      const generatedRef = `FDB-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      setSubmittedRef(generatedRef);
      setSubmitting(false);
    }, 600);
  };

  const handleReset = () => {
    setSubmittedRef(null);
    setComments('');
    setOverallRating(5);
    setClarityRating(5);
    setEaseRating(5);
  };

  const renderStarSelector = (
    value: number,
    onChange: (val: number) => void,
    labelId: string
  ) => {
    return (
      <div className="flex items-center space-x-1" role="radiogroup" aria-labelledby={labelId}>
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className="p-1 text-[#E8B84A] hover:scale-110 transition focus:outline-none focus:ring-2 focus:ring-[#123B5D] rounded"
            role="radio"
            aria-checked={value === star}
            aria-label={`${star} star${star > 1 ? 's' : ''}`}
          >
            <Star
              className={`w-6 h-6 ${
                star <= value ? 'fill-[#E8B84A] text-[#E8B84A]' : 'text-slate-300'
              }`}
            />
          </button>
        ))}
        <span className="text-xs font-bold text-[#123B5D] ml-2">
          {value} / 5
        </span>
      </div>
    );
  };

  return (
    <article className="space-y-6" aria-labelledby="feedback-page-title">
      {/* Page Header */}
      <header className="soft-card p-4 sm:p-8 bg-gradient-to-br from-white to-[#F5FAFC] border-l-4 border-l-[#123B5D]">
        <div className="flex items-center space-x-2.5">
          <div
            className="w-10 h-10 rounded-lg bg-[#123B5D] text-[#E8B84A] flex items-center justify-center font-bold shadow-soft shrink-0"
            aria-hidden="true"
          >
            <MessageSquareHeart className="w-5 h-5" />
          </div>
          <div>
            <h1
              id="feedback-page-title"
              className="text-xl sm:text-3xl font-extrabold text-[#123B5D] tracking-tight"
            >
              {t('feedbackTitle', language)}
            </h1>
            <p className="text-xs sm:text-sm text-[#667784] font-medium mt-0.5">
              {t('feedbackSubtitle', language)}
            </p>
          </div>
        </div>
      </header>

      {/* Main Feedback Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Citizen Charter / Impact Highlight */}
        <section
          className="lg:col-span-4 space-y-4"
          aria-labelledby="feedback-highlight-title"
        >
          <div className="soft-card p-4 sm:p-6 space-y-4 bg-gradient-to-b from-white to-[#F8FAFC]">
            <div className="flex items-center space-x-2 border-b border-[#DDE6EC] pb-3">
              <HeartHandshake className="w-5 h-5 text-[#2E7D5B]" aria-hidden="true" />
              <h2 id="feedback-highlight-title" className="text-sm font-bold text-[#123B5D] uppercase tracking-wider">
                Citizen-First Charter
              </h2>
            </div>

            <p className="text-xs text-[#667784] leading-relaxed">
              SAHAAY is built on the principle that statutory land acquisition must be completely transparent, accessible in every official regional language, and supportive of citizen rights.
            </p>

            <div className="space-y-2.5 pt-2 text-xs text-[#243746]">
              <div className="flex items-start space-x-2 p-2.5 bg-[#EAF3F8] rounded-lg">
                <Sparkles className="w-4 h-4 text-[#123B5D] shrink-0 mt-0.5" aria-hidden="true" />
                <span>Continuous refinement of regional vernacular translations.</span>
              </div>
              <div className="flex items-start space-x-2 p-2.5 bg-[#E8F4EC] rounded-lg">
                <CheckCircle2 className="w-4 h-4 text-[#2E7D5B] shrink-0 mt-0.5" aria-hidden="true" />
                <span>Improving OCR accuracy on historic cadastral maps and gazettes.</span>
              </div>
              <div className="flex items-start space-x-2 p-2.5 bg-[#FFF9F0] rounded-lg">
                <ThumbsUp className="w-4 h-4 text-[#E8B84A] shrink-0 mt-0.5" aria-hidden="true" />
                <span>Streamlining Section 15 objection submissions to the Collectorate.</span>
              </div>
            </div>
          </div>
        </section>

        {/* Right Side: Interactive Feedback Form */}
        <section
          className="lg:col-span-8"
          aria-labelledby="feedback-form-title"
        >
          <div className="soft-card p-4 sm:p-8">
            <div className="border-b border-[#DDE6EC] pb-4 mb-6">
              <h2
                id="feedback-form-title"
                className="text-lg font-extrabold text-[#123B5D]"
              >
                {t('feedbackFormTitle', language)}
              </h2>
              <p className="text-xs text-[#667784] mt-1">
                {t('feedbackFormDesc', language)}
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
                    {t('feedbackSuccessToast', language)}
                  </h3>
                  <div className="text-lg font-mono font-black text-[#123B5D] bg-white py-1.5 px-4 rounded-lg inline-block border border-slate-300">
                    {submittedRef}
                  </div>
                  <p className="text-xs text-slate-600 max-w-md mx-auto pt-2">
                    Your suggestions have been recorded and will assist the digital governance team in improving citizen services.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-4 py-2 bg-[#123B5D] text-white rounded-lg text-xs font-bold hover:bg-[#1B4D78] transition focus:outline-none focus:ring-2 focus:ring-[#123B5D] min-h-[44px]"
                >
                  Submit Another Feedback
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* User Type & Topic */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="feedback-user-type"
                      className="block text-xs font-bold text-[#123B5D] mb-1"
                    >
                      {t('feedbackUserTypeLabel', language)} *
                    </label>
                    <select
                      id="feedback-user-type"
                      value={userType}
                      onChange={(e) => setUserType(e.target.value)}
                      required
                      className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-[#DDE6EC] bg-white text-[#243746] focus:outline-none focus:ring-2 focus:ring-[#123B5D] min-h-[44px]"
                    >
                      <option value="LANDOWNER">{t('feedbackUserTypeLandowner', language)}</option>
                      <option value="ADVOCATE">{t('feedbackUserTypeAdvocate', language)}</option>
                      <option value="OFFICIAL">{t('feedbackUserTypeOfficial', language)}</option>
                      <option value="PUBLIC">{t('feedbackUserTypePublic', language)}</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="feedback-topic"
                      className="block text-xs font-bold text-[#123B5D] mb-1"
                    >
                      {t('feedbackTopicLabel', language)} *
                    </label>
                    <select
                      id="feedback-topic"
                      value={featureTopic}
                      onChange={(e) => setFeatureTopic(e.target.value)}
                      required
                      className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-[#DDE6EC] bg-white text-[#243746] focus:outline-none focus:ring-2 focus:ring-[#123B5D] min-h-[44px]"
                    >
                      <option value="FIND_LAND">{t('feedbackTopicLandSearch', language)}</option>
                      <option value="DOC_INTEL">{t('feedbackTopicDocIntel', language)}</option>
                      <option value="GIS_MAP">{t('feedbackTopicGis', language)}</option>
                      <option value="COMPENSATION">{t('feedbackTopicCompensation', language)}</option>
                      <option value="GRIEVANCE">{t('feedbackTopicGrievance', language)}</option>
                      <option value="LANGUAGES">{t('feedbackTopicLanguages', language)}</option>
                    </select>
                  </div>
                </div>

                {/* Star Ratings Section */}
                <div className="bg-[#F8FAFC] p-4 rounded-xl border border-[#DDE6EC] space-y-3.5">
                  <div>
                    <span
                      id="overall-rating-label"
                      className="block text-xs font-bold text-[#123B5D] mb-1.5"
                    >
                      {t('feedbackRatingLabel', language)} *
                    </span>
                    {renderStarSelector(overallRating, setOverallRating, 'overall-rating-label')}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-200">
                    <div>
                      <span
                        id="clarity-rating-label"
                        className="block text-xs font-semibold text-[#123B5D] mb-1.5"
                      >
                        {t('feedbackClarityRatingLabel', language)}
                      </span>
                      {renderStarSelector(clarityRating, setClarityRating, 'clarity-rating-label')}
                    </div>

                    <div>
                      <span
                        id="ease-rating-label"
                        className="block text-xs font-semibold text-[#123B5D] mb-1.5"
                      >
                        {t('feedbackEaseRatingLabel', language)}
                      </span>
                      {renderStarSelector(easeRating, setEaseRating, 'ease-rating-label')}
                    </div>
                  </div>
                </div>

                {/* Comments Textarea */}
                <div>
                  <label
                    htmlFor="feedback-comments"
                    className="block text-xs font-bold text-[#123B5D] mb-1"
                  >
                    {t('feedbackCommentsLabel', language)} *
                  </label>
                  <textarea
                    id="feedback-comments"
                    rows={4}
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    required
                    placeholder="Share specific suggestions, ease of finding your parcel, or ideas for improving regional language support..."
                    className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-[#DDE6EC] bg-white text-[#243746] focus:outline-none focus:ring-2 focus:ring-[#123B5D]"
                  />
                </div>

                {/* Recommendation Radio */}
                <div>
                  <span
                    id="recommend-radio-group"
                    className="block text-xs font-bold text-[#123B5D] mb-2"
                  >
                    {t('feedbackRecommendLabel', language)}
                  </span>
                  <div
                    className="flex items-center space-x-4 text-xs"
                    role="radiogroup"
                    aria-labelledby="recommend-radio-group"
                  >
                    <label className="inline-flex items-center space-x-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="recommend"
                        value="YES"
                        checked={recommend === 'YES'}
                        onChange={() => setRecommend('YES')}
                        className="text-[#123B5D] focus:ring-[#123B5D]"
                      />
                      <span className="text-[#243746] font-medium">{t('feedbackYes', language)}</span>
                    </label>

                    <label className="inline-flex items-center space-x-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="recommend"
                        value="NO"
                        checked={recommend === 'NO'}
                        onChange={() => setRecommend('NO')}
                        className="text-[#123B5D] focus:ring-[#123B5D]"
                      />
                      <span className="text-[#243746] font-medium">{t('feedbackNo', language)}</span>
                    </label>
                  </div>
                </div>

                {/* Demo Notice */}
                <div className="flex items-start space-x-2 text-[11px] text-slate-500 bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <AlertCircle className="w-4 h-4 text-[#1B4D78] shrink-0 mt-0.5" aria-hidden="true" />
                  <p>{t('feedbackDemoNotice', language)}</p>
                </div>

                {/* Submit Action */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-[#123B5D] text-white rounded-lg text-xs font-bold hover:bg-[#1B4D78] transition shadow-soft disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-[#123B5D]"
                  >
                    <Send className="w-3.5 h-3.5 text-[#E8B84A]" aria-hidden="true" />
                    <span>{submitting ? t('loading', language) : t('feedbackSubmitBtn', language)}</span>
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
