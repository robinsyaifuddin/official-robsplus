
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
  Plus, Search, Edit, Trash2, ShieldCheck, MoreHorizontal, 
  UserPlus, UserCheck, UserX, User, Mail, Lock, Eye, EyeOff
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
import { toast } from "sonner";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const UsersManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  
  // Mock data for users
  const users = [
    { 
      id: 1, 
      name: 'Administrator', 
      email: 'robsplus.admin@gmail.com', 
      role: 'Admin', 
      status: 'Active', 
      lastLogin: '2 jam yang lalu' 
    },
    { 
      id: 2, 
      name: 'John Doe', 
      email: 'john@example.com', 
      role: 'Editor', 
      status: 'Active', 
      lastLogin: '1 hari yang lalu' 
    },
    { 
      id: 3,
      name: 'Jane Smith', 
      email: 'jane@example.com', 
      role: 'Author', 
      status: 'Active', 
      lastLogin: '3 hari yang lalu' 
    },
    { 
      id: 4, 
      name: 'Robert Johnson', 
      email: 'robert@example.com', 
      role: 'Subscriber', 
      status: 'Inactive', 
      lastLogin: '2 minggu yang lalu' 
    },
    { 
      id: 5, 
      name: 'Emily Davis', 
      email: 'emily@example.com', 
      role: 'Editor', 
      status: 'Active', 
      lastLogin: '5 hari yang lalu' 
    },
  ];

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'Admin':
        return <ShieldCheck className="h-4 w-4 text-red-500" />;
      case 'Editor':
        return <UserCheck className="h-4 w-4 text-green-500" />;
      case 'Author':
        return <UserPlus className="h-4 w-4 text-blue-500" />;
      default:
        return <User className="h-4 w-4 text-gray-500" />;
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  const getAvatarColor = (id: number) => {
    const colors = [
      'bg-red-500',
      'bg-green-500',
      'bg-blue-500',
      'bg-yellow-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-indigo-500',
      'bg-teal-500',
    ];
    return colors[id % colors.length];
  };

  const handleEdit = (user: any) => {
    setSelectedUser(user);
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    toast.success("Pengguna berhasil diperbarui");
    setIsEditDialogOpen(false);
  };

  const handleAddUser = () => {
    toast.success("Pengguna baru berhasil ditambahkan");
    setIsAddDialogOpen(false);
  };

  const handleDeleteUser = (id: number) => {
    toast.success("Pengguna berhasil dihapus");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
        <div>
          <h1 className="text-2xl font-bold">Kelola Pengguna</h1>
          <p className="mt-1 text-sm text-gray-400">Kelola semua pengguna dan akses</p>
        </div>
        <div className="flex space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <Input
              placeholder="Cari pengguna..."
              className="w-full pl-9 md:w-[250px] bg-dark border-gray-700"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-cyberpunk hover:bg-cyberpunk-light">
                <Plus className="mr-2 h-4 w-4" />
                Tambah Pengguna
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px] bg-dark-secondary border-gray-700">
              <DialogHeader>
                <DialogTitle className="text-xl text-white">Tambah Pengguna Baru</DialogTitle>
                <DialogDescription className="text-gray-400">
                  Isi informasi untuk menambahkan pengguna baru.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="name" className="text-right text-gray-300">
                    Nama Lengkap
                  </label>
                  <Input
                    id="name"
                    placeholder="Nama Lengkap"
                    className="col-span-3 bg-dark border-gray-700"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="email" className="text-right text-gray-300">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@example.com"
                    className="col-span-3 bg-dark border-gray-700"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="password" className="text-right text-gray-300">
                    Kata Sandi
                  </label>
                  <div className="col-span-3 relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      className="pr-10 bg-dark border-gray-700"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="role" className="text-right text-gray-300">
                    Peran
                  </label>
                  <select
                    id="role"
                    className="col-span-3 rounded-md border border-gray-700 bg-dark px-3 py-2 text-white"
                  >
                    <option value="admin">Admin</option>
                    <option value="editor">Editor</option>
                    <option value="author">Author</option>
                    <option value="subscriber">Subscriber</option>
                  </select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="status" className="text-right text-gray-300">
                    Status
                  </label>
                  <select
                    id="status"
                    className="col-span-3 rounded-md border border-gray-700 bg-dark px-3 py-2 text-white"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="suspended">Suspended</option>
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
                  onClick={handleAddUser}
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
          <CardTitle>Semua Pengguna</CardTitle>
          <CardDescription>Daftar semua pengguna yang terdaftar.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-gray-700 hover:bg-gray-800">
                <TableHead className="w-[60px]">#</TableHead>
                <TableHead>Pengguna</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Peran</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Login Terakhir</TableHead>
                <TableHead className="w-[70px] text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <TableRow 
                    key={user.id} 
                    className="border-gray-700 hover:bg-gray-800"
                  >
                    <TableCell className="font-medium">{user.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Avatar className="mr-2 h-8 w-8">
                          <AvatarFallback className={getAvatarColor(user.id)}>
                            {getInitials(user.name)}
                          </AvatarFallback>
                        </Avatar>
                        <span>{user.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {getRoleIcon(user.role)}
                        <span className="ml-1">{user.role}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <div className={`mr-2 h-2 w-2 rounded-full ${
                          user.status === 'Active' ? 'bg-green-500' : 'bg-red-500'
                        }`}></div>
                        {user.status}
                      </div>
                    </TableCell>
                    <TableCell>{user.lastLogin}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-dark-secondary border-gray-700">
                          <DropdownMenuItem 
                            onClick={() => handleEdit(user)}
                            className="text-gray-300 focus:bg-gray-700 focus:text-white"
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Edit</span>
                          </DropdownMenuItem>
                          {user.id !== 1 && (
                            <DropdownMenuItem 
                              onClick={() => handleDeleteUser(user.id)}
                              className="text-red-500 focus:bg-red-900/50 focus:text-red-300"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              <span>Hapus</span>
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    Tidak ada pengguna yang ditemukan.
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
            <DialogTitle className="text-xl text-white">Edit Pengguna</DialogTitle>
            <DialogDescription className="text-gray-400">
              Edit informasi pengguna yang ada.
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="edit-name" className="text-right text-gray-300">
                  Nama Lengkap
                </label>
                <Input
                  id="edit-name"
                  defaultValue={selectedUser.name}
                  className="col-span-3 bg-dark border-gray-700"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="edit-email" className="text-right text-gray-300">
                  Email
                </label>
                <Input
                  id="edit-email"
                  type="email"
                  defaultValue={selectedUser.email}
                  className="col-span-3 bg-dark border-gray-700"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="edit-password" className="text-right text-gray-300">
                  Kata Sandi Baru
                </label>
                <div className="col-span-3 relative">
                  <Input
                    id="edit-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Kosongkan jika tidak ingin mengubah"
                    className="pr-10 bg-dark border-gray-700"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="edit-role" className="text-right text-gray-300">
                  Peran
                </label>
                <select
                  id="edit-role"
                  defaultValue={selectedUser.role.toLowerCase()}
                  className="col-span-3 rounded-md border border-gray-700 bg-dark px-3 py-2 text-white"
                  disabled={selectedUser.id === 1}
                >
                  <option value="admin">Admin</option>
                  <option value="editor">Editor</option>
                  <option value="author">Author</option>
                  <option value="subscriber">Subscriber</option>
                </select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="edit-status" className="text-right text-gray-300">
                  Status
                </label>
                <select
                  id="edit-status"
                  defaultValue={selectedUser.status.toLowerCase()}
                  className="col-span-3 rounded-md border border-gray-700 bg-dark px-3 py-2 text-white"
                  disabled={selectedUser.id === 1}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="suspended">Suspended</option>
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

export default UsersManagement;
