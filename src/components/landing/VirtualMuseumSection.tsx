"use client";

import { motion } from "framer-motion";
import { VirtualMuseumScene } from "@/components/VirtualMuseumScene";
import Link from 'next/link';
import { ArrowRight, Box } from 'lucide-react';

export function VirtualMuseumSection() {
    return (
        <section className="py-24 bg-slate-50 relative">
            <div className="container mx-auto px-4 text-center">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12 space-y-4"
                >
                    <span className="text-cyan-700 font-bold tracking-wide uppercase text-base">Immersive Experience</span>
                    <h2 className="text-4xl md:text-6xl font-bold text-slate-900 leading-tight">Virtual Museum 360°</h2>
                    <p className="max-w-3xl mx-auto text-xl text-slate-700 leading-relaxed font-medium">
                        Step into the virtual gallery. Experience the intricate details of Isan Silk in a 360-degree interactive exhibition.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative w-full max-w-6xl mx-auto h-[600px] md:h-[700px] bg-black rounded-3xl overflow-hidden shadow-2xl border border-slate-800"
                >
                    <VirtualMuseumScene isPreview={true} />

                    {/* Overlay CTA */}
                    <div className="absolute bottom-8 right-8 z-10">
                        <Link
                            href="/virtual-museum"
                            className="group flex items-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-full pl-6 pr-2 py-2 text-white font-bold transition-all hover:scale-105 hover:border-amber-400/50"
                        >
                            <span>Enter Full Experience</span>
                            <div className="bg-[#F59E0B] rounded-full p-2 text-slate-900 group-hover:rotate-[-45deg] transition-transform">
                                <ArrowRight size={20} />
                            </div>
                        </Link>
                    </div>

                    {/* Interactive Hint */}
                    <div className="absolute top-8 left-8 z-10 pointer-events-none opacity-70">
                        <div className="flex items-center gap-2 text-white/80 bg-black/40 backdrop-blur px-3 py-1.5 rounded-lg border border-white/10 text-sm">
                            <Box size={16} className="text-[#F59E0B]" />
                            <span>Drag to Explore • Click hotspots</span>
                        </div>
                    </div>

                </motion.div>

            </div>
        </section>
    );
}
