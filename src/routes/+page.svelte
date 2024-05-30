<script>
	import Scene from '$lib/components/Scene.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { journeyStarted } from '$lib/stores/store';
	import { Canvas } from '@threlte/core';
	import { onMount } from 'svelte';
	export let data;
</script>

<div class="w-screen h-screen bg-black relative">
	{#if !$journeyStarted}
		<div
			class="absolute z-50 top-[20vh] text-white w-fit h-fit inset-0 mx-auto max-w-md text-center"
		>
			<h1 class=" text-transparent bg-clip-text bg-gradient-to-t from-white to-gray-500">
				Start exploring the universe
			</h1>

			<Button
				class="mt-4"
				on:click={() => {
					journeyStarted.set(true);
					console.log('start journey');
				}}>Explore</Button
			>
		</div>
		<div class="fixed bottom-12 mx-auto w-full flex items-center justify-center">
			<div>← Use your mouse to pan around →</div>
		</div>
	{/if}

	<Canvas>
		<Scene {data} />
	</Canvas>
</div>
