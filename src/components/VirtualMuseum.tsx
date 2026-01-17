"use client";

import React, { useState, Suspense, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Environment, Html, Loader, Stars } from "@react-three/drei";
import * as THREE from "three";
import SilkStand from "./SilkStand";

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

import { motion, AnimatePresence } from "framer-motion";

const VirtualMuseum = () => {
    const [selectedSilk, setSelectedSilk] = useState<ProvinceData | null>(null);

    // Close modal
    const handleClose = () => setSelectedSilk(null);

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
                            className="relative w-full max-w-4xl bg-white/10 border border-white/20 backdrop-blur-xl rounded-2xl p-8 text-white shadow-2xl flex flex-col md:flex-row gap-8 overflow-hidden"
                        >

                            {/* Close Button */}
                            <button
                                onClick={handleClose}
                                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors z-10"
                            >
                                ✕
                            </button>

                            {/* Left: 3D View Placeholder (Or Image/Video) */}
                            <div className="flex-1 min-h-[300px] bg-black/20 rounded-xl flex items-center justify-center relative overflow-hidden group">
                                {selectedSilk.video_url ? (
                                    <video
                                        src={selectedSilk.video_url}
                                        className="w-full h-full object-cover rounded-xl"
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        controls
                                    />
                                ) : (
                                    <>
                                        <motion.img
                                            src={selectedSilk.image_url}
                                            alt={selectedSilk.name}
                                            className="w-full h-full object-cover rounded-xl"
                                            whileHover={{ scale: 1.1 }}
                                            transition={{ duration: 0.7 }}
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <span className="border border-white/50 px-4 py-2 rounded-full text-sm">360 View Coming Soon</span>
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Right: Info */}
                            <div className="flex-1 flex flex-col justify-center space-y-4">
                                <div>
                                    <h3 className="text-orange-400 font-medium tracking-widest text-sm uppercase mb-1">
                                        {selectedSilk.id.replace("-", " ")}
                                    </h3>
                                    <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-200 to-white">
                                        {selectedSilk.name}
                                    </h2>
                                    <p className="text-white/60 text-lg italic">{selectedSilk.slogan}</p>
                                </div>

                                <div className="h-px w-full bg-gradient-to-r from-white/20 to-transparent my-4" />

                                <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                                    <h4 className="text-indigo-300 text-sm font-bold mb-2 uppercase">The Story</h4>
                                    <p className="text-white/80 leading-relaxed text-sm">
                                        {selectedSilk.description}
                                    </p>
                                </div>

                                <div className="flex gap-4 text-xs font-mono text-white/50 pt-4">
                                    <span className="border border-white/20 px-2 py-1 rounded">{selectedSilk.silk_pattern}</span>
                                    <span className="border border-white/20 px-2 py-1 rounded">{selectedSilk.technique}</span>
                                </div>
                            </div>

                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default VirtualMuseum;
