import React from 'react';
import { Category } from '../types';

interface CategorySelectorProps {
    categories: Category[];
    selectedId: string | null;
    onChange: (id: string | null) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ categories, selectedId, onChange }) => {
    const selectedCategory = categories.find(c => c.id === selectedId);

    return (
        <select
            value={selectedId ?? ''}
            onChange={(e) => onChange(e.target.value || null)}
            className="w-full bg-transparent focus:bg-theme-input focus:ring-1 focus:ring-theme-ring-accent rounded p-1 appearance-none"
            style={{ 
                backgroundColor: selectedCategory ? `${selectedCategory.color}40` : 'transparent',
                borderColor: selectedCategory ? selectedCategory.color : 'transparent'
            }}
        >
            <option value="">-</option>
            {categories.map(cat => (
                <option key={cat.id} value={cat.id}>
                    {cat.name}
                </option>
            ))}
        </select>
    );
};

export default CategorySelector;
