import React from 'react';

type Frequency = '72h' | 'weekly' | 'monthly' | '90d';

interface FrequencyTabsProps {
  selected: Frequency;
  onSelect: (value: Frequency) => void;
}

const frequencies: Frequency[] = ['72h', 'weekly', 'monthly', '90d'];

export default function FrequencyTabs({ selected, onSelect }: FrequencyTabsProps) {
  return (
    <div className="flex gap-4 mb-6">
      {frequencies.map((freq) => (
        <button
          key={freq}
          onClick={() => onSelect(freq)}
          className={`px-4 py-2 rounded-lg text-sm font-medium
            ${selected === freq
              ? 'bg-blue-600 text-white shadow'
              : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-100'}`}
        >
          {freq.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
