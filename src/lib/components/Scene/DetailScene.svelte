<script lang="ts">
	import { T, useTask } from '@threlte/core';
	import { HTML, Instance, InstancedMesh, OrbitControls, Stars } from '@threlte/extras';

	import MainPlanet from '../Space/MainPlanet.svelte';

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

<MainPlanet name={data.englishName} id={data.id} meanRadius={data.meanRadius} />
