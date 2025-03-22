
import React, { useState, useRef, useEffect } from 'react';
import { Send, Smile, Mic } from 'lucide-react';
import { analyzeText } from '../utils/sentimentAnalysis';
import { AnimatePresence, motion } from 'framer-motion';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi there! I'm Empathia, your mental wellness companion. How are you feeling today?",
      sender: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);
    
    // Analyze sentiment
    const sentiment = await analyzeText(newMessage);
    
    // Generate AI response based on sentiment
    let response: string;
    
    if (sentiment === 'positive') {
      response = "That's wonderful to hear! It's great that you're feeling positive. What's been going well for you?";
    } else if (sentiment === 'negative') {
      response = "I'm sorry to hear you're not feeling your best. Would you like to talk more about what's bothering you? I'm here to listen.";
    } else {
      response = "Thanks for sharing. How would you describe your energy levels today?";
    }
    
    // Simulate typing delay for realism
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'assistant',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="glass-panel flex flex-col h-[70vh]">
      <div className="p-4 border-b border-mental-light flex items-center">
        <div className="h-10 w-10 rounded-full bg-mental-primary flex items-center justify-center text-white font-medium">
          E
        </div>
        <div className="ml-3">
          <h2 className="font-medium text-mental-dark">Empathia</h2>
          <p className="text-xs text-mental-dark/60">Your AI companion</p>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={message.sender === 'user' ? 'user-message' : 'assistant-message'}>
                <p>{message.text}</p>
                <span className="text-xs opacity-60 mt-1 block text-right">
                  {formatTime(message.timestamp)}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isTyping && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="assistant-message flex space-x-1">
              <div className="bg-mental-primary/40 h-2 w-2 rounded-full animate-pulse"></div>
              <div className="bg-mental-primary/40 h-2 w-2 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
              <div className="bg-mental-primary/40 h-2 w-2 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
            </div>
          </motion.div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-4 border-t border-mental-light">
        <div className="flex items-center space-x-2">
          <button className="p-2 rounded-full hover:bg-mental-secondary/50 transition-colors text-mental-dark/70">
            <Smile size={20} />
          </button>
          
          <div className="flex-1 relative">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type a message..."
              className="w-full px-4 py-3 rounded-full border border-mental-light focus:border-mental-primary focus:ring-1 focus:ring-mental-primary bg-white/70 backdrop-blur-sm resize-none outline-none text-sm"
              style={{ height: '44px', maxHeight: '120px' }}
              rows={1}
            />
          </div>
          
          <button 
            className="p-2 rounded-full hover:bg-mental-secondary/50 transition-colors text-mental-dark/70"
            aria-label="Voice input"
          >
            <Mic size={20} />
          </button>
          
          <button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className={`p-2 rounded-full ${newMessage.trim() ? 'bg-mental-primary text-white' : 'bg-mental-light text-mental-dark/40'} transition-colors`}
            aria-label="Send message"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
