import { useEffect, useMemo } from "react";
import { Head, Link, useForm } from '@inertiajs/react';
import { PageProps } from '@/types';
import StudentLayout from '@/Layouts/StudentLayout';
import { Button } from "@/Components/ui/button";
import { Card, CardContent } from "@/Components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { Toaster, toast } from 'sonner';
import AnimatedTextarea from '@/Components/AnimatedTextarea';
import { Save, ArrowLeft, ChevronDown } from "lucide-react";
import { Label } from "@/Components/ui/label";

// --- DEFINISI TIPE DATA ---

interface Sesi {
    id: number;
    pertemuan_ke: number;
    topik: string;
    status: 'open' | 'closed' | 'upcoming';
}

interface Kelas {
    id: number;
    nama: string;
    nama_dosen: string;
}

// Props yang diterima dari controller
interface EvaluationShowProps extends PageProps {
    kelas: Kelas;
    sesiList: Sesi[]; // Daftar sesi untuk kelas ini
}

// --- KOMPONEN UTAMA HALAMAN TULIS REFLEKSI ---
export default function EvaluationShowPage({ auth, kelas, sesiList }: EvaluationShowProps) {

    // Filter sesi yang 'open' saja yang bisa dipilih mahasiswa
    const openSessions = sesiList.filter(s => s.status === 'open');

    const { data, setData, post, processing, errors, recentlySuccessful, reset } = useForm({
        sesi_pembelajaran_id: '', // Field baru untuk menyimpan ID sesi yang dipilih
        content: '',
    });

    const wordCount = useMemo(() => {
        if (!data.content) return 0;
        return data.content.trim().split(/\s+/).filter(Boolean).length;
    }, [data.content]);

    useEffect(() => {
        if (recentlySuccessful) {
            reset();
            toast.success("Refleksi Anda berhasil dikirim!", {
                description: "Terima kasih atas kontribusi Anda untuk perbaikan pembelajaran."
            });
        }
    }, [recentlySuccessful]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Pastikan route 'submissions.store' bisa menangani data baru
        post(route('mahasiswa.submissions.store'), {
            preserveScroll: true,
        });
    }

    return (
        <StudentLayout user={auth.user}>
            <Head title={`Refleksi Kelas ${kelas.nama}`} />
            <Toaster richColors position="top-center" />

            <main className="container mx-auto max-w-3xl px-4 py-10">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Header Halaman */}
                    <div>
                        {/* <Link href={route('mahasiswa.kelas')} className="text-sm text-muted-foreground hover:text-primary flex items-center mb-4">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Kembali ke Pilih Kelas
                        </Link> */}
                        <div className="text-center space-y-2">
                            <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                                Refleksi Kelas: {kelas.nama}
                            </h1>
                            <p className="mx-auto max-w-2xl text-muted-foreground">
                                Pilih sesi pertemuan yang ingin Anda refleksikan, lalu ceritakan pengalaman belajar Anda.
                            </p>
                        </div>
                    </div>

                    {/* --- PEMILIHAN SESI & AREA INPUT --- */}
                    <Card className="overflow-hidden shadow-sm transition-all hover:shadow-md">
                        <CardContent className="p-6 space-y-4">
                            {/* Dropdown untuk Memilih Sesi */}
                            <div className="space-y-2">
                                <Label htmlFor="sesi">Pilih Sesi Pertemuan</Label>
                                <Select
                                    value={data.sesi_pembelajaran_id}
                                    onValueChange={(value) => setData('sesi_pembelajaran_id', value)}
                                    required
                                >
                                    <SelectTrigger id="sesi" className="w-full">
                                        <SelectValue placeholder="Pilih sesi yang sedang dibuka..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {openSessions.length > 0 ? (
                                            openSessions.map(sesi => (
                                                <SelectItem key={sesi.id} value={String(sesi.id)}>
                                                    Pertemuan ke-{sesi.pertemuan_ke}: {sesi.topik}
                                                </SelectItem>
                                            ))
                                        ) : (
                                            <div className="p-4 text-center text-sm text-muted-foreground">
                                                Tidak ada sesi yang sedang dibuka.
                                            </div>
                                        )}
                                    </SelectContent>
                                </Select>
                                {errors.sesi_pembelajaran_id && <p className="text-sm text-destructive mt-1">{errors.sesi_pembelajaran_id}</p>}
                            </div>

                            {/* Textarea untuk Cerita (hanya muncul jika sesi sudah dipilih) */}
                            {data.sesi_pembelajaran_id && (
                                <div className="space-y-2">
                                    <Label>Ceritakan Refleksi Anda</Label>
                                    <AnimatedTextarea data={data} setData={setData} />
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Informasi Tambahan & Tombol Aksi */}
                    {data.sesi_pembelajaran_id && (
                        <>
                            <div className="flex items-center justify-between px-2">
                                {errors.content ? (
                                    <p className="text-sm text-destructive">{errors.content}</p>
                                ) : (
                                    <p className="text-sm text-muted-foreground">Fokus pada gagasan Anda.</p>
                                )}
                                <span className="text-sm font-medium text-muted-foreground">{wordCount} kata</span>
                            </div>

                            <div className="flex justify-center pt-4">
                                <Button
                                    disabled={processing || wordCount < 5 || !data.sesi_pembelajaran_id}
                                    size="lg"
                                    type="submit"
                                    className="w-full max-w-xs rounded-full px-10 py-6 text-base font-semibold shadow-lg transition-transform active:scale-95"
                                >
                                    <Save className="mr-2 h-5 w-5" />
                                    {processing ? "Mengirim..." : "Kirim Refleksi"}
                                </Button>
                            </div>
                        </>
                    )}
                </form>
            </main>
        </StudentLayout>
    );
}