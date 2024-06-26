/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const request = await fetch(
		'https://api.le-systeme-solaire.net/rest/bodies?filter[]=meanRadius,ge,500&filter[]=bodyType,neq,Star&filter[]=bodyType,neq,Moon'
	);
	const data = await request.json();
	return {
		bodies: data.bodies
	};
}
