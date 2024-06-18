<script>
	import Discovery from '$lib/images/icons/Discovery.svelte';
	import PlanetIcon from '$lib/images/icons/PlanetIcon.svelte';
	import { popupContent } from '$lib/stores/store';
	import { cubicOut, elasticOut } from 'svelte/easing';

	let popupContentData = '';
	//@ts-ignore
	export function testAnimation(node, { duration }) {
		return {
			duration,
			//@ts-ignore
			css: (t) => {
				const eased = cubicOut(t);
				return `
					transform: translateY(${(1 - eased) * 50}%); 
					filter: blur(${(1 - eased) * 5}px);
					opacity: ${eased};
				`;
			}
		};
	}
</script>

<!--  -->
{#if $popupContent.name !== ''}
	<div
		transition:testAnimation={{ duration: 200 }}
		class="p-6 max-w-[20rem] w-full fixed top-4 z-[10000000000000000000000000] bg-black/80 right-4 rounded-sm border"
	>
		<div class="w-full h-full flex flex-col justify-center items-start">
			<h4 class="text-lg font-medium">{$popupContent.name}</h4>
			<div class="my-2.5 w-full border-b" />
			<div class="w-full gap-2 flex flex-col">
				<div class="flex items-center text-sm justify-between w-full">
					<div class="flex items-center gap-1.5">
						<PlanetIcon />
						<p class="text-muted-foreground">Body Type</p>
					</div>

					<p>{$popupContent.bodyType}</p>
				</div>

				<div class="flex items-center text-sm justify-between w-full">
					<div class="flex items-center gap-1.5">
						<PlanetIcon />
						<p class="text-muted-foreground">Discovery Date</p>
					</div>
					<div class="flex items-center gap-1.5">
						<p>{$popupContent.discoveryDate ? $popupContent.discoveryDate : 'Unknown'}</p>
					</div>
				</div>

				<div class="flex items-center text-sm justify-between w-full">
					<div class="flex items-center gap-1.5">
						<PlanetIcon />
						<p class="text-muted-foreground">Discoverd by</p>
					</div>
					<div class="flex items-center gap-1.5">
						<p>{$popupContent.discoveredBy ? $popupContent.discoveredBy : 'Unknown'}</p>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
</style>
