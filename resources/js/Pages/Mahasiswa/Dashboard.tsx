import { useState, useMemo } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { PageProps } from '@/types';
import StudentLayout from '@/Layouts/StudentLayout';

// ShadCN UI Components
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Badge } from '@/Components/ui/badge';
import {
    Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle,
    DialogTrigger, DialogFooter, DialogClose,
} from '@/Components/ui/dialog';
import { ChartContainer } from '@/Components/ui/chart';

// Icons
import { FilePenLine, ArrowRight, BookOpen, Star, Target, BarChart2, LogIn } from 'lucide-react';

// Charting Library
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts';


// --- DEFINISI TIPE DATA ---
interface Kelas {
    id: number;
    nama: string;
    nama_dosen: string;
}

interface SesiPembelajaran {
    id: number;
    topik: string;
    pertemuan_ke: number;
    kelas: Kelas; // Relasi bersarang untuk grafik
}

interface Analysis {
    id: number;
    summary: string;
    suggested_score: number;
    status: string;
}

interface Submission {
    id: number;
    content: string;
    created_at: string;
    sesi_pembelajaran?: SesiPembelajaran; // Dibuat opsional agar aman
    analysis: Analysis | null;
}

interface KelasResult {
    kelas: Kelas[];
    kelasCount: number;
}

interface DashboardPageProps extends PageProps {
    kelasResult: KelasResult;
    dataSubmission: Submission[];
    averageScore: number;
}


