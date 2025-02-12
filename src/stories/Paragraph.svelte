<script lang="ts">
    import './paragraph.css';
  
    interface Props {
        name: string;
    }

    const { name }: Props = $props();
</script>

<div class="head-container">
    <div class="head-decorations">
      <div class="row1"></div>
      <div class="row2"></div>
      <div class="row3"></div>
    </div>
    <div class="container">
        <div class="head-text">{name}</div>
        <slot />
    </div>
</div>