import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuthStore } from '../store/authStore.js';
import { api } from '../services/api.js';
import { ArrowRight, UserCheck } from 'lucide-react';
import { t } from '../lib/i18n.js';

export const LoginPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialRegister = searchParams.get('tab') === 'register' || searchParams.get('mode') === 'register';
  const [isRegister, setIsRegister] = useState(initialRegister);

  useEffect(() => {
    if (searchParams.get('tab') === 'register' || searchParams.get('mode') === 'register') {
      setIsRegister(true);
    } else if (searchParams.get('tab') === 'login' || searchParams.get('mode') === 'login') {
      setIsRegister(false);
    }
  }, [searchParams]);
  const [email, setEmail] = useState('citizen@sahaay.demo');
  const [password, setPassword] = useState('password123');
  const [name, setName] = useState('');
  const [village, setVillage] = useState('Rampur');
  const [district, setDistrict] = useState('Bhopal');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { setAuth, language } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isRegister) {
        const res = await api.register({ email, password, name, village, district });
        if (res.success) {
          setAuth(res.data.token, res.data.user);
          navigate('/');
        }
      } else {
        const res = await api.login({ email, password });
        if (res.success) {
          setAuth(res.data.token, res.data.user);
          if (res.data.user.role === 'OFFICER') {
            navigate('/officer');
          } else {
            navigate('/');
          }
        }
      }
    } catch (err: any) {
      setError(err.message || t('authFailedError', language));
    } finally {
      setLoading(false);
    }
  };

  const populateDemoUser = (role: 'CITIZEN' | 'OFFICER' | 'ADMIN') => {
    setIsRegister(false);
    if (role === 'CITIZEN') {
      setEmail('citizen@sahaay.demo');
      setPassword('password123');
    } else if (role === 'OFFICER') {
      setEmail('officer@sahaay.demo');
      setPassword('password123');
    } else {
      setEmail('admin@sahaay.demo');
      setPassword('password123');
    }
  };

  return (
    <div className="min-h-[82vh] flex items-center justify-center py-6">
      <div className="w-full max-w-5xl bg-white border border-[#DDE6EC] rounded-2xl shadow-soft-lg overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        {/* LEFT 45% (5 cols): Authentic Scenic Rural Imagery with Mission Statement */}
        <div className="hidden lg:flex lg:col-span-5 relative bg-[#123B5D] p-10 flex-col justify-between text-white overflow-hidden">
          <img
            src="/images/login_hero.jpg"
            alt="Indian rural landscape"
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C2840] via-[#123B5D]/80 to-[#123B5D]/40"></div>

          {/* Top Brand Seal */}
          <div className="relative z-10 space-y-2">
            <div className="w-20 h-20 rounded-full overflow-hidden bg-[#FDFBF7] p-1 border-2 border-[#E8B84A] shadow-soft flex items-center justify-center">
              <img
                src="/images/sahaay_logo.png"
                alt="SAHAAY Emblem"
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-2xl font-black tracking-tight text-white">
              {t('appName', language)}
            </h2>
            <p className="text-xs text-[#E8B84A] font-semibold">
              {t('tagline', language)}
            </p>
          </div>

          {/* Bottom Mission Card */}
          <div className="relative z-10 space-y-3 bg-white/10 backdrop-blur-md p-5 rounded-xl border border-white/15">
            <p className="text-xs text-slate-200 leading-relaxed font-medium">
              "{t('heroDesc', language)}"
            </p>
            <div className="text-[11px] text-[#E8B84A] font-bold uppercase tracking-wider">
              {t('citizenPortal', language)}
            </div>
          </div>
        </div>

        {/* RIGHT 55% (7 cols): Clean, Comfortable Sign-In Portal */}
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-center space-y-6">
          <div className="space-y-1 text-center sm:text-left">
            <h1 className="text-2xl font-extrabold text-[#123B5D] tracking-tight">
              {t('welcomeTitle', language)}
            </h1>
            <p className="text-xs sm:text-sm text-[#667784]">
              {t('welcomeSub', language)}
            </p>
          </div>

          {/* 1-Click Evaluation Credentials for Hackathon Evaluators */}
          <div className="bg-[#F5FAFC] border border-[#DDE6EC] p-3.5 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#123B5D] flex items-center gap-1.5">
                <UserCheck className="w-4 h-4 text-[#123B5D]" />
                {t('demoAccountsTitle', language)}
              </span>
              <span className="text-[10px] bg-[#E8B84A] text-[#123B5D] font-extrabold px-2 py-0.5 rounded">
                {t('demoBadge', language)}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => populateDemoUser('CITIZEN')}
                className={`p-2.5 rounded-lg border text-left transition cursor-pointer ${
                  email === 'citizen@sahaay.demo' && !isRegister
                    ? 'bg-[#123B5D] text-white border-[#123B5D] shadow-soft'
                    : 'bg-white border-[#DDE6EC] text-[#243746] hover:bg-slate-50'
                }`}
              >
                <div className="text-xs font-bold">{t('demoCitizenTitle', language)}</div>
                <div className="text-[10px] opacity-80 truncate">{t('demoCitizenSub', language)}</div>
              </button>
              <button
                type="button"
                onClick={() => populateDemoUser('OFFICER')}
                className={`p-2.5 rounded-lg border text-left transition cursor-pointer ${
                  email === 'officer@sahaay.demo' && !isRegister
                    ? 'bg-[#123B5D] text-white border-[#123B5D] shadow-soft'
                    : 'bg-white border-[#DDE6EC] text-[#243746] hover:bg-slate-50'
                }`}
              >
                <div className="text-xs font-bold">{t('demoOfficerTitle', language)}</div>
                <div className="text-[10px] opacity-80 truncate">{t('demoOfficerSub', language)}</div>
              </button>
            </div>
          </div>

          {/* Form Tabs */}
          <div className="bg-white rounded-xl border border-[#DDE6EC] overflow-hidden">
            <div className="flex border-b border-[#DDE6EC] bg-[#F8FAFC]">
              <button
                onClick={() => { setIsRegister(false); setError(''); }}
                className={`flex-1 text-center py-2.5 text-xs font-bold transition cursor-pointer ${
                  !isRegister
                    ? 'bg-white text-[#123B5D] border-t-2 border-t-[#123B5D]'
                    : 'text-[#667784] hover:text-[#243746]'
                }`}
              >
                {t('tabSignIn', language)}
              </button>
              <button
                onClick={() => { setIsRegister(true); setError(''); }}
                className={`flex-1 text-center py-2.5 text-xs font-bold transition cursor-pointer ${
                  isRegister
                    ? 'bg-white text-[#123B5D] border-t-2 border-t-[#123B5D]'
                    : 'text-[#667784] hover:text-[#243746]'
                }`}
              >
                {t('tabRegister', language)}
              </button>
            </div>

            <div className="p-6 space-y-4">
              {error && (
                <div className="bg-[#FBECEC] border border-[#C62828]/30 rounded-lg p-3 text-xs text-[#C62828] font-medium">
                  {error}
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                {isRegister && (
                  <>
                    <div>
                      <label className="block text-xs font-semibold text-[#123B5D] mb-1">
                        {t('fullNameLabel', language)}
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={t('fullNamePlaceholder', language)}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#DDE6EC] text-xs sm:text-sm font-medium bg-[#F8FAFC] text-[#243746] focus:outline-none focus:border-[#123B5D]"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-[#123B5D] mb-1">{t('villageLabel', language)}</label>
                        <input
                          type="text"
                          value={village}
                          onChange={(e) => setVillage(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-[#DDE6EC] text-xs font-medium bg-[#F8FAFC] text-[#243746]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#123B5D] mb-1">{t('districtLabel', language)}</label>
                        <input
                          type="text"
                          value={district}
                          onChange={(e) => setDistrict(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-[#DDE6EC] text-xs font-medium bg-[#F8FAFC] text-[#243746]"
                        />
                      </div>
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-xs font-semibold text-[#123B5D] mb-1">
                    {t('emailLabel', language)}
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('emailPlaceholder', language)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#DDE6EC] text-xs sm:text-sm font-medium bg-[#F8FAFC] text-[#243746] focus:outline-none focus:border-[#123B5D]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#123B5D] mb-1">
                    {t('passwordLabel', language)}
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t('passwordPlaceholder', language)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#DDE6EC] text-xs sm:text-sm font-medium bg-[#F8FAFC] text-[#243746] focus:outline-none focus:border-[#123B5D]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full min-h-[46px] bg-[#123B5D] hover:bg-[#1B4D78] active:bg-[#0C2840] text-white font-semibold text-xs sm:text-sm rounded-lg shadow-soft transition flex items-center justify-center space-x-2 disabled:opacity-70 mt-2 cursor-pointer"
                >
                  {loading ? (
                    <span>{t('verifyingBtn', language)}</span>
                  ) : (
                    <>
                      <span>{isRegister ? t('createAccountBtn', language) : t('signInBtn', language)}</span>
                      <ArrowRight className="w-4 h-4 text-[#E8B84A]" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          <div className="text-center text-[11px] text-[#667784]">
            {t('trustBadge', language)}
          </div>
        </div>
      </div>
    </div>
  );
};
