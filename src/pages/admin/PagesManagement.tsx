
import React, { useState, useEffect } from 'react';
import { 
  Card, CardContent, CardDescription, CardHeader, CardTitle 
} from "@/components/ui/card";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  Plus, Search, Edit, Trash2, Eye, MoreHorizontal, FileText, 
  Home, Info, PhoneCall, Package, Image as ImageIcon, Loader2, RefreshCw, Save
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from '@/integrations/supabase/client';

// Define page type interface
interface Page {
  id: string;
  title: string;
  slug: string;
  content?: string;
  status: string;
  created_at: string;
  updated_at: string;
}

const PagesManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState<Page | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pages, setPages] = useState<Page[]>([]);
  const [newPage, setNewPage] = useState({
    title: '',
    slug: '',
    content: '',
    status: 'published'
  });
  const [editedPage, setEditedPage] = useState({
    title: '',
    slug: '',
    content: '',
    status: ''
  });
  
  // Icons for page types
  const getPageIcon = (slug: string) => {
    if (slug === '/' || slug.includes('home')) return <Home className="h-4 w-4" />;
    if (slug.includes('service')) return <Package className="h-4 w-4" />;
    if (slug.includes('portfolio')) return <ImageIcon className="h-4 w-4" />;
    if (slug.includes('about')) return <Info className="h-4 w-4" />;
    if (slug.includes('contact')) return <PhoneCall className="h-4 w-4" />;
    return <FileText className="h-4 w-4" />;
  };
  
  const fetchPages = async () => {
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase
        .from('pages')
        .select('*')
        .order('updated_at', { ascending: false });
      
      if (error) {
        throw error;
      }
      
      if (data) {
        setPages(data);
      }
    } catch (error: any) {
      console.error("Error fetching pages:", error.message);
      toast.error("Gagal memuat halaman", {
        description: error.message
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchPages();
  }, []);
  
  const handleSlugChange = (value: string) => {
    // Auto-generate slug from title
    const slug = value
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');
    
    if (isEditDialogOpen) {
      setEditedPage(prev => ({ ...prev, slug }));
    } else {
      setNewPage(prev => ({ ...prev, slug }));
    }
  };
  
  const handleAddPage = async () => {
    try {
      if (!newPage.title || !newPage.slug) {
        toast.error("Data tidak lengkap", {
          description: "Judul dan slug diperlukan"
        });
        return;
      }
      
      const finalSlug = newPage.slug.startsWith('/') ? newPage.slug : `/${newPage.slug}`;
      
      const { data, error } = await supabase
        .from('pages')
        .insert([
          {
            title: newPage.title,
            slug: finalSlug,
            content: newPage.content,
            status: newPage.status
          }
        ])
        .select();
      
      if (error) throw error;
      
      toast.success("Halaman baru berhasil ditambahkan");
      setIsAddDialogOpen(false);
      setNewPage({
        title: '',
        slug: '',
        content: '',
        status: 'published'
      });
      
      // Refresh pages list
      fetchPages();
    } catch (error: any) {
      console.error("Error adding page:", error.message);
      toast.error("Gagal menambahkan halaman", {
        description: error.message
      });
    }
  };
  
  const handleEdit = (page: Page) => {
    setSelectedPage(page);
    setEditedPage({
      title: page.title,
      slug: page.slug,
      content: page.content || '',
      status: page.status
    });
    setIsEditDialogOpen(true);
  };
  
  const handleSaveEdit = async () => {
    try {
      if (!selectedPage || !editedPage.title || !editedPage.slug) {
        toast.error("Data tidak lengkap", {
          description: "Judul dan slug diperlukan"
        });
        return;
      }
      
      const finalSlug = editedPage.slug.startsWith('/') ? editedPage.slug : `/${editedPage.slug}`;
      
      const { error } = await supabase
        .from('pages')
        .update({
          title: editedPage.title,
          slug: finalSlug,
          content: editedPage.content,
          status: editedPage.status,
          updated_at: new Date().toISOString()
        })
        .eq('id', selectedPage.id);
      
      if (error) throw error;
      
      toast.success("Halaman berhasil diperbarui");
      setIsEditDialogOpen(false);
      
      // Refresh pages list
      fetchPages();
    } catch (error: any) {
      console.error("Error updating page:", error.message);
      toast.error("Gagal memperbarui halaman", {
        description: error.message
      });
    }
  };
  
  const handleDeletePage = async (id: string) => {
    if (confirm("Anda yakin ingin menghapus halaman ini?")) {
      try {
        const { error } = await supabase
          .from('pages')
          .delete()
          .eq('id', id);
        
        if (error) throw error;
        
        toast.success("Halaman berhasil dihapus");
        
        // Refresh pages list
        fetchPages();
      } catch (error: any) {
        console.error("Error deleting page:", error.message);
        toast.error("Gagal menghapus halaman", {
          description: error.message
        });
      }
    }
  };
  
  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const past = new Date(dateString);
    const diffMs = now.getTime() - past.getTime();
    const diffSec = Math.round(diffMs / 1000);
    const diffMin = Math.round(diffSec / 60);
    const diffHour = Math.round(diffMin / 60);
    const diffDay = Math.round(diffHour / 24);
    
    if (diffSec < 60) return `${diffSec} detik yang lalu`;
    if (diffMin < 60) return `${diffMin} menit yang lalu`;
    if (diffHour < 24) return `${diffHour} jam yang lalu`;
    if (diffDay < 7) return `${diffDay} hari yang lalu`;
    
    return new Date(dateString).toLocaleDateString('id-ID', { 
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  const filteredPages = pages.filter(page =>
    page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    page.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center p-12">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-cyberpunk" />
          <p>Memuat data halaman...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
        <div>
          <h1 className="text-2xl font-bold">Kelola Halaman</h1>
          <p className="mt-1 text-sm text-gray-400">Kelola konten semua halaman website</p>
        </div>
        <div className="flex space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <Input
              placeholder="Cari halaman..."
              className="w-full pl-9 md:w-[250px] bg-dark border-gray-700"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button 
            onClick={() => fetchPages()}
            variant="outline"
            className="border-gray-700"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-cyberpunk hover:bg-cyberpunk-light">
                <Plus className="mr-2 h-4 w-4" />
                Tambah Halaman
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px] bg-dark-secondary border-gray-700">
              <DialogHeader>
                <DialogTitle className="text-xl text-white">Tambah Halaman Baru</DialogTitle>
                <DialogDescription className="text-gray-400">
                  Isi informasi untuk membuat halaman baru.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="title" className="text-right text-gray-300">
                    Judul
                  </label>
                  <Input
                    id="title"
                    placeholder="Judul Halaman"
                    className="col-span-3 bg-dark border-gray-700"
                    value={newPage.title}
                    onChange={(e) => {
                      setNewPage({...newPage, title: e.target.value});
                      handleSlugChange(e.target.value);
                    }}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="slug" className="text-right text-gray-300">
                    Slug
                  </label>
                  <Input
                    id="slug"
                    placeholder="slug-halaman"
                    className="col-span-3 bg-dark border-gray-700"
                    value={newPage.slug}
                    onChange={(e) => setNewPage({...newPage, slug: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <label htmlFor="content" className="text-right text-gray-300">
                    Konten
                  </label>
                  <Textarea
                    id="content"
                    placeholder="Konten halaman"
                    className="col-span-3 min-h-[150px] bg-dark border-gray-700"
                    value={newPage.content}
                    onChange={(e) => setNewPage({...newPage, content: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="status" className="text-right text-gray-300">
                    Status
                  </label>
                  <select
                    id="status"
                    className="col-span-3 rounded-md border border-gray-700 bg-dark px-3 py-2 text-white"
                    value={newPage.status}
                    onChange={(e) => setNewPage({...newPage, status: e.target.value})}
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>
              <DialogFooter>
                <Button 
                  variant="outline" 
                  onClick={() => setIsAddDialogOpen(false)}
                  className="border-gray-700 text-white hover:bg-gray-700"
                >
                  Batal
                </Button>
                <Button 
                  onClick={handleAddPage}
                  className="bg-cyberpunk hover:bg-cyberpunk-light"
                >
                  <Save className="mr-2 h-4 w-4" />
                  Simpan
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card className="border-gray-700 bg-dark-secondary">
        <CardHeader className="pb-2">
          <CardTitle>Semua Halaman</CardTitle>
          <CardDescription>Daftar semua halaman yang ada di website.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-gray-700 hover:bg-gray-800">
                <TableHead className="w-12">ID</TableHead>
                <TableHead>Halaman</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Terakhir Diperbarui</TableHead>
                <TableHead className="w-[100px] text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPages.length > 0 ? (
                filteredPages.map((page) => (
                  <TableRow 
                    key={page.id} 
                    className="border-gray-700 hover:bg-gray-800"
                  >
                    <TableCell className="font-medium">{page.id.substring(0, 6)}...</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <div className="mr-2 flex h-7 w-7 items-center justify-center rounded-full bg-gray-700">
                          {getPageIcon(page.slug)}
                        </div>
                        {page.title}
                      </div>
                    </TableCell>
                    <TableCell>{page.slug}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <div className={`mr-2 h-2 w-2 rounded-full ${page.status === 'published' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                        {page.status === 'published' ? 'Published' : 'Draft'}
                      </div>
                    </TableCell>
                    <TableCell>{formatTimeAgo(page.updated_at)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-dark-secondary border-gray-700">
                          <DropdownMenuItem 
                            onClick={() => window.open(page.slug, '_blank')}
                            className="text-gray-300 focus:bg-gray-700 focus:text-white"
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            <span>Lihat</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleEdit(page)}
                            className="text-gray-300 focus:bg-gray-700 focus:text-white"
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Edit</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleDeletePage(page.id)}
                            className="text-red-500 focus:bg-red-900/50 focus:text-red-300"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Hapus</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    Tidak ada halaman yang ditemukan.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[625px] bg-dark-secondary border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-xl text-white">Edit Halaman</DialogTitle>
            <DialogDescription className="text-gray-400">
              Edit informasi halaman yang ada.
            </DialogDescription>
          </DialogHeader>
          {selectedPage && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="edit-title" className="text-right text-gray-300">
                  Judul
                </label>
                <Input
                  id="edit-title"
                  value={editedPage.title}
                  onChange={(e) => setEditedPage({...editedPage, title: e.target.value})}
                  className="col-span-3 bg-dark border-gray-700"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="edit-slug" className="text-right text-gray-300">
                  Slug
                </label>
                <Input
                  id="edit-slug"
                  value={editedPage.slug}
                  onChange={(e) => setEditedPage({...editedPage, slug: e.target.value})}
                  className="col-span-3 bg-dark border-gray-700"
                />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <label htmlFor="edit-content" className="text-right text-gray-300">
                  Konten
                </label>
                <Textarea
                  id="edit-content"
                  placeholder="Konten halaman"
                  className="col-span-3 min-h-[150px] bg-dark border-gray-700"
                  value={editedPage.content}
                  onChange={(e) => setEditedPage({...editedPage, content: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="edit-status" className="text-right text-gray-300">
                  Status
                </label>
                <select
                  id="edit-status"
                  className="col-span-3 rounded-md border border-gray-700 bg-dark px-3 py-2 text-white"
                  value={editedPage.status}
                  onChange={(e) => setEditedPage({...editedPage, status: e.target.value})}
                >
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsEditDialogOpen(false)}
              className="border-gray-700 text-white hover:bg-gray-700"
            >
              Batal
            </Button>
            <Button 
              onClick={handleSaveEdit}
              className="bg-cyberpunk hover:bg-cyberpunk-light"
            >
              <Save className="mr-2 h-4 w-4" />
              Simpan Perubahan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PagesManagement;
