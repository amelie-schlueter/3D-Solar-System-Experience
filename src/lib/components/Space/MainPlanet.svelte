<script lang="ts">
	import { FakeGlowMaterial, HTML, Outlines, interactivity } from '@threlte/extras';
	import { T, useLoader, useFrame } from '@threlte/core';
	import { spring } from 'svelte/motion';
	import { AmbientLight, Texture, TextureLoader } from 'three';
	import { tweened } from 'svelte/motion';
	import { onMount } from 'svelte';

	export let name = 'Planet';
	export let id = 'planet'; // Default texture ID
	export let meanRadius = 1;
	export let scaleValue = 1;

	let planetTexture = new Texture();
	let textureLoaded = false; // To track texture loading state

	// Load the planet texture
	onMount(() => {
		const loader = new TextureLoader();
		// check if the texture exists

		loader.load(
			`/images/planets/${id}.jpeg`,

			(texture) => {
				planetTexture = texture;
				textureLoaded = true;
			},
			undefined,
			(err) => {
				// Load the fallback texture
				loader.load(
					'src/lib/images/planets/planet.jpeg',
					(fallbackTexture) => {
						planetTexture = fallbackTexture;
						textureLoaded = true;
					},
					undefined
				);
			}
		);
	});

	const scale = tweened(scaleValue);
	let rotation = 0;

	// Enable interactivity
	interactivity();

	// Update rotation on every frame
</script>

{#if textureLoaded}
	<T.Mesh
		rotation-y={rotation}
		position-y={0}
		scale={($scale * meanRadius) / 25000}
		on:click={() => console.log('you clicked on a planet!')}
	>
		<!-- Geometry and material for the sun -->
		<T.IcosahedronGeometry args={[1, 6]} />
		<T is={AmbientLight} intensity={2} />
		<T.MeshStandardMaterial map={planetTexture} />
	</T.Mesh>
{/if}

<style>
	canvas {
		width: 100%;
		height: 100%;
	}
</style>
