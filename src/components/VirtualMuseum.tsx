"use client";

import React, { useState, Suspense, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Environment, Html, Loader, Stars } from "@react-three/drei";
import * as THREE from "three";
import SilkStand from "./SilkStand";
import { motion, AnimatePresence } from "framer-motion";

// Import data
import wisdomData from "../data/wisdom_data.json";

// Types
interface ProvinceData {
    id: string;
    name: string;
    slogan: string;
    description: string;
    silk_pattern: string;
    technique: string;
    image_url: string;
    video_url?: string;
    ai_tags?: string[];
}

const SceneContent = ({ onSelect }: { onSelect: (data: ProvinceData) => void }) => {
    const { camera } = useThree();

    // Slow auto-rotation setup
    useFrame((state, delta) => {
        // We can add subtle camera movement if needed, 
        // but OrbitControls autoRotate is usually smoother for the whole scene.
    });

    // Calculate positions in a circle
    const radius = 8;
    const count = wisdomData.length;

    return (
        <>
            <ambientLight intensity={0.5} />

            {/* Central light */}
            <pointLight position={[0, 10, 0]} intensity={1} color="#fff5e6" />

            {/* 360 Environment Sphere */}
            <mesh>
                <sphereGeometry args={[20, 60, 40]} />
                <meshBasicMaterial color="#1a0b2e" side={THREE.BackSide} />
                {/* Ideally we map a texture here, but user said 'placeholder URL' or just color for now if not provided. 
            I'll settle for a dark aesthetic color + Stars for a 'Virtual' feel. */}
            </mesh>
            <Stars radius={19} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

            {/* Pedestals */}
            {wisdomData.map((data: any, i) => {
                const angle = (i / count) * Math.PI * 2;
                const x = Math.cos(angle) * radius;
                const z = Math.sin(angle) * radius;

                // Calculate rotation to face center
                // Object at (x,0,z) needs to rotate Y to look at (0,0,0)
                // arctan2(x, z) gives angle from North? 
                // Standard rotation: rotation.y = angle + PI/2 or similar.
                // Actually lookAt is easier, but here we can just compute:
                // angle is from X axis counter-clockwise.
                // We want the plane (which faces Z usually) to face center.
                // Let's pass rotation [0, -angle - Math.PI/2, 0] roughly?
                // Let's refine: position is (cosA, sinA). Normal is (cosA, sinA).
                // Rotation to align Z with Normal:
                const rotY = -angle - Math.PI / 2;

                return (
                    <SilkStand
                        key={data.id}
                        position={[x, 0, z]}
                        rotation={[0, rotY, 0]}
                        data={data}
                        onClick={onSelect}
                    />
                );
            })}

            <OrbitControls
                enablePan={false}
                minPolarAngle={Math.PI / 2.5}
                maxPolarAngle={Math.PI / 2}
                autoRotate
                autoRotateSpeed={0.5}
            />
        </>
    );
};

