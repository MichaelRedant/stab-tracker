import { create } from 'zustand';
import { stabTasks, Frequency, STABTaskGroup } from '../data/stabTasks';

type SubtaskKey = `${string}_${Frequency}`;

interface STABStore {
  tasks: STABTaskGroup[];
  completed: Record<SubtaskKey, string>;
  markSubtaskDone: (id: string, frequency: Frequency) => void;
  resetFrequency: (frequency: Frequency) => void;
  isSubtaskDue: (id: string, frequency: Frequency) => boolean;
}

const STORAGE_KEY = 'stab-checklist-progress';

const loadProgress = (): Record<SubtaskKey, string> => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

const saveProgress = (data: Record<SubtaskKey, string>) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // fail silently
  }
};

export const useSTABStore = create<STABStore>((set, get) => ({
  tasks: stabTasks,
  completed: loadProgress(),

  resetFrequency: (frequency) => {
    const updated = { ...get().completed };
    Object.keys(updated).forEach(key => {
      if (key.endsWith(`_${frequency}`)) {
        delete updated[key];
      }
    });
    set({ completed: updated });
    saveProgress(updated);
  },
  

  markSubtaskDone: (id, frequency) => {
    const key: SubtaskKey = `${id}_${frequency}`;
    const current = get().completed[key];
    let updated = { ...get().completed };
  
    if (current) {
      // 👇 Taak was al voltooid → ontvinken
      delete updated[key];
    } else {
      // ✅ Markeren als voltooid
      updated[key] = new Date().toISOString();
    }
  
    set({ completed: updated });
    saveProgress(updated);
  },
  
  isSubtaskDue: (id, frequency) => {
    const key: SubtaskKey = `${id}_${frequency}`;
    const lastDone = get().completed[key];
    if (!lastDone) return true;

    const last = new Date(lastDone).getTime();
    const now = Date.now();

    const hoursPassed = (now - last) / (1000 * 60 * 60);
    const thresholds = {
      '72h': 72,
      'weekly': 24 * 7,
      'monthly': 24 * 30,
      '90d': 24 * 90,
    };

    return hoursPassed >= thresholds[frequency];
  },
}));
