import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/Components/ui/card"
import { Heart, Save, History, ArrowLeft } from "lucide-react"
import { Link, useForm } from '@inertiajs/react';
import { Toaster, toast } from 'sonner'

export default function JournalPage() {
        // --- PERUBAHAN UTAMA: Menggunakan useForm dari Inertia ---
    const { data, setData, post, processing, errors, recentlySuccessful } = useForm({
        content: '', // Ini akan menggantikan 'journalEntry'
    });
    
    // Ini akan mereset form setiap kali berhasil submit
    useEffect(() => {
        if (recentlySuccessful) {
            setData('content', '');
            toast.success("Jurnal Anda berhasil disimpan!");
        }
    }, [recentlySuccessful]);

    // Fungsi handleSave sekarang menjadi lebih simpel
    const handleSave = (e: React.FormEvent) => {
        e.preventDefault(); // Mencegah form submit default
        // 'post' akan mengirim data ke route dengan nama 'submissions.store'
        post(route('submissions.store'), {
            preserveScroll: true, // Agar halaman tidak scroll ke atas setelah submit
        });
    }


    return (
        <div className="min-h-screen bg-background">
            {/* Header Minimalis */}
            <header className="border-b border-border/50 bg-background/95 backdrop-blur">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <Link
                                href="/"
                                className="flex items-center space-x-2 text-muted-foreground transition-colors hover:text-foreground"
                            >
                                <ArrowLeft className="h-5 w-5" />
                                <span className="text-sm">Kembali</span>
                            </Link>
                            <div className="flex items-center space-x-2">
                                <Heart className="h-6 w-6 text-primary" />
                                <span className="text-xl font-semibold text-foreground">Jurnal SAPA</span>
                            </div>
                        </div>
                        <div className="text-sm text-muted-foreground">
                            {new Date().toLocaleDateString("id-ID", { // Diubah ke format Indonesia
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </div>
                    </div>
                </div>
            </header>

            {/* Area Jurnal Utama */}
            <main className="container mx-auto max-w-4xl px-6 py-12">
                {/* --- PERUBAHAN: Membungkus input dengan tag <form> --- */}
                <form onSubmit={handleSave} className="space-y-8">
                    {/* Pesan Selamat Datang */}
                    <div className="space-y-3 text-center">
                        <h1 className="text-2xl font-semibold text-foreground">Ruang Aman Anda</h1>
                        <p className="mx-auto max-w-2xl leading-relaxed text-muted-foreground">
                            Ambil waktu sejenak untuk merefleksikan pikiran dan perasaan Anda. Ini adalah ruang pribadi Anda untuk berekspresi dengan bebas.
                        </p>
                    </div>

                    {/* Kartu Input Jurnal */}
                    <Card className="border-0 bg-card shadow-sm">
                        <div className="p-8">
                            <textarea
                                // --- PERUBAHAN: Menggunakan 'data' dan 'setData' dari useForm ---
                                value={data.content}
                                onChange={(e) => setData('content', e.target.value)}
                                placeholder="Bagaimana perasaanmu hari ini? Apa yang ada di pikiranmu? Tuliskan dengan bebas di sini..."
                                className="w-full min-h-[400px] resize-none border-0 bg-transparent text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-0 text-base leading-relaxed font-sans"
                            />
                        </div>
                    </Card>
                    {/* Menampilkan error validasi dari Laravel jika ada */}
                    {errors.content && <div className="text-center text-red-500 text-sm">{errors.content}</div>}


                    {/* Tombol Aksi */}
                    <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <Button
                            // --- PERUBAHAN: Menggunakan 'processing' dari useForm sebagai ganti 'isSaving' ---
                            disabled={processing || !data.content.trim()}
                            size="lg"
                            type="submit" // Penting untuk form
                            className="px-8 py-3 bg-primary text-primary-foreground font-medium hover:bg-primary/90"
                        >
                            <Save className="mr-2 h-5 w-5" />
                            {processing ? "Menyimpan..." : "Simpan Entri"}
                        </Button>
                        {/* Tombol 'Lihat Riwayat' tidak berubah */}
                    </div>
                </form>
            </main>
        </div>
    )
}