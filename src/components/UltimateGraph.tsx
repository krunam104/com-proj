"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, ChevronRight, Wand2, Loader2, Share2, Info } from "lucide-react";
import { forceCollide } from "d3-force";
import { fullGraphData, GraphNode } from "@/data/fullGraphData";
import AIWeaverModal from "./AIWeaverModal";

// Dynamically import ForceGraph2D to avoid SSR issues
const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), {
    ssr: false,
});

// Image Mapping for Provinces
const PROVINCE_SILK_IMAGES: Record<string, string> = {
    "Khon Kaen": "/images/silk/khonkaen1.png",
    "Chaiyaphum": "/images/silk/Chaiyaphum1.png",
    "Nakhon Ratchasima": "/images/silk/korat1.png",
    "Nong Bua Lamphu": "/images/silk/Nong Bua Lam Phu1.png",
    "Maha Sarakham": "/images/silk/MahaSarakham1.png",
    "Surin": "/images/silk/Surin1.png",
    "Kalasin": "/images/silk/Kalasin1.png",
    "Sakon Nakhon": "/images/silk/Sakon Nakhon1.png",
    "Buriram": "/images/silk/burirum1.png",
    "Sisaket": "/images/silk/sisaket1.png",
    "Mukdahan": "/images/silk/Mukdahan1.png",
    "Loei": "/images/silk/Loei1.png",
    "Nong Khai": "/images/silk/Nong Khai1.png",
    "Bueng Kan": "/images/silk/Bueng Kan1.png",
    "Nakhon Phanom": "/images/silk/Nakhon Phanom1.png",
    "Udon Thani": "/images/silk/Udon Thani1.png",
    "Roi Et": "/images/silk/Roi Et1.png",
    "Yasothon": "/images/silk/Yasothon1.png",
    "Amnat Charoen": "/images/silk/Amnat Charoen1.png",
    "Ubon Ratchathani": "/images/silk/Ubon1.png"
};

