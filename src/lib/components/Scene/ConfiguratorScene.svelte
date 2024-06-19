<script lang="ts">
	import { T, useTask } from '@threlte/core';
	import { HTML, Instance, InstancedMesh, OrbitControls, Stars } from '@threlte/extras';
	import ConfiguratorPlanet from '../Configurator/ConfiguratorPlanet.svelte';
	import { configuratorValues } from '$lib/stores/store';
	import Planet from '../Space/Planet.svelte';
	import Moon from '../Configurator/Moon.svelte';

	let autoRotate = true;
</script>

<T.PerspectiveCamera
	makeDefault
	position={[10, 10, 10]}
	on:create={({ ref }) => {
		ref.lookAt(0, 0, 0);
	}}
>
	<OrbitControls autoRotate={$configuratorValues.autoRotate} />
</T.PerspectiveCamera>
<Stars />
<!-- <T.AmbientLight intensity={0.1} /> -->
<InstancedMesh>
	<T.SphereGeometry args={[0.5]} />
	<T.MeshStandardMaterial color="white" />

	{#if $configuratorValues.moons.length !== 0}
		<Moon />
	{/if}
</InstancedMesh>

<ConfiguratorPlanet />

<style>
</style>
