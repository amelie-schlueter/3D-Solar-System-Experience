<script lang="ts">
	// your script goes here

	import Input from '../ui/input/input.svelte';
	import Label from '../ui/label/label.svelte';
	import { Slider } from '$lib/components/ui/slider';
	import { configuratorValues, defaultMoon } from '$lib/stores/store';
	import ColorPicker from 'svelte-awesome-color-picker';
	import Checkbox from '../ui/checkbox/checkbox.svelte';
	import { onMount } from 'svelte';
	import Button from '../ui/button/button.svelte';
	import { PlusIcon, ChevronDown } from 'lucide-svelte';

	let value = [25];
	let color = '#ff0000';

	const handleSliderChange = () => {
		console.log('Slider value changed to: ', value[0]);
		configuratorValues.update((values) => {
			// TODO : Add some sort of legend to this value and inform the user how the value is transformed
			values.meanRadius = value[0] * 500;

			return values;
		});
	};

	const handleColorChange = () => {
		console.log('changed color');
		configuratorValues.update((values) => {
			values.color = color;
			return values;
		});
	};

	const handleAddMoonClick = () => {
		console.log('clciekd');
		configuratorValues.update((values) => {
			//@ts-ignore
			values.moons.push(defaultMoon);
			return values;
		});
	};

	const handleDeleteMoonClick = (index: number) => {
		configuratorValues.update((values) => {
			values.moons.splice(index, 1);
			return values;
		});
	};
</script>

<div
	class="p-6 max-w-[25rem] w-full fixed top-4 z-[10000000000000000000000000] bg-black/80 right-4 rounded-sm border"
>
	<div class="flex items-center justify-between">
		<h3>Configurator</h3>
		<Button size="sm" variant="ghost" on:click={() => console.log('collapse the configurator')}>
			<ChevronDown size={16} class="mr-1" />
		</Button>
	</div>
	<p class="text-muted-foreground">
		You can create your own planet. Just tweek the values and see how your planet changes
	</p>

	<div class="my-6 space-y-4">
		<div class="flex items-start gap-4 flex-col">
			<Label>Orbit Controls</Label>
			<div class="flex items-center gap-2 flex-row">
				<Checkbox bind:checked={$configuratorValues.autoRotate} />
				<Label for="autoRotate">Auto Rotate</Label>
			</div>
		</div>
		<div class="border-b my-1.5" />
		<div class="flex items-start gap-4 flex-col">
			<Label for="meanRadius">Mean Radius</Label>
			<div class="px-2 w-full">
				<Slider bind:value min={25} max={125} step={1} onValueChange={() => handleSliderChange()} />
			</div>
		</div>
		<div class="flex items-start gap-2 flex-col dark">
			<Label for="meanRadius">Color</Label>
			<div class="px-2 py-1 border rounded-md text-sm">
				<ColorPicker bind:hex={color} on:input={handleColorChange} label={'Pick a color'} />
			</div>
		</div>
		<div class="flex items-start gap-2 flex-col w-full">
			<div>
				<Label for="meanRadius">Moons</Label>
				<p class="text-sm text-muted-foreground">
					You can add moons to your planet. Just click on "add moon".
				</p>
			</div>
			{#if $configuratorValues.moons.length > 0}
				{#each $configuratorValues.moons as moon, index}
					<div class="flex items-center gap-2 w-full">
						<Label for="moonName" class="w-full">Moon {index + 1}</Label>
						<Button on:click={() => handleDeleteMoonClick(index)} size="sm" variant="destructive"
							>Delete</Button
						>
					</div>
				{/each}
			{:else}
				<Button size="sm" variant="secondary" on:click={handleAddMoonClick}>
					<PlusIcon size={16} class="mr-1" />
					Add Moon
				</Button>
			{/if}
		</div>
	</div>
</div>

<!-- markup (zero or more items) goes here -->
<style>
	.dark {
		--cp-bg-color: #333;
		--cp-border-color: white;
		--cp-text-color: white;
		--cp-input-color: #555;
		--cp-button-hover-color: #777;
	}
</style>