// --- KOMPONEN UTAMA DASHBOARD MAHASISWA ---
export default function Dashboard({ auth, kelasResult, dataSubmission, averageScore }: DashboardPageProps) {
    // --- MENGGUNAKAN DATA ASLI DARI PROPS ---
    const enrolledClasses = kelasResult.kelas;
    const kelasCount = kelasResult.kelasCount;
    const recentSubmissions = dataSubmission;

    // --- DATA DINAMIS UNTUK GRAFIK RATA-RATA SKOR PER KELAS ---
    const classScoreData = useMemo(() => {
        if (!Array.isArray(recentSubmissions)) return [];

        // 1. Kelompokkan skor berdasarkan nama kelas
        const scoresByClass = recentSubmissions.reduce((acc, sub) => {
            if (sub.analysis && sub.sesi_pembelajaran?.kelas?.nama) {
                const className = sub.sesi_pembelajaran.kelas.nama;
                if (!acc[className]) {
                    acc[className] = [];
                }
                acc[className].push(sub.analysis.suggested_score);
            }
            return acc;
        }, {} as Record<string, number[]>);

        // 2. Hitung rata-rata skor untuk setiap kelas
        return Object.entries(scoresByClass).map(([className, scores]) => {
            const average = scores.reduce((sum, score) => sum + score, 0) / scores.length;
            return {
                name: className,
                score: Math.round(average),
            };
        });
    }, [recentSubmissions]);

    // --- DATA DUMMY ---

    // --- STATE & HANDLERS ---
    const [isJoinClassDialogOpen, setJoinClassDialogOpen] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        class_code: '',
    });

    const submitJoinClass = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('mahasiswa.kelasJoin'), {
            onSuccess: () => {
                setJoinClassDialogOpen(false);
                reset('class_code');
            },
        });
    };

    const getScoreBadgeColor = (score: number | null | undefined) => {
        if (!score) return 'bg-gray-400';
        if (score >= 90) return 'bg-green-500';
        if (score >= 80) return 'bg-blue-500';
        if (score >= 70) return 'bg-yellow-500';
        return 'bg-red-500';
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric', month: 'short', year: 'numeric'
        });
    };

    return (
        <StudentLayout user={auth.user}>
            <Head title="Dashboard Mahasiswa" />

            <div className="space-y-8">
                {/* Kartu Sambutan & Aksi Utama */}
                <Card className="bg-primary text-primary-foreground">
                    <CardHeader>
                        <CardTitle className="text-2xl">Selamat Datang, {auth.user.name}!</CardTitle>
                        <CardDescription className="text-primary-foreground/80">
                            Siap untuk merefleksikan pembelajaran hari ini?
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-4">
                            <Button variant="secondary" size="lg" asChild>
                                <Link href={route('mahasiswa.kelas')}>
                                    <FilePenLine className="mr-2 h-5 w-5" />
                                    Tulis Refleksi
                                </Link>
                            </Button>
                            <Dialog open={isJoinClassDialogOpen} onOpenChange={setJoinClassDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button variant="outline" size="lg" className="bg-primary-foreground/10 hover:bg-primary-foreground/20 text-primary-foreground">
                                        Gabung Kelas Baru
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    <form onSubmit={submitJoinClass}>
                                        <DialogHeader>
                                            <DialogTitle>Gabung Kelas Baru</DialogTitle>
                                            <DialogDescription>
                                                Masukkan kode unik dari dosen Anda.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="grid gap-4 py-4">
                                            <Input
                                                id="class_code"
                                                value={data.class_code}
                                                onChange={(e) => setData('class_code', e.target.value.toUpperCase())}
                                                placeholder="KODE KELAS"
                                                required autoFocus
                                            />
                                            {errors.class_code && <p className="text-sm text-destructive">{errors.class_code}</p>}
                                        </div>
                                        <DialogFooter>
                                            <DialogClose asChild><Button type="button" variant="secondary">Batal</Button></DialogClose>
                                            <Button type="submit" disabled={processing}>{processing ? 'Memproses...' : 'Gabung'}</Button>
                                        </DialogFooter>
                                    </form>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </CardContent>
                </Card>

                {/* Informasi Akademik */}
                <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Kelas Terdaftar</CardTitle>
                            <BookOpen className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{kelasCount} Kelas</div>
                            <p className="text-xs text-muted-foreground">Total kelas yang Anda ikuti.</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Rata-rata Skor AI</CardTitle>
                            <Target className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{averageScore}</div>
                            <p className="text-xs text-muted-foreground">Rata-rata skor dari analisis AI.</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Grafik Visualisasi Data */}
                <div className="grid gap-6 lg:grid-cols-1">
                    <Card>
                         <CardHeader>
                             <CardTitle className="flex items-center">
                                 <BarChart2 className="mr-2 h-5 w-5" />
                                 Rata-rata Skor per Kelas
                             </CardTitle>
                             <CardDescription>
                                 Perbandingan rata-rata skor refleksi Anda di setiap kelas.
                             </CardDescription>
                         </CardHeader>
                         <CardContent>
                             <ChartContainer config={{}} className="h-[250px] w-full">
                                <ResponsiveContainer>
                                    <BarChart data={classScoreData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={10}  textAnchor="end" height={50} interval={0} />
                                        <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} domain={[0, 100]} />
                                        <Tooltip cursor={{ fill: 'hsl(var(--muted))' }}/>
                                        <Bar dataKey="score" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                 </ResponsiveContainer>
                             </ChartContainer>
                         </CardContent>
                     </Card>
                </div>

                {/* Riwayat Submisi Terbaru */}
                <Card>
                    <CardHeader>
                        <CardTitle>Riwayat Refleksi Terbaru</CardTitle>
                        <CardDescription>Berikut adalah refleksi terakhir yang telah Anda kirimkan.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {recentSubmissions && recentSubmissions.length > 0 ? (
                            recentSubmissions.map((submission) => (
                                <div key={submission.id} className="flex items-center justify-between rounded-md border p-4">
                                    <div className="flex-grow">
                                        <p className="font-semibold">
                                            {submission.sesi_pembelajaran?.topik || 'Refleksi Umum'}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            {`Pertemuan ke-${submission.sesi_pembelajaran?.pertemuan_ke || '?'} • Dikirim pada ${formatDate(submission.created_at)}`}
                                        </p>
                                        <p className="text-sm text-muted-foreground mt-2 line-clamp-2 italic">
                                            "{submission.content}"
                                        </p>
                                    </div>
                                    <div className="flex items-center space-x-4 pl-4">
                                        {submission.analysis && (
                                            <Badge className={`${getScoreBadgeColor(submission.analysis.suggested_score)} text-white`}>
                                                <Star className="mr-1 h-3 w-3" /> {submission.analysis.suggested_score}
                                            </Badge>
                                        )}
                                        <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                                            <Link href="#">
                                                <ArrowRight className="h-4 w-4" />
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-muted-foreground">Anda belum pernah mengirimkan refleksi.</p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </StudentLayout>
    );
}