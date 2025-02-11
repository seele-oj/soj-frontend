<script lang="ts">
    import './navbar.css';
    import DarkModeToggle from './DarkModeToggle.svelte'
  
    interface Props {
      desktop?: boolean;
      initialIndex?: number;
      navItems: string[];
      navItemUrls: string[];
    }

    const { desktop = true, initialIndex = 0, navItems, navItemUrls }: Props = $props();

    let activeIndex: number = initialIndex;

    function handleClick(idx: number) {
      activeIndex = idx;
    }
</script>

<nav class="navbar">
    <div class="navbar-logo">
      <img src="/seele-oj-logo_bright.svg" draggable="false" alt="Logo" />
    </div>
  
    <ul class="nav-items">
      {#each navItems as item, index}
        <li class="nav-item" on:click={() => handleClick(index)}>
          <span class="nav-text {activeIndex === index ? 'active' : ''}">
            {item}
          </span>
        </li>
      {/each}
    </ul>

    <ul class="nav-darktoggle">
      <DarkModeToggle />
    </ul>
</nav>