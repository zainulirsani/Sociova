// resources/js/Pages/Dosen/Kelas.tsx

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/Components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/Components/ui/dialog';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Badge } from '@/Components/ui/badge';
import { MoreHorizontal, PlusCircle } from 'lucide-react';
import { useState, FormEventHandler, useEffect } from 'react';
import { Link } from '@inertiajs/react'; // Pastikan Link sudah di-import
import { Eye } from 'lucide-react'; // <-- Tambahkan ikon 'Eye'

// Tipe data untuk satu kelas
interface Kelas {
    id: number;
    nama: string;
    deskripsi?: string;
    kode?: string;
    status: 'active' | 'inactive';
    users_count: number;
    created_at: string;
}

// Tipe untuk props halaman
interface KelasProps extends PageProps {
    classes: Kelas[];
}

// --- KOMPONEN UTAMA HALAMAN MANAJEMEN KELAS ---
export default function ManageKelas({ auth, classes: initialClasses }: KelasProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingClass, setEditingClass] = useState<Kelas | null>(null);

    // --- PERBAIKAN 1: Samakan nama field menjadi 'nama' dan 'deskripsi' ---
    const { data, setData, post, patch, delete: destroy, processing, errors, reset, recentlySuccessful } = useForm({
        nama: '',
        deskripsi: '',
        status: 'active',
    });

    useEffect(() => {
        if (recentlySuccessful) {
            setIsDialogOpen(false);
            reset();
        }
    }, [recentlySuccessful]);

    const handleEdit = (kelas: Kelas) => {
        setEditingClass(kelas);
        setData({
            nama: kelas.nama,
            deskripsi: kelas.deskripsi || '',
            status: kelas.status,
        });
        setIsDialogOpen(true);
    };

    const handleAddNew = () => {
        setEditingClass(null);
        reset();
        setIsDialogOpen(true);
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        if (editingClass) {
            patch(route('dosen.kelasUpdate', editingClass.id));
        } else {
            post(route('dosen.kelas.store'));
        }
    };

    const handleDelete = (kelas: Kelas) => {
        if (confirm(`Apakah Anda yakin ingin menghapus kelas "${kelas.nama}"?`)) {
            destroy(route('dosen.kelas.destroy', kelas.id), { preserveScroll: true });
        }
    };

    const classes = initialClasses || [];

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Manajemen Kelas" />

            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Manajemen Kelas</h1>
                        <p className="text-muted-foreground">
                            Kelola semua kelas yang Anda ampu di sini.
                        </p>
                    </div>
                    <Button onClick={handleAddNew}>
                        <PlusCircle className="mr-2 h-4 w-4" /> Tambah Kelas
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Daftar Kelas</CardTitle>
                        <CardDescription>Total {classes.length} kelas ditemukan.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[35%]">Nama Kelas</TableHead>
                                    <TableHead>Deskripsi</TableHead>
                                    <TableHead className="text-center">Kode</TableHead>
                                    <TableHead className="text-center">Status</TableHead>
                                    <TableHead className="text-center">Mahasiswa</TableHead>
                                    <TableHead className="text-right">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {classes.length > 0 ? (
                                    classes.map((kelas) => (
                                        <TableRow key={kelas.id}>
                                            <TableCell className="font-medium">{kelas.nama}</TableCell>
                                            <TableCell className="text-muted-foreground truncate max-w-xs">{kelas.deskripsi || '-'}</TableCell>
                                            <TableCell className="font-medium">{kelas.kode}</TableCell>
                                            <TableCell className="text-center">
                                                <Badge variant={kelas.status === 'active' ? 'default' : 'destructive'}>
                                                    {kelas.status === 'active' ? 'Aktif' : 'Tidak Aktif'}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-center">{kelas.users_count}</TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                                            <span className="sr-only">Buka menu</span>
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        {/* --- TOMBOL DETAIL KELAS DITAMBAHKAN DI SINI --- */}
                                                        <DropdownMenuItem asChild>
                                                            {/* Menggunakan Link untuk navigasi SPA yang cepat */}
                                                            <Link href={route('dosen.kelas.show', kelas.id)} className="w-full cursor-pointer">
                                                                <Eye className="mr-2 h-4 w-4" />
                                                                <span>Lihat Detail & Sesi</span>
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => handleEdit(kelas)}>
                                                            Edit Kelas
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(kelas)}>
                                                            Hapus Kelas
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={6} className="h-24 text-center">
                                            Belum ada kelas yang ditambahkan.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>

            {/* Dialog/Modal */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <form onSubmit={submit}>
                        <DialogHeader>
                            <DialogTitle>{editingClass ? 'Edit Kelas' : 'Tambah Kelas Baru'}</DialogTitle>
                            <DialogDescription>
                                {editingClass ? `Mengubah detail untuk kelas ${editingClass.nama}.` : 'Isi detail untuk kelas baru.'}
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="nama" className="text-right">Nama</Label>
                                <Input id="nama" value={data.nama} onChange={(e) => setData('nama', e.target.value)} className="col-span-3" required autoFocus />
                            </div>
                            {errors.nama && <p className="col-start-2 col-span-3 text-sm text-red-600 -mt-2">{errors.nama}</p>}

                            <div className="grid grid-cols-4 items-start gap-4">
                                <Label htmlFor="deskripsi" className="text-right pt-2">Deskripsi</Label>
                                <Textarea id="deskripsi" value={data.deskripsi} onChange={(e) => setData('deskripsi', e.target.value)} className="col-span-3" placeholder="Deskripsi singkat..." />
                            </div>
                            {errors.deskripsi && <p className="col-start-2 col-span-3 text-sm text-red-600 -mt-2">{errors.deskripsi}</p>}

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="status" className="text-right">Status</Label>
                                <Select value={data.status} onValueChange={(value) => setData('status', value)}>
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Pilih status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="active">Aktif</SelectItem>
                                        <SelectItem value="inactive">Tidak Aktif</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            {errors.status && <p className="col-start-2 col-span-3 text-sm text-red-600 -mt-2">{errors.status}</p>}
                        </div>
                        <DialogFooter>
                            <Button type="submit" disabled={processing}>
                                {processing ? 'Menyimpan...' : 'Simpan'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </AuthenticatedLayout>
    );
}