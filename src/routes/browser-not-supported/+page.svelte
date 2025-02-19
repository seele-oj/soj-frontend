<script lang="ts">
  import "../../stories/DarkMode.svelte";
  import { onMount } from "svelte";
  import { navbarVisible } from "$lib/navbarStore";
  import { requireLoad } from "$lib/loaderStore";

  const STORAGE_KEY = "theme";
  const DARK_PREFERENCE = "(prefers-color-scheme: dark)";

  const THEMES = {
    DARK: "dark",
    LIGHT: "light",
  };

  interface Props {
    toggleId: string;
  }

  export let toggleId: string;

  const prefersDarkThemes = () => window.matchMedia(DARK_PREFERENCE).matches;

  function applyTheme() {
    const preferredTheme = prefersDarkThemes() ? THEMES.DARK : THEMES.LIGHT;
    let currentTheme = localStorage.getItem(STORAGE_KEY) ?? preferredTheme;

    if (currentTheme === THEMES.DARK) {
      document.body.classList.remove(THEMES.LIGHT);
      document.body.classList.add(THEMES.DARK);
    } else {
      document.body.classList.remove(THEMES.DARK);
      document.body.classList.add(THEMES.LIGHT);
    }
  }

  onMount(() => {
    applyTheme();
    navbarVisible.set(false);
    requireLoad.set(false);
  });
</script>

<div class="notsupp-background">
  <div class="notsupp-container">
    <div class="notsupp-body">
      <div class="notsupp-warn">
        <img src="/warning2.svg" draggable="false" alt="Logo" />
      </div>
      <div class="notsupp-msg">이 브라우저는 지원하지 않습니다.</div>
      <div class="notsupp-msg">
        WebAssembly가 지원되는 브라우저로<span style="white-space: nowrap;"> 시도해주십시오.</span>
      </div>
      <div class="notsupp-msg">
        <a href="https://caniuse.com/wasm-reference-types"
          >https://caniuse.com/wasm-reference-types</a
        >
      </div>
    </div>
  </div>
</div>

<style>
  @import url("./../../styles/common/common.css");

  .notsupp-warn {
    margin-bottom: 10px;
  }

  .notsupp-warn img {
    height: 80px;
    width: auto;
  }

  .notsupp-msg a:link {
    color: #a1bded;
  }

  .notsupp-msg a:hover {
    color: #a1bded;
  }

  .notsupp-msg a:visited {
    color: #a1bded;
  }

  .notsupp-msg a:active {
    color: #a1bded;
  }

  .notsupp-msg {
    font-family: "IBM Plex Sans", sans-serif;
    font-size: 32px;
    font-weight: 400;
    color: var(--btext-color-white);
    -webkit-text-stroke-width: 1;
    -webkit-text-stroke-color: #0b184b;
  }

  @media (max-width: 768px) {
    .notsupp-msg {
      font-size: 24px;
    }
  }

  .notsupp-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg, #192d69 0%, #36457d 100%);
  }

  .notsupp-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background: rgba(11, 11, 11, 0.3);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-left: 30px;
    padding-right: 30px;
  }
</style>
