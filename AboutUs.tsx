import React from 'react';
import { useTranslations } from '../useTranslations';

const AboutUs: React.FC = () => {
    const t = useTranslations();

    return (
        <div className="max-w-4xl mx-auto bg-theme-container p-8 rounded-lg shadow">
            <h1 className="text-3xl font-bold mb-6 text-theme-text-header">{t('aboutUs')}</h1>
            <div className="prose max-w-none text-theme-text-primary">
                <p>Savkil was born from a simple idea: managing personal finances should be easy, intuitive, and accessible to everyone. In a world of complex financial tools and apps that require sign-ups and store your sensitive data, we wanted to create something different.</p>
                <p>Our vision is to provide a powerful, single-page budgeting tool that puts you in complete control. Everything you enter stays in your browser, ensuring your privacy. We focus on a clean, visually appealing interface that makes budgeting less of a chore and more of an empowering activity.</p>
                <p>Whether you are planning for the month, tracking your spending, or saving for a goal, Savkil is here to simplify your financial journey.</p>
            </div>
        </div>
    );
};

export default AboutUs;
