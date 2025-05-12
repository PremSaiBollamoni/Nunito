export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  type: 'text' | 'image' | 'voice';
  imageUrl?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export type ChatMode = 'text' | 'image' | 'voice';

export interface ChatHistory {
  id: string;
  title: string;
  messages: Message[];
  timestamp: number;
}

export interface ChatState {
  messages: Message[];
  isThinking: boolean;
  isDarkMode: boolean;
  user: User | null;
  currentMode: ChatMode;
  autoSpeak: boolean;
  chatHistory: ChatHistory[];
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  setThinking: (thinking: boolean) => void;
  toggleTheme: () => void;
  setUser: (user: User | null) => void;
  clearMessages: () => void;
  setMode: (mode: ChatMode) => void;
  toggleAutoSpeak: () => void;
  saveChatToHistory: () => void;
  loadChat: (chatId: string) => void;
}