'use client';

import { useRef, useState, useMemo, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Image, Text, Environment, Sparkles, Html, useCursor, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import wisdomData from '@/data/wisdom_data.json';

const RADIUS = 8;
const CARD_WIDTH = 2;
const CARD_HEIGHT = 3.2;

// --- Components ---

function SilkFrame({ data, index, count, isActive, onActive, groupRotationY }: any) {
    const meshRef = useRef<THREE.Group>(null!);
    const imageRef = useRef<any>(null);
    const [hovered, setHover] = useState(false);
    useCursor(hovered);

    // Cylinder positioning
    const angle = (index / count) * Math.PI * 2;
    const x = Math.sin(angle) * RADIUS;
    const z = Math.cos(angle) * RADIUS;

    // Rotate to face center
    const rotation: [number, number, number] = [0, angle + Math.PI, 0];

    useFrame((state, delta) => {
        if (!meshRef.current) return;

        // Scale effect
        const targetScale = isActive ? 1.2 : hovered ? 1.15 : 1;
        meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);

        // Float effect (disable when active for stability)
        if (!isActive) {
            meshRef.current.position.y = Math.sin(state.clock.elapsedTime + index * 0.5) * 0.1;
        }

        // Material effects
        if (imageRef.current?.material) {
            // Brightness / Zoom
            const targetZoom = isActive || hovered ? 1.1 : 1;
            imageRef.current.material.zoom = THREE.MathUtils.lerp(imageRef.current.material.zoom, targetZoom, 0.1);

            // Saturation/Grayscale
            const targetGray = (isActive || hovered) ? 0 : 0.4;
            imageRef.current.material.grayscale = THREE.MathUtils.lerp(imageRef.current.material.grayscale, targetGray, 0.1);

            // Emissive punch
            imageRef.current.material.color.lerp(new THREE.Color(isActive || hovered ? '#ffffff' : '#aaaaaa'), 0.1);
        }
    });

    return (
        <group
            ref={meshRef}
            position={[x, 0, z]}
            rotation={rotation}
            onClick={(e) => {
                e.stopPropagation();
                onActive(isActive ? null : index);
            }}
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}
        >
            <Image
                ref={imageRef}
                url={data.image_url}
                transparent
                side={THREE.DoubleSide}
                args={[CARD_WIDTH, CARD_HEIGHT]}
                radius={0.1}
            />

            {/* 3D Text Label */}
            <Text
                position={[0, -CARD_HEIGHT / 2 - 0.3, 0.05]}
                fontSize={0.2}
                color={hovered || isActive ? "#fcd34d" : "white"}
                anchorX="center"
                anchorY="top"
                font="https://fonts.gstatic.com/s/playfairdisplay/v30/nuFvD-vYSZviVYUb_rj3ij__anPXJgsg.woff"
            >
                {data.name}
            </Text>

            {/* Detail Overlay */}
            {isActive && (
                <Html position={[CARD_WIDTH / 2 + 0.2, 0, 0]} transform distanceFactor={4} center zIndexRange={[100, 0]}>
                    <motion.div
                        initial={{ opacity: 0, x: -10, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -10, scale: 0.9 }}
                        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                        className="w-80 p-6 bg-slate-950/90 backdrop-blur-xl rounded-xl border border-amber-500/30 text-white shadow-2xl pointer-events-none select-none"
                    >
                        <div className="absolute top-0 right-0 p-2 opacity-50">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <path d="M12 16v-4" /><path d="M12 8h.01" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-serif text-amber-400 mb-1">{data.name}</h3>
                        <p className="text-xs text-amber-200/70 uppercase tracking-widest font-semibold mb-3">{data.silk_pattern}</p>

                        <div className="h-px w-full bg-gradient-to-r from-amber-500/50 to-transparent mb-4" />

                        <p className="text-sm font-light leading-relaxed text-slate-300 mb-4 shadow-black drop-shadow-md">
                            {data.description}
                        </p>

                        <div className="flex flex-wrap gap-2">
                            {data.ai_tags.slice(0, 4).map((tag: string) => (
                                <span key={tag} className="text-[10px] px-2 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                </Html>
            )}
        </group>
    );
}

function Gallery({ activeIndex, setActiveIndex, setGroupRef }: any) {
    const groupRef = useRef<THREE.Group>(null!);

    // Pass the actual group instance up to parent
    useEffect(() => {
        if (setGroupRef && groupRef.current) {
            setGroupRef(groupRef.current);
        }
    }, [setGroupRef]);

    useFrame((state, delta) => {
        // Rotate gallery when NOT focused
        if (activeIndex === null && groupRef.current) {
            groupRef.current.rotation.y += delta * 0.05;
        }
    });

    return (
        <group ref={groupRef}>
            {wisdomData.map((item: any, i: number) => (
                <SilkFrame
                    key={item.id}
                    data={item}
                    index={i}
                    count={wisdomData.length}
                    isActive={activeIndex === i}
                    onActive={setActiveIndex}
                />
            ))}
        </group>
    );
}

function CameraController({ activeIndex, galleryGroupRef }: { activeIndex: number | null, galleryGroupRef: React.RefObject<THREE.Group> }) {
    const vec = useMemo(() => new THREE.Vector3(), []);

    // Safely check if ref exists
    const group = galleryGroupRef?.current;

    useFrame((state, delta) => {
        if (activeIndex !== null && group) {
            // Calculate coordinate of the active item in World Space
            const angle = (activeIndex / wisdomData.length) * Math.PI * 2;
            const groupRot = group.rotation.y;
            const totalAngle = angle + groupRot;

            const R = RADIUS;
            const itemX = Math.sin(totalAngle) * R;
            const itemZ = Math.cos(totalAngle) * R;

            // Target Camera Position (In front of item)
            // Move inwards from the item position towards center
            const targetDist = R - 3.5;

            const camX = Math.sin(totalAngle) * targetDist;
            const camZ = Math.cos(totalAngle) * targetDist;

            // Move Camera
            state.camera.position.lerp(vec.set(camX, 0, camZ), 0.05);
            state.camera.lookAt(itemX, 0, itemZ);

        } else {
            // Optional: Return to default orbit? handled by OrbitControls usually.
        }
    });
    return null;
}

export function VirtualMuseum() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [groupRef, setGroupRef] = useState<THREE.Group | null>(null);

    return (
        <div className="w-full h-full bg-black relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900 via-[#020617] to-black" />

            <Canvas shadows camera={{ position: [0, 0, 0.1], fov: 50 }}>
                <fog attach="fog" args={['#020617', 2, 25]} />
                <ambientLight intensity={0.2} />

                <Suspense fallback={null}>
                    <Environment preset="city" environmentIntensity={0.5} />
                    <Sparkles count={80} scale={15} size={3} speed={0.3} opacity={0.4} color="#fcd34d" />

                    <group position={[0, -1, 0]}>
                        <Gallery
                            activeIndex={activeIndex}
                            setActiveIndex={setActiveIndex}
                            setGroupRef={setGroupRef}
                        />
                        {/* Floor */}
                        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
                            <circleGeometry args={[20, 32]} />
                            <meshStandardMaterial color="#020617" roughness={0.1} metalness={0.8} transparent opacity={0.8} />
                        </mesh>
                    </group>

                    {/* Camera Control uses the groupRef which is now the Group instance */}
                    <CameraController activeIndex={activeIndex} galleryGroupRef={{ current: groupRef }} />
                </Suspense>

                <OrbitControls
                    enabled={activeIndex === null}
                    autoRotate={false}
                    enableZoom={false}
                    enablePan={false}
                    minPolarAngle={Math.PI / 2 - 0.2}
                    maxPolarAngle={Math.PI / 2 + 0.2}
                    rotateSpeed={0.5}
                />
            </Canvas>

            {/* UI Layoer */}
            <div className={`absolute top-8 left-8 z-10 transition-opacity duration-500 ${activeIndex !== null ? 'opacity-0' : 'opacity-100'}`}>
                <h1 className="text-5xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-600 drop-shadow-sm">
                    The Silk Hall
                </h1>
                <p className="text-amber-500/60 font-mono text-xs tracking-[0.4em] mt-2 ml-1">ISAN VIRTUAL GALLERY</p>
            </div>

            <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-center pointer-events-none transition-opacity duration-500 ${activeIndex !== null ? 'opacity-0' : 'opacity-100'}`}>
                <p className="text-white/30 text-[10px] tracking-widest uppercase animate-pulse">
                    Click an image to explore details
                </p>
            </div>

            {activeIndex !== null && (
                <button
                    onClick={() => setActiveIndex(null)}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 px-6 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white text-sm tracking-widest uppercase transition-all border border-white/10 cursor-pointer"
                >
                    Return to Gallery
                </button>
            )}
        </div>
    );
}
