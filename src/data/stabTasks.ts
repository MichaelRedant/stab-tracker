export type Frequency = '72h' | 'weekly' | 'monthly' | '90d';

export interface STABSubtask {
  id: string;
  label: string;
  frequency: Frequency[];
  completedAt?: string; // ISO date
}

export interface STABTaskGroup {
  id: string;
  category: 'Spending' | 'Targeting' | 'Ads' | 'Strategy';
  label: string;
  subtasks: STABSubtask[];
}

// Mini-sample
export const stabTasks: STABTaskGroup[] = [
  {
    id: 'spend-review',
    category: 'Spending',
    label: 'Review campaign spend vs results',
    subtasks: [
      {
        id: 'scale-campaigns',
        label: 'Are there any campaigns that are ready to scale? (Good conversion metrics & low impression share <65%)',
        frequency: ['monthly'],
      },
      {
        id: 'optimize-campaigns',
        label: 'Are there any campaigns that need extra optimisations?',
        frequency: ['weekly'],
      },
    ],
  },
  // Meer secties toevoegen
];
