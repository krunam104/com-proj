import { UltimateGraph } from '@/components/UltimateGraph';

export const metadata = {
    title: 'AI Knowledge Graph | Thai Wisdom Atlas',
    description: 'The Neural Network of Silk - Interactive Visualization of Isan Heritage',
};

export default function WisdomGraphPage() {
    return (
        <main className="w-full h-[calc(100vh-5rem)] bg-black overflow-hidden relative">
            <UltimateGraph />
        </main>
    );
}
