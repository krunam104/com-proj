'use client';

import React, { Suspense, useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Html, useProgress, Sphere, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { MUSEUM_DATA, SilkItem } from '@/data/museumData';
import { SilkHotspot } from '@/components/3d/SilkHotspot';
import { StoryModal } from '@/components/3d/StoryModal';
import { Loader2 } from 'lucide-react';

function MuseumLoader() {
    const { active, progress } = useProgress();
    if (!active) return null;
    return (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-slate-900 text-[#F59E0B]">
            <Loader2 className="animate-spin mb-2" size={40} />
            <span className="font-bold text-shadow">{progress.toFixed(0)}% Loading</span>
        </div>
    );
}

// Background Component
function MuseumBackground() {
    // Large sphere with 360 texture
    const texture = useTexture('/images/bg.png');

    return (
        <Sphere args={[50, 60, 60]} scale={[-1, 1, 1]}>
            <meshBasicMaterial
                map={texture}
                side={THREE.BackSide}
            />
        </Sphere>
    );
}

// ... (imports)

interface VirtualMuseumSceneProps {
    isPreview?: boolean;
}

export function VirtualMuseumScene({ isPreview = false }: VirtualMuseumSceneProps) {
    const [selectedItem, setSelectedItem] = useState<SilkItem | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Audio Initialization and Cleanup
    useEffect(() => {
        if (isPreview) return;

        // Create audio instance
        const audio = new Audio('/audio/ponglang-electronic.mp3');
        audio.loop = true;
        audio.volume = 0.5;
        audioRef.current = audio;

        // Try to play immediately (might be blocked without interaction, but worth a shot for continuous experience)
        // audio.play().catch(() => {}); 

        return () => {
            audio.pause();
            audioRef.current = null;
        };
    }, [isPreview]);

    // Control Playback based on Modal State
    useEffect(() => {
        if (isPreview || !audioRef.current) return;

        if (isModalOpen) {
            audioRef.current.pause();
        } else {
            // Resume/Play
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.log("Audio Playback Error:", error);
                });
            }
        }
    }, [isModalOpen, isPreview]);

    const handleHotspotClick = (id: string) => {
        const item = MUSEUM_DATA.find(d => d.id === id);
        if (item) {
            setSelectedItem(item);
            setIsModalOpen(true);
        }
    };

    return (
        <div className="w-full h-full relative bg-slate-900">
            {/* 3D Canvas */}
            <Canvas
                shadows
                camera={{ position: [0, 2, 15], fov: 60 }}
                className="w-full h-full"
            >
                <Suspense fallback={null}>
                    {/* Environment */}
                    <MuseumBackground />
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1} />
                    <OrbitControls
                        enablePan={false}
                        enableZoom={!isPreview}
                        minDistance={5}
                        maxDistance={25}
                        autoRotate
                        autoRotateSpeed={0.5}
                    />

                    {/* Hotspots */}
                    {MUSEUM_DATA.map((item) => (
                        <SilkHotspot
                            key={item.id}
                            data={item}
                            onClick={handleHotspotClick}
                        />
                    ))}

                </Suspense>
            </Canvas>

            {/* Loaders & Overlays */}
            <MuseumLoader />

            {/* UI Overlay: Title (Hidden in Preview) */}
            {!isPreview && (
                <div className="absolute top-6 right-6 z-10 pointer-events-none text-right">
                    <h1 className="text-5xl font-serif text-white font-bold drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">
                        Isan Silk <span className="text-[#F59E0B] drop-shadow-lg">360°</span> Museum
                    </h1>
                    <div className="inline-block mt-2">
                        <p className="text-white text-xl font-medium bg-black/50 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 shadow-lg">
                            Explore the wisdom of 20 provinces
                        </p>
                    </div>
                </div>
            )}

            {/* Story Modal Overlay */}
            <StoryModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                data={selectedItem}
            />
        </div>
    );
}

export default VirtualMuseumScene;
