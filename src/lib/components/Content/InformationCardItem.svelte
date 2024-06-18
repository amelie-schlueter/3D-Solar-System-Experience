<script lang="ts">
	import type { SvelteComponent } from 'svelte';

	export let label = '';
	export let content = '';
</script>

<div class="flex items-center text-sm justify-between w-full">
	<div class="">
		<p class="text-muted-foreground">{label}</p>
	</div>
	<div class="flex items-center gap-1.5">
		<p>{content}</p>
	</div>
</div>

<!-- markup (zero or more items) goes here -->

<style>
	/* your styles go here */
</style>
