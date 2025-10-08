import React, { createContext, useState, useContext, ReactNode } from 'react';
import { CURRENCIES, LANGUAGES } from '../constants';
import { Theme } from '../themes';

type Language = keyof typeof LANGUAGES;
type Currency = keyof typeof CURRENCIES;

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  currency: Currency;
  setCurrency: (curr: Currency) => void;
  formatCurrency: (amount: number) => string;
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [currency, setCurrency] = useState<Currency>('USD');
  const [theme, setTheme] = useState<Theme>('sky');

  const formatCurrency = (amount: number) => {
    return `${CURRENCIES[currency].symbol} ${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <AppContext.Provider value={{ language, setLanguage, currency, setCurrency, formatCurrency, theme, setTheme }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};