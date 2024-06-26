import { createOpenAI } from '@ai-sdk/openai';
import { generateText } from 'ai'; // Removed unused imports: StreamingTextResponse, streamText
import type { RequestHandler } from './$types';

import { env } from '$env/dynamic/private';

const openai = createOpenAI({
	apiKey: env.OPENAI_API_KEY ?? ''
});

export const POST: RequestHandler = async ({ request }) => {
	const { text } = await generateText({
		model: openai('gpt-4-turbo-preview'),
		prompt: 'Write a vegetarian lasagna recipe for 4 people.'
	});

	return new Response(JSON.stringify(text), {
		headers: {
			'Content-Type': 'application/json'
		}
	});
};
