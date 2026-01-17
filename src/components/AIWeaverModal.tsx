'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Sparkles, Wand2, Palette, Layers, X, Download } from 'lucide-react';

interface AIWeaverModalProps {
    isOpen: boolean;
    onClose: () => void;
}

// --- PART 1: Data Constants ---

const SAMPLE_PROMPTS = [
    {
        style: "Cyber-Isan",
        prompt: "Futuristic Thai Mudmee silk pattern, Cyberpunk style, glowing neon threads (cyan and magenta) on deep black background, circuit board motifs mixed with traditional geometric patterns, 8k resolution, intricate texture.",
        label: "อีสานล้ำยุค (Cyber-Isan)"
    },
    {
        style: "Nature Whisper",
        prompt: "Organic Thai silk pattern inspired by the Mekong River at sunset, fluid wavy lines, warm golden and terracotta orange gradient, soft natural dye texture, elegant and flowing.",
        label: "เสียงกระซิบจากธรรมชาติ (Nature Whisper)"
    },
    {
        style: "Luxury Fusion",
        prompt: "Luxury modern Isan silk, Khit pattern, minimalist design, White and Gold color palette, 3D embossed texture, symmetrical and sophisticated, suitable for high-end fashion.",
        label: "หรูหราทันสมัย (Luxury Fusion)"
    },
    {
        style: "Mythical Belief",
        prompt: "Majestic Naga (Great Serpent) scale pattern, emerald green and deep indigo blue, metallic sheen, fantasy art style, mysterious and powerful aura, close-up macro details.",
        label: "ตำนานความเชื่อ (Mythical Belief)"
    }
];

const BUILDER_OPTIONS = {
    Technique: ["Mudmee (Ikat)", "Khit (Raised)", "Praewa (Embroidery)"],
    Mood: ["Cyberpunk", "Nature", "Luxury"],
    Color: ["Hot (Red/Orange)", "Cool (Blue/Indigo)", "Black & Gold", "Pastel"]
};

