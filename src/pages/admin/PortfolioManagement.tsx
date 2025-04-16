
import React, { useState, useEffect } from 'react';
import { 
  Card, CardContent, CardDescription, CardHeader, CardTitle 
} from "@/components/ui/card";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Plus, Search, Edit, Trash2, Eye, MoreHorizontal, 
  Upload, Image as ImageIcon, Calendar, Loader2, RefreshCw, Save
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

// Define portfolio item type
interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  client: string;
  date: string;
  description: string;
  image_url: string;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

const PortfolioManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedPortfolio, setSelectedPortfolio] = useState<PortfolioItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [newPortfolio, setNewPortfolio] = useState({
    title: '',
    category: 'Web Development',
    client: '',
    date: new Date().toISOString().split('T')[0],
    description: '',
    image_url: '/placeholder.svg',
    is_featured: false
  });
  const [editedPortfolio, setEditedPortfolio] = useState({
    title: '',
    category: '',
    client: '',
    date: '',
    description: '',
    image_url: '',
    is_featured: false
  });
  
  // Upload state
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  const fetchPortfolioItems = async () => {
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase
        .from('portfolio')
        .select('*')
        .order('updated_at', { ascending: false });
      
      if (error) {
        throw error;
      }
      
      if (data) {
        setPortfolioItems(data);
      }
    } catch (error: any) {
      console.error("Error fetching portfolio items:", error.message);
      toast.error("Gagal memuat portofolio", {
        description: error.message
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchPortfolioItems();
  }, []);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };
  
  const uploadImage = async (file: File): Promise<string> => {
    try {
      setUploading(true);
      
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `portfolio/${fileName}`;
      
      // For now, return a placeholder since we don't have actual upload capability here
      // In a real implementation, this would upload to Supabase storage
      
      setUploading(false);
      return `/placeholder.svg`;
    } catch (error: any) {
      console.error("Error uploading image:", error.message);
      toast.error("Gagal mengupload gambar", {
        description: error.message
      });
      setUploading(false);
      return '/placeholder.svg';
    }
  };
  
  const handleAddPortfolio = async () => {
    try {
      if (!newPortfolio.title) {
        toast.error("Data tidak lengkap", {
          description: "Judul diperlukan"
        });
        return;
      }
      
      // Handle image upload if there's a selected file
      let imageUrl = newPortfolio.image_url;
      if (selectedFile) {
        imageUrl = await uploadImage(selectedFile);
      }
      
      const { data, error } = await supabase
        .from('portfolio')
        .insert([
          {
            title: newPortfolio.title,
            category: newPortfolio.category,
            client: newPortfolio.client,
            date: newPortfolio.date,
            description: newPortfolio.description,
            image_url: imageUrl,
            is_featured: newPortfolio.is_featured
          }
        ])
        .select();
      
      if (error) throw error;
      
      toast.success("Item portofolio baru berhasil ditambahkan");
      setIsAddDialogOpen(false);
      setNewPortfolio({
        title: '',
        category: 'Web Development',
        client: '',
        date: new Date().toISOString().split('T')[0],
        description: '',
        image_url: '/placeholder.svg',
        is_featured: false
      });
      setSelectedFile(null);
      
      // Refresh portfolio items list
      fetchPortfolioItems();
    } catch (error: any) {
      console.error("Error adding portfolio item:", error.message);
      toast.error("Gagal menambahkan portofolio", {
        description: error.message
      });
    }
  };
  
  const handleEdit = (item: PortfolioItem) => {
    setSelectedPortfolio(item);
    setEditedPortfolio({
      title: item.title,
      category: item.category,
      client: item.client || '',
      date: item.date || new Date().toISOString().split('T')[0],
      description: item.description || '',
      image_url: item.image_url || '/placeholder.svg',
      is_featured: item.is_featured || false
    });
    setIsEditDialogOpen(true);
  };
  
  const handleSaveEdit = async () => {
    try {
      if (!selectedPortfolio || !editedPortfolio.title) {
        toast.error("Data tidak lengkap", {
          description: "Judul diperlukan"
        });
        return;
      }
      
      // Handle image upload if there's a selected file
      let imageUrl = editedPortfolio.image_url;
      if (selectedFile) {
        imageUrl = await uploadImage(selectedFile);
      }
      
      const { error } = await supabase
        .from('portfolio')
        .update({
          title: editedPortfolio.title,
          category: editedPortfolio.category,
          client: editedPortfolio.client,
          date: editedPortfolio.date,
          description: editedPortfolio.description,
          image_url: imageUrl,
          is_featured: editedPortfolio.is_featured,
          updated_at: new Date().toISOString()
        })
        .eq('id', selectedPortfolio.id);
      
      if (error) throw error;
      
      toast.success("Item portofolio berhasil diperbarui");
      setIsEditDialogOpen(false);
      setSelectedFile(null);
      
      // Refresh portfolio items list
      fetchPortfolioItems();
    } catch (error: any) {
      console.error("Error updating portfolio item:", error.message);
      toast.error("Gagal memperbarui portofolio", {
        description: error.message
      });
    }
  };
  
  const handleDeletePortfolio = async (id: string) => {
    if (confirm("Anda yakin ingin menghapus item portofolio ini?")) {
      try {
        const { error } = await supabase
          .from('portfolio')
          .delete()
          .eq('id', id);
        
        if (error) throw error;
        
        toast.success("Item portofolio berhasil dihapus");
        
        // Refresh portfolio items list
        fetchPortfolioItems();
      } catch (error: any) {
        console.error("Error deleting portfolio item:", error.message);
        toast.error("Gagal menghapus portofolio", {
          description: error.message
        });
      }
    }
  };
  
  const formatDate = (dateString: string | null) => {
    if (!dateString) return '-';
    
    try {
      return new Date(dateString).toLocaleDateString('id-ID', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    } catch (e) {
      return dateString;
    }
  };
  
  const filteredPortfolio = portfolioItems.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.category && item.category.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (item.client && item.client.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center p-12">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-cyberpunk" />
          <p>Memuat data portofolio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
        <div>
          <h1 className="text-2xl font-bold">Kelola Portofolio</h1>
          <p className="mt-1 text-sm text-gray-400">Kelola semua item portofolio dan proyek</p>
        </div>
        <div className="flex space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <Input
              placeholder="Cari portofolio..."
              className="w-full pl-9 md:w-[250px] bg-dark border-gray-700"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button 
            onClick={() => fetchPortfolioItems()}
            variant="outline"
            className="border-gray-700"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-cyberpunk hover:bg-cyberpunk-light">
                <Plus className="mr-2 h-4 w-4" />
                Tambah Portofolio
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px] bg-dark-secondary border-gray-700">
              <DialogHeader>
                <DialogTitle className="text-xl text-white">Tambah Item Portofolio</DialogTitle>
                <DialogDescription className="text-gray-400">
                  Isi informasi untuk menambahkan item portofolio baru.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="title" className="text-right text-gray-300">
                    Judul Proyek
                  </label>
                  <Input
                    id="title"
                    placeholder="Judul Proyek"
                    className="col-span-3 bg-dark border-gray-700"
                    value={newPortfolio.title}
                    onChange={(e) => setNewPortfolio({...newPortfolio, title: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="category" className="text-right text-gray-300">
                    Kategori
                  </label>
                  <select
                    id="category"
                    className="col-span-3 rounded-md border border-gray-700 bg-dark px-3 py-2 text-white"
                    value={newPortfolio.category}
                    onChange={(e) => setNewPortfolio({...newPortfolio, category: e.target.value})}
                  >
                    <option value="Web Development">Web Development</option>
                    <option value="Mobile App">Mobile App</option>
                    <option value="Enterprise Solution">Enterprise Solution</option>
                    <option value="Data Visualization">Data Visualization</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                  </select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="client" className="text-right text-gray-300">
                    Klien
                  </label>
                  <Input
                    id="client"
                    placeholder="Nama Klien"
                    className="col-span-3 bg-dark border-gray-700"
                    value={newPortfolio.client}
                    onChange={(e) => setNewPortfolio({...newPortfolio, client: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="date" className="text-right text-gray-300">
                    Tanggal
                  </label>
                  <Input
                    id="date"
                    type="date"
                    className="col-span-3 bg-dark border-gray-700"
                    value={newPortfolio.date}
                    onChange={(e) => setNewPortfolio({...newPortfolio, date: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="featured" className="text-right text-gray-300">
                    Unggulan
                  </label>
                  <div className="col-span-3 flex items-center">
                    <input
                      id="featured"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-700 bg-dark text-cyberpunk"
                      checked={newPortfolio.is_featured}
                      onChange={(e) => setNewPortfolio({...newPortfolio, is_featured: e.target.checked})}
                    />
                    <label htmlFor="featured" className="ml-2 text-sm text-gray-300">
                      Tampilkan sebagai proyek unggulan
                    </label>
                  </div>
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <label htmlFor="description" className="text-right text-gray-300">
                    Deskripsi
                  </label>
                  <Textarea
                    id="description"
                    placeholder="Deskripsi proyek"
                    className="col-span-3 min-h-[150px] bg-dark border-gray-700"
                    value={newPortfolio.description}
                    onChange={(e) => setNewPortfolio({...newPortfolio, description: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <label className="text-right text-gray-300">
                    Gambar Proyek
                  </label>
                  <div className="col-span-3">
                    <div className="flex h-32 w-full items-center justify-center rounded-md border border-dashed border-gray-700 bg-dark">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        id="portfolio-image"
                        onChange={handleFileChange}
                      />
                      <label htmlFor="portfolio-image" className="h-full w-full cursor-pointer">
                        <div className="flex h-full w-full flex-col items-center justify-center">
                          {selectedFile ? (
                            <div className="text-center">
                              <ImageIcon className="mx-auto h-8 w-8 text-cyberpunk" />
                              <p className="mt-2 text-sm text-gray-400">{selectedFile.name}</p>
                            </div>
                          ) : (
                            <div className="text-center">
                              <Upload className="mx-auto h-8 w-8 text-gray-500" />
                              <p className="mt-2 text-sm text-gray-500">Drag & drop atau klik untuk upload</p>
                            </div>
                          )}
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setIsAddDialogOpen(false);
                    setSelectedFile(null);
                  }}
                  className="border-gray-700 text-white hover:bg-gray-700"
                >
                  Batal
                </Button>
                <Button 
                  onClick={handleAddPortfolio}
                  disabled={uploading}
                  className="bg-cyberpunk hover:bg-cyberpunk-light"
                >
                  {uploading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Mengupload...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Simpan
                    </>
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card className="border-gray-700 bg-dark-secondary">
        <CardHeader className="pb-2">
          <CardTitle>Semua Portofolio</CardTitle>
          <CardDescription>Daftar semua item portofolio dan proyek.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-gray-700 hover:bg-gray-800">
                <TableHead className="w-12">ID</TableHead>
                <TableHead>Proyek</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Klien</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead>Unggulan</TableHead>
                <TableHead className="w-[100px] text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPortfolio.length > 0 ? (
                filteredPortfolio.map((item) => (
                  <TableRow 
                    key={item.id} 
                    className="border-gray-700 hover:bg-gray-800"
                  >
                    <TableCell className="font-medium">{item.id.substring(0, 6)}...</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <div className="mr-3 h-10 w-10 overflow-hidden rounded-md border border-gray-700">
                          <img 
                            src={item.image_url || '/placeholder.svg'} 
                            alt={item.title} 
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <span>{item.title}</span>
                      </div>
                    </TableCell>
                    <TableCell>{item.category || '-'}</TableCell>
                    <TableCell>{item.client || '-'}</TableCell>
                    <TableCell>{formatDate(item.date)}</TableCell>
                    <TableCell>
                      {item.is_featured ? (
                        <span className="inline-flex items-center rounded-full bg-green-500/20 px-2 py-1 text-xs text-green-500">
                          Ya
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-full bg-gray-500/20 px-2 py-1 text-xs text-gray-400">
                          Tidak
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-dark-secondary border-gray-700">
                          <DropdownMenuItem 
                            className="text-gray-300 focus:bg-gray-700 focus:text-white"
                            onClick={() => window.open(`/portfolio/${item.id}`, '_blank')}
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            <span>Lihat</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleEdit(item)}
                            className="text-gray-300 focus:bg-gray-700 focus:text-white"
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Edit</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleDeletePortfolio(item.id)}
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
                  <TableCell colSpan={7} className="h-24 text-center">
                    Tidak ada item portofolio yang ditemukan.
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
            <DialogTitle className="text-xl text-white">Edit Portofolio</DialogTitle>
            <DialogDescription className="text-gray-400">
              Edit informasi portofolio yang ada.
            </DialogDescription>
          </DialogHeader>
          {selectedPortfolio && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="edit-title" className="text-right text-gray-300">
                  Judul Proyek
                </label>
                <Input
                  id="edit-title"
                  value={editedPortfolio.title}
                  onChange={(e) => setEditedPortfolio({...editedPortfolio, title: e.target.value})}
                  className="col-span-3 bg-dark border-gray-700"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="edit-category" className="text-right text-gray-300">
                  Kategori
                </label>
                <select
                  id="edit-category"
                  className="col-span-3 rounded-md border border-gray-700 bg-dark px-3 py-2 text-white"
                  value={editedPortfolio.category}
                  onChange={(e) => setEditedPortfolio({...editedPortfolio, category: e.target.value})}
                >
                  <option value="Web Development">Web Development</option>
                  <option value="Mobile App">Mobile App</option>
                  <option value="Enterprise Solution">Enterprise Solution</option>
                  <option value="Data Visualization">Data Visualization</option>
                  <option value="UI/UX Design">UI/UX Design</option>
                </select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="edit-client" className="text-right text-gray-300">
                  Klien
                </label>
                <Input
                  id="edit-client"
                  value={editedPortfolio.client}
                  onChange={(e) => setEditedPortfolio({...editedPortfolio, client: e.target.value})}
                  className="col-span-3 bg-dark border-gray-700"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="edit-date" className="text-right text-gray-300">
                  Tanggal
                </label>
                <Input
                  id="edit-date"
                  type="date"
                  value={editedPortfolio.date}
                  onChange={(e) => setEditedPortfolio({...editedPortfolio, date: e.target.value})}
                  className="col-span-3 bg-dark border-gray-700"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="edit-featured" className="text-right text-gray-300">
                  Unggulan
                </label>
                <div className="col-span-3 flex items-center">
                  <input
                    id="edit-featured"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-700 bg-dark text-cyberpunk"
                    checked={editedPortfolio.is_featured}
                    onChange={(e) => setEditedPortfolio({...editedPortfolio, is_featured: e.target.checked})}
                  />
                  <label htmlFor="edit-featured" className="ml-2 text-sm text-gray-300">
                    Tampilkan sebagai proyek unggulan
                  </label>
                </div>
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <label htmlFor="edit-description" className="text-right text-gray-300">
                  Deskripsi
                </label>
                <Textarea
                  id="edit-description"
                  placeholder="Deskripsi proyek"
                  className="col-span-3 min-h-[150px] bg-dark border-gray-700"
                  value={editedPortfolio.description}
                  onChange={(e) => setEditedPortfolio({...editedPortfolio, description: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <label className="text-right text-gray-300">
                  Gambar Proyek
                </label>
                <div className="col-span-3">
                  <div className="mb-3 flex">
                    <div className="h-20 w-20 overflow-hidden rounded-md border border-gray-700">
                      <img 
                        src={editedPortfolio.image_url || '/placeholder.svg'} 
                        alt={editedPortfolio.title} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex h-32 w-full items-center justify-center rounded-md border border-dashed border-gray-700 bg-dark">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      id="edit-portfolio-image"
                      onChange={handleFileChange}
                    />
                    <label htmlFor="edit-portfolio-image" className="h-full w-full cursor-pointer">
                      <div className="flex h-full w-full flex-col items-center justify-center">
                        {selectedFile ? (
                          <div className="text-center">
                            <ImageIcon className="mx-auto h-8 w-8 text-cyberpunk" />
                            <p className="mt-2 text-sm text-gray-400">{selectedFile.name}</p>
                          </div>
                        ) : (
                          <div className="text-center">
                            <Upload className="mx-auto h-8 w-8 text-gray-500" />
                            <p className="mt-2 text-sm text-gray-500">Drag & drop atau klik untuk ganti gambar</p>
                          </div>
                        )}
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => {
                setIsEditDialogOpen(false);
                setSelectedFile(null);
              }}
              className="border-gray-700 text-white hover:bg-gray-700"
            >
              Batal
            </Button>
            <Button 
              onClick={handleSaveEdit}
              disabled={uploading}
              className="bg-cyberpunk hover:bg-cyberpunk-light"
            >
              {uploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Mengupload...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Simpan Perubahan
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PortfolioManagement;
