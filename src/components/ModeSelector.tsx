import React from 'react';
import { MessageSquare, Image, Mic } from 'lucide-react';
import { useChatStore } from '../store/chatStore';

export default function ModeSelector() {
  const { setMode, currentMode } = useChatStore();

  const modes = [
    { id: 'text', icon: MessageSquare, label: 'NunitoText', color: 'bg-blue-500' },
    { id: 'image', icon: Image, label: 'NunitoImage', color: 'bg-green-500' },
    { id: 'voice', icon: Mic, label: 'NunitoVoice', color: 'bg-purple-500' }
  ];

  return (
    <div className="flex justify-center gap-4 mb-6">
      {modes.map(({ id, icon: Icon, label, color }) => (
        <button
          key={id}
          onClick={() => setMode(id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all
            ${currentMode === id 
              ? `${color} text-white shadow-lg scale-105` 
              : 'bg-gray-100 dark:bg-gray-800 hover:scale-105'}`}
        >
          <Icon size={20} />
          <span className="font-medium">{label}</span>
        </button>
      ))}
    </div>
  );
}