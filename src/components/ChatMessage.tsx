import React from 'react';
import { User, MessageSquare } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Message } from '../types';

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''} p-4`}>
      <div className="flex-shrink-0">
        {isUser ? (
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
            <User size={20} className="text-white" />
          </div>
        ) : (
          <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center">
            <MessageSquare size={20} className="text-white" />
          </div>
        )}
      </div>
      <div
        className={`flex-1 max-w-2xl ${
          isUser ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-800'
        } rounded-lg p-4`}
      >
        {message.type === 'image' && message.imageUrl && (
          <img src={message.imageUrl} alt="User upload" className="max-w-sm rounded-lg mb-2" />
        )}
        <ReactMarkdown
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');
              return !inline && match ? (
                <SyntaxHighlighter
                  style={tomorrow}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        >
          {message.content}
        </ReactMarkdown>
      </div>
    </div>
  );
}