/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const request = await fetch(
		'https://api.le-systeme-solaire.net/rest/bodies?filter%5B%5D=bodyType,ew,Planet'
	);
	const data = await request.json();
	return {
		bodies: data.bodies
	};
}
