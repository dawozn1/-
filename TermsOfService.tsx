import React from 'react';
import { useTranslations } from '../useTranslations';

const TermsOfService: React.FC = () => {
    const t = useTranslations();

    return (
        <div className="max-w-4xl mx-auto bg-theme-container p-8 rounded-lg shadow">
            <h1 className="text-3xl font-bold mb-6 text-theme-text-header">{t('termsOfService')}</h1>
            <div className="prose max-w-none text-theme-text-primary">
                <p>Welcome to Savkil! By using our website, you agree to comply with and be bound by the following terms and conditions.</p>
                
                <h2 className="text-2xl font-semibold mt-6 mb-2 text-theme-text-header">Nature of Service</h2>
                <p>Savkil provides a tool for personal budget planning and expense management. This tool is designed for general assistance and educational purposes only and does not constitute professional financial advice.</p>
                
                <h2 className="text-2xl font-semibold mt-6 mb-2 text-theme-text-header">Financial Disclaimer</h2>
                <p>You are solely responsible for your financial decisions. Savkil assumes no liability for any losses or damages that may result from your use of this tool or the information provided.</p>
                
                <h2 className="text-2xl font-semibold mt-6 mb-2 text-theme-text-header">User-Entered Content</h2>
                <p>All data you enter into the tool is processed locally on your device and is not stored on our servers. You are responsible for the accuracy and integrity of your entered data.</p>
                
                <h2 className="text-2xl font-semibold mt-6 mb-2 text-theme-text-header">Intellectual Property</h2>
                <p>All content, designs, and software of Savkil are protected by copyright and are the property of [Your Name/Company Name].</p>
                
                <h2 className="text-2xl font-semibold mt-6 mb-2 text-theme-text-header">Acceptable Use</h2>
                <p>You are permitted to use the site for personal, non-commercial purposes only. Illegal or harmful use is prohibited.</p>
                
                <h2 className="text-2xl font-semibold mt-6 mb-2 text-theme-text-header">Changes to Terms</h2>
                <p>We may update these terms from time to time. Your continued use of the site after an update signifies your agreement.</p>
                
                <h2 className="text-2xl font-semibold mt-6 mb-2 text-theme-text-header">Contact Us</h2>
                <p>Contact us at [your-email@example.com].</p>
            </div>
        </div>
    );
};

export default TermsOfService;
