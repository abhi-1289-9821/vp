import React, { useState, useEffect } from 'react';
import { api } from '../services/api.js';
import { Bell, CheckCheck } from 'lucide-react';
import { t } from '../lib/i18n.js';
import { useAuthStore } from '../store/authStore.js';

export const NotificationCenterPage: React.FC = () => {
  const { language } = useAuthStore();
  const [notifications, setNotifications] = useState<any[]>([]);
  const [, setLoading] = useState(true);

  const loadNotifications = () => {
    api.getNotifications()
      .then((res: any) => {
        if (res.success) setNotifications(res.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  const handleMarkAllRead = async () => {
    try {
      await api.markAllNotificationsRead();
      loadNotifications();
    } catch (err) {
      console.error(err);
    }
  };

  const handleMarkOneRead = async (id: string) => {
    try {
      await api.markNotificationRead(id);
      loadNotifications();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="soft-card p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#123B5D] text-[#E8B84A] flex items-center justify-center font-bold text-xs shadow-soft">
              <Bell className="w-4 h-4" />
            </div>
            <h1 className="text-xl font-extrabold text-[#123B5D] tracking-tight">
              {t('notificationsTitle', language)}
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-[#667784] mt-1">
            {t('notificationsSub', language)}
          </p>
        </div>

        <button
          onClick={handleMarkAllRead}
          className="inline-flex items-center space-x-1.5 px-4 py-2 bg-[#EAF3F8] hover:bg-[#DDE6EC] text-[#123B5D] text-xs font-semibold rounded-lg transition cursor-pointer self-start sm:self-auto"
        >
          <CheckCheck className="w-4 h-4 text-[#123B5D]" />
          <span>{t('markAllReadBtn', language)}</span>
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {notifications.length > 0 ? (
          notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => !n.isRead && handleMarkOneRead(n.id)}
              className={`soft-card p-5 transition cursor-pointer flex items-start justify-between gap-4 ${
                !n.isRead
                  ? 'border-l-4 border-l-[#E8B84A] bg-[#FFF9F0]/40'
                  : 'opacity-80 bg-white'
              }`}
            >
              <div className="flex items-start space-x-3.5">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                  !n.isRead ? 'bg-[#123B5D] text-[#E8B84A]' : 'bg-[#F1F5F9] text-[#667784]'
                }`}>
                  <Bell className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="text-sm font-bold text-[#123B5D]">{n.title}</h4>
                    {!n.isRead && (
                      <span className="px-2 py-0.5 bg-[#E8B84A] text-[#123B5D] text-[10px] font-bold rounded">
                        {t('noticeLabel', language)}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#243746] leading-relaxed max-w-3xl">{n.message}</p>
                  <span className="text-[11px] text-[#667784] block pt-1">
                    {new Date(n.createdAt).toLocaleDateString('en-IN', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                </div>
              </div>

              {!n.isRead && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMarkOneRead(n.id);
                  }}
                  className="text-xs font-semibold text-[#123B5D] hover:underline shrink-0 hidden sm:block cursor-pointer"
                >
                  {t('viewNoticeCaseBtn', language)}
                </button>
              )}
            </div>
          ))
        ) : (
          <div className="soft-card p-10 text-center text-[#667784] space-y-2">
            <Bell className="w-8 h-8 text-slate-400 mx-auto" />
            <p className="text-xs font-bold text-[#123B5D]">{t('noNotificationsTitle', language)}</p>
            <p className="text-xs text-[#667784]">{t('noNotificationsDesc', language)}</p>
          </div>
        )}
      </div>
    </div>
  );
};
