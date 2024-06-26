/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const request = await fetch(
		'https://api.le-systeme-solaire.net/rest/bodies?filter[]=bodyType,eq,Planet'
	);
	const data = await request.json();
	return {
		bodies: data.bodies
	};
}
