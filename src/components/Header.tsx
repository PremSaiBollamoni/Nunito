import React from 'react';
import { Moon, Sun, User as UserIcon, LogOut, Volume2, VolumeX } from 'lucide-react';
import { useChatStore } from '../store/chatStore';
import { AuthService } from '../services/auth';

export default function Header() {
  const { isDarkMode, toggleTheme, user, setUser, autoSpeak, toggleAutoSpeak } = useChatStore();
  const auth = AuthService.getInstance();

  const handleLogin = async () => {
    const user = await auth.login();
    setUser(user);
  };

  const handleLogout = async () => {
    await auth.logout();
    setUser(null);
  };

  return (
    <header className="border-b dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center">
            <span className="text-white font-bold">N</span>
          </div>
          <h1 className="text-xl font-bold">Nunito AI</h1>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={toggleAutoSpeak}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            title={autoSpeak ? 'Disable auto-speak' : 'Enable auto-speak'}
          >
            {autoSpeak ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          {user ? (
            <div className="flex items-center gap-2">
              <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
              <button
                onClick={handleLogout}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <button
              onClick={handleLogin}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <UserIcon size={20} />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}