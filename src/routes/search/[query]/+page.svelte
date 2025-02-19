<script lang="ts">
  import { onMount, tick } from "svelte";
  import { fade } from "svelte/transition";

  let { data } = $props();

  import "../../../styles/pages/search.css";
  import Footer from "../../../stories/Footer.svelte";
  import SearchBar from "../../../stories/SearchBar.svelte";
  import { navbarVisible, navbarBack } from "$lib/navbarStore";
  import { loadFinished } from "$lib/loaderStore";

  onMount(async () => {
    await tick();
    navbarVisible.set(true);
    navbarBack.set("/");
    loadFinished.set(true);
  });

  async function handleSearch(query: string) {}
</script>

<div style="margin-top: 100px;">
  <div class="search-container">
    <SearchBar query={data.query} onSearch={handleSearch} />
  </div>
  <div style="margin-top: 144px;" in:fade>
    <Footer />
  </div>
</div>
