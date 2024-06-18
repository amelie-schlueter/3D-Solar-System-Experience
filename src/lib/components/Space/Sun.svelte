<script>
	import { FakeGlowMaterial, Outlines, interactivity } from '@threlte/extras';
	import { T, useLoader, useFrame } from '@threlte/core';
	import { spring } from 'svelte/motion';
	import { AmbientLight, Texture, TextureLoader } from 'three';
	import { onMount } from 'svelte';

	// Variables to hold the texture
	let earthTexture = new Texture();
	let textureLoaded = false; // To track texture loading state

	// Load the sun texture on mount
	onMount(() => {
		const loader = new TextureLoader();
		loader.load(
			'src/lib/images/sun.jpeg',
			(texture) => {
				earthTexture = texture;
				textureLoaded = true;
			},
			undefined,
			(err) => {
				console.error('An error occurred loading the texture.', err);
			}
		);
	});

	// Enable interactivity
	interactivity();

	// Set up a spring for scaling
	const scale = spring(1.75);

	// Variable to hold rotation value
	let rotation = 0;

	// Update rotation on every frame

	useFrame((dt) => {
		//@ts-ignore
		rotation += dt * 0.15;
	});
</script>

<!-- Ensure meshes are rendered only if the texture is loaded -->
{#if textureLoaded}
	<!-- Create the first 3D Mesh -->
	<T.Mesh rotation-y={rotation} position-y={0} scale={$scale} on:click={() => console.log('sun')}>
		<!-- Geometry and material for the sun -->
		<T.IcosahedronGeometry args={[1, 6]} />
		<T is={AmbientLight} intensity={0.3} />
		<T.MeshStandardMaterial map={earthTexture} />
		<FakeGlowMaterial glowColor="orange" glowInternalRadius={20} />
		<Outlines color="orange" opacity={0.5} thickness={0.005} />
	</T.Mesh>

	<!-- Create the second (smaller) 3D Mesh -->
	<T.Mesh rotation-y={rotation * 1.4} position-y={0} scale={$scale} on:click={() => {}}>
		<!-- Geometry and material for the second sun-like object -->
		<T.IcosahedronGeometry args={[1, 4]} />
		<T.MeshStandardMaterial map={earthTexture} />
	</T.Mesh>
{/if}
