import { KnowledgeGraph } from "@/components/graph/KnowledgeGraph";
import { Share2 } from "lucide-react";

export default function GraphPage() {
    return (
        <div className="relative min-h-[calc(100vh-64px)] overflow-hidden">
            <div className="absolute top-6 left-6 z-10">
                <h1 className="text-3xl font-serif font-bold text-white flex items-center gap-3">
                    <Share2 className="text-indigo-400" />
                    AI Wisdom Graph
                </h1>
                <p className="text-slate-400 text-sm max-w-sm mt-2">
                    Visualizing the interconnected web of techniques, patterns, and cultural heritage across Isaan.
                </p>
            </div>
            <KnowledgeGraph />
        </div>
    );
}
