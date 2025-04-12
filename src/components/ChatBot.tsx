
import React, { useState } from 'react';
import { MessageSquare, X, Send, Bot } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "./ui/input";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<{text: string, isUser: boolean}[]>([
    {text: "Halo! Selamat datang di ROBsPlus. Ada yang bisa saya bantu?", isUser: false}
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) return;
    
    // Add user message to chat
    setMessages(prev => [...prev, {text: message, isUser: true}]);
    
    // Prepare automatic response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        text: "Terima kasih atas pertanyaan Anda. Tim kami akan segera menghubungi Anda. Untuk respon lebih cepat, silakan hubungi kami melalui WhatsApp di +62 85768192419.",
        isUser: false
      }]);
    }, 1000);
    
    setMessage("");
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <button 
            className="w-14 h-14 rounded-full bg-cyberpunk flex items-center justify-center shadow-lg hover:bg-cyberpunk-light transition-all duration-300 animate-pulse-light"
            aria-label="Chat dengan AI Assistant"
          >
            <Bot className="text-white" size={24} />
          </button>
        </SheetTrigger>
        <SheetContent className="w-[90%] sm:w-[380px] h-[500px] sm:h-[600px] p-0 flex flex-col bg-dark-secondary border-l border-cyberpunk/30">
          <SheetHeader className="px-4 py-3 border-b border-gray-700 bg-dark">
            <div className="flex justify-between items-center w-full">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-cyberpunk flex items-center justify-center">
                  <Bot className="text-white" size={18} />
                </div>
                <div>
                  <SheetTitle className="text-white text-left">ROBsPlus Assistant</SheetTitle>
                  <SheetDescription className="text-gray-400 text-left text-xs">
                    Online | Siap membantu Anda
                  </SheetDescription>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>
          </SheetHeader>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] p-3 rounded-lg ${
                    msg.isUser 
                      ? 'bg-cyberpunk text-white rounded-tr-none' 
                      : 'bg-gray-700 text-white rounded-tl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-3 border-t border-gray-700">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <Input
                type="text"
                placeholder="Tulis pesan Anda..."
                className="flex-1 bg-dark border-gray-700 text-white"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button 
                type="submit" 
                className="bg-cyberpunk hover:bg-cyberpunk-light text-white p-2 rounded-md transition-all duration-300"
              >
                <Send size={20} />
              </button>
            </form>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ChatBot;
