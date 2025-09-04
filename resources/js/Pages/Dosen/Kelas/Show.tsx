import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, useForm } from '@inertiajs/react';
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
import { MoreHorizontal, PlusCircle, ArrowLeft } from 'lucide-react';
import { useState, FormEventHandler, useEffect } from 'react';

// --- TIPE DATA BARU ---
// Tipe data untuk satu Sesi Pembelajaran
interface Sesi {
    id: number;
    pertemuan_ke: number;
    topik: string;
    deskripsi?: string;
    status: 'upcoming' | 'open' | 'closed';
}

// Tipe data untuk satu Kelas (Detail)
interface Kelas {
    id: number;
    nama: string;
    kode: string;
    nama_dosen: string;
    status: 'active' | 'inactive';
    // Sesi pembelajaran akan dimuat bersama kelas
    sesi_pembelajaran: Sesi[];
}

// Tipe untuk props halaman
interface KelasShowProps extends PageProps {
    kelas: Kelas;
}

// --- KOMPONEN UTAMA HALAMAN DETAIL KELAS & MANAJEMEN SESI ---
export default function ShowKelas({ auth, kelas }: KelasShowProps) {
    const [isSesiDialogOpen, setIsSesiDialogOpen] = useState(false);
    const [editingSesi, setEditingSesi] = useState<Sesi | null>(null);

    // Form hook untuk menambah/mengedit Sesi Pembelajaran
    const { data, setData, post, patch, processing, errors, reset, recentlySuccessful } = useForm({
        topik: '',
        pertemuan_ke: (kelas.sesi_pembelajaran?.length || 0) + 1,
        deskripsi: '',
        status: 'upcoming' as Sesi['status'],
    });

    // Reset form dan tutup dialog setelah berhasil
    useEffect(() => {
        if (recentlySuccessful) {
            setIsSesiDialogOpen(false);
            reset();
        }
    }, [recentlySuccessful]);

    const handleAddNewSesi = () => {
        setEditingSesi(null);
        // Reset form dengan nomor pertemuan berikutnya
        reset('topik', 'deskripsi');
        setData({
            topik: '',
            deskripsi: '',
            pertemuan_ke: (kelas.sesi_pembelajaran?.length || 0) + 1,
            status: 'upcoming',
        });
        setIsSesiDialogOpen(true);
    };

    const handleEditSesi = (sesi: Sesi) => {
        setEditingSesi(sesi);
        setData({
            topik: sesi.topik,
            pertemuan_ke: sesi.pertemuan_ke,
            deskripsi: sesi.deskripsi || '',
            status: sesi.status,
        });
        setIsSesiDialogOpen(true);
    };

    const
        handleDeleteSesi = (sesi: Sesi) => {
        // Tampilkan dialog konfirmasi sederhana
        if (confirm(`Apakah Anda yakin ingin menghapus sesi "Pertemuan ke-${sesi.pertemuan_ke}"?`)) {
            // Kirim request DELETE ke route yang akan kita buat
            router.delete(route('dosen.sesiDestroy', { kelas: kelas.id, sesi: sesi.id }), {
                preserveScroll: true, // Agar halaman tidak scroll ke atas setelah aksi
            });
        }
    };

    // Handler untuk submit form sesi
    const submitSesi: FormEventHandler = (e) => {
        e.preventDefault();
        const routePayload = { kelas: kelas.id, sesi: editingSesi?.id };

        if (editingSesi) {
            patch(route('dosen.sesiUpdate', routePayload), { preserveScroll: true });
        } else {
            post(route('dosen.kelasSesi.store', routePayload), { preserveScroll: true });
        }
    };

    const getStatusBadge = (status: Sesi['status']) => {
        switch (status) {
            case 'open':
                return <Badge variant="default">Dibuka</Badge>;
            case 'closed':
                return <Badge variant="destructive">Ditutup</Badge>;
            case 'upcoming':
            default:
                return <Badge variant="secondary">Akan Datang</Badge>;
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={`Detail Kelas: ${kelas.nama}`} />

            <div className="space-y-6">
                {/* --- HEADER HALAMAN --- */}
                <div>
                    {/* <Link href={route('dosen.kelas')} className="text-sm text-muted-foreground hover:text-primary flex items-center mb-2">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Kembali ke Daftar Kelas
                    </Link> */}
                    <h1 className="text-3xl font-bold tracking-tight">Detail Kelas: {kelas.nama}</h1>
                    <p className="text-muted-foreground">Kode Kelas: <span className="font-mono text-primary">{kelas.kode}</span></p>
                </div>

                {/* --- KARTU SESI PEMBELAJARAN --- */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Sesi Pembelajaran</CardTitle>
                            <CardDescription>Kelola semua sesi pertemuan untuk kelas ini.</CardDescription>
                        </div>
                        <Button onClick={handleAddNewSesi}>
                            <PlusCircle className="mr-2 h-4 w-4" /> Tambah Sesi
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">Pertemuan</TableHead>
                                    <TableHead>Topik Pembahasan</TableHead>
                                    <TableHead>Deskripsi</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {kelas.sesi_pembelajaran && kelas.sesi_pembelajaran.length > 0 ? (
                                    kelas.sesi_pembelajaran.map((sesi) => (
                                        <TableRow key={sesi.id}>
                                            <TableCell className="font-medium">Ke-{sesi.pertemuan_ke}</TableCell>
                                            <TableCell>{sesi.topik}</TableCell>
                                            <TableCell>{sesi.deskripsi}</TableCell>
                                            <TableCell>{getStatusBadge(sesi.status)}</TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem onClick={() => handleEditSesi(sesi)}>Edit</DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => handleDeleteSesi(sesi)} className="text-destructive">Hapus</DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={4} className="h-24 text-center">
                                            Belum ada sesi pembelajaran yang ditambahkan.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>

            {/* --- DIALOG UNTUK TAMBAH/EDIT SESI --- */}
            <Dialog open={isSesiDialogOpen} onOpenChange={setIsSesiDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <form onSubmit={submitSesi}>
                        <DialogHeader>
                            <DialogTitle>{editingSesi ? 'Edit Sesi Pembelajaran' : 'Tambah Sesi Baru'}</DialogTitle>
                            <DialogDescription>
                                Isi detail untuk sesi pertemuan di kelas {kelas.nama}.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="pertemuan_ke">Pertemuan Ke</Label>
                                <Input id="pertemuan_ke" type="number" value={data.pertemuan_ke} onChange={(e) => setData('pertemuan_ke', parseInt(e.target.value))} required />
                                {errors.pertemuan_ke && <p className="text-sm text-red-600">{errors.pertemuan_ke}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="topik">Topik Pembahasan</Label>
                                <Input id="topik" value={data.topik} onChange={(e) => setData('topik', e.target.value)} required autoFocus />
                                {errors.topik && <p className="text-sm text-red-600">{errors.topik}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="deskripsi">Deskripsi (Opsional)</Label>
                                <Textarea id="deskripsi" value={data.deskripsi} onChange={(e) => setData('deskripsi', e.target.value)} />
                                {errors.deskripsi && <p className="text-sm text-red-600">{errors.deskripsi}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="status">Status</Label>
                                <Select value={data.status} onValueChange={(value: Sesi['status']) => setData('status', value)}>
                                    <SelectTrigger><SelectValue placeholder="Pilih status" /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="upcoming">Akan Datang</SelectItem>
                                        <SelectItem value="open">Dibuka</SelectItem>
                                        <SelectItem value="closed">Ditutup</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.status && <p className="text-sm text-red-600">{errors.status}</p>}
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit" disabled={processing}>
                                {processing ? 'Menyimpan...' : 'Simpan Sesi'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </AuthenticatedLayout>
    );
}