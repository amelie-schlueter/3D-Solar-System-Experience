<script>
	import { Text } from '@threlte/extras';
	let value = '';
</script>

<input type="text" bind:value />
<Text text={value} anchorX={500} fontSize={100} />
