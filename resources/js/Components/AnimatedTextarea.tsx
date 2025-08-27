// resources/js/Components/AnimatedTextarea.tsx

import { useState, useEffect } from 'react';
import { CardContent } from "@/Components/ui/card";

// 1. Definisikan interface untuk tipe props komponen
interface AnimatedTextareaProps {
    data: {
        content: string;
    };
    setData: (key: 'content', value: string) => void;
}

// Komponen Textarea dengan Animasi Placeholder
const AnimatedTextarea = ({ data, setData }: AnimatedTextareaProps) => { // 2. Terapkan interface di sini
    const placeholderTexts = [
        "Ceritakan tentang sesi pembelajaran hari ini...",
        "Apa yang paling menarik?",
        "Materi apa yang masih membingungkan?",
        "Bagaimana pengalaman belajar Anda secara keseluruhan?",
    ];

    const [placeholder, setPlaceholder] = useState('');
    const [textIndex, setTextIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);

    useEffect(() => {
        const currentText = placeholderTexts[textIndex];
        const timeout = setTimeout(() => {
            if (charIndex < currentText.length) {
                setPlaceholder(prev => prev + currentText[charIndex]);
                setCharIndex(charIndex + 1);
            } else {
                setTimeout(() => {
                    setCharIndex(0);
                    setPlaceholder('');
                    setTextIndex((prevIndex) => (prevIndex + 1) % placeholderTexts.length);
                }, 1000);
            }
        }, 100);

        return () => clearTimeout(timeout);
    }, [charIndex, textIndex]);

    return (
        <CardContent>
            <textarea
                value={data.content}
                onChange={(e) => setData('content', e.target.value)}
                placeholder={placeholder}
                className="w-full min-h-[450px] resize-none border-0 bg-transparent p-1 text-base leading-relaxed text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-0"
                autoFocus
            />
        </CardContent>
    );
}

export default AnimatedTextarea;