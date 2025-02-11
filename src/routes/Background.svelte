<script lang="ts">
  import { onMount } from "svelte";
  import init, { start_starfield } from 'soj-wasm';

  onMount(async () => {
    await init('/assets/soj_wasm_bg.wasm');
    start_starfield("star-background", 500);
  });
</script>

<canvas id="star-background"></canvas>
