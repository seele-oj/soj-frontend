<script lang="ts">
    import "./darkmode_toggle.css";
    import { onMount } from "svelte";
    import "./DarkMode.svelte";
    import { isDark } from "$lib/themeStore";
  
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
        isDark.set(true);
      } else {
        document.body.classList.remove(THEMES.DARK);
        document.body.classList.add(THEMES.LIGHT);
        isDark.set(false);
      }
    }
  
    onMount(() => {
      applyTheme();
  
      // 미디어쿼리 이벤트 처리 (시스템 설정 변경에 따른 테마 적용)
      const mediaQueryList = window.matchMedia(DARK_PREFERENCE);
      if (mediaQueryList.addEventListener) {
        mediaQueryList.addEventListener("change", applyTheme);
      } else if (mediaQueryList.addListener) {
        mediaQueryList.addListener(applyTheme);
      }
  
      // MutationObserver를 사용해 document.body의 클래스 변경을 감시
      const observer = new MutationObserver(() => {
        // body에 dark 클래스가 있는지 확인하여 isDark를 업데이트합니다.
        isDark.set(document.body.classList.contains(THEMES.DARK));
      });
      observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
  
      return () => {
        observer.disconnect();
        if (mediaQueryList.removeEventListener) {
          mediaQueryList.removeEventListener("change", applyTheme);
        } else if (mediaQueryList.removeListener) {
          mediaQueryList.removeListener(applyTheme);
        }
      };
    });
  </script>
  
  <div class="toggle-switch">
    <input
      type="checkbox"
      id={toggleId}
      bind:checked={$isDark}
      on:change={toggleTheme}
    />
    <label for={toggleId}>
      <span class="slider">
        {#if $isDark}
          <span class="material-icons icon">nightlight_round</span>
        {:else}
          <span class="material-icons icon" style="color: #ff9e26">wb_sunny</span>
        {/if}
      </span>
    </label>
  </div>
  