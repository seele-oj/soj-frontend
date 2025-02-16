<script lang="ts">
    import './difficulty.css';
    import './../DarkMode.svelte';
    import { diffMajor, diffAlt, diffImg } from "$lib/difficulty";
  
    interface Props {
        major_level: number;
        minor_level: number;
        is_dark: boolean;
    }

    export let major_level: number = 1;
    export let minor_level: number = 0;
</script>

<div class="difficulty">
    <img src={diffImg(major_level)} draggable="false" alt={diffAlt(major_level)} />
    <div class="difficulty-text">
        {diffMajor(major_level)}
        <div class="digit">
            {"." + minor_level.toString()}
        </div>
    </div>
</div>