const VirtualMuseum = () => {
    const [selectedSilk, setSelectedSilk] = useState<ProvinceData | null>(null);
    const [viewMode, setViewMode] = useState<'image' | 'video'>('image');


    // Reset view mode when selection changes
    useEffect(() => {
        if (selectedSilk) {
            setViewMode('image');
        }
    }, [selectedSilk]);

    // Close modal
    const handleClose = () => setSelectedSilk(null);

    // Helper to extract YouTube ID
    const getYouTubeEmbedUrl = (url: string) => {
        // Clean url
        const cleanUrl = url.trim();

        // Handle standard youtube.com/watch?v=ID
        const vParam = cleanUrl.match(/[?&]v=([^&]+)/);
        if (vParam) return `https://www.youtube.com/embed/${vParam[1]}?autoplay=1`;

        // Handle youtu.be/ID (supports ?si=...)
        const shortMatch = cleanUrl.match(/youtu\.be\/([^?&]+)/);
        if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}?autoplay=1`;

        // Handle youtube.com/embed/ID (if legacy or direct)
        const embedMatch = cleanUrl.match(/embed\/([^?&]+)/);
        if (embedMatch) return `https://www.youtube.com/embed/${embedMatch[1]}?autoplay=1`;

        return cleanUrl; // Fallback or direct video file
    };

    return (
        <div className="relative w-full h-[100vh] bg-black">
            {/* Background Music */}
            <audio
                autoPlay
                loop
                src="/audio/ponglang-electronic.mp3"
                ref={(el) => { if (el) el.volume = 0.02; }}
            />

            <Canvas
                camera={{ position: [0, 2, 0.1], fov: 75 }} // Start at center
                gl={{ antialias: true }}
            >
                <Suspense fallback={null}>
                    <SceneContent onSelect={setSelectedSilk} />
                </Suspense>
            </Canvas>

            {/* Loading Overlay */}
            <Loader />

            {/* Instructions */}
            <div className="absolute top-5 left-1/2 transform -translate-x-1/2 text-white/70 text-sm pointer-events-none z-10 font-light tracking-widest uppercase">
                Drag to Explore • Click Silk to View Details
            </div>

            {/* Focus Mode - Glassmorphism Modal */}
            <AnimatePresence>
                {selectedSilk && (
                    <div className="absolute inset-0 z-50 flex items-center justify-center p-4">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                            onClick={handleClose}
                        />

                        {/* Modal Content */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="relative w-full max-w-5xl bg-white/10 border border-white/20 backdrop-blur-xl rounded-2xl p-6 text-white shadow-2xl flex flex-col md:flex-row gap-6 overflow-hidden max-h-[90vh]"
                        >

                            {/* Close Button */}
                            <button
                                onClick={handleClose}
                                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors z-10"
                            >
                                ✕
                            </button>

                            {/* Left: Media View (Image or Video) */}
                            <div className="flex-[1.5] bg-black/20 rounded-xl flex flex-col relative overflow-hidden group min-h-[400px]">

                                {/* Toggle Switch */}
                                <div className="absolute top-4 left-4 z-20 flex bg-black/40 rounded-full p-1 border border-white/10 backdrop-blur-md">
                                    <button
                                        onClick={() => setViewMode('image')}
                                        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${viewMode === 'image'
                                            ? "bg-white text-black shadow-lg"
                                            : "text-white/70 hover:text-white"
                                            }`}
                                    >
                                        Infographic
                                    </button>
                                    <button
                                        onClick={() => setViewMode('video')}
                                        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${viewMode === 'video'
                                            ? "bg-white text-black shadow-lg"
                                            : "text-white/70 hover:text-white"
                                            }`}
                                    >
                                        Video
                                    </button>
                                </div>

                                {/* Content Area */}
                                <div className="flex-1 w-full h-full flex items-center justify-center bg-black/40">
                                    {viewMode === 'video' && selectedSilk.video_url ? (
                                        selectedSilk.video_url.includes('youtu') ? (
                                            <iframe
                                                width="100%"
                                                height="100%"
                                                src={getYouTubeEmbedUrl(selectedSilk.video_url)}
                                                title={selectedSilk.name}
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                                className="w-full h-full object-contain rounded-xl"
                                            />
                                        ) : (
                                            <video
                                                src={selectedSilk.video_url}
                                                className="w-full h-full object-contain rounded-xl"
                                                autoPlay
                                                loop
                                                muted
                                                playsInline
                                                controls
                                            />
                                        )
                                    ) : (
                                        <motion.img
                                            key={selectedSilk.image_url}
                                            src={selectedSilk.image_url}
                                            alt={selectedSilk.name}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.5 }}
                                            className="w-full h-full object-contain rounded-xl"
                                        />
                                    )}

                                    {/* Fallback msg if video selected but no url */}
                                    {viewMode === 'video' && !selectedSilk.video_url && (
                                        <div className="text-white/50 italic">No video available</div>
                                    )}
                                </div>
                            </div>

                            {/* Right: Info */}
                            <div className="flex-1 flex flex-col space-y-4 overflow-y-auto pr-2 custom-scrollbar">
                                <div>
                                    <h3 className="text-orange-400 font-medium tracking-widest text-sm uppercase mb-1">
                                        {selectedSilk.id.replace("-", " ")}
                                    </h3>
                                    <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-200 to-white">
                                        {selectedSilk.name}
                                    </h2>
                                    <p className="text-white/60 text-lg italic">{selectedSilk.slogan}</p>
                                </div>

                                <div className="h-px w-full bg-gradient-to-r from-white/20 to-transparent my-2" />

                                <div className="bg-white/5 p-5 rounded-lg border border-white/10">
                                    <h4 className="text-indigo-300 text-sm font-bold mb-2 uppercase flex items-center gap-2">
                                        <span className="w-1 h-4 bg-indigo-500 rounded-full"></span>
                                        The Story
                                    </h4>
                                    <p className="text-white/80 leading-relaxed text-sm">
                                        {selectedSilk.description}
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-3 mt-2">
                                    <div className="bg-white/5 p-3 rounded border border-white/10">
                                        <div className="text-xs text-white/40 uppercase mb-1">Pattern</div>
                                        <div className="text-sm font-medium text-white/90">{selectedSilk.silk_pattern}</div>
                                    </div>
                                    <div className="bg-white/5 p-3 rounded border border-white/10">
                                        <div className="text-xs text-white/40 uppercase mb-1">Technique</div>
                                        <div className="text-sm font-medium text-white/90">{selectedSilk.technique}</div>
                                    </div>
                                </div>

                                {selectedSilk.ai_tags && (
                                    <div className="flex flex-wrap gap-2 pt-2">
                                        {selectedSilk.ai_tags.map(tag => (
                                            <span key={tag} className="text-xs font-mono px-2 py-1 rounded bg-white/10 text-white/60 border border-white/5">
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>

                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.05);
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.2);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(255, 255, 255, 0.3);
                }
            `}</style>
        </div>
    );
};

export default VirtualMuseum;

