import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/Components/ui/card';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { Users, MessageSquare, TrendingUp, BookOpen, ChevronDown, Bot, ThumbsUp, Lightbulb, TriangleAlert } from 'lucide-react';
import { useMemo, useState, ReactNode } from 'react';
import type { Submission, SubmissionData, FeedbackPoint } from '@/types/submission';
import { cn } from '@/lib/utils';

// Define props for the Dashboard page
interface DashboardProps extends PageProps {
    submissions: SubmissionData;
}

const SENTIMENT_COLORS = { Positif: '#4CAF50', Netral: '#FFC107', Negatif: '#F44336' };

// Component for displaying individual feedback points
const FeedbackPointCard = ({ type, point }: FeedbackPoint) => {
    const feedbackMeta: Record<typeof type, { icon: ReactNode; title: string; className: string }> = {
        strength: { icon: <ThumbsUp className="h-5 w-5 text-emerald-500" />, title: "Poin Kekuatan", className: "bg-emerald-50 border-emerald-200 dark:bg-emerald-900/50 dark:border-emerald-700" },
        concern: { icon: <TriangleAlert className="h-5 w-5 text-amber-500" />, title: "Potensi Kendala", className: "bg-amber-50 border-amber-200 dark:bg-amber-900/50 dark:border-amber-700" },
        suggestion: { icon: <Lightbulb className="h-5 w-5 text-sky-500" />, title: "Saran & Solusi", className: "bg-sky-50 border-sky-200 dark:bg-sky-900/50 dark:border-sky-700" },
    };
    const meta = feedbackMeta[type];
    return (
        <div className={cn("flex items-start space-x-3 rounded-lg border p-3", meta.className)}>
            <div className="flex-shrink-0 mt-1">{meta.icon}</div>
            <div>
                <h4 className="font-semibold text-sm text-foreground">{meta.title}</h4>
                <p className="text-sm text-muted-foreground">{point}</p>
            </div>
        </div>
    );
};

// --- MAIN DASHBOARD COMPONENT ---
export default function Dashboard({ auth, submissions }: DashboardProps) {
    const [openSubmissionId, setOpenSubmissionId] = useState<number | null>(null);

    const sentimentData = useMemo(() => {
        if (!submissions?.submissions) return [];
        const sentimentCounts = submissions.submissions.reduce((acc, sub) => {
            const score = sub.analysis?.suggested_score ?? 50;
            let sentiment = 'Netral';
            if (score > 70) sentiment = 'Positif';
            else if (score < 40) sentiment = 'Negatif';
            acc[sentiment] = (acc[sentiment] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);
        return Object.entries(sentimentCounts).map(([name, value]) => ({ name, value }));
    }, [submissions.submissions]);
    
    const recentSubmissions = submissions.submissions?.slice(0, 5) || [];

    const handleToggleAnalysis = (id: number) => {
        setOpenSubmissionId(prevId => (prevId === id ? null : id));
    };

    // **THE FIX:** Helper function to safely parse feedback points
    const parseFeedbackPoints = (points: string | FeedbackPoint[]): FeedbackPoint[] => {
        if (Array.isArray(points)) {
            return points; // Already an array, return directly
        }
        if (typeof points === 'string') {
            try {
                const parsed = JSON.parse(points);
                return Array.isArray(parsed) ? parsed : [];
            } catch (error) {
                console.error("Failed to parse feedback_points JSON:", error);
                return []; // Return empty array on parsing error
            }
        }
        return []; // Return empty array if data is not a string or array
    };

    return (
        <AuthenticatedLayout user={auth.user} >
            <Head title="Dashboard Dosen" />

            <div className="flex flex-col gap-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Selamat Datang Kembali, {auth.user.name}!</h1>
                    <p className="text-muted-foreground">
                        Berikut adalah ringkasan aktivitas pembelajaran dari kelas yang Anda ampu.
                    </p>
                </div>
            
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                     <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Mahasiswa Aktif</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{new Set(submissions.submissions.map(s => s.user.id)).size}</div>
                            <p className="text-xs text-muted-foreground">Total mahasiswa yang mengirim refleksi</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Refleksi</CardTitle>
                            <MessageSquare className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{submissions.totalSubmissions}</div>
                            <p className="text-xs text-muted-foreground">Terkumpul dari semua kelas</p>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Tren Sentimen</CardTitle>
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">Analisis AI</div>
                            <p className="text-xs text-muted-foreground">Berdasarkan skor pemahaman</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                    <Card className="lg:col-span-4">
                        <CardHeader>
                            <CardTitle>Refleksi Terbaru</CardTitle>
                            <CardDescription>Klik pada refleksi untuk melihat detail analisis dari AI.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {recentSubmissions.map((submission) => (
                                <div key={submission.id} className="border rounded-lg overflow-hidden transition-all">
                                    <button
                                        onClick={() => handleToggleAnalysis(submission.id)}
                                        className="w-full flex items-start space-x-4 p-4 text-left hover:bg-muted/50 disabled:opacity-70 disabled:cursor-not-allowed"
                                        disabled={!submission.analysis}
                                    >
                                        <div className="flex-shrink-0 pt-1"> <BookOpen className="h-5 w-5 text-muted-foreground" /> </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between">
                                                <p className="text-sm font-medium leading-none">
                                                    {submission.sesiPembelajaran?.kelas?.nama || '-'}
                                                </p>
                                                <p className="text-sm text-muted-foreground">{new Date(submission.created_at).toLocaleDateString('id-ID')}</p>
                                            </div>
                                            <p className="mt-1 text-sm text-muted-foreground italic">"{submission.content}"</p>
                                        </div>
                                        {submission.analysis && <ChevronDown className={cn("h-5 w-5 text-muted-foreground transition-transform flex-shrink-0", openSubmissionId === submission.id && "rotate-180")} />}
                                    </button>
                                    {openSubmissionId === submission.id && submission.analysis && (
                                        <div className="bg-muted/30 p-4 border-t space-y-4">
                                            <div className="grid gap-4 sm:grid-cols-2">
                                                <div className="flex items-start space-x-3">
                                                    <Bot className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                                                    <div>
                                                        <h4 className="font-semibold text-sm">Ringkasan Analisis</h4>
                                                        <p className="text-sm text-muted-foreground">{submission.analysis.summary}</p>
                                                    </div>
                                                </div>
                                                 <div className="flex items-start space-x-3">
                                                    <TrendingUp className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                                                    <div>
                                                        <h4 className="font-semibold text-sm">Skor Kualitas Refleksi</h4>
                                                        <p className="text-2xl font-bold text-primary">{submission.analysis.suggested_score} <span className="text-sm font-normal text-muted-foreground">/ 100</span></p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="space-y-3 pt-4 border-t">
                                                {/* Use the new parsing function before mapping */}
                                                {parseFeedbackPoints(submission.analysis.feedback_points).map((point, index) => (
                                                    <FeedbackPointCard key={index} type={point.type} point={point.point} />
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card className="lg:col-span-3">
                        <CardHeader>
                            <CardTitle>Distribusi Sentimen</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie data={sentimentData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} labelLine={false} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                                        {sentimentData.map((entry) => (
                                            <Cell key={`cell-${entry.name}`} fill={SENTIMENT_COLORS[entry.name as keyof typeof SENTIMENT_COLORS]} />
                                        ))}
                                    </Pie>
                                    <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}/>
                                </PieChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout >
    );
}