import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslations } from '../useTranslations';

const Footer: React.FC = () => {
    const t = useTranslations();
    const year = new Date().getFullYear();

    return (
        <footer className="bg-theme-footer text-theme-text-secondary text-sm mt-12">
            <div className="container mx-auto px-4 py-6 text-center">
                <div className="flex justify-center space-x-4 mb-4">
                    <Link to="/privacy-policy" className="hover:text-theme-accent-text">{t('privacyPolicy')}</Link>
                    <Link to="/terms-of-service" className="hover:text-theme-accent-text">{t('termsOfService')}</Link>
                    <Link to="/contact-us" className="hover:text-theme-accent-text">{t('contactUs')}</Link>
                    <Link to="/about-us" className="hover:text-theme-accent-text">{t('aboutUs')}</Link>
                </div>
                <p>&copy; {year} Savkil. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
