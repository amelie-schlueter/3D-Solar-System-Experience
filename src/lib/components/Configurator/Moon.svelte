<script lang="ts">
	import { tweened } from 'svelte/motion';
	import { HTML, Instance, Outlines, Text, interactivity, useCursor } from '@threlte/extras';
	import { T, useLoader, useTask } from '@threlte/core';
	import { TextureLoader, Texture } from 'three';
	import { defaultPopupContent, journeyStarted, popupContent } from '$lib/stores/store';

	import { convertDistance, convertDistanceSmall } from '$lib/utils';
	import Orbit from '../Space/Orbit.svelte';
	import { onMount } from 'svelte';

	// your script goes here
	export let name = 'Moon';
	export let position = { x: 0, y: 0, z: 0 };
	export let scaleValue = 1;
	export let semimajorAxis = 421800; // In Kilometern
	export let sideralOrbit = 1.76914; // Orbital period in days
	export let rotationSpeed = 0.01; // Rotation speed for visualization
	export let meanRadius = 1821.5; // Mean radius in Kilometern
	export let eccentricity = 0.004; // Eccentricity of the orbit
	export let mainAnomaly = 0;

	// Variables to hold the texture
	let moonTexture = new Texture();
	let textureLoaded = false; // To track texture loading state

	// Load the sun texture on mount
	onMount(() => {
		// rotation = calculateRotationSpeed(sideralOrbit);

		// rotationSpeed = calculateSelfRotationSpeedHours(sideralRotation);
		elapsedTime = (mainAnomaly * sideralOrbit) / (2 * Math.PI); // Startzeit auf Basis der Anomalie
		const loader = new TextureLoader();
		// check if the texture exists

		if (moonTexture.image) {
			textureLoaded = true;
		} else {
			loader.load('/images/moon.jpg', (texture) => {
				moonTexture = texture;
				textureLoaded = true;
			});
		}
	});

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

<HTML position.x={position.x - 0.5} position.z={position.z} position.y={position.y + 1}>
	<div class="px-3 py-1.5 rounded-sm bg-muted">
		<p>{name}</p>
	</div>
</HTML>

<Instance
	position.x={position.x}
	position.z={position.z}
	position.y={position.y}
	scale={($scale * meanRadius) / 2500}
	rotation.y={rotation}
>
	<T.Mesh on:click={() => console.log(name)}>
		<T.IcosahedronGeometry args={[1, 6]} />
		<T.MeshStandardMaterial map={moonTexture} />
	</T.Mesh>
</Instance>

<Orbit {semimajorAxis} {eccentricity} caluclateDistanceSize="small" />

<style>
	/* your styles go here */
</style>
