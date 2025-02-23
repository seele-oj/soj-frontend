<script lang="ts">
  import { onMount, tick } from "svelte";
  import { goto } from "$app/navigation";
  import { fade } from "svelte/transition";
  import { loadFinished, animationEnded } from "$lib/loaderStore";

  import "../styles/common/common.css";
  import "../styles/pages/home.css";
  import Footer from "./../stories/Footer.svelte";
  import News from "../stories/Home/News.svelte";
  import { navbarVisible, navbarBack } from "$lib/navbarStore";
  import HomeHead from "../stories/Home/HomeHead.svelte";

  let searchActivated: boolean = $state(false);

  onMount(async () => {
    navbarVisible.set(true);
    navbarBack.set("");
    loadFinished.set(true);
  });

  async function handleSearch(query: CustomEvent) {
    searchActivated = true;
    await new Promise((resolve) => setTimeout(resolve, 500));
    goto(`/search/${query.detail}`);
  }

  let isAnimationEnd = $derived($animationEnded);
</script>

{#if isAnimationEnd}

<HomeHead on:search={handleSearch} />

{#if !searchActivated}
  <div style="margin-top: 500px;" out:fade>
    <News />
  </div>
  <div out:fade>
    <Footer />
  </div>
{/if}

{/if}
