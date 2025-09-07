import { Head, Link } from '@inertiajs/react';
import { PageProps } from '@/types';
import StudentLayout from '@/Layouts/StudentLayout';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/Components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar';
import { Button } from '@/Components/ui/button';
import { Linkedin, Github, Instagram } from 'lucide-react';
import { motion } from "framer-motion";

// --- DATA DINAMIS ---
const teamMembers = [
    {
        name: "Haniza Febriani",
        role: "E1S02310044",
        imageUrl: "https://github.com/shadcn.png", // Ganti dengan URL gambar profil
        quote: "akan ku balas semua perbuatan anda, tapi bentar aku tidur dulu",
        social: {
            instagram: "https://instagram.com",
        },
        fallback: "HF",
    },
    {
        name: "Ida Ayu Putu Maheswari",
        role: "E1S02310048",
        imageUrl: "/images/profil/dayu.jpg",
        quote: "",
        social: {
            instagram: "https://www.instagram.com/ayumhswariii/",
        },
        fallback: "IM",
    },
    {
        name: "Linda Ambarwati",
        role: "E1S02310055",
        imageUrl: "https://github.com/shadcn.png",
        quote: "",
        social: {
            instagram: "https://instagram.com",
        },
        fallback: "LA",
    },
    {
        name: "Muhammad Jajik Sukarji",
        role: "E1S02310063",
        imageUrl: "https://github.com/shadcn.png",
        quote: "Setiap baris kode adalah langkah menuju inovasi.",
        social: {
            instagram: "https://instagram.com",
        },
        fallback: "MJ",
    },
    {
        name: "Mutia Azzahra Kasih",
        role: "E1S022123",
        imageUrl: "images/profil/mutia2.jpg",
        quote: "Memastikan setiap fitur berjalan sempurna tanpa celah.",
        social: {
            instagram: "https://instagram.com",
        },
        fallback: "MA",
    },
];

const partnership = {
    name: "Muhammad Zainul Irsani",
    role: "Programmer & Mentor",
    imageUrl: "https://github.com/shadcn.png",
    quote: "Mengubah ide kompleks menjadi solusi digital yang nyata.",
    social: {
        github: "https://github.com/zainulirsani",
        Instagram: "https://www.instagram.com/zainul_irsan/",
    },
    fallback: "ZI",
};

// --- KOMPONEN UTAMA HALAMAN "TENTANG KAMI" ---
export default function TentangKamiPage({ auth }: PageProps) {
    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.1,
                duration: 0.5,
            }
        })
    };

    return (
        <StudentLayout user={auth.user}>
            <Head title="Tentang Kami" />

            {/* PERBAIKAN 1: Padding vertikal (py) dikurangi */}
            <div className="relative isolate overflow-hidden bg-background px-6 py-8 sm:py-2 lg:px-8">
                 <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] dark:bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.900),theme(colors.slate.900))] opacity-20" />
                <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-background shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 dark:ring-indigo-900 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />

                <main className="mx-auto max-w-6xl">
                    <div className="space-y-5">
                        {/* Header Halaman */}
                        <motion.div 
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7 }}
                            className="text-center"
                        >
                            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl bg-gradient-to-br from-primary to-foreground/70 bg-clip-text text-transparent">
                                Tim di Balik Sociova
                            </h1>
                            <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground">
                                Kami adalah Kelompok 6 dari mata kuliah Pengembangan Pembelajaran, Fakultas Pendidikan Sosiologi Universitas Mataram. Sociova adalah hasil kolaborasi dan dedikasi kami untuk menciptakan inovasi dalam evaluasi pendidikan.
                            </p>
                        </motion.div>

                        {/* Grid Daftar Anggota Tim */}
                        <div className="flex justify-center">
                            {/* PERBAIKAN 2: Diubah menjadi md:grid-cols-3 */}
                            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                                {teamMembers.map((member, index) => (
                                    <motion.div
                                        key={index}
                                        custom={index}
                                        variants={cardVariants}
                                        initial="hidden"
                                        animate="visible"
                                    >
                                        <Card className="group h-full overflow-hidden rounded-2xl border-transparent bg-muted/30 transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10">
                                            <div className="flex flex-col items-center p-6 text-center">
                                                <Avatar className="h-32 w-32 flex-shrink-0 border-4 border-background shadow-lg">
                                                    <AvatarImage src={member.imageUrl} alt={`Foto ${member.name}`} />
                                                    <AvatarFallback>{member.fallback}</AvatarFallback>
                                                </Avatar>
                                                <div className="mt-4">
                                                    <CardTitle className="text-xl font-bold bg-gradient-to-r from-primary to-foreground bg-clip-text text-transparent">{member.name}</CardTitle>
                                                    <CardDescription className="mt-1">{member.role}</CardDescription>
                                                    <p className="mt-3 text-sm italic text-muted-foreground">"{member.quote}"</p>
                                                    <div className="mt-4 flex justify-center gap-2">
                                                        {member.social.instagram && (
                                                            <Button variant="ghost" size="icon" asChild>
                                                                <a href={member.social.instagram} target="_blank" rel="noopener noreferrer">
                                                                    <Instagram className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
                                                                </a>
                                                            </Button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* --- BAGIAN PARTNERSHIP --- */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.5 }}
                            className="text-center pt-12 border-t border-border/20"
                        >
                             <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-br from-primary to-foreground/70 bg-clip-text text-transparent">
                                Partnership & Mentor
                            </h2>
                            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                                Proyek ini tidak akan terwujud tanpa wawasan dan keahlian dari partner kami.
                            </p>
                            <div className="mt-8 flex justify-center">
                                <Card className="group w-full max-w-md overflow-hidden rounded-2xl border-transparent bg-muted/30 transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10">
                                    <div className="flex flex-col items-center p-6 text-center sm:flex-row sm:p-8 sm:text-left">
                                        <Avatar className="h-24 w-24 flex-shrink-0 border-4 border-background shadow-lg sm:h-28 sm:w-28">
                                            <AvatarImage src={partnership.imageUrl} alt={`Foto ${partnership.name}`} />
                                            <AvatarFallback>{partnership.fallback}</AvatarFallback>
                                        </Avatar>
                                        <div className="mt-4 sm:mt-0 sm:ml-6">
                                            <CardTitle className="text-xl font-bold bg-gradient-to-r from-primary to-foreground bg-clip-text text-transparent">{partnership.name}</CardTitle>
                                            <CardDescription className="mt-1">{partnership.role}</CardDescription>
                                            <p className="mt-3 text-sm italic text-muted-foreground">"{partnership.quote}"</p>
                                            <div className="mt-4 flex justify-center gap-2 sm:justify-start">
                                                {partnership.social.github && (
                                                    <Button variant="ghost" size="icon" asChild>
                                                        <a href={partnership.social.github} target="_blank" rel="noopener noreferrer">
                                                            <Github className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
                                                        </a>
                                                    </Button>
                                                )}
                                                {partnership.social.Instagram && (
                                                    <Button variant="ghost" size="icon" asChild>
                                                        <a href={partnership.social.Instagram} target="_blank" rel="noopener noreferrer">
                                                            <Instagram className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
                                                        </a>
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </motion.div>
                    </div>
                </main>
            </div>
        </StudentLayout>
    );
}