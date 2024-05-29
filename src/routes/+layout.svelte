<script>
	import './styles.css';
	import { ModeWatcher } from 'mode-watcher';
</script>

<div class="app">
	<main>
		<slot />
	</main>
	<ModeWatcher defaultMode="dark" />
</div>
