import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Category, ExpenseItem } from '../types';
import { useAppContext } from '../context/AppContext';
import { useTranslations } from '../useTranslations';
import EditableNumber from '../components/EditableNumber';

interface SummaryProps {
    income: number;
    onIncomeChange: (value: number) => void;
    summaryBudgets: { [key: string]: number };
    onSummaryBudgetChange: (newBudgets: { [key: string]: number }) => void;
    totalSpent: number;
    remainingToSpend: number;
    expenses: ExpenseItem[];
    categories: Category[];
}

const Summary: React.FC<SummaryProps> = ({
    income, onIncomeChange, summaryBudgets, onSummaryBudgetChange, 
    totalSpent, remainingToSpend, expenses, categories
}) => {
    const { formatCurrency } = useAppContext();
    const t = useTranslations();

    const chartData = useMemo(() => {
        const categoryMap: Map<string, { name: string; color: string; value: number; }> = new Map(categories.map(c => [c.id, { name: c.name, color: c.color, value: 0 }]));
        
        expenses.forEach(expense => {
            if (expense.categoryId && expense.actual > 0) {
                const category = categoryMap.get(expense.categoryId);
                if (category) {
                    category.value += expense.actual;
                }
            }
        });

        const data = Array.from(categoryMap.values()).filter(c => c.value > 0);
        if (remainingToSpend > 0) {
            data.push({ name: t('remainingToSpend'), value: remainingToSpend, color: '#9CA3AF' }); // Use a neutral color for remaining
        }
        return data;
    }, [expenses, categories, remainingToSpend, t]);

    const handleBudgetChange = (key: string, value: number) => {
        onSummaryBudgetChange({ ...summaryBudgets, [key]: value });
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-1 bg-theme-secondary p-4 rounded-xl shadow-inner space-y-2">
                <div className="flex justify-between items-center text-lg">
                    <span className="font-semibold">{t('income')}</span>
                    <EditableNumber value={income} onChange={onIncomeChange} />
                </div>
                <div className="flex justify-between items-center">
                    <span>{t('fixedExpenses')}</span>
                    <EditableNumber value={summaryBudgets.fixedExpenses} onChange={(v) => handleBudgetChange('fixedExpenses', v)} />
                </div>
                <div className="flex justify-between items-center">
                    <span>{t('leisure')}</span>
                     <EditableNumber value={summaryBudgets.leisure} onChange={(v) => handleBudgetChange('leisure', v)} />
                </div>
                <div className="flex justify-between items-center">
                    <span>{t('savings')}</span>
                    <EditableNumber value={summaryBudgets.savings} onChange={(v) => handleBudgetChange('savings', v)} />
                </div>
                <div className="border-t border-theme-border-secondary my-2"></div>
                <div className="flex justify-between items-center font-bold text-xl bg-theme-highlight text-theme-text-header py-2 px-3 rounded-lg">
                    <span>{t('totalSpent')}</span>
                    <span>{formatCurrency(totalSpent)}</span>
                </div>
            </div>

            <div className="md:col-span-2 flex justify-center items-center h-64 md:h-full">
                <div className="relative w-60 h-60">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={chartData}
                                cx="50%"
                                cy="50%"
                                innerRadius="70%"
                                outerRadius="100%"
                                fill="#8884d8"
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value: number) => formatCurrency(value)} />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                         <span className="text-theme-text-secondary text-sm">{t('remainingToSpend')}</span>
                        <span className="text-3xl font-bold text-theme-text-header">{formatCurrency(remainingToSpend)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Summary;
