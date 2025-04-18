import React from 'react';
import { useSTABStore } from '../stores/stabStore';
import { Frequency } from '../data/stabTasks';

function formatLastDone(iso?: string): string {
  if (!iso) return 'Nog niet uitgevoerd';

  const last = new Date(iso).getTime();
  const now = Date.now();
  const diffDays = Math.floor((now - last) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Vandaag uitgevoerd';
  if (diffDays === 1) return '1 dag geleden';
  return `${diffDays} dagen geleden`;
}

type ChecklistProps = {
  frequency: Frequency;
};

export const Checklist: React.FC<ChecklistProps> = ({ frequency }) => {
  const {
    tasks,
    completed,
    markSubtaskDone,
    isSubtaskDue,
    resetFrequency,
  } = useSTABStore();

  return (
    <div className="space-y-6">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => resetFrequency(frequency)}
          className="text-sm text-red-600 border border-red-600 px-3 py-1 rounded hover:bg-red-100 dark:hover:bg-red-900 transition"
        >
          Reset frequentie: {frequency.toUpperCase()}
        </button>
      </div>

      {tasks.map(group => {
        const visibleSubtasks = group.subtasks.filter(subtask =>
          subtask.frequency.includes(frequency)
        );

        if (visibleSubtasks.length === 0) return null;

        return (
          <div
            key={group.id}
            className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg shadow p-4"
          >
            <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-100">
              {group.label}
            </h2>
            <ul className="mt-3 space-y-2">
              {visibleSubtasks.map(subtask => {
                const isDue = isSubtaskDue(subtask.id, frequency);
                const key = `${subtask.id}_${frequency}`;

                return (
                  <li key={subtask.id} className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={!isDue}
                      onChange={() => markSubtaskDone(subtask.id, frequency)}
                      className="mt-1 w-5 h-5 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <div>
                      <p className={isDue ? '' : 'line-through text-gray-400'}>
                        {subtask.label}
                      </p>
                      <p className="text-sm text-gray-500 italic">
                        {formatLastDone(completed[key])}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
};
