<script lang="ts">
	import { cubicIn, cubicOut } from 'svelte/easing';
	import { tweened } from 'svelte/motion';
	import { derived } from 'svelte/store';
	import { Instance } from '@threlte/extras';
	import { T, useLoader, useTask } from '@threlte/core';
	import { TextureLoader } from 'three';

	const earth = useLoader(TextureLoader).load('src/public/sun.jpeg');

	export let name = 'Planet';
	export let position = { x: 1, y: 2, z: 3 };
	export let scaleValue = 1;
	export let rotationSpeed = 0.01;
	export let meanRadius = 1; // Add meanRadius property
	const scale = tweened(scaleValue);

	let rotation = 0;
	useTask((delta) => {
		rotation += delta * 0.15;
	});
</script>

<Instance
	position.x={position.x}
	position.z={position.z}
	position.y={position.y}
	rotation.y={rotation}
	scale={($scale * meanRadius) / 100000}
>
	<T.Mesh>
		<T.IcosahedronGeometry args={[1, 6]} />
		<T.MeshStandardMaterial map={$earth} />
	</T.Mesh>
</Instance>
