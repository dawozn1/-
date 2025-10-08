import React, { useState } from 'react';
import { Category } from '../types';
import { useTranslations } from '../useTranslations';
import { Trash2 } from 'lucide-react';

interface CategoryManagerProps {
    categories: Category[];
    setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
    onClose: () => void;
}

const CategoryManager: React.FC<CategoryManagerProps> = ({ categories, setCategories, onClose }) => {
    const t = useTranslations();
    const [editingCategories, setEditingCategories] = useState<Category[]>(JSON.parse(JSON.stringify(categories)));
    const [newCategoryName, setNewCategoryName] = useState('');
    const [newCategoryColor, setNewCategoryColor] = useState('#CCCCCC');

    const handleUpdate = (id: string, field: 'name' | 'color', value: string) => {
        setEditingCategories(prev => prev.map(c => c.id === id ? { ...c, [field]: value } : c));
    };

    const handleAdd = () => {
        if (newCategoryName.trim()) {
            const newCat: Category = {
                id: `c${Date.now()}`,
                name: newCategoryName.trim(),
                color: newCategoryColor,
            };
            setEditingCategories(prev => [...prev, newCat]);
            setNewCategoryName('');
            setNewCategoryColor('#CCCCCC');
        }
    };

    const handleDelete = (id: string) => {
        setEditingCategories(prev => prev.filter(c => c.id !== id));
    };
    
    const handleSave = () => {
        setCategories(editingCategories);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 print-hide" onClick={onClose}>
            <div className="bg-theme-secondary rounded-lg shadow-xl p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
                <h3 className="text-xl font-bold mb-4 text-theme-text-header">{t('manageCategories')}</h3>
                
                <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                    {editingCategories.map(cat => (
                        <div key={cat.id} className="flex items-center gap-2">
                            <input
                                type="color"
                                value={cat.color}
                                onChange={(e) => handleUpdate(cat.id, 'color', e.target.value)}
                                className="w-8 h-8 p-0 border-none rounded"
                            />
                            <input
                                type="text"
                                value={cat.name}
                                onChange={(e) => handleUpdate(cat.id, 'name', e.target.value)}
                                className="flex-grow border rounded px-2 py-1 bg-theme-input border-theme-border-primary"
                            />
                            <button onClick={() => handleDelete(cat.id)} className="text-red-500 hover:text-red-700 p-1">
                                <Trash2 size={18} />
                            </button>
                        </div>
                    ))}
                </div>
                
                <div className="mt-4 border-t border-theme-border-secondary pt-4">
                    <h4 className="font-semibold mb-2 text-theme-text-header">{t('addCategory')}</h4>
                    <div className="flex items-center gap-2">
                        <input
                            type="color"
                            value={newCategoryColor}
                            onChange={(e) => setNewCategoryColor(e.target.value)}
                            className="w-8 h-8 p-0 border-none rounded"
                        />
                        <input
                            type="text"
                            placeholder={t('categoryName')}
                            value={newCategoryName}
                            onChange={(e) => setNewCategoryName(e.target.value)}
                            className="flex-grow border rounded px-2 py-1 bg-theme-input border-theme-border-primary"
                        />
                         <button onClick={handleAdd} className="bg-theme-accent text-theme-text-on-accent px-3 py-1 rounded hover:bg-theme-accent-hover">{t('addCategory')}</button>
                    </div>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                    <button onClick={onClose} className="bg-theme-primary px-4 py-2 rounded hover:bg-theme-container">{t('cancel')}</button>
                    <button onClick={handleSave} className="bg-theme-accent text-theme-text-on-accent px-4 py-2 rounded hover:bg-theme-accent-hover">{t('save')}</button>
                </div>
            </div>
        </div>
    );
};

export default CategoryManager;