<script lang="ts">
    import './navbar.css';
  
    interface Props {
      desktop?: boolean;
      initialIndex?: number;
    }

    const { desktop = true, initialIndex = 0 }: Props = $props();

    let navItems = ['Home', 'Contests', 'Problems'];
    let activeIndex: number = initialIndex;

    function handleClick(idx: number) {
      activeIndex = idx;
    }
</script>

<nav class="navbar">
    <div class="logo">
      <img src="/seele-oj-logo_bright.svg" alt="Logo" />
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
</nav>