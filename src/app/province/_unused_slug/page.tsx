import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Sparkles, Layers, MapPin } from 'lucide-react';
import { provinces } from '@/data/provinces';

export function generateStaticParams() {
    return provinces.map((p) => ({
        slug: p.id,
    }));
}

export default function ProvincePage({ params }: { params: { slug: string } }) {
    const province = provinces.find((p) => p.id === params.slug);

    if (!province) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-[#020617] relative">
            {/* Background Ambience */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-900/10 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-900/10 blur-[80px] rounded-full pointer-events-none" />

            <div className="max-w-4xl mx-auto px-6 py-12 relative z-10">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 group"
                >
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Map
                </Link>

                <header className="mb-12 border-b border-white/10 pb-8">
                    <div className="flex items-start justify-between flex-wrap gap-4">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-xs font-medium uppercase tracking-wider">
                                    {province.region} Region
                                </span>
                                {province.slogan && (
                                    <span className="text-slate-500 text-sm italic">"{province.slogan}"</span>
                                )}
                            </div>
                            <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-2">
                                {province.name}
                            </h1>
                            <h2 className="text-2xl text-amber-500 font-serif">
                                {province.thaiName}
                            </h2>
                        </div>

                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center shadow-lg transform rotate-3">
                            <Sparkles className="text-white" size={32} />
                        </div>
                    </div>
                </header>

                <div className="grid md:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="md:col-span-2 space-y-10">
                        <section>
                            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                About the Silk
                            </h3>
                            <p className="text-slate-300 leading-loose text-lg">
                                {province.description}
                            </p>
                        </section>

                        <section>
                            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                <Layers size={20} className="text-amber-500" />
                                Unique Features
                            </h3>
                            <div className="grid gap-4">
                                {province.uniqueFeatures.map((feature, idx) => (
                                    <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-amber-500/30 transition-colors">
                                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2.5" />
                                        <p className="text-slate-200">{feature}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
                        <div className="p-6 rounded-2xl bg-indigo-950/20 border border-indigo-500/20">
                            <h4 className="text-sm font-bold text-indigo-300 uppercase tracking-widest mb-4">
                                Signature Patterns
                            </h4>
                            <ul className="space-y-3">
                                {province.patterns.map((pattern, idx) => (
                                    <li key={idx} className="flex items-center gap-3 text-slate-300">
                                        <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center text-[10px] text-slate-500">
                                            IMG
                                        </div>
                                        {pattern}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="p-6 rounded-2xl bg-amber-950/10 border border-amber-500/10">
                            <h4 className="text-sm font-bold text-amber-500/80 uppercase tracking-widest mb-4">
                                Location
                            </h4>
                            <div className="aspect-video bg-slate-900 rounded-lg flex items-center justify-center text-slate-600 mb-2">
                                <MapPin size={24} />
                            </div>
                            <p className="text-xs text-slate-500 text-center">
                                Map Preview
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
