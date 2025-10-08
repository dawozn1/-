
import { useAppContext } from './context/AppContext';
import { translations } from './lib/translations';

export const useTranslations = () => {
  const { language } = useAppContext();
  
  const t = (key: keyof typeof translations['en']) => {
    const langKey = language as keyof typeof translations;
    return (translations[langKey] && translations[langKey][key]) || translations['en'][key];
  };

  return t;
};
