'use client';

import { useEffect, useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { provinces } from '@/data/provinces';
import { useRouter } from 'next/navigation';

// Dynamic import to avoid SSR issues with canvas/window
const ForceGraph2D = dynamic(() => import('react-force-graph-2d'), { ssr: false });

export function KnowledgeGraph() {
    const router = useRouter();
    const [dimensions, setDimensions] = useState({ w: 800, h: 600 });

    useEffect(() => {
        setDimensions({ w: window.innerWidth, h: window.innerHeight - 64 });
        const handleResize = () => setDimensions({ w: window.innerWidth, h: window.innerHeight - 64 });
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const graphData = useMemo(() => {
        const nodes = provinces.map(p => ({
            id: p.id,
            name: p.name,
            group: p.region,
            val: 20 + p.uniqueFeatures.length * 5, // Size based on richness of features
        }));

        const links: { source: string; target: string }[] = [];

        // Connect provinces in the same region
        for (let i = 0; i < provinces.length; i++) {
            for (let j = i + 1; j < provinces.length; j++) {
                const p1 = provinces[i];
                const p2 = provinces[j];

                // Connect by Region
                if (p1.region === p2.region) {
                    links.push({ source: p1.id, target: p2.id });
                }

                // Connect by Shared Keywords in Features (rudimentary AI connection)
                const allFeatures1 = [...p1.uniqueFeatures, ...p1.patterns].join(' ').toLowerCase();
                const allFeatures2 = [...p2.uniqueFeatures, ...p2.patterns].join(' ').toLowerCase();

                const keywords = ['ikat', 'indigo', 'silk', 'cotton', 'khid', 'naga', 'dye'];
                const shared = keywords.filter(k => allFeatures1.includes(k) && allFeatures2.includes(k));

                if (shared.length > 0) {
                    links.push({ source: p1.id, target: p2.id });
                }
            }
        }

        return { nodes, links };
    }, []);

    return (
        <div className="w-full h-full bg-[#020617]">
            <ForceGraph2D
                width={dimensions.w}
                height={dimensions.h}
                graphData={graphData}
                nodeLabel="name"
                nodeColor={node => {
                    switch ((node as any).group) {
                        case 'Central': return '#f59e0b'; // Amber
                        case 'Southern': return '#ef4444'; // Red
                        case 'Northern': return '#3b82f6'; // Blue
                        case 'Mekong': return '#10b981'; // Emerald
                        default: return '#ffffff';
                    }
                }}
                linkColor={() => 'rgba(255,255,255,0.1)'}
                nodeRelSize={6}
                onNodeClick={(node) => {
                    router.push(`/province/${node.id}`);
                }}
                backgroundColor="#020617"
            />
            <div className="absolute bottom-8 left-8 bg-black/50 p-4 rounded-lg backdrop-blur-sm border border-white/10 pointer-events-none">
                <h3 className="text-white font-bold mb-2">Wisdom Connections</h3>
                <div className="space-y-1 text-xs text-gray-400">
                    <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-amber-500"></span> Central</div>
                    <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-red-500"></span> Southern</div>
                    <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-blue-500"></span> Northern</div>
                    <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-emerald-500"></span> Mekong</div>
                </div>
            </div>
        </div>
    );
}
