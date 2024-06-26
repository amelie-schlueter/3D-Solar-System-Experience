<script>
	import InformationCard from '$lib/components/Content/InformationCard.svelte';
	import MoonList from '$lib/components/Content/MoonList.svelte';
	import DetailScene from '$lib/components/Scene/DetailScene.svelte';
	import { Canvas } from '@threlte/core';
	import { ChevronDown } from 'lucide-svelte';

	export let data;
</script>

<div class="w-screen h-screen bg-black relative">
	<div
		class="bg-background/60 fixed top-8 right-8 backdrop-blur-sm border rounded-md w-[20rem] p-2"
	>
		<h3>{data.data.name}</h3>
		<!-- <ul>
			{#each data.data.moons as moon}
				<li>{moon.moon}</li>
			{/each}
		</ul> -->
		{data.text}
		<div class="mt-4">
			<div class="mb-2">Moons</div>
			<MoonList moons={data.data.moons} />
		</div>
	</div>
	<Canvas>
		<DetailScene data={data.data} />
	</Canvas>
</div>
