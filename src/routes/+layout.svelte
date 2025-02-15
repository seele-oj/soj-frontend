<script lang="ts">
  import Navbar from "../stories/Navbar.svelte";
  import { onMount, tick } from "svelte";
  import { navbarVisible, navbarBack } from "$lib/navbarStore";
  import { goto, afterNavigate } from "$app/navigation";
  import { page } from "$app/stores";
  import { get } from "svelte/store";
  import Loading from "./Loading.svelte";
  import Background from "./Background.svelte";
  import { apiNeeded } from "$lib/loaderStore";

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

  let isLoaded: boolean = false;
  let isAnimationEnded: boolean = false;

  function handleLoaderFinished() {
    isLoaded = true;
    isAnimationEnded = true;
    navbarVisible.set(true);
  }

  function handleReady() {
    isLoaded = true;
  }
</script>

{#if $navbarVisible}
  <Navbar
    back={$navbarBack}
    navItems={["Home", "Contests", "Explore"]}
    navItemUrls={["/", "/contests", "/explore"]}
  />
{/if}

{#if wasmSupported && $apiNeeded}
  <Background />

  {#if isLoaded}
    {#if isAnimationEnded}
      <slot />
    {/if}
  {:else}
    <Loading
      requireAPI={$apiNeeded}
      on:ready={handleReady}
      on:finished={handleLoaderFinished}
    />
  {/if}
{:else if initialized}
  <slot />
{/if}
