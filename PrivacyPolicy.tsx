import React from 'react';
import { useTranslations } from '../useTranslations';

const PrivacyPolicy: React.FC = () => {
    const t = useTranslations();

    return (
        <div className="max-w-4xl mx-auto bg-theme-container p-8 rounded-lg shadow">
            <h1 className="text-3xl font-bold mb-6 text-theme-text-header">{t('privacyPolicy')}</h1>
            <div className="prose max-w-none text-theme-text-primary">
                <p>Welcome to Savkil! We believe in simplicity and transparency. This section explains our policy regarding the collection, use, and disclosure of information that may be collected when you use our site.</p>
                <p><strong>Savkil does not ask you to log in or store any personally identifiable information.</strong> All data you enter into the budget calculator is processed locally in your browser and is not saved on our servers.</p>
                
                <h2 className="text-2xl font-semibold mt-6 mb-2 text-theme-text-header">Non-Personal Data Collection</h2>
                <p>We use third-party services like Google AdSense and Google Analytics to display advertisements and analyze site usage. These services may collect non-personal information (such as your IP address, browser type, operating system, pages visited, time spent on each page) using cookies and similar tracking technologies. This is done to improve the user experience, display relevant ads, and analyze site performance.</p>
                
                <h2 className="text-2xl font-semibold mt-6 mb-2 text-theme-text-header">Cookies</h2>
                <p>Cookies are small text files stored on your device by your web browser. Our site and third-party services use them for the purpose of operating the site efficiently and collecting usage data. You can control or disable cookies from your browser settings.</p>
                
                <h2 className="text-2xl font-semibold mt-6 mb-2 text-theme-text-header">Third-Party Links</h2>
                <p>Our site may contain links to other websites. We are not responsible for the privacy practices of those sites.</p>
                
                <h2 className="text-2xl font-semibold mt-6 mb-2 text-theme-text-header">Changes to this Privacy Policy</h2>
                <p>We may update this Privacy Policy from time to time. Any changes will be posted here.</p>
                
                <h2 className="text-2xl font-semibold mt-6 mb-2 text-theme-text-header">Contact Us</h2>
                <p>If you have any questions about this Privacy Policy, please contact us at [your-email@example.com].</p>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
