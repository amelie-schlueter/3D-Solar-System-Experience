<script>
	import ControlModal from '$lib/components/Content/ControlModal.svelte';
	import InformationCard from '$lib/components/Content/InformationCard.svelte';
	import Scene from '$lib/components/Scene/Scene.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { journeyStarted } from '$lib/stores/store';
	import { Canvas } from '@threlte/core';
	import { HelpCircle, Keyboard } from 'lucide-svelte';

	export let data;
</script>

<div class="w-screen h-screen bg-black relative overflow-hidden">
	{#if !$journeyStarted}
		<div
			class="absolute z-50 top-[20vh] text-white w-fit h-fit inset-0 mx-auto md:max-w-md max-w-sm text-center"
		>
			<h1
				class=" md:font-6xl font-3xl text-transparent bg-clip-text bg-gradient-to-t from-white to-gray-500"
			>
				Start exploring the universe
			</h1>

			<Button
				class="mt-4"
				on:click={() => {
					journeyStarted.set(true);
				}}>Explore</Button
			>
		</div>
		<!-- This is the control information for the user -->
		<div class="fixed bottom-12 mx-auto w-full flex items-center justify-center">
			<div>← Use your mouse to pan around →</div>
		</div>
	{/if}

	<ControlModal />
	<InformationCard />

	<Canvas>
		<Scene {data} />
	</Canvas>
</div>
