import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  year: string;
  type: 'award' | 'hackathon' | 'publication' | 'speaking';
}

interface AchievementsFormProps {
  achievements: Achievement[];
  onChange: (achievements: Achievement[]) => void;
}

export default function AchievementsForm({ achievements, onChange }: AchievementsFormProps) {
  const [newAchievement, setNewAchievement] = useState<Achievement>({
    id: '',
    title: '',
    year: '',
    type: 'award'
  });

  const addAchievement = () => {
    if (newAchievement.title && newAchievement.year) {
      const achievement = {
        ...newAchievement,
        id: Date.now().toString()
      };
      onChange([...achievements, achievement]);
      setNewAchievement({ id: '', title: '', year: '', type: 'award' });
    }
  };

  const removeAchievement = (id: string) => {
    onChange(achievements.filter(ach => ach.id !== id));
  };

  const getTypeLabel = (type: string) => {
    const labels = {
      award: 'Award/Recognition',
      hackathon: 'Hackathon/Competition',
      publication: 'Publication',
      speaking: 'Speaking Engagement'
    };
    return labels[type as keyof typeof labels];
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Achievements</h3>
      
      <div className="space-y-3">
        {achievements.map((ach) => (
          <div key={ach.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">{ach.title}</p>
              <p className="text-sm text-gray-600">{getTypeLabel(ach.type)} - {ach.year}</p>
            </div>
            <button
              onClick={() => removeAchievement(ach.id)}
              className="text-red-500 hover:text-red-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <input
          type="text"
          placeholder="Achievement Title"
          value={newAchievement.title}
          onChange={(e) => setNewAchievement({ ...newAchievement, title: e.target.value })}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={newAchievement.type}
          onChange={(e) => setNewAchievement({ ...newAchievement, type: e.target.value as Achievement['type'] })}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="award">Award/Recognition</option>
          <option value="hackathon">Hackathon/Competition</option>
          <option value="publication">Publication</option>
          <option value="speaking">Speaking Engagement</option>
        </select>
        <input
          type="text"
          placeholder="Year"
          value={newAchievement.year}
          onChange={(e) => setNewAchievement({ ...newAchievement, year: e.target.value })}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        onClick={addAchievement}
        className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        <Plus className="w-4 h-4" />
        Add Achievement
      </button>
    </div>
  );
}
