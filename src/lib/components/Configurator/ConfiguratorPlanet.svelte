<script lang="ts">
	import { FakeGlowMaterial, HTML, Outlines, interactivity } from '@threlte/extras';
	import { T, useLoader, useFrame, useTask } from '@threlte/core';
	import { spring } from 'svelte/motion';
	import { AmbientLight, Texture, TextureLoader } from 'three';
	import { tweened } from 'svelte/motion';
	import { onMount } from 'svelte';
	import { configuratorValues } from '$lib/stores/store';
	import { writable } from 'svelte/store';

	let planetTexture = new Texture();
	let textureLoaded = false; // To track texture loading state
	let scaleValue = 1;

	// Load the planet texture
	onMount(() => {
		const loader = new TextureLoader();
		// check if the texture exists

		loader.load(
			'src/lib/images/planets/planet.jpeg',

			(texture) => {
				planetTexture = texture;
				textureLoaded = true;
			},
			undefined,
			(err) => {
				console.log('error loading texture');
			}
		);
	});

	const scale = tweened(scaleValue);

	interactivity();
</script>

<T.Mesh
	position-y={0}
	scale={($scale * $configuratorValues.meanRadius) / 25000}
	rotation-y={100}
	on:click={() => console.log('you clicked on a planet!')}
>
	<!-- Geometry and material for the sun -->
	<T.IcosahedronGeometry args={[1, 6]} />
	<T is={AmbientLight} intensity={2} />
	<T.MeshStandardMaterial color={$configuratorValues.color} />
</T.Mesh>

<style>
	canvas {
		width: 100%;
		height: 100%;
	}
</style>
