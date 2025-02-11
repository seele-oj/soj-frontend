<script lang="ts">
  import "./darkmode_toggle.css";
  import { onMount } from "svelte";
  import "./DarkMode.svelte"

  const STORAGE_KEY = "theme";
  const DARK_PREFERENCE = "(prefers-color-scheme: dark)";

  const THEMES = {
    DARK: "dark",
    LIGHT: "light",
  };

  // 시스템 다크모드 선호도 반환 함수
  const prefersDarkThemes = () => window.matchMedia(DARK_PREFERENCE).matches;

  let isDark: boolean = false;

  function toggleTheme() {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (stored) {
      // 이미 저장된 값이 있으면 제거해서 시스템 기본값으로 돌아갑니다.
      localStorage.removeItem(STORAGE_KEY);
    } else {
      // 시스템 기본값의 반대를 저장합니다.
      localStorage.setItem(
        STORAGE_KEY,
        prefersDarkThemes() ? THEMES.LIGHT : THEMES.DARK
      );
    }
    applyTheme();
  }

  function applyTheme() {
    const preferredTheme = prefersDarkThemes() ? THEMES.DARK : THEMES.LIGHT;
    let currentTheme = localStorage.getItem(STORAGE_KEY) ?? preferredTheme;

    if (currentTheme === THEMES.DARK) {
      document.body.classList.remove(THEMES.LIGHT);
      document.body.classList.add(THEMES.DARK);
      isDark = true;
    } else {
      document.body.classList.remove(THEMES.DARK);
      document.body.classList.add(THEMES.LIGHT);
      isDark = false;
    }
  }

  onMount(() => {
    applyTheme();
    const mediaQueryList = window.matchMedia(DARK_PREFERENCE);
    if (mediaQueryList.addEventListener) {
      mediaQueryList.addEventListener("change", applyTheme);
    } else if (mediaQueryList.addListener) {
      mediaQueryList.addListener(applyTheme);
    }
  });
</script>

<svelte:head>
  <link
    href="https://fonts.googleapis.com/icon?family=Material+Icons&text=wb_sunny%20nightlight_round%20list%20chevron_right%20chevron_left"
    rel="stylesheet"
  >
</svelte:head>

<div class="toggle-switch">
  <input
    type="checkbox"
    id="darkmode"
    bind:checked={isDark}
    on:change={toggleTheme}
  />
  <label for="darkmode">
    <span class="slider">
      <!-- Material Icon: 라이트모드일 때 해(wb_sunny), 다크모드일 때 달(nightlight_round) 아이콘 표시 -->
       {#if isDark}
      <span class="material-icons icon"
        >{"nightlight_round"}</span
      >
        {:else}
        <span class="material-icons icon" style="color: #ff9e26"
        >{"wb_sunny"}</span
      >
        {/if}
    </span>
  </label>
</div>
