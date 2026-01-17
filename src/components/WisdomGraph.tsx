"use client";

import React, { useRef, useState, useCallback, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { graphData } from '@/data/graphData';

// Dynamic import to avoid SSR issues with react-force-graph
const ForceGraph2D = dynamic(() => import('react-force-graph-2d'), {
    ssr: false,
    loading: () => <div className="flex justify-center items-center h-full text-cyan-400">Loading Neural Network...</div>
});

const WisdomGraph = () => {
    const fgRef = useRef<any>(null);
    const [highlightNodes, setHighlightNodes] = useState(new Set<string>());
    const [highlightLinks, setHighlightLinks] = useState(new Set<any>());
    const [hoverNode, setHoverNode] = useState<any>(null);
    const [aiInsight, setAiInsight] = useState<string | null>("Initialize AI Scan... Select a node to analyze.");

    // Memoize data to prevent unnecessary re-renders
    const gData = useMemo(() => graphData, []);

    const handleNodeClick = useCallback((node: any) => {
        // 1. Zoom to node
        if (fgRef.current) {
            fgRef.current.centerAt(node.x, node.y, 1000);
            fgRef.current.zoom(6, 2000);
        }

        // 2. Generate AI Insight based on Group/ID
        let insight = "";
        if (node.group === 1) {
            insight = "AI Analysis: 'Isan Wisdom' is the core heritage system, branching into specialized categories like Mudmee, Beliefs, and regional Craftsmanship.";
        } else if (node.group === 2) {
            // Find connected provinces
            const connectedLinks = gData.links.filter((l: any) => (typeof l.source === 'object' ? l.source.id : l.source) === node.id);
            const provinces = connectedLinks.map((l: any) => (typeof l.target === 'object' ? l.target.id : l.target));
            insight = `AI Analysis: '${node.id}' is a dominant technique/concept concentrated in ${provinces.join(', ')}.`;
        } else if (node.group === 3) {
            // Find parent category
            const parentLink = gData.links.find((l: any) => (typeof l.target === 'object' ? l.target.id : l.target) === node.id);
            const parent = parentLink ? (typeof parentLink.source === 'object' ? (parentLink.source as any).id : parentLink.source) : "Isan Wisdom";

            // Specific logic for requested insights
            if (["Sakon Nakhon", "Buriram"].includes(node.id) && parent === "Natural Dye") {
                insight = `AI Analysis: ${node.id} is linked by 'Natural Dye' techniques using local resources (Volcanic soil, Ebony, Indigo).`;
            } else {
                insight = `AI Analysis: ${node.id} serves as a key heritage site for preserving '${parent}'.`;
            }
        }
        setAiInsight(insight);

        // 3. Highlight connections
        setHighlightNodes(new Set([node.id]));
        setHighlightLinks(new Set());
    }, [gData]);

    // Styling Functions
    const getNodeColor = (node: any) => {
        if (node.group === 1) return '#ffffff'; // Core: White
        if (node.group === 2) return '#00ffff'; // Categories: Cyan/Electric Blue
        return '#ffbf00'; // Provinces: Gold/Orange
    };

    const getNodeVal = (node: any) => node.val;

    return (
        <div className="relative w-full h-full bg-slate-900 border border-slate-700/50 rounded-xl overflow-hidden shadow-2xl">
            {/* UI Overlay */}
            <div className="absolute top-4 left-4 z-10 max-w-sm pointer-events-none">
                <div className="bg-slate-900/80 backdrop-blur-md p-4 rounded-lg border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                    <h3 className="text-cyan-400 font-mono text-xs uppercase tracking-widest mb-2">
                        AI Knowledge Graph System
                    </h3>
                    <p className="text-slate-200 text-sm font-light leading-relaxed font-mono">
                        {aiInsight}
                        <span className="animate-pulse inline-block w-2 h-4 bg-cyan-400 ml-1 align-bottom" />
                    </p>
                </div>
            </div>

            <ForceGraph2D
                ref={fgRef}
                graphData={gData}
                backgroundColor="#0F172A" // Deep Tech Blue / Slate 900
                nodeLabel="label"
                nodeColor={getNodeColor}
                nodeVal={getNodeVal}
                linkColor={() => 'rgba(255,255,255,0.2)'}
                linkWidth={1}
                onNodeClick={handleNodeClick}
                cooldownTicks={100}
                onEngineStop={() => {
                    // Initial zoom out to see everything nicely
                    if (fgRef.current) {
                        fgRef.current.zoomToFit(400, 50);
                    }
                }}

                // Particles/Glow effects
                nodeCanvasObject={(node: any, ctx, globalScale) => {
                    const label = node.label;
                    const fontSize = 12 / globalScale;
                    ctx.font = `${fontSize}px Sans-Serif`;
                    const textWidth = ctx.measureText(label).width;
                    const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2); // some padding

                    // Draw Node Glow
                    const color = getNodeColor(node);
                    ctx.beginPath();
                    ctx.arc(node.x, node.y, node.val * 0.5, 0, 2 * Math.PI, false);
                    ctx.fillStyle = color;
                    ctx.shadowBlur = 15;
                    ctx.shadowColor = color;
                    ctx.fill();

                    // Reset shadow for text
                    ctx.shadowBlur = 0;
                    ctx.shadowColor = 'transparent';

                    // Draw Text
                    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(label, node.x, node.y + node.val * 0.5 + 4); // Offset text below node

                    // Interactivity circle (invisible, triggers click)
                    node.__bckgDimensions = bckgDimensions; // to re-use in nodePointerAreaPaint
                }}
                nodePointerAreaPaint={(node: any, color, ctx) => {
                    ctx.fillStyle = color;
                    const bckgDimensions = node.__bckgDimensions;
                    // slightly larger area for easier clicking
                    ctx.beginPath();
                    ctx.arc(node.x, node.y, node.val * 0.7, 0, 2 * Math.PI, false);
                    ctx.fill();
                }}
            />
        </div>
    );
};

export default WisdomGraph;
