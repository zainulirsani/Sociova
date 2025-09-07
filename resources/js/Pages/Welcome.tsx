import { Link, router, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Head, } from '@inertiajs/react';

// UI Components from shadcn/ui (adjust path if necessary)
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/Components/ui/dropdown-menu'; // Pastikan path ini benar

import SiteHeader from '@/Components/SiteHeader';
// Icons from lucide-react
import { Star, ArrowRight, BrainCircuit, BarChart, PenSquare, GraduationCap, CircleUser } from "lucide-react";
import { Toaster, toast } from 'sonner'; // Tambahkan Toaster dan toast
import { cn } from '@/lib/utils';

const resourceLinks = [
    { name: "Studi Kasus", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Panduan Dosen", href: "#" },
    { name: "Kebijakan Privasi", href: "#" },
    { name: "Tentang Kami", href: route('tentang.kami') } // Arahkan ke route yang benar
];

const supportLinks = [
    { name: "Pusat Bantuan", href: "#" },
    { name: "Hubungi Kami", href: "#" },
    { name: "Laporkan Masalah", href: "#" },
    { name: "Umpan Balik", href: route('umpan-balik.create') }
];
interface Testimonial {
    id: number;
    rating: number;
    komentar: string;
    user: {
        name: string;
        // Tambahkan properti lain jika perlu, misal 'role' atau 'avatar'
    }
}
interface WelcomePageProps extends PageProps {
    testimonials: Testimonial[];
}
// --- KOMPONEN UTAMA HALAMAN LANDING PAGE ---
export default function Welcome({ auth, testimonials }: WelcomePageProps) {
    const handleContributeClick = () => {
        // Cek apakah user ada DAN rolenya adalah 'mahasiswa'
        // Anda mungkin perlu menyesuaikan 'auth.user.role' sesuai struktur data Anda
        if (auth.user && auth.user.role === 'student') {
            router.get(route('mahasiswa.kelas'));
        } else {
            // Jika tidak, tampilkan notifikasi
            toast.error("Silakan login sebagai mahasiswa", {
                description: "Anda harus login dengan akun mahasiswa untuk dapat berkontribusi.",
                // action: {
                //     label: "Login",
                //     onClick: () => router.get(route('login')),
                // },
            });
        }
    };
    return (

        <div className="min-h-screen bg-background text-foreground antialiased">
            <Head title="Sociova" />
            <SiteHeader />
            <Toaster richColors position="top-center" />
            <main>
                {/* --- HERO SECTION --- */}
                <section className="relative overflow-hidden pt-24 pb-32 lg:pt-32 lg:pb-40">
                    <div className="absolute inset-0 -z-10 bg-background">
                        <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] dark:bg-[radial-gradient(#3f3f46_1px,transparent_1px)]"></div>
                    </div>

                    <div className="container relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mx-auto max-w-4xl text-center">
                            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
                                Meningkatkan Kualitas Pembelajaran melalui <span className="text-primary">Refleksi Mahasiswa</span>
                            </h1>
                            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
                                Sociova adalah platform berbasis AI yang membantu dosen memahami dinamika kelas. Mahasiswa berbagi cerita dan refleksi untuk memberikan wawasan berharga demi peningkatan kualitas pembelajaran.
                            </p>
                            <div className="mt-10 flex items-center justify-center gap-4">
                                <Button
                                    size="lg"
                                    className="px-8 py-6 text-lg"
                                    onClick={handleContributeClick} // Gunakan onClick di sini
                                >
                                    Mulai Sekarang <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>

                            </div>
                        </div>
                    </div>
                </section>

                {/* --- FEATURES SECTION --- */}
                <section id="features" className="py-20 lg:py-24 bg-card border-y">
                    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center lg:max-w-3xl mx-auto mb-16">
                            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Fitur Unggulan Sociova</h2>
                            <p className="mt-4 text-lg text-muted-foreground">
                                Sociova menyediakan perangkat inovatif untuk membantu dosen dan mahasiswa berkolaborasi dalam meningkatkan efektivitas pembelajaran.
                            </p>
                        </div>
                        <div className="grid gap-8 md:grid-cols-3">
                            {[
                                {
                                    icon: BrainCircuit,
                                    title: "Analisis Cerita Berbasis AI",
                                    description: "AI kami menganalisis setiap cerita dan refleksi yang dikirimkan mahasiswa untuk mengidentifikasi pola, sentimen, dan pemahaman konsep kunci dalam pembelajaran."
                                },
                                {
                                    icon: BarChart,
                                    title: "Wawasan Mendalam untuk Dosen",
                                    description: "Dosen mendapatkan ringkasan dan visualisasi data yang mudah dipahami, memungkinkan evaluasi kegiatan pembelajaran yang lebih objektif dan komprehensif."
                                },
                                {
                                    icon: PenSquare,
                                    title: "Ruang Refleksi Mahasiswa",
                                    description: "Menyediakan platform yang terstruktur bagi mahasiswa untuk menyuarakan pengalaman belajar mereka, mendorong metakognisi dan pembelajaran yang lebih dalam."
                                }
                            ].map((feature, i) => (
                                <Card key={i} className="group relative overflow-hidden rounded-xl border bg-transparent transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                                    <div className="absolute top-0 right-0 h-24 w-24 bg-primary/5 rounded-bl-full opacity-50 blur-2xl transition-opacity duration-500 group-hover:opacity-100"></div>
                                    <CardHeader>
                                        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10">
                                            <feature.icon className="h-8 w-8 text-primary" />
                                        </div>
                                        <CardTitle className="text-center text-xl">{feature.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <CardDescription className="text-center text-base leading-relaxed">{feature.description}</CardDescription>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* --- TESTIMONIALS SECTION --- */}
                <section id="testimonials" className="py-20 lg:py-24 bg-background">
                    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center lg:max-w-3xl mx-auto mb-16">
                            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Apa Kata Mereka tentang Sociova</h2>
                            <p className="mt-4 text-lg text-muted-foreground">
                                Pengalaman nyata dari para pengguna yang telah merasakan manfaat Sociova.
                            </p>
                        </div>

                        {/* Grid dinamis untuk menampilkan testimoni */}
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {testimonials.map((testimonial) => (
                                <Card key={testimonial.id} className="flex flex-col justify-between rounded-xl bg-card border">
                                    <CardContent className="pt-6">
                                        <div className="flex mb-3">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className={cn("h-4 w-4", i < testimonial.rating ? "fill-yellow-400 text-yellow-400" : "fill-muted text-muted-foreground")} />
                                            ))}
                                        </div>
                                        <p className="text-muted-foreground leading-relaxed italic">"{testimonial.komentar}"</p>
                                    </CardContent>
                                    <div className="flex items-center p-6 pt-4">
                                        <Avatar className="h-12 w-12 mr-4">
                                            {/* Ganti src dengan avatar user jika ada */}
                                            <AvatarImage src={`https://ui-avatars.com/api/?name=${testimonial.user.name}&background=random`} />
                                            <AvatarFallback>{testimonial.user.name.substring(0, 2)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h4 className="font-semibold text-foreground">{testimonial.user.name}</h4>
                                            {/* Anda bisa menambahkan role user di sini jika ada */}
                                            <p className="text-sm text-muted-foreground">Pengguna Sociova</p>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>
                <section id="journal" className="border-t py-20 lg:py-24 bg-card">
                    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl text-center">
                            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Ciptakan Dampak Nyata pada Pembelajaran</h2>
                            <p className="mt-4 text-lg text-muted-foreground">
                                Berdayakan dosen dengan wawasan mendalam dan berikan mahasiswa platform untuk berefleksi. Mari bersama-sama kita tingkatkan kualitas pendidikan.
                            </p>
                            <div className="mt-8">
                                <Button
                                    size="lg"
                                    className="px-8 py-6 text-lg"
                                    onClick={handleContributeClick} // Gunakan onClick di sini
                                >
                                    Mulai Berkontribusi
                                    <PenSquare className="ml-2 h-5 w-5" />
                                </Button>
                                <p className="mt-4 text-sm text-muted-foreground">
                                    Mudah untuk memulai • Terintegrasi dengan proses belajar
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* --- FOOTER --- */}
            <footer className="bg-muted/50 border-t">
                <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid gap-8 md:grid-cols-4">
                        <div className="col-span-full md:col-span-2">
                            <div className="flex items-center space-x-3 mb-4">
                                <GraduationCap className="h-8 w-8 text-primary" />
                                <span className="text-2xl font-bold">Sociova</span>
                            </div>
                            <p className="text-muted-foreground max-w-md">
                                Meningkatkan kualitas pembelajaran melalui analisis refleksi mahasiswa berbasis AI. Inovasi pendidikan adalah prioritas kami.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-foreground mb-4">Sumber Daya</h4>
                            <ul className="space-y-2 text-muted-foreground">
                                {/* 3. Gunakan data baru dan komponen Link dari Inertia */}
                                {resourceLinks.map(item => (
                                    <li key={item.name}>
                                        <Link href={item.href} className="hover:text-primary transition-colors">
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-foreground mb-4">Dukungan</h4>
                            <ul className="space-y-2 text-muted-foreground">
                                {supportLinks.map(item => (
                                    <li key={item.name}>
                                        <Link href={item.href} className="hover:text-primary transition-colors">
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
                        <p>&copy; {new Date().getFullYear()} Sociova. Platform Inovatif untuk Evaluasi Pembelajaran.</p>
                        <p className="mt-2">
                            Dibuat oleh Kelompok 6 - Mata Kuliah Pengembangan Pembelajaran, Universitas Mataram.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    )
}