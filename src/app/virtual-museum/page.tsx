'use client';

import React from 'react';
import VirtualMuseumScene from '@/components/VirtualMuseumScene';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function VirtualMuseumPage() {
    return (
        <main className="w-full h-[calc(100vh-5rem)] relative bg-[#0F172A] overflow-hidden text-white font-sans">
            <VirtualMuseumScene />

            {/* Header / UI Layer */}
            <header className="absolute top-0 left-0 w-full p-6 z-10 flex justify-between items-center pointer-events-none">
                <div className="pointer-events-auto">
                    <Link href="/" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors">
                        <ArrowLeft size={20} />
                        <span className="uppercase tracking-widest text-sm">Back to Atlas</span>
                    </Link>

                </div>
            </header>
        </main>
    );
}
