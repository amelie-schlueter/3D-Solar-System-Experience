<script>
	import ConfiguratorControls from '$lib/components/Configurator/ConfiguratorControls.svelte';
	import InformationCard from '$lib/components/Content/InformationCard.svelte';
	import ConfiguratorScene from '$lib/components/Scene/ConfiguratorScene.svelte';
	import DetailScene from '$lib/components/Scene/DetailScene.svelte';
	import { Canvas } from '@threlte/core';
</script>

<div class="w-screen h-screen bg-black relative">
	<ConfiguratorControls />
	<Canvas>
		<ConfiguratorScene />
	</Canvas>
</div>
