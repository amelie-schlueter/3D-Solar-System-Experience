<script lang="ts">
	import { T } from '@threlte/core';
	import { CatmullRomCurve3, Vector3 } from 'three';
	import { MeshLineGeometry, MeshLineMaterial } from '@threlte/extras';

	export let semimajorAxis = 2870658186; // Default in Kilometern
	export let eccentricity = 0.0457; // Default eccentricity
	let numPoints = 1000; // Number of points for the ellipse

	function convertDistance(distanceInKm: number) {
		return distanceInKm / 1e8; // Scale down for better visualization in Three.js units
	}

	function calculateEllipsePointsNew(numPoints: number) {
		const points = [];
		const twoPi = 2 * Math.PI;

		for (let i = 0; i < numPoints; i++) {
			const angle = (i * twoPi) / numPoints; // Winkel in Bogenmaß
			const radius =
				(semimajorAxis * (1 - Math.pow(eccentricity, 2))) / (1 + eccentricity * Math.cos(angle)); // Polarformel für Ellipse

			// Umrechnung von Polar- zu kartesischen Koordinaten
			const x = radius * Math.cos(angle);
			const y = radius * Math.sin(angle);
			points.push(new Vector3(convertDistance(x), 0, convertDistance(y)));
			// points.push({ x, y });
		}
		return points;
	}

	const ellipsePoints = calculateEllipsePointsNew(numPoints);
</script>

<T.Mesh>
	<MeshLineGeometry points={ellipsePoints} />
	<MeshLineMaterial color="lightgray" width={0.02} />
</T.Mesh>
