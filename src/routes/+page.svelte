<script>
	import Scene from '$lib/components/Scene.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Canvas } from '@threlte/core';
</script>

<div class="w-screen h-screen bg-black relative">
	<div class="absolute z-50 top-[20vh] text-white w-fit h-fit inset-0 mx-auto max-w-md text-center">
		<h1 class=" text-transparent bg-clip-text bg-gradient-to-t from-white to-gray-800">
			Start exploring the universe
		</h1>
		<Button href="/solar-system" class="mt-4">Explore</Button>
	</div>
	<Canvas>
		<Scene />
	</Canvas>
</div>
