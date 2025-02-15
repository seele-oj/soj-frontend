<script lang="ts">
  import { onMount, tick } from "svelte";

  import "../../../styles/pages/view.css";
  import { navbarVisible, navbarBack } from "$lib/navbarStore";
  import { apiNeeded } from "$lib/loaderStore";
  import { goto } from "$app/navigation";
  import Difficulty from "../../../stories/Misc/Difficulty.svelte";
  import DarkModeToggle from "../../../stories/DarkModeToggle.svelte";

  const problem_number = 1000;
  const problem_title = "쿠쿠리아 고아원의 숨바꼭질 놀이"
  const major_level = 9;
  const minor_level = 2;

  onMount(async () => {
    await tick();
    navbarVisible.set(false);
    navbarBack.set("");
    apiNeeded.set(true);
  });
</script>

<div class="title-bar">
  <div class="row">
    <button
      class="title-back-button"
      style="margin-left: 10px;"
      on:click={() => goto("/")}
    >
      <span class="material-icons">arrow_back</span>
    </button>
    {"#" + problem_number.toString()}
    <div class="problem-title">
        {problem_title}
    </div>
    <div class="right">
      <div class="title-diff">
        <Difficulty {major_level} {minor_level} />
      </div>
      <button class="title-settings">
        <span class="material-icons">settings</span>
      </button>
    </div>
  </div>
</div>

<div class="problem">

</div>
