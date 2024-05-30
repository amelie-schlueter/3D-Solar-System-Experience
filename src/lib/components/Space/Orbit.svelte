<script lang="ts">
	import { T } from '@threlte/core';
	import { CatmullRomCurve3, Vector3 } from 'three';
	import { MeshLineGeometry, MeshLineMaterial } from '@threlte/extras';

	export let semimajorAxis = 2870658186; // Default in Kilometern
	export let eccentricity = 0.0457; // Default eccentricity
	let numPoints = 100; // Number of points for the ellipse

	function convertDistance(distanceInKm: number) {
		return distanceInKm / 1e8; // Scale down for better visualization in Three.js units
	}

	function createEllipsePoints(a: number, e: number, numPoints: number) {
		const b = a * Math.sqrt(1 - e * e); // Calculate the minor axis
		const points = [];
		for (let i = 0; i <= numPoints; i++) {
			const theta = (i / numPoints) * 2 * Math.PI;
			const x = a * Math.cos(theta);
			const z = b * Math.sin(theta);
			points.push(new Vector3(convertDistance(x), 0, convertDistance(z)));
		}
		const curve = new CatmullRomCurve3(points);
		return points;
	}

	const ellipsePoints = createEllipsePoints(semimajorAxis, eccentricity, numPoints);
</script>

<T.Mesh>
	<MeshLineGeometry points={ellipsePoints} />
	<MeshLineMaterial color="lightgray" width={0.01} />
</T.Mesh>
