
import React, { useState } from 'react';
import AppLayout from '../layouts/AppLayout';
import Chat from '../components/Chat';
import MoodTracker from '../components/MoodTracker';
import TherapyModules from '../components/TherapyModules';
import { User, Settings, Heart, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const Index: React.FC = () => {
  const [currentTab, setCurrentTab] = useState('chat');

  const renderContent = () => {
    switch (currentTab) {
      case 'chat':
        return <Chat />;
      case 'mood':
        return <MoodTracker />;
      case 'therapy':
        return <TherapyModules />;
      case 'profile':
        return <ProfileContent />;
      default:
        return <Chat />;
    }
  };

  return (
    <AppLayout currentTab={currentTab} setCurrentTab={setCurrentTab}>
      {renderContent()}
    </AppLayout>
  );
};

// Placeholder Profile Content
const ProfileContent: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="glass-panel p-6 text-center">
        <div className="relative mx-auto mb-4">
          <div className="h-24 w-24 rounded-full bg-mental-secondary flex items-center justify-center text-3xl font-medium border-4 border-white shadow-md">
            S
          </div>
          <div className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-mental-primary shadow-soft flex items-center justify-center">
            <User className="text-white" size={14} />
          </div>
        </div>
        <h2 className="text-xl font-medium font-display text-mental-dark">Sarah Johnson</h2>
        <p className="text-sm text-mental-dark/70">Member since June 2023</p>
        
        <div className="mt-6 flex justify-center">
          <button className="glass-button px-6 py-2">Edit Profile</button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-panel p-6"
        >
          <div className="flex items-center mb-4">
            <div className="h-8 w-8 rounded-full bg-mental-accent flex items-center justify-center shadow-soft">
              <Heart className="text-mental-dark/70" size={16} />
            </div>
            <h3 className="ml-3 font-medium text-lg text-mental-dark">Your Journey</h3>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-mental-dark/80">Sessions completed</span>
              <span className="font-medium text-mental-dark">12</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-mental-dark/80">Mood entries</span>
              <span className="font-medium text-mental-dark">28</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-mental-dark/80">Streaks</span>
              <span className="font-medium text-mental-dark">7 days</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-mental-dark/80">Achievements</span>
              <span className="font-medium text-mental-dark">4</span>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-panel p-6"
        >
          <div className="flex items-center mb-4">
            <div className="h-8 w-8 rounded-full bg-mental-calm flex items-center justify-center shadow-soft">
              <Settings className="text-mental-dark/70" size={16} />
            </div>
            <h3 className="ml-3 font-medium text-lg text-mental-dark">Settings</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-mental-dark/80">Notifications</span>
              <div className="h-6 w-11 rounded-full bg-mental-primary relative cursor-pointer">
                <div className="h-5 w-5 rounded-full bg-white absolute right-0.5 top-0.5 shadow-sm transform transition-transform duration-200"></div>
              </div>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-mental-dark/80">Daily reminders</span>
              <div className="h-6 w-11 rounded-full bg-mental-primary relative cursor-pointer">
                <div className="h-5 w-5 rounded-full bg-white absolute right-0.5 top-0.5 shadow-sm transform transition-transform duration-200"></div>
              </div>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-mental-dark/80">Dark mode</span>
              <div className="h-6 w-11 rounded-full bg-mental-light relative cursor-pointer">
                <div className="h-5 w-5 rounded-full bg-white absolute left-0.5 top-0.5 shadow-sm transform transition-transform duration-200"></div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-panel p-6"
      >
        <div className="flex items-center mb-4">
          <div className="h-8 w-8 rounded-full bg-mental-secondary flex items-center justify-center shadow-soft">
            <Shield className="text-mental-dark/70" size={16} />
          </div>
          <h3 className="ml-3 font-medium text-lg text-mental-dark">Privacy & Security</h3>
        </div>
        
        <div className="space-y-4">
          <p className="text-sm text-mental-dark/70">
            Your data is encrypted and securely stored. We prioritize your privacy and never share your information with third parties.
          </p>
          
          <div className="flex justify-between items-center py-2">
            <span className="text-sm text-mental-dark/80">Data encryption</span>
            <span className="text-xs px-2 py-1 bg-green-100 text-green-600 rounded-full">Enabled</span>
          </div>
          
          <div className="flex justify-between items-center py-2">
            <span className="text-sm text-mental-dark/80">Anonymous usage</span>
            <div className="h-6 w-11 rounded-full bg-mental-primary relative cursor-pointer">
              <div className="h-5 w-5 rounded-full bg-white absolute right-0.5 top-0.5 shadow-sm transform transition-transform duration-200"></div>
            </div>
          </div>
          
          <button className="text-sm text-mental-primary hover:text-mental-primary/80 transition-colors">
            View Privacy Policy
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Index;
