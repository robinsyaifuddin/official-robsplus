
import React, { useState } from 'react';
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
  Upload, Image as ImageIcon, Calendar
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

const PortfolioManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedPortfolio, setSelectedPortfolio] = useState<any>(null);
  
  // Mock data for portfolio items
  const portfolioItems = [
    { 
      id: 1, 
      title: 'Website Perusahaan XYZ', 
      category: 'Web Development', 
      client: 'PT XYZ Indonesia', 
      date: '2024-03-15', 
      image: '/placeholder.svg'
    },
    { 
      id: 2, 
      title: 'Aplikasi Mobile ABC', 
      category: 'Mobile App', 
      client: 'ABC Corporation', 
      date: '2024-02-10', 
      image: '/placeholder.svg'
    },
    { 
      id: 3, 
      title: 'Sistem ERP Manufaktur', 
      category: 'Enterprise Solution', 
      client: 'PT Manufaktur Sejahtera', 
      date: '2024-01-22', 
      image: '/placeholder.svg'
    },
    { 
      id: 4, 
      title: 'E-commerce Platform', 
      category: 'Web Development', 
      client: 'Toko Online Indonesia', 
      date: '2023-12-05', 
      image: '/placeholder.svg'
    },
    { 
      id: 5, 
      title: 'Dashboard Analytics', 
      category: 'Data Visualization', 
      client: 'Data Insight Co', 
      date: '2023-11-15', 
      image: '/placeholder.svg'
    },
  ];

  const filteredPortfolio = portfolioItems.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.client.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('id-ID', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }).format(date);
  };

  const handleEdit = (item: any) => {
    setSelectedPortfolio(item);
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    toast.success("Item portofolio berhasil diperbarui");
    setIsEditDialogOpen(false);
  };

  const handleAddPortfolio = () => {
    toast.success("Item portofolio baru berhasil ditambahkan");
    setIsAddDialogOpen(false);
  };

  const handleDeletePortfolio = (id: number) => {
    toast.success("Item portofolio berhasil dihapus");
  };

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
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="category" className="text-right text-gray-300">
                    Kategori
                  </label>
                  <select
                    id="category"
                    className="col-span-3 rounded-md border border-gray-700 bg-dark px-3 py-2 text-white"
                  >
                    <option value="web_development">Web Development</option>
                    <option value="mobile_app">Mobile App</option>
                    <option value="enterprise_solution">Enterprise Solution</option>
                    <option value="data_visualization">Data Visualization</option>
                    <option value="ui_ux_design">UI/UX Design</option>
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
                  />
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <label htmlFor="description" className="text-right text-gray-300">
                    Deskripsi
                  </label>
                  <Textarea
                    id="description"
                    placeholder="Deskripsi proyek"
                    className="col-span-3 min-h-[150px] bg-dark border-gray-700"
                  />
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <label className="text-right text-gray-300">
                    Gambar Proyek
                  </label>
                  <div className="col-span-3">
                    <div className="flex h-32 w-full items-center justify-center rounded-md border border-dashed border-gray-700 bg-dark">
                      <div className="flex flex-col items-center space-y-2">
                        <Upload className="h-8 w-8 text-gray-500" />
                        <p className="text-sm text-gray-500">Drag & drop atau klik untuk upload</p>
                      </div>
                    </div>
                  </div>
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
                  onClick={handleAddPortfolio}
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
          <CardTitle>Semua Portofolio</CardTitle>
          <CardDescription>Daftar semua item portofolio dan proyek.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-gray-700 hover:bg-gray-800">
                <TableHead className="w-12">#</TableHead>
                <TableHead>Proyek</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Klien</TableHead>
                <TableHead>Tanggal</TableHead>
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
                    <TableCell className="font-medium">{item.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <div className="mr-3 h-10 w-10 overflow-hidden rounded-md border border-gray-700">
                          <img 
                            src={item.image} 
                            alt={item.title} 
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <span>{item.title}</span>
                      </div>
                    </TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>{item.client}</TableCell>
                    <TableCell>{formatDate(item.date)}</TableCell>
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
                  <TableCell colSpan={6} className="h-24 text-center">
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
                  defaultValue={selectedPortfolio.title}
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
                  defaultValue={selectedPortfolio.category.toLowerCase().replace(' ', '_')}
                >
                  <option value="web_development">Web Development</option>
                  <option value="mobile_app">Mobile App</option>
                  <option value="enterprise_solution">Enterprise Solution</option>
                  <option value="data_visualization">Data Visualization</option>
                  <option value="ui_ux_design">UI/UX Design</option>
                </select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="edit-client" className="text-right text-gray-300">
                  Klien
                </label>
                <Input
                  id="edit-client"
                  defaultValue={selectedPortfolio.client}
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
                  defaultValue={selectedPortfolio.date}
                  className="col-span-3 bg-dark border-gray-700"
                />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <label htmlFor="edit-description" className="text-right text-gray-300">
                  Deskripsi
                </label>
                <Textarea
                  id="edit-description"
                  placeholder="Deskripsi proyek"
                  className="col-span-3 min-h-[150px] bg-dark border-gray-700"
                  defaultValue="Deskripsi detail proyek ini akan ditampilkan di website."
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
                        src={selectedPortfolio.image} 
                        alt={selectedPortfolio.title} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex h-32 w-full items-center justify-center rounded-md border border-dashed border-gray-700 bg-dark">
                    <div className="flex flex-col items-center space-y-2">
                      <Upload className="h-8 w-8 text-gray-500" />
                      <p className="text-sm text-gray-500">Drag & drop atau klik untuk ganti gambar</p>
                    </div>
                  </div>
                </div>
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

export default PortfolioManagement;
