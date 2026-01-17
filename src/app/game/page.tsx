import { LostWisdomGame } from "@/components/game/LostWisdomGame";

export default function GamePage() {
    return (
        <div className="min-h-[calc(100vh-64px)] w-full flex flex-col items-center justify-center p-6 bg-[#020617]">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-serif font-bold text-white mb-2">Searching for Lost Wisdom</h1>
                <p className="text-slate-400">Identify the correct Isaan silk patterns to preserve the heritage.</p>
            </div>
            <LostWisdomGame />
        </div>
    );
}
