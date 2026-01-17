"use client";

import React, { useRef, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, useTexture, SpotLight } from "@react-three/drei";
import * as THREE from "three";
// import { motion } from "framer-motion-3d"; // Removed unused import causing build error
// Actually I'll use standard springs or just lerp in useFrame for interactions to avoid extra deps if possible, 
// strictly sticking to user request "Next.js, Tailwind CSS, and React Three Fiber".

interface SilkStandProps {
    position: [number, number, number];
    rotation: [number, number, number];
    data: {
        id: string;
        name: string;
        description: string;
        image_url: string;
    };
    onClick: (data: any) => void;
}

const SilkStand: React.FC<SilkStandProps> = ({ position, rotation, data, onClick }) => {
    const groupRef = useRef<THREE.Group>(null);
    const clothRef = useRef<THREE.Mesh>(null);
    const [hovered, setHovered] = useState(false);

    // Load texture (falling back to a color if image fails or is placeholder)
    const texture = useTexture(data.image_url, (texture) => {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    });

    // Wave material shader or logic
    // For simplicity and "nice aesthetics", a gentle sine wave in useFrame for the cloth vertices
    // But updating vertices every frame can be expensive. A custom shader is better.
    // Let's use a standard material and animate the position/rotation slightly for "floating" effect.
    // And maybe a vertex shader if I want real wave. Let's try a simple vertex shader.

    const uniforms = useMemo(
        () => ({
            uTime: { value: 0 },
            uTexture: { value: texture },
            uColor: { value: new THREE.Color("#ffffff") }, // Base color
        }),
        [texture]
    );

    const vertexShader = `
    varying vec2 vUv;
    varying float vElevation;
    uniform float uTime;

    void main() {
        vUv = uv;
        vec3 modelPosition = position;
        
        float elevation = sin(modelPosition.x * 5.0 + uTime) * 0.1;
        elevation += sin(modelPosition.y * 3.0 + uTime * 0.5) * 0.1;
        
        modelPosition.z += elevation; // Displace mostly in Z (local conceptual up for plane if rotated)
        vElevation = elevation;

        gl_Position = projectionMatrix * modelViewMatrix * vec4(modelPosition, 1.0);
    }
  `;

    const fragmentShader = `
    uniform sampler2D uTexture;
    varying vec2 vUv;
    varying float vElevation;

    void main() {
        vec4 textureColor = texture2D(uTexture, vUv);
        // Add some shadow/highlight based on elevation
        float shading = vElevation * 0.5 + 0.9;
        gl_FragColor = vec4(textureColor.rgb * shading, textureColor.a);
    }
  `;

    useFrame((state, delta) => {
        if (clothRef.current) {
            // @ts-ignore
            if (clothRef.current.material.uniforms) {
                // @ts-ignore
                clothRef.current.material.uniforms.uTime.value += delta * 0.2;
            }
        }

        // Hover animation logic
        const targetScale = hovered ? 1.2 : 1.0;
        if (groupRef.current) {
            groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
        }
    });

    return (
        <group
            ref={groupRef}
            position={position}
            rotation={rotation}
            onClick={(e) => {
                e.stopPropagation();
                onClick(data);
            }}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
        >
            {/* Label */}
            <Text
                position={[0, 3.0, 0]}
                fontSize={0.3}
                color={hovered ? "gold" : "white"}
                anchorX="center"
                anchorY="middle"
                outlineWidth={0.02}
                outlineColor="black"
            >
                {data.name}
            </Text>

            {/* The Floating Silk Cloth */}
            <mesh ref={clothRef} position={[0, 1.5, 0]} rotation={[0, 0, 0]}>
                {/* Width, Height, Segments for wave */}
                <planeGeometry args={[1.5, 2, 32, 32]} />
                <shaderMaterial
                    uniforms={uniforms}
                    vertexShader={vertexShader}
                    fragmentShader={fragmentShader}
                    side={THREE.DoubleSide}
                    transparent
                />
            </mesh>

            {/* Spotlight showcasing the pattern */}
            <SpotLight
                position={[0, 5, 2]}
                distance={8}
                angle={0.5}
                attenuation={5}
                anglePower={5} // Diffuse-cone angle power (default: 5)
                color="white"
                intensity={3}
            />

            {/* The Pedestal Base */}
            <mesh position={[0, 0.5, 0]}>
                <cylinderGeometry args={[0.4, 0.5, 1, 32]} />
                <meshStandardMaterial color="#111" roughness={0.2} metalness={0.8} />
            </mesh>

            {/* Light specific to this stand */}
            <pointLight position={[0, 2, 1]} intensity={hovered ? 2 : 0.5} distance={3} color="orange" />
        </group>
    );
};

export default SilkStand;
