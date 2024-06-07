<script lang="ts">
	import { tweened } from 'svelte/motion';
	import { HTML, Instance, Outlines, Text, interactivity, useCursor } from '@threlte/extras';
	import { T, useLoader, useTask } from '@threlte/core';
	import { TextureLoader, Texture } from 'three';
	import { journeyStarted } from '$lib/stores/store';
	import Orbit from './Orbit.svelte';
	import { convertDistance } from '$lib/utils';
	import { onMount } from 'svelte';

	interactivity();

	export let name = 'Planet';
	export let position = { x: 0, y: 0, z: 0 };
	export let scaleValue = 1;
	export let semimajorAxis = 2870658186; // In Kilometern
	export let sideralOrbit = 30685.4; // Orbital period in days
	export let rotationSpeed = 0.01; // Rotation speed for visualization
	export let meanRadius = 25362; // Mean radius in Kilometern
	export let eccentricity = 0.0457; // Eccentricity of the orbit
	export let id = 'planet'; // Default texture

	let stopped = false; // Initial state is true because we want to stop initially
	// Variables to hold the texture
	let planetTexture = new Texture();
	let textureLoaded = false; // To track texture loading state

	console.log(`src/public/planets/${id}.jpeg`);

	// Load the sun texture on mount
	onMount(() => {
		const loader = new TextureLoader();
		loader.load(
			`src/public/planets/${id}.jpeg`,
			(texture) => {
				planetTexture = texture;
				textureLoaded = true;
			},
			undefined,
			(err) => {
				console.error('An error occurred loading the texture.', err);
				// Load the fallback texture
				loader.load(
					'src/public/planets/planet.jpeg',
					(fallbackTexture) => {
						planetTexture = fallbackTexture;
						textureLoaded = true;
					},
					undefined,
					(fallbackErr) => {
						console.error('An error occurred loading the fallback texture.', fallbackErr);
					}
				);
			}
		);
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
			x: convertDistance(r) * Math.cos(v),
			y: 0, // Keep the planet on the orbital plane
			z: convertDistance(r) * Math.sin(v)
		};
	}

	const { hovering } = useCursor();

	const onHoverIn = () => {
		hovering.set(true);
		console.log('hover in');
		// scale
		scale.set(1.1);
	};
	const onHoverOut = () => {
		hovering.set(false);
		console.log('hover out');
		scale.set(1);
	};

	let value = '';

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

{#if $hovering || stopped}
	<HTML position.x={position.x - 0.5} position.z={position.z} position.y={position.y + 1}>
		<div class="px-3 py-1.5 rounded-sm bg-muted"><p class="text-sm w-full">{name}</p></div>
	</HTML>
{/if}

<Instance
	position.x={position.x}
	position.z={position.z}
	position.y={position.y}
	scale={($scale * meanRadius) / 25000}
	rotation.y={rotation}
	on:click={clickHandler}
>
	<T.Mesh
		on:click={() => console.log(name)}
		on:pointerenter={onHoverIn}
		on:pointerleave={onHoverOut}
	>
		<T.IcosahedronGeometry args={[1, 6]} />
		<T.MeshStandardMaterial map={planetTexture} />
		{#if stopped}
			<Outlines color="#F59623" opacity={1} thickness={0.03} />
		{/if}
	</T.Mesh>
</Instance>

<Orbit {semimajorAxis} {eccentricity} />
