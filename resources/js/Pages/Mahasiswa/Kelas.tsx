import { Head, Link } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/Components/ui/card";
import { Toaster } from 'sonner';
import { Button } from '@/Components/ui/button';
import StudentLayout from '@/Layouts/StudentLayout';
import { ArrowRight, BookOpen } from 'lucide-react';

// --- DEFINISI TIPE DATA ---

interface Kelas {
    id: number;
    nama: string;
    nama_dosen: string;
}

// PERBAIKAN 1: Sesuaikan interface ini dengan struktur data dari controller
interface EnrolledClassesData {
    kelas: Kelas[];
    kelasCount: number;
}

interface EvaluationIndexProps extends PageProps {
    enrolledClasses: EnrolledClassesData; // Props utama sekarang berisi objek ini
}

// --- KOMPONEN UTAMA HALAMAN PEMILIHAN KELAS ---
export default function EvaluationIndexPage({ auth, enrolledClasses }: EvaluationIndexProps) {
    // PERBAIKAN 2: Ekstrak array kelas dari dalam props
    const daftarKelas = enrolledClasses.kelas;

    return (
        <StudentLayout user={auth.user}>
            <Head title="Pilih Kelas untuk Refleksi" />
            <Toaster richColors position="top-center" />

            <main className="container mx-auto max-w-5xl px-4 py-10">
                <div className="space-y-8">
                    {/* Judul Halaman */}
                    <div className="space-y-2 text-center">
                        <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                            Pilih Kelas
                        </h1>
                        <p className="mx-auto max-w-2xl text-muted-foreground">
                            Pilih salah satu kelas yang Anda ikuti untuk memulai sesi refleksi pembelajaran.
                        </p>
                    </div>

                    {/* Grid Daftar Kelas */}
                    {/* PERBAIKAN 3: Gunakan variabel baru 'daftarKelas' */}
                    {daftarKelas.length > 0 ? (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {daftarKelas.map((kelas) => (
                                <Link
                                    key={kelas.id}
                                    href={route('mahasiswa.EvaluasiKelas', kelas.id)}
                                    className="block h-full"
                                >
                                    <Card className="flex h-full flex-col justify-between transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1.5">
                                        <CardHeader>
                                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                                                <BookOpen className="h-6 w-6 text-primary" />
                                            </div>
                                            <CardTitle>{kelas.nama}</CardTitle>
                                            <CardDescription>{kelas.nama_dosen}</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="flex items-center text-sm font-medium text-primary">
                                                Mulai Refleksi
                                                <ArrowRight className="ml-2 h-4 w-4" />
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <Card>
                            <CardContent className="p-10 text-center">
                                <p className="text-muted-foreground">
                                    Anda belum terdaftar di kelas manapun.
                                    <br />
                                    Silakan bergabung dengan sebuah kelas terlebih dahulu melalui dashboard Anda.
                                </p>
                                <Button asChild className="mt-4">
                                    <Link href={route('mahasiswa.dashboard')}>Kembali ke Dashboard</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </main>
        </StudentLayout>
    );
}