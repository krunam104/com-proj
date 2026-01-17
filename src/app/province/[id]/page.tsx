import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Brain, Share2, Info } from "lucide-react";
import * as motion from "framer-motion/client";
import wisdomData from "@/data/wisdom_data.json";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function ProvincePage({ params }: PageProps) {
    const { id } = await params;

    // Handle legacy ID mapping if necessary
    const lookupId = id === "kamphaeng-phet" ? "amnat-charoen" : id;

    const province = wisdomData.find((p) => p.id === lookupId);

    if (!province) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-cyan-500/30">

            {/* Navigation - Floating */}
            <nav className="fixed top-6 left-6 z-50">
                <Link
                    href="/#map-section"
                    className="flex items-center gap-2 px-4 py-2 bg-slate-900/50 backdrop-blur-md border border-white/10 rounded-full text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 transition-all duration-300 group"
                >
                    <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                    <span className="text-sm font-medium">Back to Map</span>
                </Link>
            </nav>

            {/* Hero Section */}
            <section className="relative h-[40vh] min-h-[400px] flex items-center justify-center overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-b from-blue-950 via-slate-900 to-slate-900 z-0" />
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900 via-slate-900 to-transparent" />

                <div className="container mx-auto px-4 relative z-10 text-center space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-2">
                            {province.name}
                        </h1>
                        <p className="text-xl md:text-2xl text-cyan-400 font-light tracking-wide uppercase">
                            {province.slogan}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Main Content Grid */}
            <section className="container mx-auto px-4 py-12 -mt-20 relative z-20">
                <div className="grid lg:grid-cols-12 gap-12">

                    {/* Left Column: Visual Card */}
                    <motion.div
                        className="lg:col-span-5"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border border-white/10 group bg-slate-800">
                            {/* Image Placeholder - relying on next/image but strictly we don't have images yet, so using a colored div/fallback or the url */}
                            <div className="absolute inset-0 bg-slate-800 flex items-center justify-center text-slate-600">
                                <span className="text-sm">Image: {province.image_url}</span>
                            </div>

                            {/* Simulated Image Load (Gradient overlay) */}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent opacity-60" />

                            <div className="absolute bottom-6 left-6 right-6">
                                <div className="flex items-center gap-2 text-cyan-400 mb-2">
                                    <Info className="w-4 h-4" />
                                    <span className="text-xs uppercase tracking-wider font-bold">Pattern</span>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-1">{province.silk_pattern}</h3>
                                <p className="text-slate-400 text-sm">{province.technique}</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column: AI Knowledge & Description */}
                    <motion.div
                        className="lg:col-span-7 space-y-10"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        {/* AI Insight Card */}
                        <div className="bg-slate-800/50 backdrop-blur-sm border border-cyan-900/30 rounded-2xl p-6 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <Brain className="w-24 h-24 text-cyan-400" />
                            </div>

                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-full bg-cyan-950 flex items-center justify-center border border-cyan-500/30">
                                    <Brain className="w-5 h-5 text-cyan-400" />
                                </div>
                                <h2 className="text-xl font-bold text-white">AI Wisdom Graph</h2>
                            </div>

                            <div className="flex flex-wrap gap-3">
                                {province.ai_tags.map((tag, idx) => (
                                    <span
                                        key={idx}
                                        className="px-4 py-2 rounded-full bg-cyan-950/40 border border-cyan-800/50 text-cyan-300 text-sm font-medium hover:bg-cyan-900/50 hover:border-cyan-500 transition-colors cursor-default"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Description Text */}
                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold text-white">Heritage & History</h2>
                            <div className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full" />
                            <p className="text-lg text-slate-300 leading-relaxed">
                                {province.description}
                            </p>
                            <p className="text-slate-400 leading-relaxed">
                                The textile tradition of <strong>{province.name}</strong> represents a unique intersection of history, geography, and belief.
                                Through the {province.technique}, artisans have preserved their local identity for generations.
                            </p>
                        </div>

                        {/* Action Area */}
                        <div className="flex gap-4 pt-4">
                            <button className="px-8 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-cyan-900/20">
                                View 3D Model
                            </button>
                            <button className="px-6 py-3 border border-slate-700 hover:border-slate-500 text-slate-300 rounded-xl transition-all flex items-center gap-2">
                                <Share2 className="w-4 h-4" /> Share
                            </button>
                        </div>

                    </motion.div>
                </div>
            </section>
        </main>
    );
}
