<script lang="ts">
	import { tweened } from 'svelte/motion';
	import { HTML, Instance, Outlines, Text, interactivity, useCursor } from '@threlte/extras';
	import { T, useLoader, useTask } from '@threlte/core';
	import { TextureLoader, Texture } from 'three';
	import { defaultPopupContent, journeyStarted, popupContent } from '$lib/stores/store';

	import { convertDistance, convertDistanceSmall } from '$lib/utils';
	import Orbit from '../Space/Orbit.svelte';

	// your script goes here
	export let name = 'Moon';
	export let position = { x: 0, y: 0, z: 0 };
	export let scaleValue = 1;
	export let semimajorAxis = 421800; // In Kilometern
	export let sideralOrbit = 1.76914; // Orbital period in days
	export let rotationSpeed = 0.01; // Rotation speed for visualization
	export let meanRadius = 1821.5; // Mean radius in Kilometern
	export let eccentricity = 0.004; // Eccentricity of the orbit

	const scale = tweened(scaleValue);
	let rotation = 0;
	let elapsedTime = 0;

	export function calculatePosition(
		semimajorAxis: number,
		sideralOrbit: number,
		elapsedTime: number
	) {
		const M = ((2 * Math.PI) / sideralOrbit) * (elapsedTime % sideralOrbit); // Mean anomaly
		let E = M; // Initial estimate of eccentric anomaly
		const e = eccentricity;

		// Solving Kepler's equation using the Newton-Raphson method
		const tolerance = 1e-6;
		while (true) {
			const deltaE = (M - (E - e * Math.sin(E))) / (1 - e * Math.cos(E));
			E += deltaE;
			if (Math.abs(deltaE) < tolerance) break;
		}

		// Calculate true anomaly from eccentric anomaly
		const v =
			2 * Math.atan2(Math.sqrt(1 + e) * Math.sin(E / 2), Math.sqrt(1 - e) * Math.cos(E / 2));
		const r = semimajorAxis * (1 - e * Math.cos(E)); // Calculate distance

		return {
			x: convertDistanceSmall(r) * Math.cos(v),
			y: 0, // Keep the planet on the orbital plane
			z: convertDistanceSmall(r) * Math.sin(v)
		};
	}

	const { start, stop } = useTask((delta) => {
		elapsedTime += delta * 0.1;
		position = calculatePosition(semimajorAxis, sideralOrbit, elapsedTime);
		rotation += rotationSpeed;
	});
</script>

<Instance
	position.x={position.x}
	position.z={position.z}
	position.y={position.y}
	scale={($scale * meanRadius) / 25000}
	rotation.y={rotation}
>
	<T.Mesh on:click={() => console.log(name)}>
		<T.IcosahedronGeometry args={[1, 6]} />
		<T.MeshStandardMaterial color="white" />
	</T.Mesh>
</Instance>

<Orbit {semimajorAxis} {eccentricity} caluclateDistanceSize="small" />

<style>
	/* your styles go here */
</style>
