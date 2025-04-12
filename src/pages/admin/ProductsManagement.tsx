
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
  Upload, Package
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

const ProductsManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  
  // Mock data for products
  const products = [
    { 
      id: 1, 
      name: 'ROBsPlus Service Pro', 
      category: 'Layanan', 
      price: 'Rp 5.000.000', 
      status: 'Available', 
      image: '/placeholder.svg' 
    },
    { 
      id: 2, 
      name: 'ROBsPlus Enterprise', 
      category: 'Software', 
      price: 'Rp 15.000.000', 
      status: 'Available', 
      image: '/placeholder.svg' 
    },
    { 
      id: 3, 
      name: 'ROBsPlus Maintenance', 
      category: 'Layanan', 
      price: 'Rp 2.500.000', 
      status: 'Available', 
      image: '/placeholder.svg' 
    },
    { 
      id: 4, 
      name: 'ROBsPlus Custom Development', 
      category: 'Layanan', 
      price: 'Contact for Price', 
      status: 'Available', 
      image: '/placeholder.svg' 
    },
    { 
      id: 5, 
      name: 'ROBsPlus API Integration', 
      category: 'Software', 
      price: 'Rp 7.500.000', 
      status: 'Available', 
      image: '/placeholder.svg' 
    },
  ];

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (product: any) => {
    setSelectedProduct(product);
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    toast.success("Produk berhasil diperbarui");
    setIsEditDialogOpen(false);
  };

  const handleAddProduct = () => {
    toast.success("Produk baru berhasil ditambahkan");
    setIsAddDialogOpen(false);
  };

  const handleDeleteProduct = (id: number) => {
    toast.success("Produk berhasil dihapus");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
        <div>
          <h1 className="text-2xl font-bold">Kelola Produk</h1>
          <p className="mt-1 text-sm text-gray-400">Kelola semua produk dan layanan</p>
        </div>
        <div className="flex space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <Input
              placeholder="Cari produk..."
              className="w-full pl-9 md:w-[250px] bg-dark border-gray-700"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-cyberpunk hover:bg-cyberpunk-light">
                <Plus className="mr-2 h-4 w-4" />
                Tambah Produk
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px] bg-dark-secondary border-gray-700">
              <DialogHeader>
                <DialogTitle className="text-xl text-white">Tambah Produk Baru</DialogTitle>
                <DialogDescription className="text-gray-400">
                  Isi informasi untuk menambahkan produk baru.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="name" className="text-right text-gray-300">
                    Nama Produk
                  </label>
                  <Input
                    id="name"
                    placeholder="Nama Produk"
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
                    <option value="software">Software</option>
                    <option value="layanan">Layanan</option>
                    <option value="hardware">Hardware</option>
                  </select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="price" className="text-right text-gray-300">
                    Harga
                  </label>
                  <Input
                    id="price"
                    placeholder="Rp 0"
                    className="col-span-3 bg-dark border-gray-700"
                  />
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <label htmlFor="description" className="text-right text-gray-300">
                    Deskripsi
                  </label>
                  <Textarea
                    id="description"
                    placeholder="Deskripsi produk"
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
                    <option value="available">Available</option>
                    <option value="out_of_stock">Out of Stock</option>
                    <option value="coming_soon">Coming Soon</option>
                  </select>
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <label className="text-right text-gray-300">
                    Gambar Produk
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
                  onClick={handleAddProduct}
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
          <CardTitle>Semua Produk</CardTitle>
          <CardDescription>Daftar semua produk dan layanan yang tersedia.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-gray-700 hover:bg-gray-800">
                <TableHead className="w-12">#</TableHead>
                <TableHead>Produk</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Harga</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[100px] text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <TableRow 
                    key={product.id} 
                    className="border-gray-700 hover:bg-gray-800"
                  >
                    <TableCell className="font-medium">{product.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <div className="mr-3 h-10 w-10 overflow-hidden rounded-md border border-gray-700">
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <span>{product.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <div className="mr-2 h-2 w-2 rounded-full bg-green-500"></div>
                        {product.status}
                      </div>
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
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            <span>Lihat</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleEdit(product)}
                            className="text-gray-300 focus:bg-gray-700 focus:text-white"
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Edit</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleDeleteProduct(product.id)}
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
                    Tidak ada produk yang ditemukan.
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
            <DialogTitle className="text-xl text-white">Edit Produk</DialogTitle>
            <DialogDescription className="text-gray-400">
              Edit informasi produk yang ada.
            </DialogDescription>
          </DialogHeader>
          {selectedProduct && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="edit-name" className="text-right text-gray-300">
                  Nama Produk
                </label>
                <Input
                  id="edit-name"
                  defaultValue={selectedProduct.name}
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
                  defaultValue={selectedProduct.category.toLowerCase()}
                >
                  <option value="software">Software</option>
                  <option value="layanan">Layanan</option>
                  <option value="hardware">Hardware</option>
                </select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="edit-price" className="text-right text-gray-300">
                  Harga
                </label>
                <Input
                  id="edit-price"
                  defaultValue={selectedProduct.price}
                  className="col-span-3 bg-dark border-gray-700"
                />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <label htmlFor="edit-description" className="text-right text-gray-300">
                  Deskripsi
                </label>
                <Textarea
                  id="edit-description"
                  placeholder="Deskripsi produk"
                  className="col-span-3 min-h-[150px] bg-dark border-gray-700"
                  defaultValue="Deskripsi detail produk ini akan ditampilkan di website."
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="edit-status" className="text-right text-gray-300">
                  Status
                </label>
                <select
                  id="edit-status"
                  className="col-span-3 rounded-md border border-gray-700 bg-dark px-3 py-2 text-white"
                  defaultValue={selectedProduct.status.toLowerCase().replace(' ', '_')}
                >
                  <option value="available">Available</option>
                  <option value="out_of_stock">Out of Stock</option>
                  <option value="coming_soon">Coming Soon</option>
                </select>
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <label className="text-right text-gray-300">
                  Gambar Produk
                </label>
                <div className="col-span-3">
                  <div className="mb-3 flex">
                    <div className="h-20 w-20 overflow-hidden rounded-md border border-gray-700">
                      <img 
                        src={selectedProduct.image} 
                        alt={selectedProduct.name} 
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

export default ProductsManagement;
