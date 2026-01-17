import { NextResponse } from 'next/server';

const STABILITY_API_URL = 'https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image';

export async function POST(request: Request) {
    try {
        const apiKey = process.env.STABILITY_API_KEY;

        console.log("AI Weaver: Received request.");
        console.log("AI Weaver: API Key present?", !!apiKey);

        if (!apiKey) {
            console.error("AI Weaver Error: STABILITY_API_KEY is missing from environment variables.");
            return NextResponse.json(
                { error: 'Missing Stability API Key. Check server logs.' },
                { status: 500 }
            );
        }

        const body = await request.json();
        const { prompt } = body;

        if (!prompt) {
            return NextResponse.json(
                { error: 'Prompt is required' },
                { status: 400 }
            );
        }

        // The Secret Sauce: Enhanced Prompt Logic
        // Prepend/Append specific keywords to ensure the result looks like Thai Silk.
        const enhancedPrompt = `${prompt}, Thai Isan Silk pattern, Mudmee texture, traditional woven fabric close-up, intricate geometric details, 8k resolution, photorealistic, macro photography, luxury textile, sharp focus`;

        const negativePrompt = "low quality, blurry, distorted, human face, anatomy, watermark, text, paper texture";

        const response = await fetch(STABILITY_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                text_prompts: [
                    {
                        text: enhancedPrompt,
                        weight: 1,
                    },
                    {
                        text: negativePrompt,
                        weight: -1, // Negative prompt
                    },
                ],
                cfg_scale: 7,
                height: 1024,
                width: 1024,
                samples: 1,
                steps: 30,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Stability API Error:', errorData);

            // Try to extract a meaningful message
            const errorMessage = errorData.message || errorData.error?.message || 'Failed to generate image';

            return NextResponse.json(
                { error: errorMessage, details: errorData },
                { status: response.status }
            );
        }

        const data = await response.json();

        // Stability AI returns an artifacts array with base64 images
        const imageBase64 = data.artifacts[0].base64;

        return NextResponse.json({ image: `data:image/png;base64,${imageBase64}` });

    } catch (error) {
        console.error('Generative Silk API Error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
