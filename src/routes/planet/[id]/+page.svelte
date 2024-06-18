<script>
	import InformationCard from '$lib/components/Content/InformationCard.svelte';
	import DetailScene from '$lib/components/Scene/DetailScene.svelte';
	import { Canvas } from '@threlte/core';
	export let data;
</script>

<div class="w-screen h-screen bg-black relative">
	<Canvas>
		<DetailScene data={data.data} />
	</Canvas>
</div>
