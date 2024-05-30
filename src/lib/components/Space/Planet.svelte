<script lang="ts">
	import { tweened } from 'svelte/motion';
	import { Instance, Outlines, interactivity } from '@threlte/extras';
	import { T, useLoader, useTask } from '@threlte/core';
	import {
		TextureLoader,
		EllipseCurve,
		Path,
		Vector3,
		BufferGeometry,
		Line,
		LineBasicMaterial,
		InstancedMesh
	} from 'three';
	import { journeyStarted } from '$lib/stores/store';
	import { onDestroy, onMount } from 'svelte';
	import Orbit from './Orbit.svelte';

	const earth = useLoader(TextureLoader).load('src/public/planet.jpeg');

	interactivity();

	export let name = 'Planet';
	export let position = { x: 0, y: 0, z: 0 };
	export let scaleValue = 1;
	export let semimajorAxis = 2870658186; // In Kilometern
	export let sideralOrbit = 30685.4; // Orbital period in days
	export let rotationSpeed = 0.01; // Rotation speed for visualization
	export let meanRadius = 25362; // Mean radius in Kilometern
	export let eccentricity = 0.0457; // Eccentricity of the orbit

	let stopped = false; // Initial state is true because we want to stop initially

	const scale = tweened(scaleValue);
	let rotation = 0;
	let elapsedTime = 0;

	function convertDistance(distanceInKm: number) {
		return distanceInKm / 100000000; // Scale down for better visualization in Three.js units
	}

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
			x: convertDistance(r) * Math.cos(v),
			y: 0, // Keep the planet on the orbital plane
			z: convertDistance(r) * Math.sin(v)
		};
	}

	// Set up the animation task
	const { start, stop } = useTask((delta) => {
		elapsedTime += delta * 50;
		position = calculatePosition(semimajorAxis, sideralOrbit, elapsedTime);
		rotation += rotationSpeed;
	});

	const clickHandler = () => {
		if (!$journeyStarted) {
			return;
		}
		if (stopped) {
			start();
		} else {
			stop();
		}
		stopped = !stopped; // Toggle animation state
	};

	console.log(eccentricity);
</script>

<Instance
	position.x={position.x}
	position.z={position.z}
	position.y={position.y}
	scale={($scale * meanRadius) / 100000}
	rotation.y={rotation}
	on:click={clickHandler}
>
	<T.Mesh on:click={() => console.log(name)}>
		<T.IcosahedronGeometry args={[1, 6]} />
		<T.MeshStandardMaterial map={$earth} />
		{#if stopped}
			<Outlines color="orange" opacity={1} thickness={0.05} />
		{/if}
	</T.Mesh>
</Instance>

<Orbit {semimajorAxis} {eccentricity} />
