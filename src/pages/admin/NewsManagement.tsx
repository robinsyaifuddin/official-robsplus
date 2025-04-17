import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase, NewsItem } from '@/integrations/supabase/client';
import { 
  Loader2, Trash2, Edit, Plus, Image as ImageIcon, 
  Eye, EyeOff, MessageSquare, Save, X, FileText
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

type NewsFormData = Omit<NewsItem, 'created_at' | 'updated_at'> & { id?: string };

const defaultFormData: NewsFormData = {
  title: '',
  content: '',
  image_url: '',
  contact_info: null,
  is_featured: false,
  slug: null,
};

const NewsManagement = () => {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<NewsFormData>(defaultFormData);
  const [isEditing, setIsEditing] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  
  const { data: newsItems = [], isLoading } = useQuery({
    queryKey: ['admin-news-items'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching news:', error);
        toast.error('Gagal memuat data berita');
        throw error;
      }
      
      return data as NewsItem[];
    },
  });

  const createNewsMutation = useMutation({
    mutationFn: async (newsData: NewsFormData) => {
      if (!newsData.slug) {
        newsData.slug = newsData.title
          .toLowerCase()
          .replace(/[^\w\s]/gi, '')
          .replace(/\s+/g, '-');
      }
      
      const { data, error } = await supabase
        .from('news')
        .insert(newsData)
        .select('*')
        .single();
      
      if (error) {
        console.error('Error creating news:', error);
        throw error;
      }
      
      return data;
    },
    onSuccess: () => {
      toast.success('Berita berhasil ditambahkan');
      queryClient.invalidateQueries({ queryKey: ['admin-news-items'] });
      queryClient.invalidateQueries({ queryKey: ['news-items'] });
      queryClient.invalidateQueries({ queryKey: ['featured-news-items'] });
      resetForm();
    },
    onError: (error) => {
      toast.error('Gagal menambahkan berita');
      console.error('Mutation error:', error);
    },
  });

  const updateNewsMutation = useMutation({
    mutationFn: async (newsData: NewsFormData) => {
      if (!newsData.id) throw new Error('ID is required for update');
      
      if (!newsData.slug) {
        newsData.slug = newsData.title
          .toLowerCase()
          .replace(/[^\w\s]/gi, '')
          .replace(/\s+/g, '-');
      }
      
      const { data, error } = await supabase
        .from('news')
        .update(newsData)
        .eq('id', newsData.id)
        .select('*')
        .single();
      
      if (error) {
        console.error('Error updating news:', error);
        throw error;
      }
      
      return data;
    },
    onSuccess: () => {
      toast.success('Berita berhasil diperbarui');
      queryClient.invalidateQueries({ queryKey: ['admin-news-items'] });
      queryClient.invalidateQueries({ queryKey: ['news-items'] });
      queryClient.invalidateQueries({ queryKey: ['featured-news-items'] });
      resetForm();
    },
    onError: (error) => {
      toast.error('Gagal memperbarui berita');
      console.error('Mutation error:', error);
    },
  });

  const deleteNewsMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('news')
        .delete()
        .eq('id', id);
      
      if (error) {
        console.error('Error deleting news:', error);
        throw error;
      }
      
      return id;
    },
    onSuccess: () => {
      toast.success('Berita berhasil dihapus');
      queryClient.invalidateQueries({ queryKey: ['admin-news-items'] });
      queryClient.invalidateQueries({ queryKey: ['news-items'] });
      queryClient.invalidateQueries({ queryKey: ['featured-news-items'] });
      setDeleteConfirmId(null);
    },
    onError: (error) => {
      toast.error('Gagal menghapus berita');
      console.error('Mutation error:', error);
    },
  });

  const handleInputChange = (field: keyof NewsFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.content || !formData.image_url) {
      toast.error('Judul, konten, dan URL gambar wajib diisi');
      return;
    }
    
    if (isEditing && formData.id) {
      updateNewsMutation.mutate(formData);
    } else {
      createNewsMutation.mutate(formData);
    }
  };

  const handleEdit = (newsItem: NewsItem) => {
    setFormData({
      id: newsItem.id,
      title: newsItem.title,
      content: newsItem.content,
      image_url: newsItem.image_url,
      contact_info: newsItem.contact_info,
      is_featured: newsItem.is_featured,
      slug: newsItem.slug
    });
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setFormData(defaultFormData);
    setIsEditing(false);
    setIsDialogOpen(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-cyberpunk" />
          <p>Memuat data berita...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold">Kelola Berita</h1>
          <p className="mt-1 text-sm text-gray-400">Tambah, edit, dan hapus berita untuk ditampilkan di website</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button 
            onClick={() => {
              resetForm();
              setIsDialogOpen(true);
            }}
            className="bg-cyberpunk hover:bg-cyberpunk-light flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Tambah Berita
          </Button>
        </div>
      </div>

      <Card className="border-gray-700 bg-dark-secondary">
        <CardHeader>
          <CardTitle className="text-lg">Daftar Berita</CardTitle>
          <CardDescription>
            Total {newsItems.length} berita
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-gray-700">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-700">
                  <TableHead className="w-[100px]">Status</TableHead>
                  <TableHead>Judul</TableHead>
                  <TableHead className="hidden md:table-cell">Dibuat</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {newsItems.length === 0 ? (
                  <TableRow className="border-gray-700">
                    <TableCell colSpan={4} className="text-center py-8 text-gray-400">
                      <FileText className="mx-auto h-12 w-12 opacity-20 mb-2" />
                      Belum ada berita
                    </TableCell>
                  </TableRow>
                ) : (
                  newsItems.map((newsItem) => (
                    <TableRow key={newsItem.id} className="border-gray-700">
                      <TableCell>
                        {newsItem.is_featured ? (
                          <Badge className="bg-green-600 text-white">Featured</Badge>
                        ) : (
                          <Badge variant="outline" className="border-gray-600 text-gray-400">Normal</Badge>
                        )}
                      </TableCell>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-md overflow-hidden bg-gray-800 flex-shrink-0">
                            <img 
                              src={newsItem.image_url} 
                              alt={newsItem.title}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = 'https://via.placeholder.com/80x80?text=No+Image';
                              }}
                            />
                          </div>
                          <div className="truncate max-w-xs">{newsItem.title}</div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-gray-400">
                        {formatDate(newsItem.created_at)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-800"
                            onClick={() => handleEdit(newsItem)}
                          >
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-gray-400 hover:text-red-500 hover:bg-red-500/10"
                            onClick={() => setDeleteConfirmId(newsItem.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-dark-secondary border-gray-700 text-white sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Edit Berita' : 'Tambah Berita Baru'}</DialogTitle>
            <DialogDescription>
              {isEditing
                ? 'Perbarui informasi berita yang sudah ada'
                : 'Isi form berikut untuk menambahkan berita baru'}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Judul Berita *</Label>
                <Input
                  id="title"
                  placeholder="Masukkan judul berita"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="bg-dark border-gray-700 text-white"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="content">Konten Berita *</Label>
                <Textarea
                  id="content"
                  placeholder="Masukkan isi berita"
                  value={formData.content}
                  onChange={(e) => handleInputChange('content', e.target.value)}
                  className="bg-dark border-gray-700 text-white min-h-[120px]"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="image_url">URL Gambar *</Label>
                <div className="flex gap-2">
                  <Input
                    id="image_url"
                    placeholder="https://example.com/image.jpg"
                    value={formData.image_url}
                    onChange={(e) => handleInputChange('image_url', e.target.value)}
                    className="bg-dark border-gray-700 text-white flex-1"
                    required
                  />
                  {formData.image_url && (
                    <div className="h-10 w-10 rounded overflow-hidden bg-gray-800 flex-shrink-0">
                      <img 
                        src={formData.image_url} 
                        alt="Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://via.placeholder.com/40x40?text=Error';
                        }}
                      />
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-400">Masukkan URL gambar untuk berita ini</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contact_info">Informasi Kontak</Label>
                <Input
                  id="contact_info"
                  placeholder="Email, URL, atau nomor telepon"
                  value={formData.contact_info}
                  onChange={(e) => handleInputChange('contact_info', e.target.value)}
                  className="bg-dark border-gray-700 text-white"
                />
                <p className="text-xs text-gray-400">Informasi kontak untuk tombol "Hubungi Lebih Lanjut"</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="slug">Slug URL (Opsional)</Label>
                <Input
                  id="slug"
                  placeholder="contoh-judul-berita"
                  value={formData.slug}
                  onChange={(e) => handleInputChange('slug', e.target.value)}
                  className="bg-dark border-gray-700 text-white"
                />
                <p className="text-xs text-gray-400">Biarkan kosong untuk menghasilkan otomatis dari judul</p>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="featured">Tampilkan sebagai Featured</Label>
                  <p className="text-xs text-gray-400">Berita featured akan muncul sebagai popup saat pengunjung membuka website</p>
                </div>
                <Switch
                  id="featured"
                  checked={formData.is_featured}
                  onCheckedChange={(checked) => handleInputChange('is_featured', checked)}
                />
              </div>
            </div>
            
            <DialogFooter className="flex justify-between sm:justify-end gap-2 pt-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={resetForm}
                className="border-gray-700 text-gray-300 hover:bg-gray-800"
              >
                Batal
              </Button>
              <Button 
                type="submit"
                className="bg-cyberpunk hover:bg-cyberpunk-light gap-2"
                disabled={createNewsMutation.isPending || updateNewsMutation.isPending}
              >
                {(createNewsMutation.isPending || updateNewsMutation.isPending) ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Menyimpan...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    {isEditing ? 'Perbarui' : 'Simpan'}
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={!!deleteConfirmId} onOpenChange={(open) => !open && setDeleteConfirmId(null)}>
        <DialogContent className="bg-dark-secondary border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle>Konfirmasi Hapus</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menghapus berita ini? Tindakan ini tidak dapat dibatalkan.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end gap-2 pt-2">
            <Button 
              variant="outline"
              onClick={() => setDeleteConfirmId(null)}
              className="border-gray-700 text-gray-300 hover:bg-gray-800"
            >
              Batal
            </Button>
            <Button 
              variant="destructive"
              onClick={() => deleteConfirmId && deleteNewsMutation.mutate(deleteConfirmId)}
              disabled={deleteNewsMutation.isPending}
              className="gap-2"
            >
              {deleteNewsMutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Menghapus...
                </>
              ) : (
                <>
                  <Trash2 className="h-4 w-4" />
                  Hapus
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NewsManagement;
