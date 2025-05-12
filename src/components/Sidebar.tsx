import React from 'react';
import { motion } from 'framer-motion';
import { PlusCircle, MessageSquare, Settings, LogOut } from 'lucide-react';
import { useChatStore } from '../store/chatStore';
import { AuthService } from '../services/auth';
import { useNavigate } from 'react-router-dom';

export default function Sidebar() {
  const { clearMessages, user, setUser } = useChatStore();
  const navigate = useNavigate();
  const auth = AuthService.getInstance();

  const handleNewChat = () => {
    clearMessages();
  };

  const handleLogout = async () => {
    await auth.logout();
    setUser(null);
    navigate('/');
  };

  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      className="w-64 bg-gray-50 dark:bg-gray-800 h-screen flex flex-col border-r dark:border-gray-700"
    >
      <div className="p-4">
        <button
          onClick={handleNewChat}
          className="w-full flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
        >
          <PlusCircle size={20} />
          <span>New Chat</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Recent Chats</h2>
        <div className="space-y-2">
          {/* Chat history items will be mapped here */}
          <button className="w-full flex items-center gap-2 px-3 py-2 text-left rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
            <MessageSquare size={16} />
            <span className="truncate">Previous Chat 1</span>
          </button>
        </div>
      </div>

      <div className="border-t dark:border-gray-700 p-4">
        <div className="flex items-center gap-3 mb-4">
          <img src={user?.avatar} alt={user?.name} className="w-8 h-8 rounded-full" />
          <div>
            <p className="font-medium">{user?.name}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{user?.email}</p>
          </div>
        </div>
        <div className="space-y-2">
          <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
            <Settings size={16} />
            <span>Settings</span>
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            <LogOut size={16} />
            <span>Log out</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}