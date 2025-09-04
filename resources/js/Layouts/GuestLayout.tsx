import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';
import { GraduationCap } from 'lucide-react'; // Menambahkan ikon untuk branding

export default function GuestLayout({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen w-full lg:grid lg:grid-cols-2">
            {/* --- Kolom Kiri (Branding) --- */}
            <div className="hidden bg-primary lg:flex lg:flex-col lg:items-center lg:justify-center lg:p-12">
                <div className="text-center text-primary-foreground">
                    <Link href="/" className="inline-block mb-6">
                        {/* Menggunakan komponen ApplicationLogo yang sudah diubah menjadi <img> */}
                        <ApplicationLogo className="h-24 w-auto" />
                    </Link>
                    <h1 className="text-4xl font-bold tracking-tight">
                        Selamat Datang di Sociova
                    </h1>
                    <p className="mt-4 text-lg text-primary-foreground/80 max-w-md mx-auto">
                        Platform evaluasi pembelajaran berbasis AI untuk meningkatkan kualitas perkuliahan.
                    </p>
                </div>
            </div>

            {/* --- Kolom Kanan (Form) --- */}
            <div className="flex items-center justify-center p-6 sm:p-12 bg-background">
                <div className="mx-auto w-full max-w-sm">
                    {/* Logo untuk tampilan mobile */}
                    <div className="lg:hidden text-center mb-8">
                        <Link href="/">
                            <ApplicationLogo className="h-20 w-auto mx-auto" />
                        </Link>
                    </div>
                    
                    {/* Di sini form Login/Register akan ditampilkan */}
                    {children}
                </div>
            </div>
        </div>
    );
}