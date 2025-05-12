import React from 'react';
import { Instagram, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t dark:border-gray-700 bg-white dark:bg-gray-800 py-6">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Developed by Prem & Pranay 
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © {new Date().getFullYear()} All rights reserved
            </p>
          </div>
          <div className="flex gap-4">
            <a
              href="https://www.instagram.com/prem0804_/profilecard/?igsh=NHQ0MmdkZWdjNHMx"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90 transition-opacity"
            >
              <Instagram size={20} />
              <span>Prem</span>
            </a>
            <a
              href="https://www.instagram.com/iamawantika?utm_source=qr&igsh=enk0NnZmcTB0ZnA1"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90 transition-opacity"
            >
              <Instagram size={20} />
              <span>Awantika Sharma</span>
            </a>
            <a
              href="https://www.instagram.com/pranay_alla/profilecard/?igsh=ZHp3eXJvZnJmdTZq"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90 transition-opacity"
            >
              <Instagram size={20} />
              <span>Pranay Alla</span>
            </a>
            <a
              href="https://wa.me/918074850696"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500 text-white hover:opacity-90 transition-opacity"
            >
              <Phone size={20} />
              <span>Lead</span>
            </a>
            <a
              href="https://wa.me/917981215685"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500 text-white hover:opacity-90 transition-opacity"
            >
              <Phone size={20} />
              <span>Co-Developer</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}