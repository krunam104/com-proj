'use client';

import React, { useRef, useMemo, useState, useCallback } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface LivingSilkProps {
    textureUrl: string;
    position: [number, number, number];
    rotation: [number, number, number];
    onClick: () => void;
    onHover: (hovering: boolean) => void;
}

export default function LivingSilk({ textureUrl, position, rotation, onClick, onHover }: LivingSilkProps) {
    const meshRef = useRef<THREE.Mesh>(null);
    const [hovered, setHovered] = useState(false);

    // Uniforms for the shader
    // We use useMemo so the object reference remains stable
    const uniforms = useMemo(
        () => ({
            uTime: { value: 0 },
            uHover: { value: 0 },
        }),
        []
    );

    // Custom Shader Logic Injector
    // We use useCallback to keep the function reference stable across renders
    const handleBeforeCompile = useCallback((shader: any) => {
        shader.uniforms.uTime = uniforms.uTime;
        shader.uniforms.uHover = uniforms.uHover;

        shader.vertexShader = `
            uniform float uTime;
            uniform float uHover;
            ${shader.vertexShader}
        `;

        shader.vertexShader = shader.vertexShader.replace(
            '#include <begin_vertex>',
            `
            #include <begin_vertex>
            
            float frequency = 1.5;
            float speed = 1.2;
            
            // "Living" Wave: gentle breeze
            // Less amplitude when hovered to allow user to focus
            float amp = mix(1.0, 0.2, uHover);
            
            // Simple sine wave calculation on Z-axis (vertex displacement)
            float wave = sin(position.x * 2.0 + uTime * speed) * 0.1 * amp
                       + sin(position.y * 1.0 + uTime * 0.5) * 0.1 * amp;

            transformed.z += wave;
            `
        );
    }, [uniforms]);

    useFrame((state, delta) => {
        // Update uniforms
        uniforms.uTime.value += delta;

        // Smooth transition for hover effect (0 to 1)
        const targetHover = hovered ? 1 : 0;
        uniforms.uHover.value = THREE.MathUtils.lerp(uniforms.uHover.value, targetHover, 0.1);

        // Scale effect on hover
        if (meshRef.current) {
            const targetScale = hovered ? 1.1 : 1.0;
            meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
        }
    });

    return (
        <mesh
            ref={meshRef}
            position={position}
            rotation={rotation}
            onClick={(e) => {
                e.stopPropagation();
                onClick();
            }}
            onPointerOver={(e) => {
                e.stopPropagation();
                setHovered(true);
                onHover(true);
                document.body.style.cursor = 'pointer';
            }}
            onPointerOut={(e) => {
                e.stopPropagation();
                setHovered(false);
                onHover(false);
                document.body.style.cursor = 'auto';
            }}
        >
            <planeGeometry args={[3, 4, 32, 32]} />
            <meshStandardMaterial
                onBeforeCompile={handleBeforeCompile}
                color={textureUrl ? "white" : "#F4C430"} // White base for texture, Gold fallback
                map={null} // TODO: Uncomment to load texture: useTexture(textureUrl)
                roughness={0.4}
                metalness={0.3}
                side={THREE.DoubleSide}
            />
        </mesh>
    );
}
