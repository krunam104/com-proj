'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Volume2, VolumeX } from 'lucide-react';
import { SilkItem } from '@/data/museumData';

interface StoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    data: SilkItem | null;
}

export function StoryModal({ isOpen, onClose, data }: StoryModalProps) {
    if (!data) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/60 backdrop-blur-md"
                        onClick={onClose}
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", duration: 0.5 }}
                        className="relative w-full max-w-6xl h-[80vh] bg-slate-900/80 border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-black/20">
                            <div>
                                <h2 className="text-3xl font-serif text-[#F59E0B] drop-shadow-lg">
                                    {data.name}
                                </h2>
                                <p className="text-slate-300 text-sm mt-1">
                                    The Legacy of Isan Silk
                                </p>
                            </div>
                            <button
                                onClick={onClose}
                                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all active:scale-95"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Content Grid */}
                        <div className="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-2">
                            {/* Left: Infographic */}
                            <div className="relative h-full overflow-y-auto custom-scrollbar bg-white/5 p-4 lg:p-8 flex items-center justify-center">
                                <div className="relative w-full shadow-lg rounded-lg overflow-hidden group">
                                    <img
                                        src={data.infographicUrl}
                                        alt={`${data.name} Infographic`}
                                        className="w-full h-auto object-contain transition-transform duration-700 ease-in-out group-hover:scale-[1.02]"
                                    />
                                </div>
                            </div>

                            {/* Right: Video Story */}
                            <div className="relative h-full bg-black flex flex-col">
                                {data.videoUrl && (data.videoUrl.includes('youtube.com') || data.videoUrl.includes('youtu.be')) ? (
                                    <iframe
                                        width="100%"
                                        height="100%"
                                        src={(() => {
                                            const url = data.videoUrl;
                                            const vParam = url.match(/[?&]v=([^&]+)/);
                                            if (vParam) return `https://www.youtube.com/embed/${vParam[1]}?autoplay=1`;
                                            const shortMatch = url.match(/youtu\.be\/([^?&]+)/);
                                            if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}?autoplay=1`;
                                            const embedMatch = url.match(/embed\/([^?&]+)/);
                                            if (embedMatch) return `https://www.youtube.com/embed/${embedMatch[1]}?autoplay=1`;
                                            return url;
                                        })()}
                                        title={data.name}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        className="w-full h-full object-contain"
                                    />
                                ) : (
                                    <video
                                        src={data.videoUrl}
                                        className="w-full h-full object-contain"
                                        controls
                                        autoPlay
                                        playsInline
                                    />
                                )}
                            </div>
                            <div className="p-6 bg-slate-900/90 border-t border-white/10">
                                <h3 className="text-[#F59E0B] font-bold text-lg mb-2 flex items-center gap-2">
                                    <Play size={18} className="fill-current" />
                                    Multimedia Story
                                </h3>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    {data.description || "Explore the rich history and meticulous craftsmanship behind this unique provincial silk pattern. Every thread tells a story of culture, tradition, and artistry passed down through generations."}
                                </p>
                            </div>
                        </div>


                    </motion.div>
                </div >
            )
            }
        </AnimatePresence >
    );
}
