
import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase, NewsItem } from '@/integrations/supabase/client';
import { X, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

const NEWS_POPUP_SHOWN_KEY = 'news_popup_shown_ids';
const POPUP_DISPLAY_DURATION = 5000; // 5 seconds display duration

const NewsPopup = () => {
  const [open, setOpen] = useState(false);
  const [currentNewsItem, setCurrentNewsItem] = useState<NewsItem | null>(null);
  const [animateOut, setAnimateOut] = useState(false);
  const isMobile = useIsMobile();
  
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

  useEffect(() => {
    // Check if we have any featured news
    if (featuredNews.length === 0) return;

    // Get the list of already shown popup IDs from localStorage
    const shownPopupIds = JSON.parse(localStorage.getItem(NEWS_POPUP_SHOWN_KEY) || '[]');
    
    // Find the newest featured news that hasn't been shown yet
    const unshownNews = featuredNews.find(news => !shownPopupIds.includes(news.id));
    
    if (unshownNews) {
      // Set a small delay before showing the popup to let the page load first
      const showTimer = setTimeout(() => {
        setCurrentNewsItem(unshownNews);
        setOpen(true);
        
        // Add this news ID to the shown list
        const updatedShownIds = [...shownPopupIds, unshownNews.id];
        localStorage.setItem(NEWS_POPUP_SHOWN_KEY, JSON.stringify(updatedShownIds));
        
        // Set a timer to automatically close the popup after the display duration
        const hideTimer = setTimeout(() => {
          handleCloseWithAnimation();
        }, POPUP_DISPLAY_DURATION);
        
        return () => clearTimeout(hideTimer);
      }, 1000); // 1 second delay before showing
      
      return () => clearTimeout(showTimer);
    }
  }, [featuredNews]);

  // Handle popup close with animation
  const handleCloseWithAnimation = () => {
    setAnimateOut(true);
    setTimeout(() => {
      setOpen(false);
      setAnimateOut(false);
    }, 300); // Animation duration
  };

  // Handle contact button click - direct to WhatsApp
  const handleContactClick = () => {
    if (!currentNewsItem) {
      toast.error('Informasi kontak tidak tersedia');
      return;
    }
    
    // Prepare WhatsApp message with news information
    const message = `Halo! Saya tertarik dengan info "${currentNewsItem.title}" yang saya lihat di website ROBsPlus.`;
    const whatsappUrl = `https://wa.me/6285768192419?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp in a new tab
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
          "bg-dark-secondary border-gray-700 text-white p-0 overflow-hidden max-w-md md:max-w-lg",
          "transition-all duration-300 transform",
          !animateOut 
            ? "animate-in zoom-in-95 fade-in-50 duration-300" 
            : "animate-out zoom-out-95 fade-out-50 duration-300",
          isMobile ? "w-[90%] rounded-lg" : "rounded-lg"
        )}
      >
        <div className={cn(
          "grid gap-0",
          isMobile ? "grid-rows-[200px_auto]" : "md:grid-cols-2"
        )}>
          <div className={cn(
            "relative h-[200px] md:h-full md:min-h-[300px]",
            "before:absolute before:inset-0 before:bg-gradient-to-b before:from-transparent before:to-black/60 before:z-10"
          )}>
            <img 
              src={currentNewsItem.image_url} 
              alt={currentNewsItem.title}
              className="w-full h-full object-cover absolute inset-0"
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
          
          <div className="p-5 space-y-4 flex flex-col">
            <div className="flex-1">
              <DialogTitle className="text-xl mb-3">{currentNewsItem.title}</DialogTitle>
              <p className="text-gray-300 text-sm line-clamp-4 md:line-clamp-6">{currentNewsItem.content}</p>
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
