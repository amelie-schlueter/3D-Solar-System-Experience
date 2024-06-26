<script>
	import Button from '../ui/button/button.svelte';
	import MoonItem from './MoonItem.svelte';
	import { detailMoonData } from '$lib/stores/store';

	let maxMoons = 10;

	// your script goes here
	export let moons = [
		{
			moon: 'Moon 1',
			rel: 'https://api.le-systeme-solaire.net/rest/bodies/moon1'
		}
	];
</script>

{JSON.stringify($detailMoonData)}
<div>
	{#each moons.slice(0, maxMoons) as moon}
		<MoonItem {moon} />
	{/each}
	{#if moons.length > maxMoons}
		<Button
			variant="secondary"
			size="sm"
			class="flex items-center justify-center mt-2 w-full  bg-background/60 text-white"
			on:click={() => (maxMoons += 20)}
		>
			Show more
		</Button>
	{/if}
</div>
