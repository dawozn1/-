import React, { useState, useMemo, useRef, useCallback, useEffect } from 'react';
import html2canvas from 'html2canvas';
import { Category, ExpenseItem } from '../types';
import { DEFAULT_CATEGORIES, INITIAL_EXPENSES } from '../constants';
import Summary from '../context/Summary';
import ExpensesTable from './ExpensesTable';
import { useTranslations } from '../useTranslations';

// FIX: Add type declaration for window.adsbygoogle to fix TypeScript errors.
declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

const AdModalUnit: React.FC = () => {
    useEffect(() => {
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
            console.error("AdSense push error for modal ad: ", e);
        }
    }, []);

    return (
        <div className="min-h-[250px] flex items-center justify-center">
            <ins className="adsbygoogle"
                 style={{ display: 'block', width: '100%', height: '100%' }}
                 data-ad-client="ca-pub-3940256099942544"
                 data-ad-slot="5432167890"
                 data-ad-format="auto"
                 data-full-width-responsive="true"></ins>
        </div>
    );
};


const BudgetPlanner: React.FC = () => {
    const t = useTranslations();
    const plannerRef = useRef<HTMLDivElement>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [isAdModalOpen, setIsAdModalOpen] = useState(false);

    const getInitialState = useCallback(() => ({
        income: 2500,
        summaryBudgets: {
            fixedExpenses: 750,
            leisure: 450,
            savings: 300,
        },
        expenses: INITIAL_EXPENSES,
        categories: DEFAULT_CATEGORIES,
    }), []);

    const [income, setIncome] = useState(getInitialState().income);
    const [summaryBudgets, setSummaryBudgets] = useState<{ [key: string]: number }>(getInitialState().summaryBudgets);
    const [expenses, setExpenses] = useState<ExpenseItem[]>(getInitialState().expenses);
    const [categories, setCategories] = useState<Category[]>(getInitialState().categories);
    
    useEffect(() => {
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
            console.error("AdSense push error: ", e);
        }
    }, []);

    const totalSpent = useMemo(() => {
        return expenses.reduce((sum, item) => sum + item.actual, 0);
    }, [expenses]);

    const remainingToSpend = useMemo(() => income - totalSpent, [income, totalSpent]);

    const resetState = useCallback(() => {
        const initialState = getInitialState();
        setIncome(initialState.income);
        setSummaryBudgets(initialState.summaryBudgets);
        setExpenses(initialState.expenses);
        setCategories(initialState.categories);
    }, [getInitialState]);

    const executeScreenshotAndReset = useCallback(async () => {
        if (!plannerRef.current) return;
        setIsSaving(true);
        try {
            const canvas = await html2canvas(plannerRef.current, { 
                scale: 2, 
                backgroundColor: getComputedStyle(document.body).getPropertyValue('--bg-primary'),
                onclone: (clonedDoc) => {
                    const elementsToHide = clonedDoc.querySelectorAll('.print-hide');
                    elementsToHide.forEach(el => ((el as HTMLElement).style.display = 'none'));
                    
                    const clonedPlanner = clonedDoc.querySelector('[data-planner-root]');
                    const tableContainer = clonedDoc.querySelector('[data-html2canvas-table-container]');
                    const table = tableContainer?.querySelector('table');

                    if (clonedPlanner && tableContainer && table) {
                        (tableContainer as HTMLElement).style.overflow = 'visible';
                        table.style.width = 'auto';
                        (tableContainer as HTMLElement).style.width = 'max-content';
                        (clonedPlanner as HTMLElement).style.width = 'max-content';
                        (clonedPlanner as HTMLElement).style.maxWidth = 'none';
                    }
                }
            });
            const link = document.createElement('a');
            link.download = `Savkil-Budget-${new Date().toISOString().slice(0, 10)}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
            resetState();
        } catch (error) {
            console.error("Failed to save image", error);
        } finally {
            setIsSaving(false);
        }
    }, [resetState]);
    
    const handleSaveButtonClick = () => {
        setIsAdModalOpen(true);
    };

    const handleAdModalClose = () => {
        setIsAdModalOpen(false);
        executeScreenshotAndReset();
    };

    return (
        <div className="space-y-8">
            <h1 className="text-4xl font-serif text-center text-theme-text-header">{t('title')}</h1>
            
            <div className="ad-container my-4 print-hide">Ad Placeholder</div>

            <div ref={plannerRef} data-planner-root className="p-4 md:p-6 bg-theme-container rounded-2xl shadow-lg">
                <Summary 
                    income={income} 
                    onIncomeChange={setIncome}
                    summaryBudgets={summaryBudgets}
                    onSummaryBudgetChange={setSummaryBudgets}
                    totalSpent={totalSpent}
                    remainingToSpend={remainingToSpend}
                    expenses={expenses}
                    categories={categories}
                />
            
                <ExpensesTable 
                    expenses={expenses}
                    setExpenses={setExpenses}
                    categories={categories}
                    setCategories={setCategories}
                    totalSpent={totalSpent}
                    remainingToSpend={remainingToSpend}
                />
            </div>
            
            <div className="flex justify-center mt-8 print-hide">
                <button
                    onClick={handleSaveButtonClick}
                    disabled={isSaving}
                    className="bg-theme-accent text-theme-text-on-accent font-bold py-3 px-8 rounded-full shadow-lg hover:bg-theme-accent-hover transition-transform transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    {isSaving ? 'Saving...' : t('saveAsImage')}
                </button>
            </div>
             <div id="ad-slot-3" className="ad-container my-4 min-h-[250px] print-hide">
                <ins className="adsbygoogle"
                     style={{ display: 'block', width: '100%', height: '100%' }}
                     data-ad-client="ca-pub-3940256099942544"
                     data-ad-slot="3456789012"
                     data-ad-format="auto"
                     data-full-width-responsive="true"></ins>
             </div>
             {isAdModalOpen && (
                <div 
                    className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 print-hide"
                    onClick={handleAdModalClose}
                >
                    <div 
                        className="bg-theme-container rounded-lg shadow-xl p-4 w-full max-w-lg relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button 
                            onClick={handleAdModalClose}
                            className="absolute -top-2 -right-2 bg-theme-primary text-theme-text-header rounded-full h-8 w-8 flex items-center justify-center font-bold text-xl border-2 border-theme-container hover:scale-110 transition-transform"
                            aria-label="Close"
                        >
                            &times;
                        </button>
                        <AdModalUnit />
                    </div>
                </div>
            )}
        </div>
    );
};

export default BudgetPlanner;