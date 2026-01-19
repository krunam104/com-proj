'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Home, Map as MapIcon, Box, Gamepad2, Share2, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { useLanguage } from '@/context/LanguageContext';

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { t } = useLanguage();

    const navItems = [
        { href: '/', icon: <MapIcon size={20} />, label: t({ th: 'สำรวจแผนที่', en: 'Explore Map' }) },
        { href: '/wisdom-graph', icon: <Share2 size={20} />, label: t({ th: 'กราฟภูมิปัญญา', en: 'AI Graph' }) },
        { href: '/virtual-museum', icon: <Box size={20} />, label: t({ th: 'พิพิธภัณฑ์เสมือน', en: 'Virtual Museum' }) },
        { href: '/game/dashboard', icon: <Gamepad2 size={20} />, label: t({ th: 'ปริศนาภูมิปัญญา', en: 'Lost Wisdom' }) },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-lg border-b border-amber-500/20 shadow-xl">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center group-hover:scale-105 transition-transform shadow-lg shadow-amber-900/20">
                        <span className="text-white font-bold text-base">TH</span>
                    </div>
                    <span className="text-white font-serif text-xl md:text-2xl tracking-wide drop-shadow-sm group-hover:text-amber-100 transition-colors">Thai Wisdom Atlas</span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    {navItems.map((item) => (
                        <NavLink key={item.href} href={item.href} icon={item.icon} label={item.label} />
                    ))}

                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-white hover:text-amber-400 transition-colors p-2"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-slate-900 border-b border-slate-800 overflow-hidden"
                    >
                        <div className="flex flex-col p-6 space-y-4">
                            {navItems.map((item) => (
                                <MobileNavLink key={item.href} href={item.href} icon={item.icon} label={item.label} onClick={() => setIsOpen(false)} />
                            ))}

                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}

function NavLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
    return (
        <Link
            href={href}
            className="flex items-center gap-2 text-slate-100 hover:text-amber-400 transition-all duration-300 text-sm lg:text-base font-semibold uppercase tracking-wide hover:drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]"
        >
            {icon}
            <span className="hidden lg:inline">{label}</span>
            <span className="lg:hidden">{label.split(' ')[0]}</span>
        </Link>
    );
}

function MobileNavLink({ href, icon, label, onClick }: { href: string; icon: React.ReactNode; label: string; onClick: () => void }) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className="flex items-center gap-4 text-slate-100 p-3 rounded-lg hover:bg-slate-800 hover:text-amber-400 transition-all"
        >
            <div className="text-amber-500">{icon}</div>
            <span className="text-lg font-medium tracking-wide">{label}</span>
        </Link>
    );
}
