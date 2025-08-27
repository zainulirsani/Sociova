// resources/js/Components/SiteHeader.tsx

import { Link, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/Components/ui/dropdown-menu';
import { GraduationCap, CircleUser } from 'lucide-react';

export default function SiteHeader() {
    const { auth } = usePage<PageProps>().props;

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <Link href="/" className="flex items-center space-x-3">
                    <GraduationCap className="h-8 w-8 text-primary" />
                    <span className="text-2xl font-bold">SOCIOVA</span>
                </Link>

                <nav className="flex items-center space-x-4">
                    {auth.user ? (
                        // Tampilan JIKA SUDAH LOGIN
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="secondary"
                                    className="relative h-10 w-10 rounded-full sm:w-auto sm:px-4 sm:py-2"
                                >
                                    <CircleUser className="h-5 w-5" />
                                    <span className="hidden sm:ml-2 sm:inline">
                                        {auth.user.name}
                                    </span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="end" forceMount>
                                <DropdownMenuLabel className="font-normal">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium leading-none">{auth.user.name}</p>
                                        <p className="text-xs leading-none text-muted-foreground">
                                            {auth.user.email}
                                        </p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link href={route('dashboard')}>Dashboard</Link>
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
                        // Tampilan JIKA BELUM LOGIN
                        <div className="hidden items-center space-x-2 md:flex">
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