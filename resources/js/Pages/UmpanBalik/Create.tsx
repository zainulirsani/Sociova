import { useState, useEffect } from "react";
import { Head, useForm } from '@inertiajs/react';
import { PageProps } from '@/types';
import StudentLayout from '@/Layouts/StudentLayout'; // Ganti dengan layout yang sesuai
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card";
import { Textarea } from "@/Components/ui/textarea";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Toaster, toast } from 'sonner';

// --- KOMPONEN UTAMA HALAMAN UMPAN BALIK ---
export default function UmpanBalikCreatePage({ auth, flash }: PageProps<{ flash: { success?: string } }>) {
    const [hoverRating, setHoverRating] = useState(0);

    const { data, setData, post, processing, errors, reset, recentlySuccessful } = useForm({
        rating: 0,
        komentar: "",
    });

    useEffect(() => {
        // Tampilkan notifikasi jika ada pesan sukses dari backend
        if (flash?.success) {
            toast.success("Umpan Balik Terkirim!", {
                description: flash.success,
            });
        }
        // Reset form setelah berhasil
        if (recentlySuccessful) {
            reset();
        }
    }, [flash, recentlySuccessful]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (data.rating === 0) {
            toast.error("Harap berikan rating bintang terlebih dahulu.");
            return;
        }
        post(route('umpan-balik.store'));
    };

    return (
        <StudentLayout user={auth.user}>
            <Head title="Beri Umpan Balik" />
            <Toaster richColors position="top-center" />

            <main className="container mx-auto max-w-2xl px-4 py-10">
                <Card>
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl">Beri Umpan Balik</CardTitle>
                        <CardDescription>
                            Kami sangat menghargai masukan Anda untuk membuat Sociova lebih baik lagi.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Komponen Rating Bintang */}
                            <div className="space-y-2 text-center">
                                <label className="text-sm font-medium">Seberapa puas Anda dengan sistem ini?</label>
                                <div className="flex justify-center gap-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onMouseEnter={() => setHoverRating(star)}
                                            onMouseLeave={() => setHoverRating(0)}
                                            onClick={() => setData('rating', star)}
                                        >
                                            <Star className={cn(
                                                "h-8 w-8 transition-all",
                                                (hoverRating || data.rating) >= star
                                                    ? "text-yellow-400 fill-yellow-400"
                                                    : "text-gray-300"
                                            )} />
                                        </button>
                                    ))}
                                </div>
                                {errors.rating && <p className="text-sm text-destructive mt-1">{errors.rating}</p>}
                            </div>

                            {/* Komponen Komentar */}
                            <div className="space-y-2">
                                <label htmlFor="komentar" className="text-sm font-medium">
                                    Apa yang bisa kami tingkatkan? (Opsional)
                                </label>
                                <Textarea
                                    id="komentar"
                                    value={data.komentar}
                                    onChange={(e) => setData('komentar', e.target.value)}
                                    placeholder="Ceritakan pengalaman atau saran Anda di sini..."
                                    rows={5}
                                />
                                {errors.komentar && <p className="text-sm text-destructive mt-1">{errors.komentar}</p>}
                            </div>

                            {/* Tombol Kirim */}
                            <div className="text-center pt-4">
                                <Button
                                    type="submit"
                                    size="lg"
                                    disabled={processing || data.rating === 0}
                                >
                                    {processing ? "Mengirim..." : "Kirim Umpan Balik"}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </main>
        </StudentLayout>
    );
}