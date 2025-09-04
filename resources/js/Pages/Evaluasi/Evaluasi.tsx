import { useEffect, useMemo } from "react";
import { Button } from "@/Components/ui/button"; // Pastikan path ini benar
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card"; // Pastikan path ini benar
import { BookText, Save, ArrowLeft } from "lucide-react";
import { Link, useForm } from '@inertiajs/react';
import { Toaster, toast } from 'sonner';
import SiteHeader from '@/Components/SiteHeader';
import AnimatedTextarea from '@/Components/AnimatedTextarea';

export default function ReflectionPage() {
    const { data, setData, post, processing, errors, recentlySuccessful, reset } = useForm({
        content: '',
    });

    // Menghitung jumlah kata secara efisien dengan useMemo
    const wordCount = useMemo(() => {
        if (!data.content) return 0;
        // Regex untuk menghitung kata dengan lebih akurat
        return data.content.trim().split(/\s+/).filter(Boolean).length;
    }, [data.content]);
    
    useEffect(() => {
        if (recentlySuccessful) {
            reset(); // Mereset form sepenuhnya (termasuk error)
            toast.success("Refleksi Anda berhasil dikirim!", {
                description: "Terima kasih atas kontribusi Anda untuk perbaikan pembelajaran."
            });
        }
    }, [recentlySuccessful]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('submissions.store'), {
            preserveScroll: true,
        });
    }

    return (
        <>
            {/* Toaster untuk notifikasi, diletakkan di root */}
            <Toaster richColors position="top-center" />
            <div className="min-h-screen bg-muted/20 font-sans">
                {/* Header Modern dengan efek sticky */}
                <SiteHeader />

                {/* Konten Utama */}
                <main className="container mx-auto max-w-3xl px-4 py-10">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Judul Halaman */}
                        <div className="space-y-2 text-center">
                            <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                                Bagikan Refleksi Pembelajaran Anda
                            </h1>
                            <p className="mx-auto max-w-2xl text-muted-foreground">
                                Ceritakan pengalaman, pemahaman, atau kesulitan yang Anda hadapi. Refleksi Anda sangat berharga untuk evaluasi dan perbaikan pembelajaran ke depan.
                            </p>
                        </div>

                        {/* Area Input Refleksi */}
                        <Card className="overflow-hidden shadow-sm transition-all hover:shadow-md">
                            {/* <CardHeader>
                                <CardTitle className="text-base font-medium">Sesi Pembelajaran: [Nama Mata Kuliah]</CardTitle>
                            </CardHeader> */}
                            <AnimatedTextarea data={data} setData={setData} />
                        </Card>
                        
                        {/* Informasi Tambahan: Word Count & Error */}
                        <div className="flex items-center justify-between px-2">
                             {errors.content ? (
                                <p className="text-sm text-destructive">{errors.content}</p>
                            ) : (
                                <p className="text-sm text-muted-foreground">
                                    Fokus pada gagasan Anda, biarkan AI yang menganalisis.
                                </p>
                            )}
                            <span className="text-sm font-medium text-muted-foreground">
                                {wordCount} kata
                            </span>
                        </div>

                        {/* Tombol Aksi */}
                        <div className="flex justify-center pt-4">
                            <Button
                                disabled={processing || wordCount < 5} // Contoh: disable jika kurang dari 5 kata
                                size="lg"
                                type="submit"
                                className="w-full max-w-xs rounded-full px-10 py-6 text-base font-semibold shadow-lg transition-transform active:scale-95"
                            >
                                <Save className="mr-2 h-5 w-5" />
                                {processing ? "Mengirim..." : "Kirim Refleksi"}
                            </Button>
                        </div>
                    </form>
                </main>
            </div>
        </>
    )
}