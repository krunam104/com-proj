import { fullQuizData } from './mockQuizData';
import { QuizData } from '@/types/gameTypes';

export interface Mission {
    type: 'QUIZ' | 'PUZZLE' | 'WEAVING';
    title: string;
    description: string;
}

export interface QuizQuestion {
    id: string;
    question: string;
    options: string[];
    correctAnswer: number;
    fact: string;
}

export interface ProvinceData {
    id: string;
    name: string;
    thaiName: string;
    mission: Mission;
    rewardId: string;
    rewardName: string;
    coordinates: { x: number; y: number };
    quizData?: QuizData[];
    puzzleImage?: string;
}

// Define the strict order of provinces
const ORDERED_PROVINCE_IDS = [
    'kalasin', 'khon_kaen', 'maha_sarakham', 'roi_et', 'chaiyaphum',
    'nakhon_ratchasima', 'buriram', 'surin', 'si_sa_ket', 'ubon_ratchathani',
    'yasothon', 'amnat_charoen', 'udon_thani', 'nong_khai', 'sakon_nakhon',
    'nakhon_phanom', 'loei', 'nong_bua_lam_phu', 'mukdahan', 'bueng_kan'
];

// Generate GAME_DATA based on strict order
export const GAME_DATA: ProvinceData[] = ORDERED_PROVINCE_IDS.map((id, index) => {
    const quiz = fullQuizData.find(q => q.id === id);
    if (!quiz) {
        // Fallback for typesafety, though we expect all to exist
        return {
            id,
            name: id,
            thaiName: '',
            mission: { type: 'QUIZ', title: 'Unknown', description: '' },
            rewardId: `stamp_${id}`,
            rewardName: 'Stamp',
            coordinates: { x: 0, y: 0 }
        };
    }

    return {
        id: quiz.id,
        name: quiz.nameEn,
        thaiName: quiz.nameTh,
        mission: {
            type: 'QUIZ',
            title: `Wisdom of ${quiz.nameEn}`,
            description: `Uncover the secrets of ${quiz.nameEn}'s silk weaving.`
        },
        rewardId: `stamp_${quiz.id}`, // Strictly using stamp_ID for clarity
        rewardName: `${quiz.nameEn} Stamp`,
        coordinates: { x: 0, y: 0 },
        quizData: [quiz] // Attach quiz data directly for easier access
    };
});

export const TOTAL_STAMPS = GAME_DATA.length;
export const MAX_CHALLENGES = 3;
