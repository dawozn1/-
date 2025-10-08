import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';

interface EditableNumberProps {
    value: number;
    onChange: (value: number) => void;
    isTableCell?: boolean;
}

const EditableNumber: React.FC<EditableNumberProps> = ({ value, onChange, isTableCell = false }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [currentValue, setCurrentValue] = useState(String(value));
    const { formatCurrency } = useAppContext();

    useEffect(() => {
        if(!isEditing) {
            setCurrentValue(String(value));
        }
    }, [value, isEditing]);

    const handleBlur = () => {
        setIsEditing(false);
        const numericValue = parseFloat(currentValue);
        if (!isNaN(numericValue)) {
            onChange(numericValue);
        } else {
            setCurrentValue(String(value)); // Revert if invalid
        }
    };
    
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') {
            handleBlur();
        } else if (e.key === 'Escape') {
            setIsEditing(false);
            setCurrentValue(String(value));
        }
    }

    if (isEditing) {
        return (
            <input
                type="number"
                value={currentValue}
                onChange={(e) => setCurrentValue(e.target.value)}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                autoFocus
                className={`bg-theme-input rounded px-1 py-0.5 ring-1 ring-theme-ring-accent focus:outline-none ${isTableCell ? 'w-24 text-right' : ''}`}
            />
        );
    }
    
    const commonClasses = "cursor-pointer hover:bg-theme-highlight/20 rounded px-1 py-0.5";
    const alignmentClass = isTableCell ? "text-right" : "";

    return (
        <span onClick={() => setIsEditing(true)} className={`${commonClasses} ${alignmentClass}`}>
            {formatCurrency(value)}
        </span>
    );
};

export default EditableNumber;
