import React, { useState, useRef } from 'react';
import { Mic, Image, Send, Loader2 } from 'lucide-react';
import { useChatStore } from '../store/chatStore';
import { generateTextResponse, analyzeImage } from '../services/gemini';
import { SpeechService } from '../services/speech';

export default function ChatInput() {
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { addMessage, isThinking, setThinking, currentMode, autoSpeak } = useChatStore();
  const speechService = useRef(new SpeechService());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isThinking) return;

    const userMessage = input.trim();
    addMessage({
      role: 'user',
      content: userMessage,
      type: currentMode,
    });
    setInput('');
    setThinking(true);

    try {
      const response = await generateTextResponse(userMessage);
      addMessage({
        role: 'assistant',
        content: response,
        type: 'text',
      });
      if (autoSpeak) {
        speechService.current.speak(response);
      }
    } catch (error) {
      addMessage({
        role: 'assistant',
        content: 'I apologize, but I encountered an error processing your request.',
        type: 'text',
      });
    } finally {
      setThinking(false);
    }
  };

  const handleVoiceInput = () => {
    if (isRecording) {
      speechService.current.stopListening();
      setIsRecording(false);
    } else {
      setIsRecording(true);
      speechService.current.startListening(
        (text) => setInput(text),
        () => setIsRecording(false)
      );
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const imageData = event.target?.result as string;
      addMessage({
        role: 'user',
        content: 'Can you analyze this image?',
        type: 'image',
        imageUrl: imageData,
      });
      setThinking(true);

      try {
        const response = await analyzeImage(imageData, 'Please analyze this image and describe what you see.');
        addMessage({
          role: 'assistant',
          content: response,
          type: 'text',
        });
        if (autoSpeak) {
          speechService.current.speak(response);
        }
      } catch (error) {
        addMessage({
          role: 'assistant',
          content: 'I apologize, but I encountered an error analyzing the image.',
          type: 'text',
        });
      } finally {
        setThinking(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const renderInput = () => {
    switch (currentMode) {
      case 'voice':
        return (
          <>
            <button
              type="button"
              onClick={handleVoiceInput}
              className={`p-2 rounded-full ${
                isRecording ? 'bg-red-500 text-white' : 'bg-gray-100 dark:bg-gray-700'
              } hover:opacity-80 transition-opacity`}
            >
              <Mic size={20} />
            </button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Speak or type your message..."
              className="flex-1 p-2 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </>
        );
      case 'image':
        return (
          <>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:opacity-80 transition-opacity"
            >
              <Image size={20} />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Upload an image or ask a question..."
              className="flex-1 p-2 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </>
        );
      default:
        return (
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t dark:border-gray-700 bg-white dark:bg-gray-800">
      <div className="flex items-center gap-2 max-w-4xl mx-auto">
        {renderInput()}
        <button
          type="submit"
          disabled={isThinking || !input.trim()}
          className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 transition-all"
        >
          {isThinking ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
        </button>
      </div>
    </form>
  );
}