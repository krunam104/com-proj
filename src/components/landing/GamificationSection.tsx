"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Gamepad2, Award, Shield } from "lucide-react"; // Using Gamepad2 for better icon

export function GamificationSection() {
    return (
        <section className="py-24 bg-white relative">
            <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">

                {/* Left Visual: Game HUD Card */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="order-2 lg:order-1 relative"
                >
                    {/* The HUD Card */}
                    <div className="relative bg-slate-900 rounded-3xl p-6 border border-slate-800 shadow-2xl overflow-hidden max-w-md mx-auto transform rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
                        {/* Background Grid */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />

                        {/* Header */}
                        <div className="flex justify-between items-center mb-6 relative z-10">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-cyan-900/50 border border-cyan-500 flex items-center justify-center">
                                    <span className="text-cyan-400 font-bold">P1</span>
                                </div>
                                <div>
                                    <h4 className="text-white font-bold">Explorer</h4>
                                    <p className="text-cyan-400 text-xs">Level 5 Guardian</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-slate-400 text-xs uppercase tracking-widest">Score</p>
                                <p className="text-white font-mono text-xl">2,450 XP</p>
                            </div>
                        </div>

                        {/* Mission Log */}
                        <div className="space-y-3 mb-6 relative z-10">
                            <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700 flex items-center gap-3">
                                <div className="p-2 bg-green-500/20 rounded-md text-green-400">
                                    <Award className="w-5 h-5" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-slate-200 text-sm font-medium">Collect Silk Pattern: Khon Kaen</p>
                                    <div className="w-full bg-slate-700 h-1.5 rounded-full mt-2">
                                        <div className="bg-green-500 h-1.5 rounded-full w-full" />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700 flex items-center gap-3">
                                <div className="p-2 bg-cyan-500/20 rounded-md text-cyan-400">
                                    <Shield className="w-5 h-5" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-slate-200 text-sm font-medium">Guardian of Wisdom</p>
                                    <div className="w-full bg-slate-700 h-1.5 rounded-full mt-2">
                                        <div className="bg-cyan-400 h-1.5 rounded-full w-[60%]" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="relative z-10 pt-4 border-t border-slate-800 flex justify-between items-center">
                            <span className="text-slate-500 text-xs font-mono">ID: 8829-WISDOM</span>
                            <div className="flex gap-1">
                                <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                                <div className="w-2 h-2 rounded-full bg-yellow-400" />
                                <div className="w-2 h-2 rounded-full bg-green-400" />
                            </div>
                        </div>
                    </div>

                    {/* Background Decor */}
                    <div className="absolute top-10 -right-10 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl -z-10" />
                    <div className="absolute -bottom-5 -left-5 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl -z-10" />

                </motion.div>

                {/* Right Content */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="order-1 lg:order-2 space-y-6"
                >
                    <div className="inline-flex items-center gap-2 text-indigo-700 font-bold tracking-wide uppercase text-base">
                        <Gamepad2 className="w-6 h-6" />
                        <span>The Lost Wisdom Quest</span>
                    </div>

                    <h2 className="text-4xl md:text-6xl font-bold text-slate-900 leading-tight">
                        Learn Through Play
                    </h2>

                    <p className="text-xl text-slate-700 leading-relaxed font-medium">
                        Embark on a journey across 20 provinces. Collect distinct silk patterns, unlock lore,
                        and earn your place as a "Guardian of Wisdom". Education meets entertainment.
                    </p>

                    <Link href="/game/dashboard" className="mt-6 inline-block px-10 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-lg font-bold rounded-xl shadow-xl hover:shadow-indigo-500/40 hover:scale-105 transition-all duration-300">
                        Start Quest
                    </Link>
                </motion.div>

            </div>
        </section>
    );
}
