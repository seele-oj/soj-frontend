<script lang="ts">
  import Navbar from "../stories/Navbar.svelte";
  import { onMount, tick } from "svelte";
  import { navbarVisible, navbarBack } from "$lib/navbarStore";
  import { goto, afterNavigate } from "$app/navigation";
  import { page } from "$app/stores";
  import { get } from "svelte/store";
  import Loading from "./Loading.svelte";
  import Background from "./Background.svelte";
  import { loadFinished, requireLoad, animationEnded } from "$lib/loaderStore";

  let wasmSupported: boolean = false;
  let initialized: boolean = false;

  function checkWasmSupport(url: URL) {
    if (
      url.pathname !== "/browser-not-supported" &&
      typeof WebAssembly !== "object"
    ) {
      goto("/browser-not-supported");
    } else {
      wasmSupported = true;
    }
  }

  onMount(async () => {
    const currentPage = get(page);
    checkWasmSupport(currentPage.url);

    afterNavigate((navigation) => {
      if (navigation.to?.url != null) {
        checkWasmSupport(navigation.to?.url);
      }
    });
    await tick();
    initialized = true;
  });

  function handleLoaderFinished() {
    animationEnded.set(true);
  }

  $: isLoad = $loadFinished;
  $: isAnimationEnd = $animationEnded;
  $: showLoad = $requireLoad;
  $: showNavbar = $navbarVisible;
  $: back = $navbarBack;
</script>

{#if showNavbar && isLoad && isAnimationEnd}
  <Navbar
    back={back}
    navItems={["Home", "Contests", "Explore"]}
    navItemUrls={["/", "/contests", "/explore"]}
  />
{/if}

{#if wasmSupported && showLoad}
  <Background />
  <div class:go-show={isLoad && isAnimationEnd} class:go-no-show={!isLoad || !isAnimationEnd}>
    <slot />
  </div>
  {#if !isLoad}
    <Loading on:finished={handleLoaderFinished} />
  {/if}
{:else if initialized}
  <slot />
{/if}

<style>
  .go-no-show {
    display: none;
  }
    
  .go-show {
    display: block;
  }
</style>