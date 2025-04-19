
import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase, NewsItem } from '@/integrations/supabase/client';
import { X, MessageSquare, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { useLocation } from 'react-router-dom';

// Removed the NEWS_POPUP_SHOWN_KEY since we want to always show popup
const POPUP_DISPLAY_DURATION = 5000; // 5 seconds display duration
const POPUP_INITIAL_DELAY = 1000; // 1 second initial delay

const NewsPopup = () => {
  const [open, setOpen] = useState(false);
  const [currentNewsItem, setCurrentNewsItem] = useState<NewsItem | null>(null);
  const [animateOut, setAnimateOut] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();
  
  // Fetch featured news items from Supabase
  const { data: featuredNews = [] } = useQuery({
    queryKey: ['featured-news-items'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .eq('is_featured', true)
        .order('created_at', { ascending: false })
        .limit(5);
      
      if (error) {
        console.error('Error fetching featured news:', error);
        return [];
      }
      
      return data as NewsItem[];
    },
  });

  // Reset popup state when on homepage and path changes (through navigation or refresh)
  useEffect(() => {
    if (location.pathname === '/') {
      setOpen(false);
      setAnimateOut(false);
      
      // Show popup with delay when featured news exists
      if (featuredNews.length > 0) {
        const showTimer = setTimeout(() => {
          // Prioritize graduation-related news
          const graduationNews = featuredNews.find(
            news => news.title.toLowerCase().includes('wisuda') || 
                   news.title.toLowerCase().includes('foto') || 
                   news.title.toLowerCase().includes('video')
          );
          
          // If no graduation news, show the first featured news
          setCurrentNewsItem(graduationNews || featuredNews[0]);
          setOpen(true);
          
          // Auto-close after display duration
          const hideTimer = setTimeout(() => {
            handleCloseWithAnimation();
          }, POPUP_DISPLAY_DURATION);
          
          return () => clearTimeout(hideTimer);
        }, POPUP_INITIAL_DELAY);
        
        return () => clearTimeout(showTimer);
      }
    }
  }, [location.pathname, featuredNews]);

  const handleCloseWithAnimation = () => {
    setAnimateOut(true);
    setTimeout(() => {
      setOpen(false);
      setAnimateOut(false);
    }, 300);
  };

  const handleContactClick = () => {
    if (!currentNewsItem) {
      toast.error('Informasi kontak tidak tersedia');
      return;
    }
    
    const message = `Halo! Saya tertarik dengan info "${currentNewsItem.title}" di ROBsPlus. Saya ingin tahu lebih lanjut tentang layanan foto & video wisuda.`;
    const whatsappUrl = `https://wa.me/6285768192419?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (!currentNewsItem) return null;

  return (
    <Dialog open={open} onOpenChange={(value) => {
      if (!value) handleCloseWithAnimation();
      else setOpen(value);
    }}>
      <DialogContent 
        className={cn(
          "bg-dark-secondary border-gray-700 text-white p-0 overflow-hidden",
          "transition-all duration-300 transform perspective-1000",
          !animateOut 
            ? "animate-in fade-in-50 duration-300 scale-100 rotate-y-0" 
            : "animate-out fade-out-50 duration-300 scale-95 rotate-y-12",
          isMobile ? "w-[95%] max-h-[90vh] rounded-lg" : "rounded-lg max-w-5xl"
        )}
      >
        <div className={cn(
          "grid gap-0",
          isMobile ? "grid-rows-[auto_auto]" : "md:grid-cols-2"
        )}>
          <div className={cn(
            "relative",
            isMobile ? "h-[300px]" : "h-[500px]"
          )}>
            <img 
              src={currentNewsItem.image_url} 
              alt={currentNewsItem.title}
              className="w-full h-full object-contain bg-black"
            />
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleCloseWithAnimation}
              className="absolute top-2 right-2 z-20 h-8 w-8 rounded-full bg-black/50 hover:bg-black/70 text-white"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="p-6 space-y-4 flex flex-col">
            <DialogHeader>
              <DialogTitle className="text-xl md:text-2xl font-bold mb-3 flex items-center gap-2">
                <Camera className="h-5 w-5 text-cyberpunk flex-shrink-0" />
                {currentNewsItem.title}
              </DialogTitle>
            </DialogHeader>
            
            <div className="flex-1">
              <p className="text-gray-300 text-sm md:text-base whitespace-pre-line">
                {currentNewsItem.content}
              </p>
            </div>
            
            <Button 
              className="bg-cyberpunk hover:bg-cyberpunk-light flex items-center gap-2 w-full"
              onClick={handleContactClick}
            >
              <MessageSquare className="h-4 w-4" />
              Hubungi via WhatsApp
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewsPopup;
