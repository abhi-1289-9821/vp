import { create } from 'zustand';
import { User } from '../types/index.js';
import { LanguageCode, DEFAULT_LANGUAGE } from '../lib/i18n.js';

interface AuthState {
  token: string | null;
  user: User | null;
  language: LanguageCode;
  fontSize: 'normal' | 'large' | 'larger';
  setAuth: (token: string, user: User) => void;
  setUser: (user: User) => void;
  logout: () => void;
  setLanguage: (lang: LanguageCode) => void;
  setFontSize: (size: 'normal' | 'large' | 'larger') => void;
}

export const useAuthStore = create<AuthState>((set) => {
  const savedToken = localStorage.getItem('sahaay_token');
  const savedUser = localStorage.getItem('sahaay_user');
  const savedLang = (localStorage.getItem('sahaay_lang') as LanguageCode) || DEFAULT_LANGUAGE;

  return {
    token: savedToken,
    user: savedUser ? JSON.parse(savedUser) : null,
    language: savedLang,
    fontSize: 'normal',
    setAuth: (token: string, user: User) => {
      localStorage.setItem('sahaay_token', token);
      localStorage.setItem('sahaay_user', JSON.stringify(user));
      set({ token, user });
    },
    setUser: (user: User) => {
      localStorage.setItem('sahaay_user', JSON.stringify(user));
      set({ user });
    },
    logout: () => {
      localStorage.removeItem('sahaay_token');
      localStorage.removeItem('sahaay_user');
      set({ token: null, user: null });
    },
    setLanguage: (language: LanguageCode) => {
      localStorage.setItem('sahaay_lang', language);
      set({ language });
    },
    setFontSize: (fontSize: 'normal' | 'large' | 'larger') => {
      set({ fontSize });
    },
  };
});
