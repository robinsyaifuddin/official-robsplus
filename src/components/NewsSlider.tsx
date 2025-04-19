
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase, NewsItem } from '@/integrations/supabase/client';
import { Newspaper, MessageSquare, X, ChevronLeft, ChevronRight, Camera } from 'lucide-react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const NewsSlider = () => {
  const [openNewsId, setOpenNewsId] = useState<string | null>(null);
  
  // Fetch news items from Supabase
  const { data: newsItems = [], isLoading, error } = useQuery({
    queryKey: ['news-items'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);
      
      if (error) {
        console.error('Error fetching news:', error);
        throw error;
      }
      
      // Prioritize graduation-related news by moving them to the beginning of the array
      const sortedData = [...(data as NewsItem[])];
      sortedData.sort((a, b) => {
        const aIsGraduation = a.title.toLowerCase().includes('wisuda') || 
                            a.title.toLowerCase().includes('foto') || 
                            a.title.toLowerCase().includes('video');
        const bIsGraduation = b.title.toLowerCase().includes('wisuda') || 
                            b.title.toLowerCase().includes('foto') || 
                            b.title.toLowerCase().includes('video');
        
        if (aIsGraduation && !bIsGraduation) return -1;
        if (!aIsGraduation && bIsGraduation) return 1;
        return 0;
      });
      
      return sortedData;
    },
  });

  // Handle contact button click
  const handleContactClick = (newsItem: NewsItem) => {
    if (!newsItem.contact_info) {
      // For graduation photo services, use default WhatsApp contact
      if (newsItem.title.toLowerCase().includes('foto') || newsItem.title.toLowerCase().includes('wisuda') || 
          newsItem.title.toLowerCase().includes('video') || newsItem.title.toLowerCase().includes('graduation')) {
        const message = `Halo! Saya tertarik dengan info "${newsItem.title}" yang saya lihat di website ROBsPlus. Saya ingin tahu lebih lanjut tentang layanan foto & video wisuda.`;
        window.open(`https://wa.me/6285768192419?text=${encodeURIComponent(message)}`, '_blank');
        return;
      }
      
      toast.error('Informasi kontak tidak tersedia');
      return;
    }
    
    // Check if contact_info is a valid URL
    if (newsItem.contact_info.startsWith('http://') || newsItem.contact_info.startsWith('https://')) {
      window.open(newsItem.contact_info, '_blank');
    } else if (newsItem.contact_info.includes('@')) {
      // If it's an email
      window.location.href = `mailto:${newsItem.contact_info}`;
    } else if (/^\d+$/.test(newsItem.contact_info.replace(/[^\d]/g, ''))) {
      // If it's a phone number
      window.location.href = `tel:${newsItem.contact_info.replace(/[^\d]/g, '')}`;
    } else {
      toast.info(newsItem.contact_info);
    }
  };

  if (isLoading) {
    return (
      <div className="py-12 flex justify-center">
        <div className="animate-pulse h-60 w-full max-w-5xl bg-dark-secondary rounded-lg"></div>
      </div>
    );
  }

  if (error || newsItems.length === 0) {
    return null; // Don't show anything if there's an error or no news items
  }

  return (
    <section className="relative py-12 overflow-hidden bg-dark">
      <div className="container mx-auto px-4">
        <div className="flex items-center mb-8">
          <Newspaper className="h-6 w-6 text-cyberpunk mr-3" />
          <h2 className="text-2xl sm:text-3xl font-bold">Update Terbaru</h2>
        </div>
        
        <Carousel className="w-full">
          <CarouselContent>
            {newsItems.map((newsItem) => (
              <CarouselItem key={newsItem.id}>
                <div className="relative overflow-hidden rounded-xl group h-[300px] sm:h-[400px] md:h-[500px] cyberpunk-border">
                  <div className="absolute inset-0 w-full h-full bg-black">
                    <img 
                      src={newsItem.image_url} 
                      alt={newsItem.title}
                      className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 w-full p-6 z-10">
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 flex items-center gap-2">
                      <Camera className="h-5 w-5 text-cyberpunk flex-shrink-0" />
                      {newsItem.title}
                    </h3>
                    <p className="text-gray-300 mb-4 line-clamp-3 whitespace-pre-line">
                      {newsItem.content}
                    </p>
                    
                    <div className="flex flex-wrap gap-3">
                      <Button 
                        variant="outline" 
                        onClick={() => setOpenNewsId(newsItem.id)}
                        className="border-cyberpunk text-cyberpunk hover:bg-cyberpunk/10"
                      >
                        Lihat Detail
                      </Button>
                      
                      <Button 
                        onClick={() => handleContactClick(newsItem)}
                        className="bg-cyberpunk hover:bg-cyberpunk-light flex items-center gap-2"
                      >
                        <MessageSquare className="h-4 w-4" />
                        Hubungi Lebih Lanjut
                      </Button>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          <CarouselPrevious className="left-2 opacity-70 hover:opacity-100 bg-black/50 hover:bg-black/70 border-0 text-white" />
          <CarouselNext className="right-2 opacity-70 hover:opacity-100 bg-black/50 hover:bg-black/70 border-0 text-white" />
        </Carousel>
      </div>

      {newsItems.map((newsItem) => (
        <Dialog 
          key={newsItem.id} 
          open={openNewsId === newsItem.id} 
          onOpenChange={(open) => !open && setOpenNewsId(null)}
        >
          <DialogContent className="bg-dark-secondary border-gray-700 text-white max-w-3xl p-0 overflow-hidden">
            <div className="relative">
              <div className="h-[200px] sm:h-[300px]">
                <img 
                  src={newsItem.image_url} 
                  alt={newsItem.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent/30"></div>
              </div>
              
              <DialogClose className="absolute right-4 top-4 text-white bg-black/50 hover:bg-black/70 p-2 rounded-full">
                <X className="h-4 w-4" />
              </DialogClose>
            </div>
            
            <div className="p-6 space-y-4">
              <DialogHeader>
                <DialogTitle className="text-xl sm:text-2xl flex items-center gap-2">
                  {newsItem.title.toLowerCase().includes('foto') || newsItem.title.toLowerCase().includes('wisuda') ? (
                    <Camera className="h-5 w-5 text-cyberpunk flex-shrink-0" />
                  ) : (
                    <Newspaper className="h-5 w-5 text-cyberpunk flex-shrink-0" />
                  )}
                  {newsItem.title}
                </DialogTitle>
              </DialogHeader>
              
              <div className="space-y-4">
                <p className="text-gray-300">{newsItem.content}</p>
                
                <div className="pt-4 border-t border-gray-700">
                  <Button 
                    onClick={() => handleContactClick(newsItem)}
                    className="w-full bg-cyberpunk hover:bg-cyberpunk-light flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="h-4 w-4" />
                    Hubungi Lebih Lanjut
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      ))}
    </section>
  );
};

export default NewsSlider;
