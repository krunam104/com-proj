"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, X, Info, Sparkles } from "lucide-react";
import wisdomData from "@/data/wisdom_data.json";
import Image from "next/image";

import { silkImages } from "@/data/silkImages";

// Define approximate positions for each province on the map image
// These values are percentages { top, left } based on a standard Isan map layout
const PROVINCE_POSITIONS: Record<string, { top: string; left: string }> = {
    "loei": { top: "45%", left: "58%" },
    "nong-khai": { top: "14%", left: "70%" },
    "bueng-kan": { top: "65%", left: "92%" },
    "nong-bua-lamphu": { top: "48%", left: "75%" },
    "udon-thani": { top: "20%", left: "62%" },
    "sakon-nakhon": { top: "14%", left: "90%" },
    "nakhon-phanom": { top: "30%", left: "95%" },
    "khon-kaen": { top: "25%", left: "35%" },
    "kalasin": { top: "25%", left: "20%" },
    "maha-sarakham": { top: "38%", left: "42%" },
    "roi-et": { top: "55%", left: "48%" },
    "mukdahan": { top: "50%", left: "88%" },
    "yasothon": { top: "62%", left: "65%" },
    "amnat-charoen": { top: "55%", left: "55%" },
    "nakhon-ratchasima": { top: "75%", left: "10%" },
    "chaiyaphum": { top: "55%", left: "10%" },
    "buriram": { top: "85%", left: "22%" },
    "surin": { top: "82%", left: "40%" },
    "sisaket": { top: "85%", left: "55%" },
    "ubon-ratchathani": { top: "85%", left: "75%" },
};

