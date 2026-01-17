"use client";

import { motion } from "framer-motion";
import { ArrowRight, Map } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#F8FAFC]">
            {/* Background Abstract Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.1)_1px,transparent_1px)] bg-[size:60px_60px]" />
                <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-blue-400/10 rounded-full blur-[120px] mix-blend-multiply animate-pulse" />
                <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-cyan-400/10 rounded-full blur-[100px] mix-blend-multiply" />
            </div>

            <div className="container mx-auto px-4 relative z-10 flex flex-col items-center justify-center">
                <div className="max-w-5xl text-center space-y-10">

                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/80 backdrop-blur-md border border-slate-200 shadow-sm text-slate-600 text-sm font-semibold tracking-wide uppercase transition-all hover:bg-white hover:shadow-md hover:scale-105 cursor-default">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
                            </span>
                            Live Beta Version
                        </div>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-slate-900 leading-[1.1] drop-shadow-sm"
                    >
                        Thai Wisdom Atlas
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-cyan-600 to-teal-500 animate-gradient-x">
                            Isan Heritage
                        </span>
                        <br />
                        <span className="text-slate-800">in the Digital World</span>
                    </motion.h1>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-medium"
                    >
                        Preserving culture with cutting-edge technology. Explore the silk wisdom of 20&nbsp;provinces through AI and Interactive Maps.
                    </motion.p>

                    {/* Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-center gap-6 justify-center pt-2"
                    >
                        <button
                            onClick={() => document.getElementById('isan-silk-map')?.scrollIntoView({ behavior: 'smooth' })}
                            className="group relative inline-flex h-16 items-center justify-center overflow-hidden rounded-2xl bg-slate-900 px-12 text-lg font-bold text-white shadow-xl shadow-slate-900/20 transition-all duration-300 hover:bg-slate-800 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
                        >
                            <span className="mr-3">Start Exploring</span>
                            <Map className="w-6 h-6 transition-transform group-hover:translate-x-1" />
                            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-cyan-500 to-blue-600 opacity-0 transition-opacity duration-300 group-hover:opacity-10" />
                        </button>

                        <Link href="/wisdom-graph" className="text-slate-600 text-lg font-semibold px-8 py-4 rounded-2xl hover:bg-slate-100/80 transition-all flex items-center gap-3 group">
                            Learn More <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1 text-slate-400 group-hover:text-slate-900" />
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
