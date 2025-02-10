<script lang="ts">
  import { onMount, tick } from "svelte";

  import "../styles/common/common.css";
  import "../styles/modal/loading.css";
  import Background from "./Background.svelte";
  import Loading from "./Loading.svelte";
  import Navbar from "./../stories/Navbar.svelte";
  import Footer from "./../stories/Footer.svelte";
  import Container from "./../stories/Container.svelte";

  let isLoaded: boolean = false;
  let isAnimationEnded: boolean = false;

  onMount(async () => {
    await tick();

    setTimeout(async () => {
      const res = await fetch("/soj_wasm_api_bg.wasm");
      const bytes = await res.arrayBuffer();
      if (bytes != null) isLoaded = true;
    }, 0);
  });

  function handleLoaderFinished() {
    isAnimationEnded = true;
  }
</script>

<Background />
{#if isLoaded}
  {#if isAnimationEnded}
    <div >
        <Navbar />
        <Container />
        <Footer />
    </div>
  {/if}
{:else}
  <Loading on:finished={handleLoaderFinished} />
{/if}
