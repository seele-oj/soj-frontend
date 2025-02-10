<script lang="ts">
  import { onDestroy, onMount, createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";
  let progress_level = 0;
  let interval: number;

  const dispatch = createEventDispatcher();

  onMount(async () => {
    interval = setInterval(() => {
      progress_level += 1;
      progress_level %= 4;
    }, 400);
  });

  onDestroy(async () => {
    clearInterval(interval);
  });

  function handleOutroEnd() {
    dispatch("finished");
  }
</script>

<div class="loader" transition:fade={{ delay: 500, duration: 300 }} on:outroend={handleOutroEnd}>
  <img src="/flowers.svg" alt="Logo" draggable="false" class="logo" />
  {#if progress_level == 0}
    <p class="progress-text">Loading</p>
  {/if}
  {#if progress_level == 1}
    <p class="progress-text">Loading.</p>
  {/if}
  {#if progress_level == 2}
    <p class="progress-text">Loading..</p>
  {/if}
  {#if progress_level == 3}
    <p class="progress-text">Loading...</p>
  {/if}
</div>
