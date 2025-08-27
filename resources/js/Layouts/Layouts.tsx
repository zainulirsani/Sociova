// File: resources/js/Layouts/App.tsx

import React, { PropsWithChildren } from 'react';

// CATATAN: Pastikan Anda telah menyalin file `sonner.tsx` dari proyek Next.js
// ke dalam folder `resources/js/Components/ui/`
import { Toaster } from '@/Components/ui/sonner'; 

// CATATAN: Pastikan Anda telah membuat file `theme-provider.tsx` di dalam folder `resources/js/Components/`
// Kode untuk file ini telah saya sediakan di Canvas terpisah.
import { ThemeProvider } from '@/Components/theme-provider';

// Ini adalah komponen layout utama Anda.
// Semua halaman lain akan dirender sebagai 'children' di dalam sini.
export default function AppLayout({ children }: PropsWithChildren) {
    return (
        // ThemeProvider dari shadcn/ui untuk mode gelap/terang
        <ThemeProvider defaultTheme="light" storageKey="sapa-ui-theme">
            <div className="min-h-screen bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-200">
                
                {/* Header atau Navigasi bisa diletakkan di sini */}
                <header className="bg-white dark:bg-gray-800 shadow-sm">
                    <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                        <a href="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                            SAPA
                        </a>
                        <div>
                            {/* Tambahkan link navigasi di sini nanti */}
                        </div>
                    </nav>
                </header>

                {/* 'children' adalah tempat di mana komponen Halaman Anda (misal: Home.tsx) akan ditampilkan */}
                <main>
                    {children}
                </main>
                
                {/* Toaster untuk notifikasi, jika Anda menggunakannya */}
                <Toaster />

                {/* Footer bisa diletakkan di sini */}
                <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                    <div className="container mx-auto px-6 py-4 text-center text-gray-500">
                        <p>&copy; {new Date().getFullYear()} SAPA (Sahabat Pelajar).</p>
                    </div>
                </footer>
            </div>
        </ThemeProvider>
    );
}
