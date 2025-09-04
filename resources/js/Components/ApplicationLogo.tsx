import { ImgHTMLAttributes } from 'react';

// Komponen sekarang menerima properti standar untuk tag <img>
export default function ApplicationLogo(props: ImgHTMLAttributes<HTMLImageElement>) {
    return (
        <img
            {...props}
            // Arahkan 'src' ke file logo Anda di dalam folder 'public'
            src="/images/unram.svg" // Ganti 'logo.png' jika nama file Anda berbeda
            alt="Sociova Logo"
        />
    );
}