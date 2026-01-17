'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame, GameProvider } from '@/context/GameContext';
import { GAME_DATA, TOTAL_STAMPS, ProvinceData } from '@/data/gameData';
import { fullQuizData } from '@/data/mockQuizData';
import { WisdomQuiz } from '@/components/game/WisdomQuiz';
import { QuizData } from '@/types/gameTypes';
import { PatternPuzzleGame } from '@/components/game/PatternPuzzleGame';
import { PUZZLE_IMAGES } from '@/data/puzzleImages';
import { Crown, Star, Map as MapIcon, Shield, Sparkles, Gamepad2, LockOpen, Lock, X } from 'lucide-react';
import Image from 'next/image';

const DashboardContent = () => {
    const {
        peacockSpirit,
        completedProvinces,
        currentProvinceIndex,
        score,
        completeMission,
        nextStage,
        updateHealth
    } = useGame();
    const [activeQuiz, setActiveQuiz] = useState<QuizData | null>(null);
    const [activeProvince, setActiveProvince] = useState<ProvinceData | null>(null);
    const [isQuizSuccess, setIsQuizSuccess] = useState(false);

    // NEW: Game Mode State
    const [activeMode, setActiveMode] = useState<'journey' | 'puzzle'>('journey');
    const [currentPuzzleImage, setCurrentPuzzleImage] = useState(() => {
        // Safe initial random selection
        if (typeof window !== 'undefined') {
            return PUZZLE_IMAGES[Math.floor(Math.random() * PUZZLE_IMAGES.length)];
        }
        return PUZZLE_IMAGES[0];
    });

    // Queen Animation State
    const [currentQueenImageIndex, setCurrentQueenImageIndex] = useState(0);
    // Background Silk Animation State
    const [currentBackgroundSilkIndex, setCurrentBackgroundSilkIndex] = useState(0);

    useEffect(() => {
        if (peacockSpirit >= 25) {
            // Queen Image Interval (4s)
            const queenInterval = setInterval(() => {
                setCurrentQueenImageIndex((prev) => (prev + 1) % 11);
            }, 4000);

            // Background Silk Interval (8s) - select random or cycle
            const bgInterval = setInterval(() => {
                setCurrentBackgroundSilkIndex((prev) => (prev + 1) % PUZZLE_IMAGES.length);
            }, 8000);

            return () => {
                clearInterval(queenInterval);
                clearInterval(bgInterval);
            };
        }
    }, [peacockSpirit]);

    // ... (Stats calculation code remains same) ...

    const totalStamps = TOTAL_STAMPS;
    const collectedCount = completedProvinces.length;

    let rankTitle = "Apprentice Weaver";
    if (collectedCount >= 5) rankTitle = "Royal Artisan";
    if (collectedCount >= 15) rankTitle = "Master of Silk";
    if (collectedCount >= 20) rankTitle = "The Queen's Weaver";

    const isWeak = peacockSpirit < 50;
    const isMax = peacockSpirit >= 100;

    const handleProvinceClick = (province: ProvinceData, index: number) => {
        // Strict Rule: Only allow clicking the Active province [Current Index]

        if (index === currentProvinceIndex) {
            const quiz = fullQuizData.find(q => q.id === province.id);
            if (quiz) {
                setActiveProvince(province);
                setActiveQuiz(quiz);
                setIsQuizSuccess(false);
            }
        } else if (index < currentProvinceIndex) {
            console.log("Already completed");
        } else {
            console.log("Locked");
        }
    };

    // ... (Quiz handlers remain same) ...
    const handleQuizSuccess = () => {
        if (activeProvince) {
            completeMission(activeProvince.id, 500, activeProvince.rewardId);
            setIsQuizSuccess(true);
        }
    };

    const closeQuizModal = () => {
        if (isQuizSuccess) {
            nextStage();
        }
        setActiveQuiz(null);
        setActiveProvince(null);
        setIsQuizSuccess(false);
    };

    const handleQuizComplete = (isCorrect: boolean) => {
        closeQuizModal();
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 pb-20 relative">
            {/* Top Navigation Bar */}
            <nav className="bg-white shadow-sm sticky top-0 z-40 px-6 py-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="bg-[#1E3A8A] p-2 rounded-lg text-white">
                        <Crown size={24} />
                    </div>
                    <h1 className="text-xl font-bold text-[#1E3A8A] hidden sm:block">The Queen's Weaver</h1>
                </div>

                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                        <Star className="text-[#F59E0B] fill-[#F59E0B]" size={20} />
                        <span className="font-bold text-lg">{score.toLocaleString()}</span>
                    </div>
                    <div className="flex flex-col items-end min-w-[120px]">
                        <div className="flex items-center gap-2 text-sm font-semibold text-gray-600">
                            <span>Peacock Spirit</span>
                            <span className={isWeak ? 'text-slate-500' : 'text-green-600'}>{peacockSpirit}%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full mt-1 overflow-hidden">
                            <motion.div
                                className={`h-full ${isWeak ? 'bg-slate-400' : 'bg-green-500'}`}
                                initial={{ width: 0 }}
                                animate={{ width: `${peacockSpirit}%` }}
                            />
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-6xl mx-auto px-4 py-8 space-y-12">

                {/* Isan Map / Dashboard Hub Header */}
                {/* Isan Map / Dashboard Hub Header */}
                <section className={`relative rounded-3xl p-8 text-white overflow-hidden shadow-2xl min-h-[500px] flex flex-col items-center justify-center text-center transition-all duration-1000
                    ${peacockSpirit >= 25 ? 'bg-black' : 'bg-gradient-to-br from-[#1E3A8A] to-[#0f172a]'}`}>

                    {/* Animated Silk Background (Visible only if Spirit >= 25) */}
                    {peacockSpirit >= 25 && (
                        <div className="absolute inset-0 z-0 opacity-40">
                            <AnimatePresence mode='wait'>
                                <motion.div
                                    key={currentBackgroundSilkIndex}
                                    initial={{ opacity: 0, scale: 1.1 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 3 }}
                                    className="absolute inset-0"
                                >
                                    <Image
                                        src={`/images/silk/${PUZZLE_IMAGES[currentBackgroundSilkIndex]}`}
                                        alt="Silk Pattern"
                                        fill
                                        className="object-cover blur-[1px]" /* Reduced blur */
                                    />
                                </motion.div>
                            </AnimatePresence>
                            <div className="absolute inset-0 bg-black/20" /> {/* Brighter overlay (reduced opacity) */}
                        </div>
                    )}

                    {/* Decorative Background Pattern (Only visible if Spirit < 25) */}
                    {peacockSpirit < 25 && (
                        <div className="absolute inset-0 opacity-10"
                            style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}>
                        </div>
                    )}

                    {/* Golden Peacock / Queen Centerpiece */}
                    <div className="relative z-10 mb-6 cursor-default">
                        <motion.div
                            animate={isMax ? {
                                filter: "drop-shadow(0 0 30px #F59E0B) brightness(1.2)",
                                scale: [1, 1.05, 1],
                            } : isWeak ? {
                                filter: "grayscale(100%) brightness(0.7)",
                            } : {
                                filter: "drop-shadow(0 0 10px rgba(245, 158, 11, 0.4))",
                            }}
                            transition={isMax ? { repeat: Infinity, duration: 2 } : { duration: 0.5 }}
                            className="relative"
                        >
                            {/* Adjusted size: w-48 (12rem) -> w-80 (20rem) for Spirit >= 25, else w-48 */}
                            <div className={`${peacockSpirit >= 25 ? 'w-80 h-80 border-opacity-80' : 'w-48 h-48 border-opacity-30'} rounded-full overflow-hidden flex items-center justify-center bg-white/10 backdrop-blur-sm border-4 border-[#F59E0B] transition-all duration-1000`}>
                                {peacockSpirit >= 25 ? (
                                    <div className="relative w-full h-full">
                                        <AnimatePresence mode='wait'>
                                            <motion.div
                                                key={currentQueenImageIndex}
                                                initial={{ opacity: 0, scale: 1.1 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 1.5 }}
                                                className="absolute inset-0"
                                            >
                                                <Image
                                                    src={`/images/queen/queen${currentQueenImageIndex + 1}.jpg`}
                                                    alt="Royal Wisdom"
                                                    fill
                                                    className="object-cover"
                                                    sizes="(max-width: 768px) 100vw, 400px"
                                                    priority={true}
                                                />
                                            </motion.div>
                                        </AnimatePresence>
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                                    </div>
                                ) : (
                                    <Shield size={100} className="text-[#F59E0B]" />
                                )}
                            </div>
                        </motion.div>

                        <h2 className="text-3xl font-serif font-bold mt-6 text-[#F59E0B] tracking-wide drop-shadow-lg">
                            {peacockSpirit >= 25
                                ? "Mother of Thai Silk"
                                : isWeak ? "The Spirit Awaits" : "The Golden Peacock"}
                        </h2>
                        <p className="text-blue-100 mt-2 max-w-md mx-auto drop-shadow-md text-lg">
                            {peacockSpirit >= 25
                                ? "A Royal Legacy of Artistry"
                                : "Restore the Royal Wisdom, province by province."}
                        </p>
                    </div>

                    {/* Current Rank */}
                    <div className="mt-6 bg-white/10 backdrop-blur-md px-6 py-2 rounded-full border border-white/20 shadow-lg relative z-10">
                        <span className="text-sm uppercase tracking-widest text-[#F59E0B]">Current Rank:</span>
                        <span className="ml-2 font-bold">{rankTitle}</span>
                    </div>
                </section>

                {/* NEW: GAME MODE SELECTOR */}
                <div className="flex justify-center gap-4">
                    <button
                        onClick={() => setActiveMode('journey')}
                        className={`flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg
                            ${activeMode === 'journey'
                                ? 'bg-[#1E3A8A] text-white scale-105 shadow-blue-900/20 ring-2 ring-[#F59E0B]'
                                : 'bg-white text-slate-500 hover:bg-slate-50'}`}
                    >
                        <MapIcon size={24} />
                        The Queen's Weaver
                        {activeMode === 'journey' && <span className="text-xs bg-[#F59E0B] text-white px-2 py-0.5 rounded-full ml-1">PLAYING</span>}
                    </button>

                    <button
                        onClick={() => setActiveMode('puzzle')}
                        className={`flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg
                            ${activeMode === 'puzzle'
                                ? 'bg-[#1E3A8A] text-white scale-105 shadow-blue-900/20 ring-2 ring-[#F59E0B]'
                                : 'bg-white text-slate-500 hover:bg-slate-50'}`}
                    >
                        <Gamepad2 size={24} />
                        Pattern Puzzle
                        {activeMode === 'puzzle' && <span className="text-xs bg-[#F59E0B] text-white px-2 py-0.5 rounded-full ml-1">New!</span>}
                    </button>
                </div>


                {/* CONDITIONAL RENDER: JOURNEY OR PUZZLE */}
                {activeMode === 'journey' ? (
                    /* Stamp Collection Section (Existing) */
                    <section id="mission-grid" className="scroll-mt-24 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-2xl font-bold text-[#1E3A8A] flex items-center gap-2">
                                <MapIcon className="text-[#F59E0B]" />
                                The Journey Path
                            </h3>
                            <div className="text-sm font-semibold text-gray-500">
                                {collectedCount} / {totalStamps} Provinces
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {GAME_DATA.map((province, index) => {
                                // Strict Logic based on Index
                                const isActive = index === currentProvinceIndex;
                                const isCompleted = index < currentProvinceIndex; // Or use completedProvinces.includes(id)
                                const isLocked = index > currentProvinceIndex;

                                return (
                                    <motion.div
                                        key={province.id}
                                        whileHover={isActive ? { scale: 1.05, y: -5 } : {}}
                                        className={`relative aspect-[3/4] rounded-xl border-2 flex flex-col items-center justify-center p-4 text-center transition-all overflow-hidden
                                            ${isActive
                                                ? 'bg-white border-[#F59E0B] ring-4 ring-blue-100 shadow-xl cursor-pointer'
                                                : isCompleted
                                                    ? 'bg-blue-50 border-blue-200 shadow-sm cursor-default'
                                                    : 'bg-slate-100 border-gray-200 opacity-60 cursor-not-allowed grayscale'
                                            }`}
                                        onClick={() => handleProvinceClick(province, index)}
                                    >
                                        {isActive && (
                                            <div className="absolute top-0 right-0 bg-[#F59E0B] text-white text-[10px] uppercase font-bold px-3 py-1 rounded-bl-lg z-20 animate-pulse">
                                                Start Here
                                            </div>
                                        )}

                                        {/* Icon */}
                                        <div className={`w-16 h-16 rounded-full mb-3 flex items-center justify-center relative z-10 transition-colors
                                            ${isActive ? 'bg-blue-100' : isCompleted ? 'bg-green-100' : 'bg-gray-200'}`}>

                                            {isCompleted ? (
                                                <Crown className="text-green-600 w-8 h-8" />
                                            ) : isActive ? (
                                                <LockOpen className="text-[#1E3A8A] w-8 h-8" />
                                            ) : (
                                                <Lock className="text-gray-400 w-6 h-6" />
                                            )}
                                        </div>

                                        <h4 className={`font-bold text-sm z-10 ${isActive ? 'text-[#1E3A8A]' : 'text-gray-600'}`}>
                                            {province.name}
                                        </h4>

                                        <p className="text-xs text-gray-500 line-clamp-2 mt-1 z-10">
                                            {isCompleted
                                                ? 'Mission Complete'
                                                : isActive
                                                    ? 'Current Mission'
                                                    : 'Locked'}
                                        </p>

                                        {isActive && (
                                            <div className="mt-3 bg-[#1E3A8A] text-white text-xs py-1.5 px-4 rounded-full font-bold shadow-md">
                                                Play
                                            </div>
                                        )}
                                    </motion.div>
                                );
                            })}
                        </div>
                    </section>
                ) : (
                    /* Pattern Puzzle Game Section (New) */
                    <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <PatternPuzzleGame
                            imageUrl={`/images/silk/${currentPuzzleImage}`}
                            difficulty="easy" // Default difficulty
                            onComplete={() => {
                                updateHealth(5);
                                alert("Puzzle Solved! +5% Spirit! The Royal Wisdom grows stronger.");
                                const randomImage = PUZZLE_IMAGES[Math.floor(Math.random() * PUZZLE_IMAGES.length)];
                                setCurrentPuzzleImage(randomImage);
                            }}
                        />
                    </section>
                )}

            </main>

            {/* QUIZ MODAL OVERLAY */}
            <AnimatePresence>
                {activeQuiz && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
                    >
                        <div className="relative w-full max-w-3xl">
                            <button
                                onClick={closeQuizModal}
                                className="absolute -top-12 right-0 text-white/50 hover:text-white transition-colors"
                            >
                                <X size={32} />
                            </button>

                            <WisdomQuiz
                                data={activeQuiz}
                                onComplete={handleQuizComplete}
                                onCorrect={handleQuizSuccess}
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};


export default function DashboardPage() {
    return (
        <GameProvider>
            <DashboardContent />
        </GameProvider>
    );
}
