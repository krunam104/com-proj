"use client";

import { motion } from "framer-motion";
import { Brain, Network } from "lucide-react";

export function KnowledgeGraphSection() {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center gap-16">

                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex-1 space-y-6"
                    >
                        <div className="inline-flex items-center gap-2 text-cyan-700 font-bold tracking-wide uppercase text-base">
                            <Brain className="w-6 h-6" />
                            <span>The Brain of the System</span>
                        </div>

                        <h2 className="text-4xl md:text-6xl font-bold text-slate-900 leading-tight">
                            AI-Powered Cultural <br /> Knowledge Graph
                        </h2>

                        <p className="text-xl text-slate-700 leading-relaxed font-medium">
                            Discover hidden connections between ancient silk patterns and local beliefs.
                            Our AI analyzes thousands of artifacts to construct a living network of cultural stories,
                            preserving the intangible heritage of Isan.
                        </p>

                        <ul className="space-y-4 pt-4">
                            {[
                                "Pattern Recognition & Classification",
                                "Historical Timeline Mapping",
                                "Semantic Relationship Linking"
                            ].map((item, index) => (
                                <li key={index} className="flex items-center gap-3 text-lg font-medium text-slate-800">
                                    <div className="w-2.5 h-2.5 rounded-full bg-cyan-600" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Right Visual: Graph Animation */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex-1 w-full max-w-[500px]"
                    >
                        <div className="relative aspect-square bg-slate-50 rounded-3xl border border-slate-100 overflow-hidden shadow-lg flex items-center justify-center p-8">
                            {/* Background Graph Pattern */}
                            <div className="absolute inset-0 opacity-[0.03]"
                                style={{
                                    backgroundImage: "radial-gradient(#0F172A 1px, transparent 1px)",
                                    backgroundSize: "20px 20px"
                                }}
                            />

                            {/* Central Node */}
                            <motion.div
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 4, repeat: Infinity }}
                                className="relative z-10 w-24 h-24 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full flex items-center justify-center shadow-2xl shadow-blue-500/30"
                            >
                                <Brain className="w-10 h-10 text-white" />
                            </motion.div>

                            {/* Floating Nodes */}
                            {[0, 1, 2, 3, 4].map((i) => (
                                <motion.div
                                    key={i}
                                    className="absolute w-12 h-12 bg-white rounded-full border border-slate-200 flex items-center justify-center shadow-md text-slate-600"
                                    style={{
                                        top: `${50 + 35 * Math.sin(i * 1.25)}%`,
                                        left: `${50 + 35 * Math.cos(i * 1.25)}%`,
                                    }}
                                    animate={{
                                        y: [0, -10, 0],
                                        boxShadow: ["0 4px 6px -1px rgba(0,0,0,0.1)", "0 10px 15px -3px rgba(0,0,0,0.1)", "0 4px 6px -1px rgba(0,0,0,0.1)"]
                                    }}
                                    transition={{
                                        duration: 3 + i,
                                        repeat: Infinity,
                                        delay: i * 0.5
                                    }}
                                >
                                    <Network className="w-5 h-5 text-cyan-600" />

                                    {/* Lines connecting to center (conceptual, absolute positioning tricky in responsive, using pseudo lines here might be hard, skipping lines for simple DOM, using CSS/SVG for lines is better but simplified here) */}
                                </motion.div>
                            ))}

                            {/* SVG Lines connecting */}
                            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                                {[0, 1, 2, 3, 4].map((i) => (
                                    <motion.line
                                        key={i}
                                        x1="50%"
                                        y1="50%"
                                        x2={`${50 + 35 * Math.cos(i * 1.25)}%`}
                                        y2={`${50 + 35 * Math.sin(i * 1.25)}%`}
                                        stroke="#CBD5E1"
                                        strokeWidth="1"
                                        initial={{ pathLength: 0 }}
                                        whileInView={{ pathLength: 1 }}
                                        transition={{ duration: 1.5, delay: 0.5 }}
                                    />
                                ))}
                            </svg>

                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
