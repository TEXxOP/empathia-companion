
import React, { ReactNode } from 'react';
import { AnimatePresence, motion } from "framer-motion";
import Header from '../components/Header';

interface AppLayoutProps {
  children: ReactNode;
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children, currentTab, setCurrentTab }) => {
  return (
    <div className="min-h-[100dvh] bg-gradient-to-br from-mental-light to-mental-secondary/30 overflow-hidden">
      <div className="page-container relative">
        <Header currentTab={currentTab} setCurrentTab={setCurrentTab} />
        
        <AnimatePresence mode="wait">
          <motion.main
            key={currentTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 pb-24"
          >
            {children}
          </motion.main>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AppLayout;
