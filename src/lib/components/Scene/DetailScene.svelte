<script lang="ts">
	import { T, useTask } from '@threlte/core';
	import { HTML, Instance, InstancedMesh, OrbitControls, Stars } from '@threlte/extras';

	import MainPlanet from '../Space/MainPlanet.svelte';
	import { detailMoonData } from '$lib/stores/store';
	import Moon from '../Configurator/Moon.svelte';

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

<InstancedMesh>
	<T.SphereGeometry args={[0.5]} />
	<T.MeshStandardMaterial color="white" />

	{#if $detailMoonData.length !== 0}
		{#each $detailMoonData as moon}
			<Moon
				name={moon.name}
				semimajorAxis={moon.semimajorAxis}
				sideralOrbit={moon.sideralOrbit}
				meanRadius={moon.meanRadius}
				eccentricity={moon.eccentricity}
			/>
		{/each}
	{/if}
</InstancedMesh>
<!-- <T.AmbientLight intensity={0.1} /> -->

<MainPlanet name={data.englishName} id={data.id} meanRadius={data.meanRadius} />
