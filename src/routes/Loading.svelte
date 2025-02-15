<script lang="ts">
  import "../styles/modal/loading.css";
  import { onDestroy, onMount, createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";
  import init_api from "soj-wasm-api";
  import { navbarVisible } from "$lib/navbarStore";
  let progress_level = 0;
  let interval: number;
  let checkInterval: number;
  let totalLoaded: number = 0;
  let requiredLoaded: number = 0;

  export let requireAPI: boolean = false;

  const dispatch = createEventDispatcher();

  onMount(async () => {
    navbarVisible.set(false);
    if (requireAPI) {
      requiredLoaded += 1;
      setTimeout(async () => {
        await init_api("/assets/soj_wasm_api_bg.wasm");
        totalLoaded += 1;
      }, 0);
    }
    if (requiredLoaded == 0) {
      dispatch("finished");
      return;
    }
    checkInterval = setInterval(() => {
      if (requiredLoaded == totalLoaded) {
        dispatch("ready");
        clearInterval(checkInterval);
      }
    }, 100);
    interval = setInterval(() => {
      progress_level += 1;
      progress_level %= 4;
    }, 400);
  });

  onDestroy(async () => {
    clearInterval(interval);
    clearInterval(checkInterval);
  });

  function handleOutroEnd() {
    dispatch("finished");
  }
</script>

<div class="notsupp-background"></div>
<div class="loader" transition:fade={{ delay: 500, duration: 300 }} on:outroend={handleOutroEnd}>
  <img src="/flowers.svg" alt="Logo" draggable="false" class="logo" />
  {#if progress_level === 0}
    <p class="progress-text">Loading</p>
  {/if}
  {#if progress_level === 1}
    <p class="progress-text">Loading.</p>
  {/if}
  {#if progress_level === 2}
    <p class="progress-text">Loading..</p>
  {/if}
  {#if progress_level === 3}
    <p class="progress-text">Loading...</p>
  {/if}
</div>

<style>
  .notsupp-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -100;
    background: linear-gradient(180deg, #192d69 0%, #36457d 100%);
  }
</style>
