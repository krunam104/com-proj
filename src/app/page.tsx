import { HeroSection } from "@/components/landing/HeroSection";
import { EsanSilkMap } from "@/components/landing/EsanSilkMap";
import { VirtualMuseumSection } from "@/components/landing/VirtualMuseumSection";
import { GamificationSection } from "@/components/landing/GamificationSection";

export default function LandingPage() {
  return (
    <main className="flex min-h-screen flex-col bg-slate-50">
      <HeroSection />

      <div id="features" className="relative z-10 space-y-0">
        <EsanSilkMap />
        <VirtualMuseumSection />
        <GamificationSection />
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-8">
            <h3 className="text-3xl font-bold text-white mb-4">Thai Wisdom Atlas</h3>
            <p className="max-w-2xl mx-auto text-lg text-slate-300">
              Preserving the spirit of Isan through technology, storytelling, and community.
            </p>
          </div>
          <p className="text-sm text-slate-500">&copy; 2026 EP/MEP Surathampitak School</p>
        </div>
      </footer>
    </main>
  );
}
