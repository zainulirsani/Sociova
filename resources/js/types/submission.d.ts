// resources/js/types/submission.d.ts

// Definisikan tipe untuk satu feedback point
export interface FeedbackPoint {
    type: 'strength' | 'concern' | 'suggestion';
    point: string;
}

// Perbarui interface Analysis untuk menyertakan feedback_points
export interface Submission {
    id: number;
    content: string;
    created_at: string;
    user: {
        id: number;
        name: string;
        kelas: string;
    };
    sesiPembelajaran: {
        id: number;
        kelas: {
            id: number;
            nama: string; // Nama kelas utama
        };
    };
    analysis: {
        id: number;
        summary: string;
        suggested_score: number;
        feedback_points: FeedbackPoint[]; // <-- TAMBAHKAN BARIS INI
    } | null;
}

// Tipe untuk data yang dikirim ke props 'submissions'
export interface SubmissionData {
    totalSubmissions: number;
    submissions: Submission[];
}