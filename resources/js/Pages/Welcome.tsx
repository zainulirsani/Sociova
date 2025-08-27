import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card"
import { Badge } from "@/Components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar"
import { Heart, Shield, Users, BookOpen, Star, ArrowRight } from "lucide-react"
import { Link } from '@inertiajs/react';

export default function SAPALandingPage() {
    return (
        <div className="min-h-screen bg-background text-foreground antialiased">
            {/* --- NAVIGASI --- */}
            <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center space-x-3">
                        <Heart className="h-8 w-8 text-primary" />
                        <span className="text-2xl font-bold">SOCIOVA</span>
                        <Badge variant="secondary">Sahabat Pelajar</Badge>
                    </div>
                    <nav className="hidden items-center space-x-8 md:flex">
                        {/* <a href="#features" className="text-muted-foreground transition-colors hover:text-primary">Fitur</a>
                        <a href="#testimonials" className="text-muted-foreground transition-colors hover:text-primary">Kisah</a> */}
                        <Button variant="outline" size="sm" asChild>
                            <Link href="/login">Masuk</Link>
                        </Button>
                    </nav>
                </div>
            </header>

            <main>
                {/* --- HERO SECTION --- */}
                <section className="relative overflow-hidden pt-24 pb-32 lg:pt-32 lg:pb-40">
                    <div className="absolute inset-0 -z-10">
                        <div className="absolute inset-0 bg-background"></div>
                        <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
                        <div
                            className="absolute inset-0 bg-gradient-to-br from-primary-translucent via-transparent to-secondary-translucent opacity-50 blur-3xl animate-[aurora_20s_ease-in-out_infinite]"
                            style={{ animationDelay: '5s' }}
                        />
                         <div
                            className="absolute inset-0 bg-gradient-to-tl from-accent-translucent via-transparent to-primary-translucent opacity-40 blur-3xl animate-[aurora_20s_ease-in-out_infinite]"
                        />
                    </div>

                    <div className="container relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mx-auto max-w-4xl text-center">
                            {/* <Badge variant="default" className="mb-6 bg-primary/10 px-4 py-2 text-primary hover:bg-primary/20">
                                Dukungan Kesehatan Mental Berbasis AI
                            </Badge> */}
                            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
                                Ruang Aman Anda untuk <span className="text-primary">Kesejahteraan Mental</span>
                            </h1>
                            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
                                SAPA membantu pelajar mendeteksi gejala awal depresi dan perundungan melalui jurnal berbasis AI. Temukan dukungan, bangun ketahanan diri, dan terhubung dengan komunitas yang peduli.
                            </p>
                            <div className="mt-10 flex items-center justify-center gap-4">
                                <Button size="lg" className="px-8 py-6 text-lg" asChild>
                                    <Link href="/Evaluasi">
                                        Mulai Jurnal Anda <ArrowRight className="ml-2 h-5 w-5" />
                                    </Link>
                                </Button>
                                <Button variant="ghost" size="lg" className="px-8 py-6 text-lg">
                                    Pelajari Lebih Lanjut
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- FEATURES SECTION --- */}
                <section id="features" className="py-20 lg:py-24 bg-card border-y">
                    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center lg:max-w-3xl mx-auto mb-16">
                            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Bagaimana SAPA Mendukung Anda</h2>
                            <p className="mt-4 text-lg text-muted-foreground">
                                Platform kami yang didukung AI menyediakan dukungan kesehatan mental komprehensif yang dirancang khusus untuk pelajar.
                            </p>
                        </div>

                        <div className="grid gap-8 md:grid-cols-3">
                            {[
                                { icon: Shield, title: "Deteksi Dini", description: "AI menganalisis tulisan jurnal Anda untuk mengidentifikasi tanda-tanda awal depresi dan perundungan, memberikan dukungan tepat waktu saat Anda paling membutuhkannya." },
                                { icon: Users, title: "Komunitas Suportif", description: "Terhubunglah dengan rekan-rekan yang memahami perjalanan Anda. Berbagi pengalaman dan temukan kekuatan dalam lingkungan yang aman dan dimoderasi." },
                                { icon: BookOpen, title: "Jurnal Terpandu", description: "Panduan dan latihan terstruktur membantu Anda memproses emosi, melacak kemajuan, dan mengembangkan strategi penanganan masalah yang sehat." }
                            ].map((feature, i) => (
                                <Card key={i} className="group relative overflow-hidden rounded-xl border bg-transparent transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                                    <div className="absolute top-0 right-0 h-24 w-24 bg-primary-translucent rounded-bl-full opacity-50 blur-2xl transition-opacity duration-500 group-hover:opacity-100"></div>
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
                            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Kisah Penuh Harapan</h2>
                            <p className="mt-4 text-lg text-muted-foreground">
                                Kisah nyata para pelajar yang berbagi bagaimana SAPA membantu mereka dalam perjalanan kesehatan mental.
                            </p>
                        </div>
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {[
                                { name: "Anya S.", role: "Mahasiswi", avatar: "/images/diverse-student-smiling.png", fallback: "AS", text: "SAPA membantu saya mengenali pola suasana hati yang tidak pernah saya sadari sebelumnya. Panduan jurnalnya sangat mendalam dan dukungan komunitasnya luar biasa." },
                                { name: "Ravi K.", role: "Siswa SMA", avatar: "/images/diverse-male-student-confident.png", fallback: "RK", text: "Saya mengalami perundungan dan tidak tahu bagaimana cara membicarakannya. AI dari SAPA mendeteksi tekanan yang saya alami dan menghubungkan saya dengan sumber daya yang tepat. Saya sangat berterima kasih." },
                                { name: "Maya F.", role: "Mahasiswi", avatar: "/images/diverse-female-student-happy.png", fallback: "MF", text: "Pemeriksaan harian dan pelacakan suasana hati membantu saya memahami kesehatan mental saya dengan lebih baik. SAPA membuat proses mencari bantuan terasa normal dan mudah diakses." }
                            ].map((testimonial) => (
                                <Card key={testimonial.name} className="flex flex-col justify-between rounded-xl bg-card border">
                                    <CardContent className="pt-6">
                                        <div className="flex mb-3">
                                            {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-accent text-accent" />)}
                                        </div>
                                        <p className="text-muted-foreground leading-relaxed italic">"{testimonial.text}"</p>
                                    </CardContent>
                                    <div className="flex items-center p-6 pt-4">
                                        <Avatar className="h-12 w-12 mr-4">
                                            <AvatarImage src={testimonial.avatar} />
                                            <AvatarFallback>{testimonial.fallback}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                                            <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>
                
                {/* --- CTA SECTION --- */}
                <section id="journal" className="border-t py-20 lg:py-24 bg-card">
                    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl text-center">
                             <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Mulai Perjalanan Pemulihan Anda Hari Ini</h2>
                             <p className="mt-4 text-lg text-muted-foreground">
                                Ambil langkah pertama menuju kesehatan mental yang lebih baik. Pikiran Anda berharga, perasaan Anda valid, dan Anda berhak mendapatkan dukungan.
                            </p>
                            <div className="mt-8">
                                <Button size="lg" className="px-8 py-6 text-lg" asChild>
                                    <Link href="/Evaluasi">
                                        Awali dengan Satu Tulisan
                                        <BookOpen className="ml-2 h-5 w-5" />
                                    </Link>
                                </Button>
                                <p className="mt-4 text-sm text-muted-foreground">
                                    Gratis untuk memulai • Tanpa kartu kredit • Privasi terjamin
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
                                <Heart className="h-8 w-8 text-primary" />
                                <span className="text-2xl font-bold">SAPA</span>
                            </div>
                            <p className="text-muted-foreground max-w-md">
                                Mendukung kesehatan mental pelajar melalui deteksi berbasis AI dan kepedulian komunitas. Kesejahteraan Anda adalah prioritas kami.
                            </p>
                        </div>
                        <div>
                             <h4 className="font-semibold text-foreground mb-4">Sumber Daya</h4>
                            <ul className="space-y-2 text-muted-foreground">
                                {["Panduan Kesehatan Mental", "Sumber Daya Krisis", "Panduan Komunitas", "Kebijakan Privasi"].map(item => (
                                    <li key={item}><a href="#" className="hover:text-primary transition-colors">{item}</a></li>
                                ))}
                            </ul>
                        </div>
                         <div>
                             <h4 className="font-semibold text-foreground mb-4">Dukungan</h4>
                            <ul className="space-y-2 text-muted-foreground">
                                 {["Pusat Bantuan", "Hubungi Kami", "Laporkan Masalah", "Umpan Balik"].map(item => (
                                    <li key={item}><a href="#" className="hover:text-primary transition-colors">{item}</a></li>
                                ))}
                            </ul>
                        </div>
                    </div>
                     <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
                        <p>&copy; {new Date().getFullYear()} SAPA (Sahabat Pelajar). Dibuat dengan ❤️ untuk kesehatan mental pelajar.</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}