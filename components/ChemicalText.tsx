import React from 'react';

interface ChemicalTextProps {
  text: string;
  className?: string;
}

export const ChemicalText: React.FC<ChemicalTextProps> = ({ text, className = '' }) => {
  // Regex matches numbers that are likely subscripts in chemical formulas
  // It looks for digits that follow a letter or closing parenthesis
  const parts = text.split(/(\d+)/g);

  return (
    <span className={`font-medium ${className}`}>
      {parts.map((part, index) => {
        if (part.match(/^\d+$/)) {
          // Check if previous part ended with a letter or symbol that implies subscript
          return <sub key={index} className="text-xs">{part}</sub>;
        }
        return <span key={index}>{part}</span>;
      })}
    </span>
  );
};