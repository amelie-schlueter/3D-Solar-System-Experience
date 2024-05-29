<script>
	import { T, useTask } from '@threlte/core';
	import { Instance, InstancedMesh, OrbitControls, Stars } from '@threlte/extras';
	import Sun from './Space/Sun.svelte';
	import Planet from './Space/Planet.svelte';

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
<T.AmbientLight intensity={0.1} />

<Sun />

<InstancedMesh>
	<T.SphereGeometry args={[0.5]} />
	<T.MeshStandardMaterial color="white" />
	<!-- <Planet
		meanRadius={data.bodies[0].meanRadius}
		name={'TestPlanet'}
		scaleValue={1}
		position={{ x: 2, y: 1, z: 1 }}
	/> -->

	{#each data.bodies as body, index}
		<Planet
			meanRadius={body.meanRadius}
			name={`Planet ${index}`}
			scaleValue={1}
			position={{ x: 2 * index, y: 1, z: 1 }}
		/>
	{/each}
</InstancedMesh>
