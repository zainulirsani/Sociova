// resources/js/Components/SiteHeader.tsx

import { Link, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Button } from "@/Components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/Components/ui/dropdown-menu';
import { GraduationCap, CircleUser } from 'lucide-react';

// Hapus 'export interface User' dari sini, karena sudah ada secara global di 'resources/js/types/index.d.ts'

export default function SiteHeader() {
    // auth.user akan otomatis memiliki tipe yang benar dari PageProps
    const { auth } = usePage<PageProps>().props;

    // Fungsi untuk menentukan route dashboard berdasarkan role
    const getDashboardRoute = () => {
        if (!auth.user) {
            return '/';
        }
        return auth.user.role === 'dosen' ? route('dosen.dashboardDosen') : route('mahasiswa.dashboard');
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <Link href="/" className="flex items-center space-x-3">
                    <GraduationCap className="h-8 w-8 text-primary" />
                    <span className="text-2xl font-bold">SOCIOVA</span>
                </Link>

                <nav className="flex items-center space-x-4">
                    {auth.user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="secondary"
                                    className="flex items-center space-x-2 rounded-full px-4 py-2 h-10"
                                >
                                    <CircleUser className="h-5 w-5" />
                                    <span className="hidden sm:inline">
                                        {auth.user.name}
                                    </span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                                <DropdownMenuLabel>Akun Saya</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link href={getDashboardRoute()}>Dashboard</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href={route('profile.edit')}>Profil</Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link
                                        href={route('logout')}
                                        method="post"
                                        as="button"
                                        className="w-full text-left"
                                    >
                                        Logout
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <div className="flex items-center space-x-2">
                            <Button variant="ghost" asChild>
                                <Link href={route('login')}>Masuk</Link>
                            </Button>
                            <Button asChild>
                                <Link href={route('register')}>Daftar</Link>
                            </Button>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    );
}