export default function AIWeaverModal({ isOpen, onClose }: AIWeaverModalProps) {
    // Core State
    const [prompt, setPrompt] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Builder State
    const [isBuilderOpen, setIsBuilderOpen] = useState(false);
    const [selectedBase, setSelectedBase] = useState<string>('');
    const [selectedMood, setSelectedMood] = useState<string>('');
    const [selectedColor, setSelectedColor] = useState<string>('');

    // --- Logic: Auto-Generation from Builder ---
    useEffect(() => {
        if (selectedBase && selectedMood && selectedColor) {
            // Constructing a more descriptive prompt based on selections
            const baseTerm = selectedBase.split(' ')[0]; // Extract 'Mudmee', 'Khit', 'Praewa'
            const moodTerm = selectedMood;
            const colorTerm = selectedColor.split(' ')[0]; // Extract 'Hot', 'Cool', 'Black', 'Pastel'

            let descriptivePrompt = "";

            // Logic to create a "Smart" prompt based on the user's vision
            if (moodTerm === "Cyberpunk") {
                descriptivePrompt = `Futuristic Thai ${baseTerm} silk pattern, Cyberpunk style, glowing neon elements, ${colorTerm} color palette, circuit board details, 8k resolution.`;
            } else if (moodTerm === "Nature") {
                descriptivePrompt = `Organic Thai ${baseTerm} silk pattern, inspired by nature, fluid lines, ${colorTerm} color tones, natural dye texture, soft and flowing.`;
            } else if (moodTerm === "Luxury") {
                descriptivePrompt = `Luxury modern Isan ${baseTerm} silk, minimalist design, ${colorTerm} color scheme, 3D embossed texture, sophisticated and symmetrical.`;
            } else {
                descriptivePrompt = `Thai ${baseTerm} silk pattern, ${moodTerm} style, ${colorTerm} color palette, high quality, intricate details.`;
            }

            setPrompt(descriptivePrompt);
        }
    }, [selectedBase, selectedMood, selectedColor]);

    const handleApplyStyle = (presetPrompt: string) => {
        setPrompt(presetPrompt);
        // Reset builder state to avoid confusion
        setSelectedBase('');
        setSelectedMood('');
        setSelectedColor('');
    };

    const handleGenerate = async () => {
        if (!prompt.trim()) return;

        setIsLoading(true);
        setError(null);
        setGeneratedImage(null);

        try {
            const response = await fetch('/api/generate-silk', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Out of thread error: Failed to connect to the Weaver.');
            }

            const data = await response.json();
            if (data.error) {
                throw new Error(data.error);
            }

            setGeneratedImage(data.image);
        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDownload = () => {
        if (!generatedImage) return;
        const link = document.createElement('a');
        link.href = generatedImage;
        link.download = `thai-silk-weaver-${Date.now()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal Container: Cyber-Isan Command Center */}
            <div className="relative w-full max-w-6xl bg-[#0F172A]/95 border border-cyan-500/30 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl flex flex-col md:flex-row max-h-[90vh]">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 rounded-full hover:bg-white/10 text-cyan-400 hover:text-white transition-colors"
                >
                    <X size={24} />
                </button>

                {/* --- LEFT: CONTROLS --- */}
                <div className="w-full md:w-2/5 p-6 border-b md:border-b-0 md:border-r border-cyan-500/20 flex flex-col gap-5 overflow-y-auto custom-scrollbar">

                    {/* Header */}
                    <div className="space-y-1">
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent flex items-center gap-2">
                            <Sparkles className="w-6 h-6 text-cyan-400" />
                            The AI Weaver
                        </h2>
                        <p className="text-slate-400 text-sm">Architectural Isan Silk Intelligence</p>
                    </div>

                    {/* --- FEATURE B: Interactive Prompt Builder --- */}
                    <div className="border border-slate-700 rounded-lg overflow-hidden bg-slate-900/40">
                        <button
                            onClick={() => setIsBuilderOpen(!isBuilderOpen)}
                            className="w-full px-4 py-4 flex items-center justify-between text-base font-semibold text-cyan-100 bg-slate-800/50 hover:bg-slate-800 transition-colors"
                        >
                            <div className="flex items-center gap-2">
                                <Wand2 className="w-4 h-4 text-purple-400" />
                                🛠️ Custom Prompt Builder (ตัวช่วยสร้างคำสั่ง)
                            </div>
                            {isBuilderOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>

                        <AnimatePresence>
                            {isBuilderOpen && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="p-4 space-y-4"
                                >
                                    {/* Used a vertical stack for sidebar layout efficiency, representing the 3 logical columns of data */}

                                    <div className="space-y-2">
                                        <label className="text-sm text-slate-400 flex items-center gap-1"><Layers className="w-4 h-4" /> Base Technique</label>
                                        <div className="flex flex-wrap gap-2">
                                            {BUILDER_OPTIONS.Technique.map((tech) => (
                                                <button
                                                    key={tech}
                                                    onClick={() => setSelectedBase(tech)}
                                                    className={`px-3 py-1.5 text-xs md:text-sm rounded border transition-all ${selectedBase === tech
                                                        ? 'bg-cyan-900/50 border-cyan-400 text-cyan-300'
                                                        : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500'
                                                        }`}
                                                >
                                                    {tech}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {/* 2. Mood Style */}
                                        <div className="space-y-2">
                                            <label className="text-sm text-slate-400 flex items-center gap-1"><Sparkles className="w-4 h-4" /> Mood</label>
                                            <div className="flex flex-wrap gap-2">
                                                {BUILDER_OPTIONS.Mood.map((mood) => (
                                                    <button
                                                        key={mood}
                                                        onClick={() => setSelectedMood(mood)}
                                                        className={`px-3 py-1.5 text-xs md:text-sm rounded border transition-all ${selectedMood === mood
                                                            ? 'bg-purple-900/50 border-purple-400 text-purple-300'
                                                            : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500'
                                                            }`}
                                                    >
                                                        {mood}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* 3. Color Tone */}
                                        <div className="space-y-2">
                                            <label className="text-sm text-slate-400 flex items-center gap-1"><Palette className="w-4 h-4" /> Color</label>
                                            <div className="flex flex-wrap gap-2">
                                                {BUILDER_OPTIONS.Color.map((color) => (
                                                    <button
                                                        key={color}
                                                        onClick={() => setSelectedColor(color)}
                                                        className={`px-3 py-1.5 text-xs md:text-sm rounded border transition-all ${selectedColor === color
                                                            ? 'bg-amber-900/50 border-amber-400 text-amber-300'
                                                            : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500'
                                                            }`}
                                                    >
                                                        {color}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* --- FEATURE A: Quick Suggestion Chips --- */}
                    <div className="space-y-2">
                        <label className="text-cyan-400 text-sm font-semibold uppercase tracking-wider">Quick Suggestions (Preset Styles)</label>
                        <div className="grid grid-cols-2 gap-2">
                            {SAMPLE_PROMPTS.map((item, idx) => (
                                <motion.button
                                    key={idx}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => handleApplyStyle(item.prompt)}
                                    className="relative group overflow-hidden rounded-lg p-[1px]"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 opacity-60 group-hover:opacity-100 transition-opacity" />
                                    <div className="relative h-full bg-slate-900/90 hover:bg-slate-800/90 rounded-lg p-3 flex flex-col items-center justify-center text-center transition-colors">
                                        <span className="text-white text-sm font-medium">{item.style}</span>
                                        <span className="text-xs text-slate-400">{item.label}</span>
                                    </div>
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    {/* Text Area */}
                    <div className="space-y-2 flex-grow">
                        <label className="text-cyan-400 text-sm font-semibold uppercase tracking-wider">Prompt Interface</label>
                        <textarea
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="Input your vision or use the tools above..."
                            className="w-full h-32 bg-slate-900/50 border border-slate-700 rounded-lg p-4 text-base text-slate-100 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 resize-none placeholder-slate-600 transition-all font-mono"
                        />
                    </div>

                    {/* Action Button */}
                    <div className="pt-2">
                        <button
                            onClick={handleGenerate}
                            disabled={isLoading || !prompt}
                            className={`w-full py-5 rounded-xl font-bold text-xl tracking-wide uppercase transition-all shadow-lg flex items-center justify-center gap-2
                                ${isLoading
                                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white shadow-cyan-900/20 hover:shadow-cyan-500/40'
                                }`}
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Weaving...
                                </>
                            ) : (
                                <>
                                    <Wand2 className="w-5 h-5" />
                                    Generate Silk
                                </>
                            )}
                        </button>
                        {error && (
                            <p className="mt-3 text-red-400 text-sm text-center animate-pulse">{error}</p>
                        )}
                    </div>
                </div>

                {/* --- RIGHT: VIEWPORT --- */}
                <div className="w-full md:w-3/5 bg-slate-950/50 flex flex-col relative overflow-hidden group border-t md:border-t-0 md:border-l border-cyan-500/20">
                    {/* Ambient Background Glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />

                    {/* Grid Pattern Overlay */}
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>

                    {generatedImage ? (
                        <div className="relative h-full flex flex-col z-10">
                            <div className="flex-1 p-8 flex items-center justify-center overflow-hidden">
                                <motion.img
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5 }}
                                    src={generatedImage}
                                    alt="Generated Thai Silk"
                                    className="max-h-full max-w-full rounded-lg shadow-2xl border border-white/10 object-contain hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                            <div className="p-6 bg-slate-900/80 border-t border-white/5 flex justify-between items-center backdrop-blur-md">
                                <div>
                                    <p className="text-white text-lg font-medium flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                        Unique Silk Pattern
                                    </p>
                                    <p className="text-slate-400 text-sm font-mono mt-1">ID: {Date.now().toString().slice(-6)}</p>
                                </div>
                                <button
                                    onClick={handleDownload}
                                    className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-bold text-lg rounded-lg flex items-center gap-2 transition-all shadow-lg shadow-amber-900/30"
                                >
                                    <Download size={24} />
                                    Download
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-6 z-10">
                            <div className="relative">
                                <div className="absolute inset-0 bg-cyan-500/20 blur-xl rounded-full animate-pulse"></div>
                                <div className="relative w-32 h-32 rounded-full border-2 border-dashed border-slate-700 flex items-center justify-center group-hover:border-cyan-500/50 transition-colors">
                                    <Sparkles className="w-12 h-12 opacity-50 text-cyan-200 group-hover:scale-110 transition-transform duration-500" />
                                </div>
                            </div>
                            <div className="text-center space-y-2">
                                <p className="text-xl font-light text-slate-300">READY TO WEAVE</p>
                                <p className="text-sm text-slate-500 max-w-xs mx-auto">Select a preset or build your custom thread command to begin the generation process.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
