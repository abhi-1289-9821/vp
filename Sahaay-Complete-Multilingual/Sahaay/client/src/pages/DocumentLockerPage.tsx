import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api.js';
import { StatusBadge } from '../components/common/StatusBadge.js';
import { FileText, Sparkles, AlertTriangle, ExternalLink, Folder } from 'lucide-react';
import { t } from '../lib/i18n.js';
import { useAuthStore } from '../store/authStore.js';

export const DocumentLockerPage: React.FC = () => {
  const { language } = useAuthStore();
  const [documents, setDocuments] = useState<any[]>([]);
  const [, setLoading] = useState(true);

  useEffect(() => {
    api.getUserDocuments()
      .then((res: any) => {
        if (res.success) setDocuments(res.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="soft-card p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#123B5D] text-[#E8B84A] flex items-center justify-center font-bold text-xs shadow-soft">
              <Folder className="w-4 h-4" />
            </div>
            <h1 className="text-xl font-extrabold text-[#123B5D] tracking-tight">
              {t('lockerTitle', language)}
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-[#667784] mt-1">
            {t('lockerSub', language)}
          </p>
        </div>

        <Link
          to="/documents/analyze"
          className="inline-flex items-center space-x-2 px-4 py-2.5 bg-[#FFF9F0] hover:bg-[#FFF3E0] text-[#123B5D] text-xs font-semibold rounded-lg border border-[#E8B84A] transition self-start sm:self-auto cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-[#C7972D]" />
          <span>{t('uploadNewDocBtn', language)}</span>
        </Link>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {documents.length > 0 ? (
          documents.map((doc) => (
            <div
              key={doc.id}
              className="soft-card p-5 sm:p-6 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start space-x-3">
                    <div className="w-9 h-9 rounded-lg bg-[#EAF3F8] text-[#123B5D] flex items-center justify-center font-bold shrink-0 mt-0.5">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[#123B5D] line-clamp-1">{doc.title}</h3>
                      <span className="text-[11px] text-[#667784] block">
                        {t('docTypeHeader', language)}: {doc.documentType.replace(/_/g, ' ')}
                      </span>
                    </div>
                  </div>
                  <StatusBadge status={doc.verificationStatus} />
                </div>

                {doc.discrepancySummary ? (
                  <div className="bg-[#FFF9F0] p-3 rounded-lg border border-[#E8B84A]/60 text-xs text-[#123B5D]">
                    <div className="font-bold flex items-center gap-1.5 text-[#C62828]">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>{t('discrepancySummaryTitle', language)}:</span>
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-[#243746]">{doc.discrepancySummary}</p>
                  </div>
                ) : (
                  <div className="bg-[#F8FAFC] p-3 rounded-lg border border-[#DDE6EC] text-xs text-[#667784]">
                    {doc.plainLanguageExplanation ? (
                      <p className="line-clamp-2 leading-relaxed">{doc.plainLanguageExplanation}</p>
                    ) : (
                      <span>{t('badgeCertifiedKhasra', language)}</span>
                    )}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-[#DDE6EC] text-xs">
                <span className="text-[#667784] text-[11px]">
                  {t('docDateHeader', language)}: {new Date(doc.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                </span>
                <a
                  href={doc.fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center space-x-1.5 font-semibold text-[#123B5D] hover:underline text-xs cursor-pointer"
                >
                  <span>{t('viewDocBtn', language)}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-2 soft-card p-10 text-center text-[#667784] space-y-2">
            <FileText className="w-8 h-8 text-slate-400 mx-auto" />
            <p className="text-xs font-bold text-[#123B5D]">{t('noDocsInLockerTitle', language)}</p>
            <p className="text-xs text-[#667784]">{t('noDocsInLockerDesc', language)}</p>
          </div>
        )}
      </div>
    </div>
  );
};
