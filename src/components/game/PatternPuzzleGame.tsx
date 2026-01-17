'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragOverlay,
    DragStartEvent,
    DragEndEvent,
    TouchSensor,
    MouseSensor
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    rectSortingStrategy,
    useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Eye, RefreshCw, Trophy, Crown, Sparkles, Timer, Check, X } from 'lucide-react';

// --- Interfaces ---

interface PatternPuzzleGameProps {
    imageUrl: string;
    difficulty: 'easy' | 'medium' | 'hard';
    onComplete: () => void;
}

interface Piece {
    id: string;
    correctIndex: number;
}

// --- Sortable Piece Component ---

interface SortablePieceProps {
    piece: Piece;
    gridSize: number;
    imageUrl: string;
    isGameActive: boolean;
    isCorrectlyPlaced: boolean; // For visual feedback
}

const SortablePiece = ({ piece, gridSize, imageUrl, isGameActive, isCorrectlyPlaced }: SortablePieceProps) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id: piece.id, disabled: !isGameActive });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 50 : 1,
    };

    const row = Math.floor(piece.correctIndex / gridSize);
    const col = piece.correctIndex % gridSize;

    const bgX = (col / (gridSize - 1)) * 100;
    const bgY = (row / (gridSize - 1)) * 100;

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={`relative aspect-square cursor-grab active:cursor-grabbing overflow-hidden rounded-sm bg-slate-200 transition-all duration-300
                ${isDragging ? 'shadow-2xl ring-4 ring-[#F59E0B] z-50 scale-105' : 'hover:scale-[1.02]'}
                ${isCorrectlyPlaced && !isDragging ? 'ring-1 ring-green-400/50' : 'border border-white/20'}
            `}
        >
            <div
                className="w-full h-full pointer-events-none"
                style={{
                    backgroundImage: `url(${imageUrl})`,
                    backgroundPosition: `${bgX}% ${bgY}%`,
                    backgroundSize: `${gridSize * 100}%`,
                }}
            />

            {/* Correct Placement Indicator: Checkmark */}
            {isCorrectlyPlaced && !isDragging && (
                <div className="absolute inset-0 flex items-center justify-center bg-green-500/20 backdrop-blur-[1px]">
                    <Check className="text-white drop-shadow-md w-1/2 h-1/2" strokeWidth={4} />
                </div>
            )}

            {/* Royal Sparkle Effect on Correct Placement */}
            <AnimatePresence>
                {isCorrectlyPlaced && !isDragging && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: [0, 1, 0], scale: [1, 1.5, 1] }}
                        transition={{ duration: 0.8 }}
                        className="absolute top-0 right-0 p-1"
                    >
                        <Sparkles size={12} className="text-[#F59E0B] fill-[#F59E0B]" />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// --- Main Game Component ---

