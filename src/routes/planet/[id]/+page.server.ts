import { env } from '$env/dynamic/private';
import { planetDetailIsFetching } from '$lib/stores/store.js';
import { createOpenAI, openai } from '@ai-sdk/openai';
import { error } from '@sveltejs/kit';
import { generateText } from 'ai';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	if (!params.id) {
		throw error(404, 'Not found');
	}
	planetDetailIsFetching.set(true);
	const response = await fetch(`https://api.le-systeme-solaire.net/rest/bodies/${params.id}`);
	if (!response.ok) {
		// Handle fetch errors
		throw error(404, 'Not found');
	}
	const data = await response.json();

	const openai = createOpenAI({
		apiKey: env.OPENAI_API_KEY
	});
	const { text } = await generateText({
		model: openai('gpt-4o'),
		prompt: `You are a space expert and your task is to give me a brief introduction with 2 sentences to the planet:   ${data.englishName}  max. 200 characters`
	});
	planetDetailIsFetching.set(false);

	console.log(text);
	if (!data) {
		throw error(404, 'Not found');
	}
	planetDetailIsFetching.set(false);

	return {
		data: data,
		id: params.id,
		text: text
	};
}
