'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2, Timer, Trophy, RefreshCcw } from 'lucide-react';

const PATTERNS = [
    { id: 'praewa', name: 'Praewa', color: 'bg-red-500' },
    { id: 'mudmee', name: 'Mudmee', color: 'bg-amber-500' },
    { id: 'khid', name: 'Khid', color: 'bg-blue-500' },
    { id: 'indigo', name: 'Indigo', color: 'bg-indigo-600' },
];

export function LostWisdomGame() {
    const [gameState, setGameState] = useState<'start' | 'playing' | 'gameover'>('start');
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [grid, setGrid] = useState<any[]>([]);
    const [target, setTarget] = useState<any>(null);

    useEffect(() => {
        if (gameState === 'playing') {
            const timer = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        setGameState('gameover');
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [gameState]);

    const startGame = () => {
        setScore(0);
        setTimeLeft(30);
        setGameState('playing');
        generateLevel();
    };

    const generateLevel = () => {
        const newTarget = PATTERNS[Math.floor(Math.random() * PATTERNS.length)];
        setTarget(newTarget);

        // Generate 9 tiles
        const tiles = Array(9).fill(null).map((_, i) => {
            // Ensure at least one target exists
            if (i === 4) return newTarget;
            return PATTERNS[Math.floor(Math.random() * PATTERNS.length)];
        });

        // Shuffle
        setGrid(tiles.sort(() => Math.random() - 0.5));
    };

    const handleTileClick = (pattern: any) => {
        if (gameState !== 'playing') return;

        if (pattern.id === target.id) {
            setScore(s => s + 10);
            generateLevel();
        } else {
            setScore(s => Math.max(0, s - 5));
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto p-8 rounded-3xl bg-slate-900/50 border border-white/10 backdrop-blur-md shadow-2xl">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                    <Trophy className="text-amber-400" />
                    <span className="text-2xl font-bold font-serif text-white">{score}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Timer className={timeLeft < 10 ? 'text-red-500' : 'text-slate-400'} />
                    <span className="text-xl font-mono text-white">{timeLeft}s</span>
                </div>
            </div>

            <div className="relative aspect-square bg-slate-950 rounded-2xl overflow-hidden p-4">
                {gameState === 'start' && (
                    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm">
                        <Gamepad2 size={64} className="text-amber-500 mb-4" />
                        <h2 className="text-3xl font-bold text-white mb-2">Lost Wisdom</h2>
                        <p className="text-slate-400 mb-6 text-center max-w-xs">Find the requested pattern before time runs out!</p>
                        <button
                            onClick={startGame}
                            className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-bold transition-all"
                        >
                            Start Game
                        </button>
                    </div>
                )}

                {gameState === 'gameover' && (
                    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm">
                        <Trophy size={64} className="text-amber-500 mb-4" />
                        <h2 className="text-3xl font-bold text-white mb-2">Time's Up!</h2>
                        <p className="text-slate-400 mb-6 text-xl">Final Score: <span className="text-white font-bold">{score}</span></p>
                        <button
                            onClick={startGame}
                            className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-bold transition-all flex items-center gap-2"
                        >
                            <RefreshCcw size={18} /> Play Again
                        </button>
                    </div>
                )}

                <div className="h-full flex flex-col">
                    {gameState === 'playing' && (
                        <div className="text-center mb-4">
                            <span className="text-slate-400 text-sm uppercase tracking-widest">Find Pattern:</span>
                            <div className={`mt-2 inline-block px-4 py-1 rounded-full ${target.color} text-white font-bold`}>
                                {target.name}
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-3 gap-3 flex-1">
                        {grid.map((tile, idx) => (
                            <motion.button
                                key={idx}
                                whileHover={{ scale: 0.95 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleTileClick(tile)}
                                className={`rounded-xl ${tile?.color} flex items-center justify-center shadow-lg border-2 border-white/5`}
                            >
                                <div className="w-8 h-8 rounded-full bg-white/20" />
                            </motion.button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