export function PatternPuzzleGame({ imageUrl, difficulty, onComplete }: PatternPuzzleGameProps) {
    const [gridSize, setGridSize] = useState(3);
    const [pieces, setPieces] = useState<Piece[]>([]);
    const [activeId, setActiveId] = useState<string | null>(null);

    // Game State: 'memorize' -> 'playing' -> 'won'
    const [gameState, setGameState] = useState<'memorize' | 'playing' | 'won'>('memorize');
    const [timeLeft, setTimeLeft] = useState(5); // 5 seconds memorization
    const [showGhost, setShowGhost] = useState(false);

    // Initialize Grid
    useEffect(() => {
        const size = difficulty === 'hard' ? 5 : difficulty === 'medium' ? 4 : 3;
        setGridSize(size);
        startMemorizationPhase(size);
    }, [difficulty, imageUrl]);

    // Timer for Memorization Phase
    useEffect(() => {
        if (gameState === 'memorize' && timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
            return () => clearTimeout(timer);
        } else if (gameState === 'memorize' && timeLeft === 0) {
            startGame();
        }
    }, [gameState, timeLeft]);

    const startMemorizationPhase = (size: number) => {
        setGameState('memorize');
        setTimeLeft(3); // 3-second rapid memorization for better flow

        // Create ordered pieces initially so user sees the full image clearly before scramble
        const totalPieces = size * size;
        const orderedPieces: Piece[] = Array.from({ length: totalPieces }, (_, i) => ({
            id: `piece-${i}`,
            correctIndex: i
        }));
        setPieces(orderedPieces);
    };

    const startGame = () => {
        // Scramble
        const totalPieces = gridSize * gridSize;
        const newPieces: Piece[] = Array.from({ length: totalPieces }, (_, i) => ({
            id: `piece-${i}`,
            correctIndex: i
        }));

        let shuffled = [...newPieces].sort(() => Math.random() - 0.5);

        // Ensure not solved initially
        while (shuffled.every((p, i) => p.correctIndex === i)) {
            shuffled = [...newPieces].sort(() => Math.random() - 0.5);
        }

        setPieces(shuffled);
        setGameState('playing');
    };

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
        useSensor(MouseSensor),
        useSensor(TouchSensor),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    const handleDragStart = (event: DragStartEvent) => {
        setActiveId(event.active.id as string);
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        setActiveId(null);

        if (active.id !== over?.id && gameState === 'playing') {
            setPieces((items) => {
                const oldIndex = items.findIndex((p) => p.id === active.id);
                const newIndex = items.findIndex((p) => p.id === over?.id);
                const newItems = arrayMove(items, oldIndex, newIndex);

                checkWin(newItems);
                return newItems;
            });
        }
    };

    const checkWin = (currentPieces: Piece[]) => {
        const win = currentPieces.every((p, i) => p.correctIndex === i);
        if (win) {
            setGameState('won');
            setTimeout(() => {
                onComplete();
            }, 2500);
        }
    };

    // Helper to check if a specific piece is in its correct slot (for visual feedback)
    const isPieceCorrect = (piece: Piece, index: number) => {
        return piece.correctIndex === index;
    };

    return (
        <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto p-4 select-none relative">

            {/* GUIDE POPUP MODAL */}
            <AnimatePresence>
                {showGhost && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-8"
                        onClick={() => setShowGhost(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative bg-white p-2 rounded-lg shadow-2xl max-w-lg w-full aspect-square"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setShowGhost(false)}
                                className="absolute -top-12 right-0 text-white/70 hover:text-white"
                            >
                                <X size={32} />
                                <span className="sr-only">Close</span>
                            </button>

                            <h3 className="absolute -top-10 left-0 text-white font-bold text-xl flex items-center gap-2">
                                <Eye className="text-[#F59E0B]" /> Guide Pattern
                            </h3>

                            <div
                                className="w-full h-full rounded bg-slate-100 bg-cover bg-center border border-slate-200"
                                style={{
                                    backgroundImage: `url(${imageUrl})`
                                }}
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>


            {/* Header / Instructions */}
            <div className="mb-4 text-center">
                <h2 className="text-2xl font-bold text-[#1E3A8A] flex items-center justify-center gap-2 font-serif">
                    <Crown className="text-[#F59E0B]" /> The Royal Loom Puzzle
                </h2>
                <div className="h-6 mt-1 flex justify-center items-center">
                    {gameState === 'memorize' && (
                        <p className="text-[#F59E0B] font-bold animate-pulse flex items-center gap-2">
                            <Timer size={16} /> Memorize the pattern! {timeLeft}s
                        </p>
                    )}
                    {gameState === 'playing' && (
                        <p className="text-slate-500 text-sm">Restore the sacred fabric.</p>
                    )}
                    {gameState === 'won' && (
                        <p className="text-green-600 font-bold flex items-center gap-2">
                            <Sparkles size={16} /> Wisdom Restored!
                        </p>
                    )}
                </div>
            </div>

            {/* Game Board Container */}
            <div className="relative p-6 bg-white rounded-xl shadow-2xl border-2 border-[#1E3A8A]/10">

                {/* Visual Flair: Corner Decorations */}
                <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-[#1E3A8A] rounded-tl-xl -translate-x-2 -translate-y-2 opacity-30" />
                <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-[#1E3A8A] rounded-tr-xl translate-x-2 -translate-y-2 opacity-30" />
                <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-[#1E3A8A] rounded-bl-xl -translate-x-2 translate-y-2 opacity-30" />
                <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-[#1E3A8A] rounded-br-xl translate-x-2 translate-y-2 opacity-30" />

                {/* Main Grid Area */}
                <div className="relative overflow-hidden rounded-lg shadow-inner bg-slate-100 border border-slate-200 mx-auto"
                    style={{
                        width: 'min(90vw, 450px)',
                        height: 'min(90vw, 450px)',
                    }}
                >
                    {/* MEMORIZATION PHASE / FULL IMAGE OVERLAY */}
                    <AnimatePresence>
                        {gameState === 'memorize' && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 z-50 pointer-events-none"
                                style={{
                                    backgroundImage: `url(${imageUrl})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}
                            >
                                <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                                    <h3 className="text-white text-6xl font-black drop-shadow-lg">{timeLeft}</h3>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* VICTORY EFFECT: ROYAL GOLD BURST */}
                    <AnimatePresence>
                        {gameState === 'won' && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 2] }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                className="absolute inset-0 z-[60] flex items-center justify-center pointer-events-none"
                            >
                                <div className="w-full h-full bg-gradient-to-r from-transparent via-[#F59E0B] to-transparent opacity-50 blur-3xl" />
                                <Sparkles className="text-yellow-100 w-32 h-32 absolute drop-shadow-[0_0_30px_rgba(255,215,0,0.8)]" />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* PUZZLE GRID */}
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}
                    >
                        <motion.div
                            layout
                            className="grid w-full h-full z-10 relative"
                            style={{
                                gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                                gridTemplateRows: `repeat(${gridSize}, 1fr)`,
                                gap: gameState === 'won' ? '0px' : '2px',
                            }}
                        >
                            <SortableContext
                                items={pieces.map(p => p.id)}
                                strategy={rectSortingStrategy}
                            >
                                {pieces.map((piece, index) => (
                                    <div key={piece.id} className={gameState === 'won' ? "opacity-0 transition-opacity duration-1000" : ""}>
                                        <SortablePiece
                                            piece={piece}
                                            gridSize={gridSize}
                                            imageUrl={imageUrl}
                                            isGameActive={gameState === 'playing'}
                                            isCorrectlyPlaced={isPieceCorrect(piece, index)}
                                        />
                                    </div>
                                ))}
                            </SortableContext>
                        </motion.div>

                        <DragOverlay>
                            {activeId ? (
                                <div className="w-full h-full shadow-2xl ring-4 ring-[#F59E0B] rounded-sm overflow-hidden z-50">
                                    {(() => {
                                        const piece = pieces.find(p => p.id === activeId);
                                        if (!piece) return null;
                                        const row = Math.floor(piece.correctIndex / gridSize);
                                        const col = piece.correctIndex % gridSize;
                                        const bgX = (col / (gridSize - 1)) * 100;
                                        const bgY = (row / (gridSize - 1)) * 100;
                                        return (
                                            <div
                                                className="w-full h-full"
                                                style={{
                                                    backgroundImage: `url(${imageUrl})`,
                                                    backgroundPosition: `${bgX}% ${bgY}%`,
                                                    backgroundSize: `${gridSize * 100}%`,
                                                }}
                                            />
                                        )
                                    })()}
                                </div>
                            ) : null}
                        </DragOverlay>
                    </DndContext>

                    {/* Full Image Reveal on Win */}
                    {gameState === 'won' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1 }}
                            className="absolute inset-0 z-0 bg-cover bg-center"
                            style={{ backgroundImage: `url(${imageUrl})` }}
                        />
                    )}

                </div>

                {/* Footer / Controls */}
                <div className="mt-6 flex items-center justify-between px-4">
                    <button
                        onClick={() => startMemorizationPhase(gridSize)}
                        className="text-slate-500 hover:text-[#1E3A8A] flex items-center gap-2 text-sm font-semibold transition-colors disabled:opacity-50"
                        disabled={gameState !== 'playing'}
                    >
                        <RefreshCw size={16} /> Reset
                    </button>

                    <button
                        onMouseDown={() => setShowGhost(true)}
                        onMouseUp={() => setShowGhost(false)}
                        onMouseLeave={() => setShowGhost(false)}
                        onTouchStart={() => setShowGhost(true)}
                        onTouchEnd={() => setShowGhost(false)}
                        className="bg-slate-100 hover:bg-blue-50 text-[#1E3A8A] px-5 py-2.5 rounded-full font-bold text-sm flex items-center gap-2 transition-all active:scale-95 border border-blue-100 shadow-sm"
                        disabled={gameState !== 'playing'}
                    >
                        <Eye size={18} /> Hold for Guide
                    </button>

                    <div className="flex items-center gap-2 text-[#F59E0B] font-bold min-w-[100px] justify-end">
                        <Trophy size={18} className={gameState === 'won' ? "animate-bounce" : ""} />
                        <span className={gameState === 'won' ? "text-green-600" : "text-slate-300"}>
                            {gameState === 'won' ? "SOLVED!" : "Solving..."}
                        </span>
                    </div>
                </div>

            </div>
        </div>
    );
}
