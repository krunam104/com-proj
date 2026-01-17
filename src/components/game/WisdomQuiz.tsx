'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Sparkles, HelpCircle, ArrowRight } from 'lucide-react';

import { QuizData, QuizOption } from '@/types/gameTypes';

interface WisdomQuizProps {
    data: QuizData;
    onComplete: (isCorrect: boolean) => void;
    onCorrect?: () => void;
}

export function WisdomQuiz({ data, onComplete, onCorrect }: WisdomQuizProps) {

    const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showInsight, setShowInsight] = useState(false);

    const handleOptionSelect = (id: string) => {
        if (isSubmitted) return;
        setSelectedOptionId(id);
    };

    const handleSubmit = () => {
        if (!selectedOptionId || isSubmitted) return;

        setIsSubmitted(true);
        const isCorrect = selectedOptionId === data.correctOptionId;

        if (isCorrect) {
            // Trigger score/spirit update immediately
            if (onCorrect) onCorrect();

            setTimeout(() => {
                setShowInsight(true);
            }, 1000);
        } else {
            // Allow retry or finish with failure after a delay
            setTimeout(() => {
                onComplete(false);
            }, 2000);
        }
    };

    const handleNext = () => {
        onComplete(true);
    };

    const isCorrect = selectedOptionId === data.correctOptionId;

    return (
        <div className="w-full max-w-2xl mx-auto p-1">
            <AnimatePresence mode="wait">
                {!showInsight ? (
                    <motion.div
                        key="quiz-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-white rounded-3xl shadow-xl overflow-hidden border-2 border-[#1E3A8A]/10"
                    >
                        {/* Header */}
                        <div className="bg-[#1E3A8A] p-6 text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <Sparkles size={64} />
                            </div>
                            <h2 className="text-xl font-bold font-serif flex items-center gap-2">
                                <HelpCircle className="text-[#F59E0B]" />
                                Royal Wisdom Challenge
                            </h2>
                            <div className="h-1 w-24 bg-[#F59E0B] mt-4 rounded-full" />
                        </div>

                        {/* Question */}
                        <div className="p-8">
                            <h3 className="text-2xl font-bold text-slate-800 mb-8 leading-relaxed">
                                {data.question}
                            </h3>

                            <div className="space-y-4">
                                {data.options.map((option) => {
                                    const isSelected = selectedOptionId === option.id;
                                    const showCorrect = isSubmitted && option.id === data.correctOptionId;
                                    const showWrong = isSubmitted && isSelected && option.id !== data.correctOptionId;

                                    return (
                                        <motion.button
                                            key={option.id}
                                            whileHover={!isSubmitted ? { scale: 1.02 } : {}}
                                            whileTap={!isSubmitted ? { scale: 0.98 } : {}}
                                            onClick={() => handleOptionSelect(option.id)}
                                            className={`w-full p-5 rounded-xl text-left border-2 transition-all flex items-center justify-between group
                                                ${isSelected
                                                    ? 'border-[#1E3A8A] bg-blue-50 shadow-md'
                                                    : 'border-slate-200 hover:border-blue-200 hover:bg-slate-50'
                                                }
                                                ${showCorrect ? '!border-green-500 !bg-green-50' : ''}
                                                ${showWrong ? '!border-red-500 !bg-red-50' : ''}
                                            `}
                                        >
                                            <span className={`text-lg font-semibold ${isSelected ? 'text-[#1E3A8A]' : 'text-slate-600'}`}>
                                                {option.text}
                                            </span>

                                            {/* Status Icons */}
                                            {showCorrect && <CheckCircle2 className="text-green-500" size={24} />}
                                            {showWrong && <XCircle className="text-red-500" size={24} />}
                                            {!isSubmitted && isSelected && <motion.div layoutId="selection-dot" className="w-4 h-4 rounded-full bg-[#1E3A8A]" />}
                                        </motion.button>
                                    );
                                })}
                            </div>

                            {/* Action Area */}
                            <div className="mt-8 flex justify-end">
                                <button
                                    onClick={handleSubmit}
                                    disabled={!selectedOptionId || isSubmitted}
                                    className={`
                                        px-8 py-3 rounded-full font-bold text-lg transition-all shadow-lg
                                        ${!selectedOptionId
                                            ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                                            : isSubmitted
                                                ? 'bg-slate-100 text-slate-400'
                                                : 'bg-[#F59E0B] text-white hover:bg-amber-600 hover:scale-105'
                                        }
                                    `}
                                >
                                    {isSubmitted ? 'Processing...' : 'Submit Answer'}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="insight-card"
                        initial={{ opacity: 0, rotateY: 90 }}
                        animate={{ opacity: 1, rotateY: 0 }}
                        transition={{ duration: 0.6, type: "spring" }}
                        className="bg-gradient-to-br from-[#1E3A8A] to-[#0f172a] rounded-3xl shadow-2xl overflow-hidden text-white relative"
                    >
                        {/* Background Decor */}
                        <div className="absolute inset-0 opacity-20"
                            style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #F59E0B 1px, transparent 0)', backgroundSize: '30px 30px' }}
                        />

                        <div className="p-8 text-center flex flex-col items-center">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.3, type: "spring" }}
                                className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mb-6 border-2 border-[#F59E0B]"
                            >
                                <Sparkles className="text-[#F59E0B] w-12 h-12" />
                            </motion.div>

                            <h2 className="text-[#F59E0B] text-sm uppercase tracking-[0.2em] font-bold mb-2">Royal Insight Unlocked</h2>
                            <h3 className="text-3xl font-serif font-bold mb-6">{data.royalInsight.title}</h3>

                            <p className="text-blue-100 leading-relaxed text-lg mb-8 max-w-md">
                                {data.royalInsight.description}
                            </p>

                            <button
                                onClick={handleNext}
                                className="bg-[#F59E0B] hover:bg-amber-600 text-white px-10 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-[#F59E0B]/50 transition-all flex items-center gap-2 group"
                            >
                                Continue Journey
                                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
