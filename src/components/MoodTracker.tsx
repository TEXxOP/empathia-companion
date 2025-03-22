
import React, { useState } from 'react';
import { BarChart, CalendarDays, Smile, Frown, Meh, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface MoodEntry {
  date: Date;
  mood: 'great' | 'good' | 'neutral' | 'sad' | 'awful';
  note: string;
}

const MoodTracker: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [note, setNote] = useState('');
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([
    { date: new Date(Date.now() - 86400000 * 1), mood: 'good', note: 'Had a productive day at work' },
    { date: new Date(Date.now() - 86400000 * 2), mood: 'neutral', note: 'Nothing special today' },
    { date: new Date(Date.now() - 86400000 * 3), mood: 'sad', note: 'Feeling a bit overwhelmed' },
    { date: new Date(Date.now() - 86400000 * 4), mood: 'great', note: 'Had a great workout and felt energized all day' },
    { date: new Date(Date.now() - 86400000 * 5), mood: 'good', note: 'Spent time with friends' },
  ]);

  const handleSaveMood = () => {
    if (!selectedMood) return;
    
    const newEntry: MoodEntry = {
      date: new Date(),
      mood: selectedMood as MoodEntry['mood'],
      note: note
    };
    
    setMoodHistory([newEntry, ...moodHistory]);
    setSelectedMood(null);
    setNote('');
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case 'great': return 'bg-green-400';
      case 'good': return 'bg-teal-400';
      case 'neutral': return 'bg-blue-400';
      case 'sad': return 'bg-purple-400';
      case 'awful': return 'bg-pink-400';
      default: return 'bg-gray-400';
    }
  };

  const getMoodIcon = (mood: string) => {
    switch (mood) {
      case 'great': 
      case 'good': 
        return <Smile className="text-white" />;
      case 'neutral': 
        return <Meh className="text-white" />;
      case 'sad': 
      case 'awful': 
        return <Frown className="text-white" />;
      default: 
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="glass-panel p-6 space-y-6">
        <h2 className="text-xl font-medium font-display text-mental-dark">How are you feeling today?</h2>
        
        <div className="flex justify-between">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedMood('great')}
            className={`mood-button ${selectedMood === 'great' ? 'ring-2 ring-green-400 scale-110' : ''}`}
          >
            <div className="flex flex-col items-center">
              <div className="text-2xl mb-2">😄</div>
              <span className="text-xs font-medium text-mental-dark">Great</span>
            </div>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedMood('good')}
            className={`mood-button ${selectedMood === 'good' ? 'ring-2 ring-teal-400 scale-110' : ''}`}
          >
            <div className="flex flex-col items-center">
              <div className="text-2xl mb-2">🙂</div>
              <span className="text-xs font-medium text-mental-dark">Good</span>
            </div>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedMood('neutral')}
            className={`mood-button ${selectedMood === 'neutral' ? 'ring-2 ring-blue-400 scale-110' : ''}`}
          >
            <div className="flex flex-col items-center">
              <div className="text-2xl mb-2">😐</div>
              <span className="text-xs font-medium text-mental-dark">Okay</span>
            </div>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedMood('sad')}
            className={`mood-button ${selectedMood === 'sad' ? 'ring-2 ring-purple-400 scale-110' : ''}`}
          >
            <div className="flex flex-col items-center">
              <div className="text-2xl mb-2">😔</div>
              <span className="text-xs font-medium text-mental-dark">Sad</span>
            </div>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedMood('awful')}
            className={`mood-button ${selectedMood === 'awful' ? 'ring-2 ring-pink-400 scale-110' : ''}`}
          >
            <div className="flex flex-col items-center">
              <div className="text-2xl mb-2">😢</div>
              <span className="text-xs font-medium text-mental-dark">Awful</span>
            </div>
          </motion.button>
        </div>
        
        {selectedMood && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4"
          >
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add a note about how you're feeling... (optional)"
              className="w-full px-4 py-3 rounded-xl border border-mental-light focus:border-mental-primary focus:ring-1 focus:ring-mental-primary bg-white/70 backdrop-blur-sm resize-none outline-none h-24"
            />
            
            <button 
              onClick={handleSaveMood}
              className="glass-button w-full py-3"
            >
              Save My Mood
            </button>
          </motion.div>
        )}
      </div>
      
      <div className="glass-panel p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-medium font-display text-mental-dark">Your Mood History</h2>
          <div className="flex space-x-2">
            <button className="p-2 rounded-full bg-white shadow-soft transition-all duration-300 transform hover:scale-105">
              <BarChart size={18} className="text-mental-dark/70" />
            </button>
            <button className="p-2 rounded-full bg-white shadow-soft transition-all duration-300 transform hover:scale-105">
              <CalendarDays size={18} className="text-mental-dark/70" />
            </button>
          </div>
        </div>
        
        <div className="space-y-3">
          {moodHistory.map((entry, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="glass-card p-4 flex items-center"
            >
              <div className={`h-10 w-10 rounded-full ${getMoodColor(entry.mood)} flex items-center justify-center shadow-md`}>
                {getMoodIcon(entry.mood)}
              </div>
              <div className="ml-3 flex-1">
                <div className="flex justify-between">
                  <h3 className="font-medium text-mental-dark capitalize">{entry.mood}</h3>
                  <span className="text-xs text-mental-dark/60">{formatDate(entry.date)}</span>
                </div>
                <p className="text-sm text-mental-dark/70 line-clamp-1">{entry.note}</p>
              </div>
              <button className="ml-2 p-1 rounded-full hover:bg-mental-secondary/30 transition-colors">
                <ChevronRight size={18} className="text-mental-dark/40" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoodTracker;
