'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { provinces } from '@/data/provinces';
import { useRouter } from 'next/navigation';
import { MapPin } from 'lucide-react';

export function IsaanMap() {
    const router = useRouter();
    const [hoveredProvince, setHoveredProvince] = useState<string | null>(null);

    // Helper to connect provinces for visual effect (simple proximity - could be enhanced)
    // This is a stylistic choice to show connections
    const connections = [
        ['khon-kaen', 'kalasin'],
        ['kalasin', 'roi-et'],
        ['roi-et', 'maha-sarakham'],
        ['maha-sarakham', 'khon-kaen'],
        ['udon-thani', 'khon-kaen'],
        ['nong-khai', 'udon-thani'],
        ['nakhon-ratchasima', 'chaiyaphum'],
        ['buriram', 'surin'],
        ['surin', 'sisaket'],
        ['sisaket', 'ubon-ratchathani'],
    ];

    const getProvince = (id: string) => provinces.find(p => p.id === id);

    return (
        <div className="relative w-full max-w-4xl mx-auto aspect-[4/3] bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            {/* Background Decor */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
            </div>

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-[12rem] font-bold text-white/5 tracking-tighter select-none">
                    ISAAN
                </span>
            </div>

            {/* Connectivity Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {connections.map(([start, end], idx) => {
                    const p1 = getProvince(start);
                    const p2 = getProvince(end);
                    if (!p1 || !p2) return null;
                    return (
                        <motion.line
                            key={idx}
                            x1={`${p1.coordinates.x}%`}
                            y1={`${p1.coordinates.y}%`}
                            x2={`${p2.coordinates.x}%`}
                            y2={`${p2.coordinates.y}%`}
                            stroke="rgba(255,255,255,0.1)"
                            strokeWidth="2"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1.5, delay: 0.5 }}
                        />
                    );
                })}
            </svg>

            {/* Province Nodes */}
            {provinces.map((province) => (
                <motion.div
                    key={province.id}
                    className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
                    style={{
                        left: `${province.coordinates.x}%`,
                        top: `${province.coordinates.y}%`
                    }}
                    onClick={() => router.push(`/province/${province.id}`)}
                    onHoverStart={() => setHoveredProvince(province.id)}
                    onHoverEnd={() => setHoveredProvince(null)}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20, delay: Math.random() * 0.5 }}
                    whileHover={{ scale: 1.2, zIndex: 20 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <div className={`
              relative flex items-center justify-center w-6 h-6 rounded-full 
              ${hoveredProvince === province.id ? 'bg-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.5)]' : 'bg-white/20 hover:bg-white/40'}
              transition-colors duration-300
            `}>
                        <div className="w-2 h-2 bg-white rounded-full" />

                        {/* Label */}
                        <motion.div
                            className="absolute top-8 left-1/2 -translate-x-1/2 whitespace-nowrap"
                            animate={{
                                opacity: hoveredProvince === province.id ? 1 : 0.6,
                                y: hoveredProvince === province.id ? 0 : 0
                            }}
                        >
                            <div className="flex flex-col items-center">
                                <span className={`text-xs font-medium tracking-wide ${hoveredProvince === province.id ? 'text-amber-400' : 'text-white/60'}`}>
                                    {province.name}
                                </span>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            ))}

            {/* Info Card Overlay */}
            <AnimatePresence>
                {hoveredProvince && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="absolute top-8 right-8 w-64 bg-black/60 backdrop-blur-md border border-white/10 p-4 rounded-xl shadow-xl z-30"
                    >
                        {(() => {
                            const p = getProvince(hoveredProvince);
                            if (!p) return null;
                            return (
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-1">{p.name}</h3>
                                    <p className="text-amber-400 text-sm mb-2">{p.thaiName}</p>
                                    <div className="h-px w-full bg-white/10 my-2" />
                                    <p className="text-white/80 text-xs leading-relaxed line-clamp-3">
                                        {p.description}
                                    </p>
                                    {p.slogan && (
                                        <div className="mt-3 text-xs italic text-indigo-300">
                                            "{p.slogan}"
                                        </div>
                                    )}
                                    <div className="mt-3 flex items-center gap-1 text-[10px] text-white/40 uppercase tracking-widest">
                                        <MapPin size={10} />
                                        {p.region} Region
                                    </div>
                                </div>
                            );
                        })()}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
