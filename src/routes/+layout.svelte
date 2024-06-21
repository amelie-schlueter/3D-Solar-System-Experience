<script>
	import './styles.css';
	import { ModeWatcher } from 'mode-watcher';
</script>

<div class="app">
	<nav
		class="flex items-center justify-between h-16 bg-background fixed top-0 z-[100000000000000000000000] p-4"
	>
		<div>
			<a href="/configurator">About my site</a>
		</div>
	</nav>
	<main>
		<slot />
	</main>
	<ModeWatcher defaultMode="dark" />
</div>
