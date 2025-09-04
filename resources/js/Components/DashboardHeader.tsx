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
import { Sheet, SheetContent, SheetTrigger } from '@/Components/ui/sheet';
import { CircleUser, Menu, GraduationCap, LayoutDashboard, Users, Bot } from 'lucide-react';

// Definisikan props untuk menerima fungsi toggle
interface SiteHeaderProps {
    toggleSidebar: () => void;
}

export default function SiteHeader({ toggleSidebar }: SiteHeaderProps) {
    const { auth } = usePage<PageProps>().props;

    return (
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            {/* Tombol Buka/Tutup Sidebar untuk Desktop */}
            <Button size="icon" variant="outline" className="hidden sm:flex" onClick={toggleSidebar}>
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Sidebar</span>
            </Button>

            {/* Tombol Buka Sidebar untuk Mobile */}
            <Sheet>
                <SheetTrigger asChild>
                    <Button size="icon" variant="outline" className="sm:hidden">
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle Menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="sm:max-w-xs">
                    <nav className="grid gap-6 text-lg font-medium">
                        <Link
                            href="#"
                            className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                        >
                            <Bot className="h-5 w-5 transition-all group-hover:scale-110" />
                            <span className="sr-only">Sociova</span>
                        </Link>
                        <Link href={route('dosen.dashboardDosen')} className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
                            <LayoutDashboard className="h-5 w-5" />
                            Dashboard
                        </Link>
                        <Link href="#" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
                            <GraduationCap className="h-5 w-5" />
                            Manajemen Kelas
                        </Link>
                        <Link href="#" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
                            <Users className="h-5 w-5" />
                            Data Mahasiswa
                        </Link>
                    </nav>
                </SheetContent>
            </Sheet>

            <div className="relative ml-auto flex-1 md:grow-0">
                {/* Bagian ini bisa untuk search bar nanti */}
            </div>

            {/* Dropdown User Profile */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon" className="overflow-hidden rounded-full">
                        <CircleUser className="h-6 w-6" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>{auth.user.name}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild><Link href={route('profile.edit')}>Profil</Link></DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                        <Link href={route('logout')} method="post" as="button" className="w-full text-left">
                            Logout
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </header>
    );
}