export function UltimateGraph() {
    const fgRef = useRef<any>(null);
    const [nodes, setNodes] = useState(fullGraphData.nodes);
    const [links, setLinks] = useState(fullGraphData.links);
    const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);

    // AI Modal State
    const [isAiModalOpen, setIsAiModalOpen] = useState(false);

    // Auto-rotation state
    const [rotationAngle, setRotationAngle] = useState(0);

    // Screen dimensions
    const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

    useEffect(() => {
        // Update dimensions on window resize
        if (typeof window !== "undefined") {
            const updateDimensions = () => {
                setDimensions({
                    width: window.innerWidth,
                    height: window.innerHeight,
                });
            };

            updateDimensions();
            window.addEventListener("resize", updateDimensions);
            return () => window.removeEventListener("resize", updateDimensions);
        }
    }, []);



    // Initial Zoom and Physics Setup
    useEffect(() => {
        if (fgRef.current) {
            // Apply custom forces for better spreading
            // Collision Force: Essential for preventing text overlap
            fgRef.current.d3Force('collide', forceCollide((node: any) => {
                const baseSize = node.group === 'center' ? 50 : 35; // Visual hierarchy size
                const textLength = (node.name.length * 9); // Approx char width for Arial 14
                return baseSize + textLength + 20; // Balanced collision buffer
            }).strength(0.8)); // Slightly softer for natural movement

            fgRef.current.d3Force('charge').strength(-3000); // Balanced Repulsion
            fgRef.current.d3Force('link').distance(180); // Tighter connections

            // Initial zoom
            setTimeout(() => {
                fgRef.current.zoom(0.8, 1000); // Optimal initial view
            }, 500);
        }
    }, []);

    // Custom Node Rendering
    const paintNode = useCallback((node: any, ctx: CanvasRenderingContext2D, globalScale: number) => {
        const { x, y, group, val } = node;
        if (!Number.isFinite(x) || !Number.isFinite(y)) return;

        // VISUAL UPDATE: Macro Nodes
        const size = group === 'center' ? 45 : 30; // Restored and refined sizes

        // Pulse effect calculation
        const time = Date.now();
        const pulse = (Math.sin(time / 400) + 1) / 2; // 0 to 1
        const glowSize = size + (pulse * 8);

        // Color Logic & styling
        let color = "#FFFFFF";
        let strokeColor = "#ffffff";
        if (group === "province") { color = "#F59E0B"; strokeColor = "#FCD34D"; } // Gold
        if (group === "category") { color = "#06B6D4"; strokeColor = "#67E8F9"; } // Cyan
        if (group === "center") { color = "#FFFFFF"; strokeColor = "#94A3B8"; }

        // Draw Glow
        const gradient = ctx.createRadialGradient(x, y, size * 0.8, x, y, glowSize * 2.5);
        gradient.addColorStop(0, color);
        gradient.addColorStop(1, "rgba(0,0,0,0)");

        ctx.beginPath();
        ctx.arc(x, y, glowSize * 2.5, 0, 2 * Math.PI, false);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Draw Core Node with Stroke
        ctx.beginPath();
        ctx.arc(x, y, size, 0, 2 * Math.PI, false);
        ctx.fillStyle = color;
        ctx.fill();

        ctx.lineWidth = 2;
        ctx.strokeStyle = strokeColor;
        ctx.stroke();

        // Draw Label - VISUAL UPDATE: Premium Typography
        const shouldShowLabel = globalScale > 0.6 || group === 'center' || group === 'category' || group === 'province';

        if (shouldShowLabel) {
            const fontSize = 14; // Standard readable size
            ctx.font = `${group === 'center' ? 'bold' : '500'} ${fontSize}px "Inter", sans-serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            const textWidth = ctx.measureText(node.name).width;
            const bgPadding = 12;
            const bgHeight = fontSize + 12;

            // Refined Text Background
            ctx.fillStyle = 'rgba(15, 23, 42, 0.9)'; // Deep Slate background

            // Pill shape background
            const bgX = x - textWidth / 2 - bgPadding / 2;
            const bgY = y + size + 10;
            const bgW = textWidth + bgPadding;

            ctx.beginPath();
            ctx.roundRect(bgX, bgY, bgW, bgHeight, 6);
            ctx.fill();

            // Border for label
            ctx.strokeStyle = strokeColor;
            ctx.lineWidth = 1;
            ctx.stroke();

            // Text
            ctx.fillStyle = '#F8FAFC'; // Bright white text
            ctx.fillText(node.name, x, bgY + bgHeight / 2 + 1);
        }
    }, []);

    const [categoryImage, setCategoryImage] = useState<string | null>(null);

    // Helper to get random image for a category
    const getCategoryRandomImage = (categoryId: string) => {
        // Find all links where source is this category
        const relatedProvinces = fullGraphData.links
            .filter(link => link.source === categoryId)
            .map(link => link.target);

        // Find province nodes for these IDs
        const provinceNodes = fullGraphData.nodes.filter(node =>
            relatedProvinces.includes(node.id) && node.group === 'province'
        );

        // Get images
        const availableImages: string[] = [];
        provinceNodes.forEach(node => {
            const img = PROVINCE_SILK_IMAGES[node.name];
            if (img) availableImages.push(img);
        });

        if (availableImages.length > 0) {
            const randomIndex = Math.floor(Math.random() * availableImages.length);
            return availableImages[randomIndex];
        }
        return null;
    };

    const handleNodeClick = (node: any) => {
        setSelectedNode(node);

        // If category is clicked, set a random image
        if (node.group === 'category') {
            const randomImg = getCategoryRandomImage(node.id);
            setCategoryImage(randomImg);
        } else {
            setCategoryImage(null);
        }

        // Focus camera on node
        if (fgRef.current) {
            fgRef.current.centerAt(node.x, node.y, 1000);
            fgRef.current.zoom(3, 1000); // Closer zoom on click
        }
    };



    // Starfield state to prevent hydration errors
    const [stars, setStars] = useState<Array<{ top: string; left: string; size: string; shadow: string }>>([]);

    useEffect(() => {
        const newStars = [...Array(50)].map(() => ({
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            size: `${Math.random() * 3}px`,
            shadow: `${Math.random() * 10}px`
        }));
        setStars(newStars);
    }, []);

    return (
        <div className="relative w-full h-screen bg-slate-950 overflow-hidden text-slate-200 font-sans selection:bg-cyan-500/30">

            {/* Background Starfield (Only renders on client to avoid hydration mismatch) */}
            <div className="absolute inset-0 z-0 opacity-40">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black"></div>
                <div className="star-field absolute inset-0 animate-[spin_120s_linear_infinite]">
                    {stars.map((star, i) => (
                        <div
                            key={i}
                            className="absolute bg-white rounded-full opacity-60"
                            style={{
                                top: star.top,
                                left: star.left,
                                width: star.size,
                                height: star.size,
                                boxShadow: `0 0 ${star.shadow} rgba(255, 255, 255, 0.8)`
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Main Graph Area */}
            <div className="absolute inset-0 z-10">
                <ForceGraph2D
                    ref={fgRef}
                    width={dimensions.width}
                    height={dimensions.height}
                    graphData={{ nodes, links }}
                    nodeCanvasObject={paintNode}
                    onNodeClick={handleNodeClick}
                    backgroundColor="rgba(0,0,0,0)"
                    linkColor={() => "rgba(255,255,255,0.15)"}
                    d3AlphaDecay={0.01} // Slower decay for better settling with new forces
                    d3VelocityDecay={0.2}
                    enableZoomInteraction={true}
                    minZoom={0.5}
                    maxZoom={6}
                />
            </div>

            {/* HUD / Overlay Elements */}
            <div className="absolute top-24 left-6 z-20 pointer-events-none">
                <h1 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 drop-shadow-lg tracking-tight">
                    NEXUS <span className="text-white font-thin">CORE</span>
                </h1>
                <p className="text-xs text-cyan-500 font-mono mt-1 tracking-widest">THAI WISDOM ATLAS // SYSTEM ACTIVE</p>
            </div>

            {/* AI Weaver Trigger Button */}
            <div className="absolute top-44 left-6 z-20">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsAiModalOpen(true)}
                    className="group relative flex items-center gap-3 px-6 py-3 md:px-8 md:py-4 bg-slate-900/80 backdrop-blur-xl border border-cyan-500/50 rounded-full shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:shadow-[0_0_50px_rgba(6,182,212,0.6)] transition-all duration-300"
                >
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
                    <span className="text-base md:text-lg font-bold text-white tracking-wide">AI Weaver Protocol</span>
                </motion.button>
            </div>

            {/* Right Sidebar - Node Details */}
            <AnimatePresence>
                {selectedNode && (
                    <motion.div
                        initial={{ x: '100%', opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: '100%', opacity: 0 }}
                        className="absolute top-20 right-0 w-full md:w-[400px] h-[calc(100vh-80px)] bg-slate-900/90 backdrop-blur-2xl border-l border-slate-700 shadow-2xl z-30 flex flex-col"
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setSelectedNode(null)}
                            className="absolute top-4 right-4 p-2 bg-slate-800 rounded-full hover:bg-slate-700 border border-slate-600 transition-colors"
                        >
                            <X className="w-5 h-5 text-slate-300" />
                        </button>

                        {/* Hero Image */}
                        <div className="relative w-full h-64 bg-slate-800 shrink-0 overflow-hidden group">
                            {selectedNode.group === 'province' && PROVINCE_SILK_IMAGES[selectedNode.name] ? (
                                <img
                                    src={PROVINCE_SILK_IMAGES[selectedNode.name]}
                                    alt={selectedNode.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                            ) : selectedNode.group === 'category' && categoryImage ? (
                                <img
                                    src={categoryImage}
                                    alt={selectedNode.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                            ) : selectedNode.img ? (
                                <img src={selectedNode.img} alt={selectedNode.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-700">
                                    <Sparkles className="w-12 h-12 text-slate-600" />
                                </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                            <div className="absolute bottom-4 left-6">
                                <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">{selectedNode.group}</span>
                                <h2 className="text-3xl font-bold text-white mt-1">{selectedNode.name}</h2>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-8 flex-1 overflow-y-auto">
                            <p className="text-lg text-slate-300 leading-relaxed font-light mb-8">
                                {selectedNode.desc || "No data available for this node. Accessing the archives..."}
                            </p>

                            <div className="space-y-4">
                                <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700 hover:border-cyan-500/50 transition-colors group/card">
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 rounded-lg bg-cyan-500/10 text-cyan-400 group-hover/card:bg-cyan-500 group-hover/card:text-white transition-all">
                                            <Info className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-bold mb-1">Wisdom Origin</h4>
                                            <p className="text-sm text-slate-400">Authentic patterns derived from generations of local weavers.</p>
                                        </div>
                                    </div>
                                </div>

                                {selectedNode.group === 'province' && (
                                    <button
                                        onClick={() => setIsAiModalOpen(true)}
                                        className="w-full py-4 mt-6 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl font-bold text-white shadow-lg shadow-cyan-900/40 hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
                                    >
                                        <Wand2 className="w-5 h-5" /> Customize Patterns
                                    </button>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* AI Generation Modal (External Component) */}
            <AIWeaverModal
                isOpen={isAiModalOpen}
                onClose={() => setIsAiModalOpen(false)}
            />

        </div>
    );
}
