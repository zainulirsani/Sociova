// resources/js/Layouts/AuthenticatedLayout.tsx

import { useState, PropsWithChildren, ReactNode } from 'react';
import { User } from '@/types';
import SiteHeader from '@/Components/DashboardHeader';
import Sidebar from '@/Components/Sidebar';
import { cn } from '@/lib/utils';
import DashboardHeader from '@/Components/DashboardHeader';

// Definisikan tipe props secara eksplisit menggunakan interface
interface AuthenticatedLayoutProps extends PropsWithChildren {
    user: User;
    header?: ReactNode;
}

export default function Authenticated({ user, header, children }: AuthenticatedLayoutProps) {
    // State untuk mengelola kondisi sidebar (buka/tutup)
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarCollapsed(prevState => !prevState);
    };

    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <Sidebar isCollapsed={isSidebarCollapsed} />
            <div className={cn(
                "flex flex-col sm:gap-4 sm:py-4 transition-all duration-300",
                isSidebarCollapsed ? "sm:pl-14" : "sm:pl-64"
            )}>
                <DashboardHeader toggleSidebar={toggleSidebar} />
                <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                    {/* * Kita tidak perlu menggunakan prop 'header' secara eksplisit lagi
                      * karena judul halaman bisa langsung diletakkan di dalam konten children,
                      * membuat layout lebih fleksibel.
                    */}
                    {children}
                </main>
            </div>
        </div>
    );
}