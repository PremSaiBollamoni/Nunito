import React from 'react';
import { Download, Trash2 } from 'lucide-react';
import { useChatStore } from '../store/chatStore';

export default function ChatControls() {
  const { messages, clearMessages } = useChatStore();

  const downloadTranscript = () => {
    const transcript = messages
      .map((msg) => `${msg.role}: ${msg.content}`)
      .join('\n\n');
    
    const blob = new Blob([transcript], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nunito-chat-${new Date().toISOString()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (messages.length === 0) return null;

  return (
    <div className="fixed bottom-20 right-4 flex flex-col gap-2">
      <button
        onClick={downloadTranscript}
        className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors"
        title="Download chat transcript"
      >
        <Download size={20} />
      </button>
      <button
        onClick={clearMessages}
        className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
        title="Clear chat"
      >
        <Trash2 size={20} />
      </button>
    </div>
  );
}