<script lang="ts">
	import { onMount } from 'svelte';
	let lib: typeof import('soj-wasm');

	onMount(async () => {
		lib = await import('soj-wasm');
		await lib.default();
		lib.greet();
	});
</script>

<button on:click={() => lib.greet()}>Greet</button>
