import { VirtualMuseum } from "@/components/3d/VirtualMuseum";
import { Box } from "lucide-react";

export default function MuseumPage() {
    return (
        <div className="relative h-[calc(100vh-64px)] w-full overflow-hidden">
            <div className="absolute top-6 left-6 z-10 pointer-events-none">
                <h1 className="text-3xl font-serif font-bold text-white flex items-center gap-3">
                    <Box className="text-amber-400" />
                    Virtual Museum
                </h1>
                <p className="text-slate-400 text-sm max-w-sm mt-2">
                    Experience the patterns in a digital exhibition space.
                </p>
            </div>
            <VirtualMuseum />
        </div>
    );
}