export function EsanSilkMap() {
    const [selectedProvinceId, setSelectedProvinceId] = useState<string | null>(null);
    const [randomImage, setRandomImage] = useState<string | null>(null);

    const handleProvinceSelect = (id: string | null) => {
        if (id) {
            const random = silkImages[Math.floor(Math.random() * silkImages.length)];
            setRandomImage(random);
        }
        setSelectedProvinceId(id);
    };

    const selectedProvince = selectedProvinceId
        ? wisdomData.find((p) => p.id === selectedProvinceId)
        : null;

    return (
        <section id="isan-silk-map" className="py-12 bg-[#F8F9FA] relative min-h-[900px] overflow-hidden">
            <div className="container mx-auto px-4 h-full relative z-10">

                {/* Header */}
                <div className="text-center mb-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-bold tracking-wider uppercase mb-4"
                    >
                        <Sparkles className="w-4 h-4" />
                        <span>Interactive Journey</span>
                    </motion.div>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-4">
                        Isan Silk Adventure
                    </h2>
                    <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                        Explore the northeastern region of Thailand to discover the unique silk patterns,
                        techniques, and cultural stories of each province.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 h-auto lg:h-[720px]">

                    {/* Map Area */}
                    <div className="flex-1 relative bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden group min-h-[500px] lg:min-h-0">
                        {/* Map Background Image */}
                        <div className="absolute inset-0 bg-slate-100 flex items-center justify-center">
                            <Image
                                src="/esan-map.jpg"
                                alt="Map of Isan"
                                fill
                                className="object-contain object-center opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                                priority
                            />
                        </div>

                        {/* Interactive Markers */}
                        {wisdomData.map((province) => {
                            const pos = PROVINCE_POSITIONS[province.id];
                            if (!pos) return null;

                            const isSelected = selectedProvinceId === province.id;

                            return (
                                <motion.button
                                    key={province.id}
                                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 z-20 group/marker focus:outline-none`}
                                    style={{ top: pos.top, left: pos.left }}
                                    onClick={() => handleProvinceSelect(province.id)}
                                    whileHover={{ scale: 1.2 }}
                                    whileTap={{ scale: 0.9 }}
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.2 + Math.random() * 0.5 }}
                                >
                                    {/* Marker Icon */}
                                    <div className={`
                     relative flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full shadow-lg border-2 
                     transition-colors duration-300
                     ${isSelected
                                            ? "bg-rose-600 border-white text-white z-30 scale-125"
                                            : "bg-white border-rose-500 text-rose-500 hover:bg-rose-500 hover:text-white hover:border-white"}
                   `}>
                                        <MapPin className="w-5 h-5 md:w-6 md:h-6" fill={isSelected ? "currentColor" : "none"} />

                                        {/* Pulse Effect for unselected */}
                                        {!isSelected && (
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                                        )}
                                    </div>

                                    {/* Tooltip Label */}
                                    <div className={`
                     absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1 bg-slate-800 text-white text-xs md:text-sm font-bold rounded-lg shadow-xl whitespace-nowrap
                     opacity-0 group-hover/marker:opacity-100 transition-opacity duration-200 pointer-events-none z-40
                     ${isSelected ? "opacity-100 bg-rose-700" : ""}
                   `}>
                                        {province.name}
                                    </div>
                                </motion.button>
                            );
                        })}
                    </div>

                    {/* Info Panel (Dynamic) */}
                    <div className="w-full lg:w-[450px] flex-shrink-0 relative z-20">
                        <AnimatePresence mode="wait">
                            {selectedProvince ? (
                                <motion.div
                                    key={selectedProvince.id}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="h-full bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col"
                                >
                                    {/* Card Header Image */}
                                    <div className="relative h-48 bg-slate-200 shrink-0">
                                        <img
                                            src={randomImage ? `/images/silk/${randomImage}` : selectedProvince.image_url}
                                            alt={selectedProvince.name}
                                            onError={(e) => e.currentTarget.src = "/placeholder-fabric.png"}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />

                                        <button
                                            onClick={() => handleProvinceSelect(null)}
                                            className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full backdrop-blur-sm transition-colors"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>

                                        <div className="absolute bottom-4 left-4 text-white">
                                            <p className="text-sm font-medium text-rose-300 uppercase tracking-widest mb-1">Province</p>
                                            <h3 className="text-3xl font-bold">{selectedProvince.name}</h3>
                                        </div>
                                    </div>

                                    {/* Card Content */}
                                    <div className="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-6">
                                        <div>
                                            <h4 className="text-2xl font-bold text-slate-900 mb-2 italic">"{selectedProvince.slogan}"</h4>
                                            <p className="text-slate-600 leading-relaxed text-lg">
                                                {selectedProvince.description}
                                            </p>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
                                                <div className="flex items-start gap-3">
                                                    <div className="p-2 bg-orange-100 rounded-lg text-orange-600 shrink-0">
                                                        <Sparkles className="w-6 h-6" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-orange-500 uppercase tracking-wider mb-1">Signature Pattern</p>
                                                        <p className="text-lg font-bold text-slate-800">{selectedProvince.silk_pattern}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                                                <div className="flex items-start gap-3">
                                                    <div className="p-2 bg-blue-100 rounded-lg text-blue-600 shrink-0">
                                                        <Info className="w-6 h-6" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-blue-500 uppercase tracking-wider mb-1">Technique</p>
                                                        <p className="text-lg font-bold text-slate-800">{selectedProvince.technique}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Tags */}
                                        <div className="flex flex-wrap gap-2 pt-2">
                                            {selectedProvince.ai_tags.map(tag => (
                                                <span key={tag} className="px-3 py-1 bg-slate-100 text-slate-600 text-sm font-bold rounded-full">
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="h-full bg-white/50 backdrop-blur-sm rounded-3xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-center p-8"
                                >
                                    <div className="w-20 h-20 bg-rose-100 text-rose-500 rounded-full flex items-center justify-center mb-6 animate-bounce">
                                        <MapPin className="w-10 h-10" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-700 mb-2">Select a Province</h3>
                                    <p className="text-slate-500 max-w-xs text-lg">
                                        Click on any marker on the map to reveal its silk heritage and hidden stories.
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
}
