import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ChatState, ChatMode, Message } from '../types';

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      messages: [],
      isThinking: false,
      isDarkMode: false,
      user: null,
      currentMode: 'text' as ChatMode,
      autoSpeak: false,
      chatHistory: [],
      addMessage: (message) =>
        set((state) => ({
          messages: [
            ...state.messages,
            {
              ...message,
              id: crypto.randomUUID(),
              timestamp: Date.now(),
            },
          ],
        })),
      setThinking: (thinking) => set({ isThinking: thinking }),
      toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
      setUser: (user) => set({ user }),
      clearMessages: () => set({ messages: [] }),
      setMode: (mode) => set({ currentMode: mode }),
      toggleAutoSpeak: () => set((state) => ({ autoSpeak: !state.autoSpeak })),
      saveChatToHistory: () =>
        set((state) => ({
          chatHistory: [
            {
              id: crypto.randomUUID(),
              title: state.messages[0]?.content.slice(0, 30) + '...' || 'New Chat',
              messages: [...state.messages],
              timestamp: Date.now(),
            },
            ...state.chatHistory,
          ].slice(0, 10), // Keep only last 10 chats
          messages: [],
        })),
      loadChat: (chatId) =>
        set((state) => {
          const chat = state.chatHistory.find((c) => c.id === chatId);
          return chat ? { messages: chat.messages } : state;
        }),
    }),
    {
      name: 'nunito-storage',
      partialize: (state) => ({
        chatHistory: state.chatHistory,
        isDarkMode: state.isDarkMode,
      }),
    }
  )
);