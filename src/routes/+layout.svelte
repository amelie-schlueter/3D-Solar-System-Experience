<script>
	import { Home } from 'lucide-svelte';
	import './styles.css';
	import { ModeWatcher } from 'mode-watcher';
	import { cn } from '$lib/utils';
	import { buttonVariants } from '$lib/components/ui/button';
</script>

<div class="app">
	<nav
		class="flex items-center justify-between h-16 bg-background fixed top-0 z-[100000000000000000000000] p-4"
	>
		<div>
			<a href="/" class={cn(buttonVariants({ size: 'icon', variant: 'secondary' }))}
				><Home class="w-5 h-5" />
			</a>
		</div>
	</nav>
	<main>
		<slot />
	</main>
	<ModeWatcher defaultMode="dark" />
</div>
