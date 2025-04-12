
import React, { useState } from 'react';
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
  Home, Info, PhoneCall, Package, Image as ImageIcon
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

const PagesManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState<any>(null);
  
  // Mock data for pages
  const pages = [
    { id: 1, title: 'Beranda', slug: '/', status: 'Published', lastUpdated: '2 jam yang lalu', icon: <Home className="h-4 w-4" /> },
    { id: 2, title: 'Layanan', slug: '/services', status: 'Published', lastUpdated: '1 hari yang lalu', icon: <Package className="h-4 w-4" /> },
    { id: 3, title: 'Portofolio', slug: '/portfolio', status: 'Published', lastUpdated: '3 hari yang lalu', icon: <ImageIcon className="h-4 w-4" /> },
    { id: 4, title: 'Tentang Kami', slug: '/about', status: 'Published', lastUpdated: '1 minggu yang lalu', icon: <Info className="h-4 w-4" /> },
    { id: 5, title: 'Kontak', slug: '/contact', status: 'Published', lastUpdated: '2 minggu yang lalu', icon: <PhoneCall className="h-4 w-4" /> },
  ];

  const filteredPages = pages.filter(page =>
    page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    page.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (page: any) => {
    setSelectedPage(page);
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    toast.success("Halaman berhasil diperbarui");
    setIsEditDialogOpen(false);
  };

  const handleAddPage = () => {
    toast.success("Halaman baru berhasil ditambahkan");
    setIsAddDialogOpen(false);
  };

  const handleDeletePage = (id: number) => {
    toast.success("Halaman berhasil dihapus");
  };

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
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="status" className="text-right text-gray-300">
                    Status
                  </label>
                  <select
                    id="status"
                    className="col-span-3 rounded-md border border-gray-700 bg-dark px-3 py-2 text-white"
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
                <TableHead className="w-12">#</TableHead>
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
                    <TableCell className="font-medium">{page.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <div className="mr-2 flex h-7 w-7 items-center justify-center rounded-full bg-gray-700">
                          {page.icon}
                        </div>
                        {page.title}
                      </div>
                    </TableCell>
                    <TableCell>{page.slug}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <div className="mr-2 h-2 w-2 rounded-full bg-green-500"></div>
                        {page.status}
                      </div>
                    </TableCell>
                    <TableCell>{page.lastUpdated}</TableCell>
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
                  defaultValue={selectedPage.title}
                  className="col-span-3 bg-dark border-gray-700"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="edit-slug" className="text-right text-gray-300">
                  Slug
                </label>
                <Input
                  id="edit-slug"
                  defaultValue={selectedPage.slug}
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
                  defaultValue="Konten halaman ini akan ditampilkan di website."
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="edit-status" className="text-right text-gray-300">
                  Status
                </label>
                <select
                  id="edit-status"
                  className="col-span-3 rounded-md border border-gray-700 bg-dark px-3 py-2 text-white"
                  defaultValue={selectedPage.status.toLowerCase()}
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
              Simpan Perubahan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PagesManagement;
