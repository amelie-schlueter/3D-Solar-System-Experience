<script>
	import { cubicOut } from 'svelte/easing'; // Importing an easing function
	import { fade } from 'svelte/transition';
	import { elasticOut } from 'svelte/easing';

	//@ts-ignore
	export function testAnimation() {
		return {
			css: () => {
				return `
					transform: rotate(40deg);
				`;
			}
		};
	}
</script>

//@ts-ignore
