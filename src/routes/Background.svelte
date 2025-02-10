<script lang="ts">
  import { onMount } from "svelte";
  let lib: typeof import("soj-wasm");

  onMount(async () => {
    lib = await import("soj-wasm");
    await lib.default();
    const canvas = document.getElementById(
      "star-background"
    ) as HTMLCanvasElement;
    lib.start_starfield("star-background", 500);
  });
</script>

<canvas id="star-background"></canvas>
