import React from 'react';
import { Loader2 } from 'lucide-react';

export default function ThinkingIndicator() {
  return (
    <div className="flex items-center gap-2 p-4 text-gray-500">
      <Loader2 className="animate-spin" size={20} />
      <span>Nunito is thinking...</span>
    </div>
  );
}