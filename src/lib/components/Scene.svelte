<script lang="ts">
	import { T, useTask } from '@threlte/core';
	import { Instance, InstancedMesh, OrbitControls, Stars } from '@threlte/extras';
	import Sun from './Space/Sun.svelte';
	import Planet from './Space/Planet.svelte';
	import { cameraControls } from '$lib/stores/store';
	import Orbit from './Space/Orbit.svelte';

	export let data;
</script>

<T.PerspectiveCamera
	makeDefault
	position={[10, 10, 10]}
	on:create={({ ref }) => {
		ref.lookAt(0, 0, 0);
	}}
>
	<OrbitControls />
</T.PerspectiveCamera>
<Stars />
<!-- <T.AmbientLight intensity={0.1} /> -->

<Sun />

<InstancedMesh>
	<T.SphereGeometry args={[0.5]} />
	<T.MeshStandardMaterial color="white" />

	{#each data.bodies as body}
		<Planet
			meanRadius={body.meanRadius}
			name={body.name}
			scaleValue={1}
			semimajorAxis={body.semimajorAxis}
			sideralOrbit={body.sideralOrbit}
			eccentricity={body.eccentricity}
			id={body.id}
		/>
	{/each}
</InstancedMesh>
