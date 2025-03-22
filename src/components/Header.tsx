
import React from 'react';
import { MessageCircle, BarChart2, BookOpen, User } from 'lucide-react';

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentTab, setCurrentTab }) => {
  return (
    <header className="pt-6 pb-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl md:text-3xl font-display font-medium text-mental-dark">
          empathia<span className="text-mental-primary">.</span>
        </h1>
        <div className="flex items-center gap-2">
          <div className="glass-button px-4 py-2 text-sm font-medium">
            Get Help Now
          </div>
        </div>
      </div>

      <nav className="glass-panel p-2 flex justify-around items-center">
        <button 
          onClick={() => setCurrentTab('chat')} 
          className={`nav-item ${currentTab === 'chat' ? 'text-mental-primary' : 'text-mental-dark/70'}`}
          aria-label="Chat"
        >
          <MessageCircle size={24} />
        </button>
        <button 
          onClick={() => setCurrentTab('mood')} 
          className={`nav-item ${currentTab === 'mood' ? 'text-mental-primary' : 'text-mental-dark/70'}`}
          aria-label="Mood Tracker"
        >
          <BarChart2 size={24} />
        </button>
        <button 
          onClick={() => setCurrentTab('therapy')} 
          className={`nav-item ${currentTab === 'therapy' ? 'text-mental-primary' : 'text-mental-dark/70'}`}
          aria-label="Therapy"
        >
          <BookOpen size={24} />
        </button>
        <button 
          onClick={() => setCurrentTab('profile')} 
          className={`nav-item ${currentTab === 'profile' ? 'text-mental-primary' : 'text-mental-dark/70'}`}
          aria-label="Profile"
        >
          <User size={24} />
        </button>
      </nav>
    </header>
  );
};

export default Header;
