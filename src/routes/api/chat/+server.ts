import { createOpenAI } from '@ai-sdk/openai';
import { StreamingTextResponse, streamText } from 'ai';
import type { RequestHandler } from './$types';

import { env } from '$env/dynamic/private';

const openai = createOpenAI({
	apiKey: env.OPENAI_API_KEY ?? ''
});

export const POST = (async ({ request }) => {
	const { messages, planet } = await request.json();

	const result = await streamText({
		model: openai('gpt-4-turbo-preview'),
		system: `You are a professional ${planet} expert and you answer specfic answers the user has for this planet. Please use a max of 350 character per answer`,
		messages
	});

	return result.toAIStreamResponse();
}) satisfies RequestHandler;
