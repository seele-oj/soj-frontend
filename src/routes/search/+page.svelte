<script lang="ts">
  import { onMount, tick } from "svelte";
  import { fade } from "svelte/transition";

  import "../../../styles/pages/search.css";
  import Footer from "../../stories/Footer.svelte";
  import SearchBar from "../../stories/SearchBar.svelte";
  import { navbarVisible, navbarBack } from "$lib/navbarStore";
  import { loadFinished, animationEnded } from "$lib/loaderStore";

  onMount(async () => {
    navbarVisible.set(true);
    navbarBack.set("/");
    loadFinished.set(true);
  });

  async function handleSearch(query: string) {}

  let isAnimationEnd = $derived($animationEnded);
</script>

{#if isAnimationEnd}

<div style="margin-top: 100px;">
  <div class="search-container">
    <SearchBar onSearch={handleSearch} />
  </div>
  <div style="margin-top: 144px;" in:fade>
    <Footer />
  </div>
</div>

{/if}
