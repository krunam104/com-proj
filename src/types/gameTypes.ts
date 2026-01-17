export interface QuizOption {
    id: string;
    text: string;
}

export interface QuizData {
    id: string; // Province ID
    region: string;
    nameEn: string;
    nameTh: string;
    question: string;
    options: QuizOption[];
    correctOptionId: string;
    royalInsight: {
        title: string;
        description: string;
        imageUrl: string;
    };
}
