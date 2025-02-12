<script lang="ts">
  import "./navbar.css";
  import DarkModeToggle from "./DarkModeToggle.svelte";

  interface Props {
    desktop?: boolean;
    initialIndex?: number;
    navItems: string[];
    navItemUrls: string[];
  }

  export let desktop: boolean = true;
  export let initialIndex: number = 0;
  export let navItems: string[] = [];
  export let navItemUrls: string[] = [];

  let activeIndex: number = initialIndex;
  let mobileMenuOpen: boolean = false;

  function handleClick(idx: number) {
    activeIndex = idx;
  }
</script>

<nav class="navbar">
  <!-- 데스크탑/라지 로고 -->
  <div class="is-dark-mode">
    <div class="navbar-logo">
      <img src="/seele-oj-logo_bright.svg" draggable="false" alt="Logo" />
    </div>
  </div>
  <div class="is-not-dark-mode">
    <div class="navbar-logo show-small">
      <img src="/seele-oj-logo_dark.svg" draggable="false" alt="Logo" />
    </div>
    <div class="navbar-logo show-large">
      <img src="/seele-oj-logo_bright.svg" draggable="false" alt="Logo" />
    </div>
  </div>

  <!-- 데스크탑 메뉴 -->
  <ul class="nav-items">
    {#each navItems as item, index}
      <li class="nav-item" on:click={() => handleClick(index)}>
        <span class="nav-text {activeIndex === index ? 'active' : ''}">
          {item}
        </span>
      </li>
    {/each}
  </ul>

  <!-- 다크모드 토글 (데스크탑 전용) -->
  <ul class="nav-darktoggle">
    <!-- 데스크탑 토글에는 고유 id "darkmode-desktop" -->
    <DarkModeToggle toggleId="darkmode-desktop" />
  </ul>

  <!-- 모바일에서는 collapse(햄버거) 버튼 표시 -->
  <button class="mobile-menu-button" on:click={() => (mobileMenuOpen = true)}>
    <span class="material-icons">menu</span>
  </button>
</nav>

<!-- 모바일 메뉴 오버레이 (전체 화면 슬라이딩 메뉴) -->
<div class="mobile-menu" class:open={mobileMenuOpen}>
  <div class="mobile-menu-header">
    <div class="navbar-logo">
      <img src="/seele-oj-logo_bright.svg" draggable="false" alt="Logo" />
    </div>
    <button
      class="mobile-menu-close"
      on:click={() => (mobileMenuOpen = false)}
    >
      <span class="material-icons">close</span>
    </button>
  </div>
  <div class="mobile-container">
    <div class="vertical-bar"></div>
    <div class="container">
      <ul class="mobile-nav-items">
        {#each navItems as item, index}
          <li
            class="mobile-nav-item {activeIndex === index ? 'active' : ''}"
            on:click={() => {
              handleClick(index);
              mobileMenuOpen = false;
            }}
          >
            {item}
          </li>
          <div class="horizontal-bar"></div>
        {/each}
        <div style="margin-top: 20px;">
          <!-- 모바일 토글에는 다른 id "darkmode-mobile" -->
          <DarkModeToggle toggleId="darkmode-mobile" />
        </div>
      </ul>
    </div>
  </div>
</div>
