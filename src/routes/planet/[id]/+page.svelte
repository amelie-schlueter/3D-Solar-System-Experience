<script>
	import OpenAiPopover from '$lib/components/AI/OpenAiPopover.svelte';
	import InformationCard from '$lib/components/Content/InformationCard.svelte';
	import MoonList from '$lib/components/Content/MoonList.svelte';
	import DetailScene from '$lib/components/Scene/DetailScene.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { detailMoonData } from '$lib/stores/store';
	import { getAllMoonsData } from '$lib/utils';
	import { Canvas } from '@threlte/core';
	import { ChevronDown, Loader2, Wand2 } from 'lucide-svelte';

	export let data;

	let isFetching = false;
	let isOpen = true;

	const handleShowAllMoons = async () => {
		try {
			// Assumes `getAllMoonsData` takes an array of moon objects with `rel` URLs
			isFetching = true;
			const moonsApiData = await getAllMoonsData(data.data.moons);

			isFetching = false;
			detailMoonData.update((currentData) => [...currentData, ...moonsApiData]); // Update the store by merging new data
		} catch (error) {
			console.error('Failed to fetch moon data:', error);
		}
	};

	const handleRemoveAllMoons = () => {
		detailMoonData.set([]); // Clear the store
	};
</script>

<div class="w-screen h-screen bg-black relative overflow-hidden">
	<div
		class="bg-background/60 fixed md:top-8 top-4 md:right-8 right-0 left-0 backdrop-blur-sm border rounded-md w-[90vw] mx-auto md:m-0 md:w-[25rem] p-4"
	>
		<div class="flex items-center justify-between">
			<h3>{data.data.name}</h3>
			<Button variant="secondary" size="icon" class="w-8 h-8" on:click={() => (isOpen = !isOpen)}>
				<ChevronDown class="w-4 h-4" />
			</Button>
		</div>
		<!-- <ul>
			{#each data.data.moons as moon}
				<li>{moon.moon}</li>
			{/each}
		</ul> -->
		{#if isOpen}
			<div class="mt-2">
				<p class="text-sm opacity-70">
					{data.text}
				</p>

				<div class="my-4 flex flex-col items-start gap-2">
					{#if $detailMoonData.length > 0}
						<Button variant="secondary" size="sm" on:click={handleRemoveAllMoons}
							>Hide all Moons</Button
						>
					{:else}
						<Button variant="secondary" size="sm" on:click={handleShowAllMoons}>
							{#if isFetching}
								<Loader2 class="w-4 h-4 animate-spin mr-1	" />
							{/if}
							Show all Moons
						</Button>
					{/if}
				</div>
			</div>
		{/if}
	</div>
	<Canvas>
		<DetailScene data={data.data} />
	</Canvas>
	<div class="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 mx-auto">
		<OpenAiPopover name={data.data.name} />
	</div>
</div>
