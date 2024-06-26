<script lang="ts">
	import { Minus, Plus, Trash } from 'lucide-svelte';
	import Button from '../ui/button/button.svelte';
	import { getMoonData } from '$lib/utils';
	import { detailMoonData } from '$lib/stores/store';
	import { Tooltip, TooltipTrigger } from '../ui/tooltip';
	import TooltipContent from '../ui/tooltip/tooltip-content.svelte';
	export let moon;

	const handleAddMoonClick = async () => {
		const moonApiData = await getMoonData(moon.rel);
		const moonData = [...$detailMoonData, moonApiData];

		detailMoonData.set(moonData);
	};

	const handleRemoveMoonClick = () => {
		const moonData = $detailMoonData.filter(
			(moonData) => moonData.id !== moon.rel.split('/').pop()
		);
		detailMoonData.set(moonData);
	};

	// if moon is already in detailMoonData then don't show the add button
	$: moonExists = $detailMoonData.find((moonData) => moonData.id === moon.rel.split('/').pop());
</script>

<div class="px-1.5 py-1.5 border-b">
	<div class="flex items-center text-sm justify-between">
		{moon.moon}
		{#if moonExists}
			<Tooltip openDelay={100}>
				<TooltipTrigger>
					<Button
						variant="destructive"
						size="icon"
						class="w-6 h-6 p-0"
						on:click={handleRemoveMoonClick}
					>
						<Minus class="w-4 h-4" />
					</Button>
				</TooltipTrigger>
				<TooltipContent>
					<p class=" text-sm">Remove Moon</p>
				</TooltipContent>
			</Tooltip>
		{:else}
			<Tooltip openDelay={100}>
				<TooltipTrigger>
					<Button
						variant="secondary"
						size="icon"
						class="w-6 h-6 p-0"
						on:click={handleAddMoonClick}
						disabled={moonExists}
					>
						<Plus class="w-4 h-4" />
					</Button>
				</TooltipTrigger>
				<TooltipContent>
					<p class=" text-sm">Add Moon</p>
				</TooltipContent>
			</Tooltip>
		{/if}
	</div>
</div>
