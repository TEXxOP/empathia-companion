
import React from 'react';
import { motion } from 'framer-motion';
import { PlayCircle, Clock, BookOpen, Award, ChevronRight, UserCheck } from 'lucide-react';

interface TherapyModule {
  id: string;
  title: string;
  description: string;
  duration: string;
  progress: number;
  category: 'anxiety' | 'depression' | 'stress' | 'sleep' | 'mindfulness';
  level: 'beginner' | 'intermediate' | 'advanced';
}

const TherapyModules: React.FC = () => {
  const modules: TherapyModule[] = [
    {
      id: '1',
      title: 'Managing Everyday Anxiety',
      description: 'Learn effective techniques to manage anxiety in daily situations',
      duration: '15 min',
      progress: 0,
      category: 'anxiety',
      level: 'beginner'
    },
    {
      id: '2',
      title: 'Deep Breathing Exercises',
      description: 'Simple yet powerful breathing techniques for stress relief',
      duration: '8 min',
      progress: 33,
      category: 'stress',
      level: 'beginner'
    },
    {
      id: '3',
      title: 'Understanding Your Emotions',
      description: 'Identify and process complex emotional responses',
      duration: '20 min',
      progress: 75,
      category: 'mindfulness',
      level: 'intermediate'
    },
    {
      id: '4',
      title: 'Building Resilience',
      description: 'Develop skills to bounce back from life's challenges',
      duration: '25 min',
      progress: 0,
      category: 'depression',
      level: 'intermediate'
    },
    {
      id: '5',
      title: 'Improving Sleep Quality',
      description: 'Techniques for better sleep and restful nights',
      duration: '12 min',
      progress: 0,
      category: 'sleep',
      level: 'beginner'
    },
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'anxiety': return 'bg-blue-400';
      case 'depression': return 'bg-purple-400';
      case 'stress': return 'bg-orange-400';
      case 'sleep': return 'bg-indigo-400';
      case 'mindfulness': return 'bg-green-400';
      default: return 'bg-gray-400';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'anxiety': return '😌';
      case 'depression': return '🌱';
      case 'stress': return '🧘';
      case 'sleep': return '💤';
      case 'mindfulness': return '🧠';
      default: return '📚';
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-6">
      <div className="glass-panel p-6">
        <h2 className="text-xl font-medium font-display text-mental-dark mb-4">
          Continue Where You Left Off
        </h2>
        
        {modules.filter(m => m.progress > 0).length > 0 ? (
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-4"
          >
            {modules.filter(m => m.progress > 0).map((module) => (
              <motion.div 
                key={module.id}
                variants={item}
                className="glass-card p-4"
              >
                <div className="flex items-center mb-3">
                  <div className={`h-8 w-8 rounded-full ${getCategoryColor(module.category)} flex items-center justify-center text-sm shadow-soft`}>
                    {getCategoryIcon(module.category)}
                  </div>
                  <div className="ml-3 flex-1">
                    <h3 className="font-medium text-mental-dark">{module.title}</h3>
                    <div className="flex items-center text-xs text-mental-dark/60">
                      <Clock size={12} className="mr-1" />
                      <span>{module.duration}</span>
                      <div className="mx-2 h-1 w-1 rounded-full bg-mental-dark/30"></div>
                      <BookOpen size={12} className="mr-1" />
                      <span className="capitalize">{module.level}</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-mental-light rounded-full h-2.5 mb-3">
                  <div 
                    className={`h-2.5 rounded-full ${getCategoryColor(module.category)}`}
                    style={{ width: `${module.progress}%` }}
                  ></div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-xs text-mental-dark/60">
                    {module.progress}% complete
                  </span>
                  <button className="glass-button px-4 py-1 text-xs flex items-center">
                    <PlayCircle size={14} className="mr-1" />
                    Continue
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-8">
            <div className="mx-auto h-16 w-16 rounded-full bg-mental-secondary flex items-center justify-center mb-4">
              <BookOpen className="text-mental-primary" size={24} />
            </div>
            <h3 className="font-medium text-mental-dark mb-2">No modules in progress</h3>
            <p className="text-sm text-mental-dark/70 mb-4">Start a module from the list below</p>
          </div>
        )}
      </div>
      
      <div className="glass-panel p-6">
        <h2 className="text-xl font-medium font-display text-mental-dark mb-4">
          Recommended For You
        </h2>
        
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-4"
        >
          {modules.filter(m => m.progress === 0).map((module) => (
            <motion.div 
              key={module.id}
              variants={item}
              className="glass-card p-4 hover:bg-white/90 transition-all cursor-pointer group"
            >
              <div className="flex items-center">
                <div className={`h-10 w-10 rounded-full ${getCategoryColor(module.category)} flex items-center justify-center text-lg shadow-soft`}>
                  {getCategoryIcon(module.category)}
                </div>
                <div className="ml-3 flex-1">
                  <h3 className="font-medium text-mental-dark">{module.title}</h3>
                  <p className="text-sm text-mental-dark/70 line-clamp-1">{module.description}</p>
                  <div className="flex items-center text-xs text-mental-dark/60 mt-1">
                    <Clock size={12} className="mr-1" />
                    <span>{module.duration}</span>
                    <div className="mx-2 h-1 w-1 rounded-full bg-mental-dark/30"></div>
                    <BookOpen size={12} className="mr-1" />
                    <span className="capitalize">{module.level}</span>
                    {module.level === 'beginner' && (
                      <>
                        <div className="mx-2 h-1 w-1 rounded-full bg-mental-dark/30"></div>
                        <UserCheck size={12} className="mr-1" />
                        <span>Popular</span>
                      </>
                    )}
                  </div>
                </div>
                <ChevronRight size={18} className="text-mental-dark/40 group-hover:text-mental-primary transition-colors" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default TherapyModules;
