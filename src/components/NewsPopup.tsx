
import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { X, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import type { NewsItem } from './NewsSlider';

const NEWS_POPUP_SHOWN_KEY = 'news_popup_shown_ids';

const NewsPopup = () => {
  const [open, setOpen] = useState(false);
  const [currentNewsItem, setCurrentNewsItem] = useState<NewsItem | null>(null);
  
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
      const timer = setTimeout(() => {
        setCurrentNewsItem(unshownNews);
        setOpen(true);
        
        // Add this news ID to the shown list
        const updatedShownIds = [...shownPopupIds, unshownNews.id];
        localStorage.setItem(NEWS_POPUP_SHOWN_KEY, JSON.stringify(updatedShownIds));
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [featuredNews]);

  // Handle contact button click
  const handleContactClick = () => {
    if (!currentNewsItem || !currentNewsItem.contact_info) {
      toast.error('Informasi kontak tidak tersedia');
      return;
    }
    
    // Check if contact_info is a valid URL
    if (currentNewsItem.contact_info.startsWith('http://') || currentNewsItem.contact_info.startsWith('https://')) {
      window.open(currentNewsItem.contact_info, '_blank');
    } else if (currentNewsItem.contact_info.includes('@')) {
      // If it's an email
      window.location.href = `mailto:${currentNewsItem.contact_info}`;
    } else if (/^\d+$/.test(currentNewsItem.contact_info.replace(/[^\d]/g, ''))) {
      // If it's a phone number
      window.location.href = `tel:${currentNewsItem.contact_info.replace(/[^\d]/g, '')}`;
    } else {
      toast.info(currentNewsItem.contact_info);
    }
  };

  if (!currentNewsItem) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-dark-secondary border-gray-700 text-white max-w-lg p-0 overflow-hidden">
        <DialogHeader className="absolute top-0 right-0 z-10 p-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 rounded-full bg-black/50 hover:bg-black/70 text-white"
            onClick={() => setOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        
        <div className="grid md:grid-cols-2 gap-0 h-full">
          <div className="h-[200px] md:h-full">
            <img 
              src={currentNewsItem.image_url} 
              alt={currentNewsItem.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="p-5 space-y-4 flex flex-col">
            <div className="flex-1">
              <DialogTitle className="text-xl mb-3">{currentNewsItem.title}</DialogTitle>
              <p className="text-gray-300 text-sm line-clamp-4 md:line-clamp-6">{currentNewsItem.content}</p>
            </div>
            
            <div className="flex justify-between gap-2 mt-auto">
              <Button 
                variant="outline" 
                className="border-gray-700 text-gray-300 hover:bg-gray-800"
                onClick={() => setOpen(false)}
              >
                Tutup
              </Button>
              
              <Button 
                className="bg-cyberpunk hover:bg-cyberpunk-light flex items-center gap-2 flex-1"
                onClick={handleContactClick}
              >
                <MessageSquare className="h-4 w-4" />
                Hubungi
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewsPopup;
