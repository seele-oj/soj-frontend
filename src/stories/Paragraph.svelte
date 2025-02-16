<script lang="ts">
    import './paragraph.css';
  
    interface Props {
        name: string;
        considerDark: boolean;
    }

    export let name: string = "";
    export let considerDark: boolean = false;
</script>

<div class="head-container">
    <div class="head-decorations">
      <div class="row1"></div>
      <div class="row2"></div>
      <div class="row3"></div>
    </div>
    <div class="container">
        {#if considerDark}
        <div class="head-text2">{name}</div>
        {:else}
        <div class="head-text">{name}</div>
        {/if}
        <slot />
    </div>
</div>