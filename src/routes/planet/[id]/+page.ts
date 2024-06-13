import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	if (!params.id) {
		throw error(404, 'Not found');
	}
	const response = await fetch(`https://api.le-systeme-solaire.net/rest/bodies/${params.id}`);
	if (!response.ok) {
		// Handle fetch errors
		throw error(404, 'Not found');
	}
	const data = await response.json();
	console.log(data);
	if (!data) {
		throw error(404, 'Not found');
	}

	return {
		data: data,
		id: params.id
	};
}
