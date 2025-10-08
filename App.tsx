import React, { useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { AppProvider, useAppContext } from './context/AppContext';
import BudgetPlanner from './components/BudgetPlanner';
import Header from './components/Header';
import Footer from './components/Footer';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import ContactUs from './pages/ContactUs';
import AboutUs from './pages/AboutUs';
import { themes } from './themes';

const ThemedApp: React.FC = () => {
  const { theme } = useAppContext();

  useEffect(() => {
    const root = document.documentElement;
    const themeColors = themes[theme];
    for (const [key, value] of Object.entries(themeColors)) {
      root.style.setProperty(key, value);
    }
  }, [theme]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<BudgetPlanner />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/about-us" element={<AboutUs />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <AppProvider>
      <HashRouter>
        <ThemedApp />
      </HashRouter>
    </AppProvider>
  );
}

export default App;
