// resources/js/Layouts/StudentLayout.tsx

import { PropsWithChildren, ReactNode } from 'react';
import { PageProps } from '@/types';
import SiteHeader from '@/Components/SiteHeader'; // Layout ini memanggil SiteHeader

interface StudentLayoutProps extends PropsWithChildren {
    user: PageProps['auth']['user'];
    header?: ReactNode;
}

export default function StudentLayout({ user, header, children }: StudentLayoutProps) {
    return (
        <div className="min-h-screen w-full flex flex-col bg-muted/40">
            {/* Navbar khusus untuk mahasiswa */}
            <SiteHeader />

            {/* Konten Utama Halaman Mahasiswa */}
            <main className="flex-1 py-8">
                <div className="container mx-auto max-w-4xl">
                    {children}
                </div>
            </main>
        </div>
    );
}