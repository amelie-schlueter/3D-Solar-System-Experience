<script>
	import Discovery from '$lib/images/icons/Discovery.svelte';
	import PlanetIcon from '$lib/images/icons/PlanetIcon.svelte';
	import {
		activePlanet,
		defaultPopupContent,
		planetDetailIsFetching,
		popupContent
	} from '$lib/stores/store';
	import { cubicOut, elasticOut } from 'svelte/easing';
	import { Tooltip, TooltipTrigger } from '../ui/tooltip';
	import TooltipContent from '../ui/tooltip/tooltip-content.svelte';
	import { Loader2, X } from 'lucide-svelte';
	import Button from '../ui/button/button.svelte';
	import { capitalizeFirstLetter } from '$lib/utils';
	import { goto } from '$app/navigation';

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
			<div class="flex items-center justify-start w-full">
				<h4 class="text-lg font-medium">{$popupContent.name}</h4>
			</div>
			<div class="my-2.5 w-full border-b" />
			<div class="w-full gap-2 flex flex-col">
				<div class="flex items-center text-sm justify-between w-full">
					<div class="flex items-center gap-1.5">
						<p class="text-muted-foreground">Body Type</p>
					</div>

					<p>{$popupContent.bodyType}</p>
				</div>
				<Tooltip openDelay={100}>
					<div class="flex items-center text-sm justify-between w-full">
						<TooltipTrigger>
							<div class=" hover:underline">
								<p class="text-muted-foreground">Sidereal Rotation</p>
							</div>
						</TooltipTrigger>
						<TooltipContent>
							The time it takes for a planet to complete one full rotation on its axis.
						</TooltipContent>
						<div class="">
							<p>{$popupContent.sideralRotation ? $popupContent.sideralRotation : 'Unknown'} h</p>
						</div>
					</div>
				</Tooltip>
				<Tooltip openDelay={100}>
					<div class="flex items-center text-sm justify-between w-full">
						<TooltipTrigger>
							<div class=" hover:underline">
								<p class="text-muted-foreground">Sidereal Orbit</p>
							</div>
						</TooltipTrigger>
						<TooltipContent>
							The time it takes for a planet to complete one full orbit around the sun.
						</TooltipContent>
						<div class="">
							<p>{$popupContent.sideralOrbit ? $popupContent.sideralOrbit : 'Unknown'} days</p>
						</div>
					</div>
				</Tooltip>
				<div class="flex items-center justify-between w-full">
					<div class="">
						<p class="text-muted-foreground">Mean Radius</p>
					</div>
					<div class="">
						<p>{$popupContent.meanRadius ? $popupContent.meanRadius : 'Unknown'} km</p>
					</div>
				</div>
				<div class="flex items-center text-sm justify-between w-full">
					<div class="">
						<p class="text-muted-foreground">Discovery Date</p>
					</div>
					<div class="">
						<p>{$popupContent.discoveryDate ? $popupContent.discoveryDate : 'Unknown'}</p>
					</div>
				</div>

				<div class="flex items-center text-sm justify-between w-full">
					<div class="">
						<p class="text-muted-foreground">Discoverd by</p>
					</div>
					<div class="">
						<p>{$popupContent.discoveredBy ? $popupContent.discoveredBy : 'Unknown'}</p>
					</div>
				</div>
				<div class="border-b py-1"></div>
				<div class="">
					<p class="text-sm leading-4 pb-4 pt-2">
						Explore more about {capitalizeFirstLetter($activePlanet)} and its moons.
					</p>
					<Button variant="secondary" on:click={() => goto(`/planet/${$activePlanet}`)}>
						{#if $planetDetailIsFetching}
							<Loader2 class="animate-spin w-4 h-4 mr-2" />
						{/if}
						Explore {capitalizeFirstLetter($activePlanet)}
					</Button>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
</style>
