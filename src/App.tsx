import React, { useState } from 'react';
import './index.css';

import { Checklist } from './components/Checklist';
import FrequencyTabs from './components/FrequencyTabs';
import type { Frequency } from './data/stabTasks';

export default function App() {
  const [frequency, setFrequency] = useState<Frequency>('weekly');

  return (
    <main className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-neutral-900 dark:text-white">
        🧠 STAB Tracker
      </h1>

      <FrequencyTabs selected={frequency} onSelect={setFrequency} />
      <Checklist frequency={frequency} />
    </main>
  );
}
