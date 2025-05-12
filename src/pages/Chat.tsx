import React, { useEffect } from 'react';
import { useChatStore } from '../store/chatStore';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import ModeSelector from '../components/ModeSelector';
import ChatMessage from '../components/ChatMessage';
import ChatInput from '../components/ChatInput';
import ThinkingIndicator from '../components/ThinkingIndicator';
import ChatControls from '../components/ChatControls';
import Footer from '../components/Footer';

export default function Chat() {
  const { messages, isThinking, isDarkMode } = useChatStore();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-hidden">
          <div className="h-full flex flex-col">
            <div className="p-4">
              <ModeSelector />
            </div>
            <div className="flex-1 overflow-y-auto px-4 pb-24">
              {messages.length === 0 ? (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold mb-2">Welcome to Nunito AI</h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      Select a mode above and start chatting!
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((message) => (
                    <ChatMessage key={message.id} message={message} />
                  ))}
                  {isThinking && <ThinkingIndicator />}
                </div>
              )}
            </div>
          </div>
        </main>
        <ChatControls />
        <ChatInput />
        <Footer />
      </div>
    </div>
  );
}