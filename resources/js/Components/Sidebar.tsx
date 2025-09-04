// resources/js/Components/Sidebar.tsx

import { Link, usePage } from '@inertiajs/react';
import { LayoutDashboard, GraduationCap, Users, Bot } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/Components/ui/tooltip';

// Definisikan tipe untuk setiap item menu
interface NavItem {
    href: string;
    icon: React.ElementType;
    label: string;
}

// Komponen Sidebar utama
export default function Sidebar({ isCollapsed }: { isCollapsed: boolean }) {
    // Daftar menu untuk navigasi
    const navItems: NavItem[] = [
        { href: route('dosen.dashboardDosen'), icon: LayoutDashboard, label: 'Dashboard' },
        { href: route('dosen.kelas'), icon: GraduationCap, label: 'Manajemen Kelas' },
        { href: '#', icon: Users, label: 'Data Mahasiswa' },
    ];

    return (
        <aside className={cn(
            "fixed inset-y-0 left-0 z-10 hidden flex-col border-r bg-background sm:flex transition-all duration-300",
            isCollapsed ? "w-20" : "w-64"
        )}>
            <nav className="flex flex-col gap-4 px-2 sm:py-4">
                <Link
                    href="/"
                    className={cn(
                        "flex items-center justify-center gap-2 rounded-lg text-lg font-semibold text-primary-foreground mb-4 w-full",
                        isCollapsed ? "h-12 bg-primary" : "h-12 bg-transparent text-primary"
                    )}
                >
                    <Bot className={cn("h-6 w-6 transition-all")} />
                    <span className={cn(
                        "transition-all duration-200", 
                        isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"
                    )}>
                        SOCIOVA
                    </span>
                </Link>

                {/* Render menu */}
                {navItems.map((item) => {
                    const isActive = usePage().url.startsWith(item.href);
                    return (
                        <TooltipProvider key={item.label} delayDuration={0}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Link
                                        href={item.href}
                                        className={cn(
                                            "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                                            isActive && "bg-muted text-primary",
                                            // --- PERBAIKAN UTAMA DI SINI ---
                                            // Saat collapsed, pastikan link menjadi kotak dan kontennya di tengah
                                            isCollapsed && "h-12 w-12 justify-center" 
                                        )}
                                    >
                                        <item.icon className="h-5 w-5" />
                                        <span className={cn(
                                            "truncate transition-opacity", 
                                            isCollapsed ? "opacity-0 w-0" : "opacity-100 w-auto"
                                        )}>
                                            {item.label}
                                        </span>
                                    </Link>
                                </TooltipTrigger>
                                {isCollapsed && (
                                    <TooltipContent side="right">{item.label}</TooltipContent>
                                )}
                            </Tooltip>
                        </TooltipProvider>
                    );
                })}
            </nav>
        </aside>
    );
}