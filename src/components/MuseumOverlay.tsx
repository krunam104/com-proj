'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Volume2, Info } from 'lucide-react';

interface MuseumOverlayProps {
    isOpen: boolean;
    onClose: () => void;
    data: {
        name: string;
        description: string;
        textureUrl?: string; // Optional if we want to show a thumb
    } | null;
}

export default function MuseumOverlay({ isOpen, onClose, data }: MuseumOverlayProps) {
    if (!data) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="absolute inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                    {/* Darkened Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm pointer-events-auto"
                    />

                    {/* Glassmorphism Card */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 50 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 30 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-2xl bg-slate-900/60 border border-white/20 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden pointer-events-auto"
                    >
                        {/* Decorative Glows */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#F4C430]/10 rounded-full filter blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#22D3EE]/10 rounded-full filter blur-3xl pointer-events-none translate-y-1/2 -translate-x-1/2" />

                        <div className="p-8 md:p-10 relative z-10">
                            {/* Header */}
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#F4C430] mb-2 drop-shadow-lg">
                                        {data.name}
                                    </h2>
                                    <div className="h-1 w-24 bg-gradient-to-r from-[#22D3EE] to-transparent rounded-full" />
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-colors"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="space-y-6">
                                <p className="text-lg text-slate-200 leading-relaxed font-light">
                                    {data.description}
                                </p>

                                {/* Action Buttons */}
                                <div className="flex flex-wrap gap-4 pt-4">
                                    <button className="flex items-center gap-2 px-6 py-3 bg-[#F4C430] hover:bg-[#FDE047] text-slate-900 rounded-full font-bold transition-transform transform active:scale-95 shadow-lg shadow-[#F4C430]/20">
                                        <Volume2 size={20} />
                                        <span>Listen to Grandma</span>
                                    </button>

                                    <button className="flex items-center gap-2 px-6 py-3 border border-white/20 hover:bg-white/10 text-white rounded-full font-medium transition-colors">
                                        <Info size={20} />
                                        <span>More Details</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
