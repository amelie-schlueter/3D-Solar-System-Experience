<script lang="ts">
	import { T, useTask } from '@threlte/core';
	import { HTML, Instance, InstancedMesh, OrbitControls, Stars } from '@threlte/extras';
	import Sun from '../Space/Sun.svelte';
	import Planet from '../Space/Planet.svelte';

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
<Stars count={20000} depth={200} />
<T.AmbientLight intensity={1} />

<Sun />

<InstancedMesh>
	<T.SphereGeometry args={[0.5]} />
	<T.MeshStandardMaterial color="white" />

	{#each data.bodies as body}
		<Planet
			meanRadius={body.meanRadius}
			name={body.englishName}
			scaleValue={1}
			semimajorAxis={body.semimajorAxis}
			sideralOrbit={body.sideralOrbit}
			sideralRotation={body.sideralRotation}
			eccentricity={body.eccentricity}
			id={body.id}
			planetData={body}
		/>
	{/each}
</InstancedMesh>
