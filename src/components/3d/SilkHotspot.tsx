'use client';

import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Image, Html } from '@react-three/drei';
import * as THREE from 'three';
import { SilkItem } from '@/data/museumData';

interface SilkHotspotProps {
    data: SilkItem;
    onClick: (id: string) => void;
}

export function SilkHotspot({ data, onClick }: SilkHotspotProps) {
    const meshRef = useRef<THREE.Group>(null);
    const [hovered, setHovered] = useState(false);

    // Gentle floating animation
    useFrame((state) => {
        if (meshRef.current) {
            const t = state.clock.getElapsedTime();
            meshRef.current.position.y = Math.sin(t * 0.75 + data.position[0]) * 0.2; // Optimized for slower floating effect
        }
    });

    const handlePointerOver = () => {
        setHovered(true);
        document.body.style.cursor = 'pointer';
    };

    const handlePointerOut = () => {
        setHovered(false);
        document.body.style.cursor = 'auto';
    };

    return (
        <group
            ref={meshRef}
            position={new THREE.Vector3(...data.position)}
            onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut}
            onClick={() => onClick(data.id)}
            scale={hovered ? 1.15 : 1}
        >
            {/* Silk Cloth Representation */}
            <mesh rotation={[0, Math.atan2(data.position[0], data.position[2]) + Math.PI, 0]}>
                <planeGeometry args={[1.2, 1.8]} />
                {/* Use basic material until texture loads, or Image which handles loading */}
                {/* <meshStandardMaterial color={hovered ? "#F59E0B" : "white"} side={THREE.DoubleSide} /> */}
            </mesh>

            {/* Image Texture (using Drei Image for easy loading/transparency) */}
            <Image
                url={data.textureUrl}
                scale={[1.2, 1.8]} // Match geometry ratio
                rotation={[0, Math.atan2(data.position[0], data.position[2]) + Math.PI, 0]}
                transparent
                opacity={1}
                side={THREE.DoubleSide}
            />

            {/* Hover Glow Effect */}
            {hovered && (
                <pointLight distance={3} intensity={2} color="#F59E0B" position={[0, 0, 0.5]} />
            )}

            {/* Province Name Tooltip (Always facing camera or static above) */}
            {hovered && (
                <Html position={[0, 1.2, 0]} center distanceFactor={10}>
                    <div className="pointer-events-none px-3 py-1 bg-black/70 backdrop-blur-md rounded-full border border-[#F59E0B] text-white text-xs font-bold whitespace-nowrap shadow-xl">
                        {data.name}
                    </div>
                </Html>
            )}

            {!hovered && (
                <Text
                    position={[0, -1.2, 0]}
                    fontSize={0.2}
                    color="white"
                    anchorX="center"
                    anchorY="middle"
                    outlineWidth={0.02}
                    outlineColor="#000000"
                    rotation={[0, Math.atan2(data.position[0], data.position[2]) + Math.PI, 0]}
                >
                    {data.name}
                </Text>
            )}

        </group>
    );
}
