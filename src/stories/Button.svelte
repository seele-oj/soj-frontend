<script lang="ts">
    import './button.css';
    import './DarkMode.svelte';

    interface Props {
        text: string;
    }

    export let text: string = "seele";
</script>

<div class="is-dark-mode">
    <button class="simple-button-dark">
        {text}
    </button>
</div>
<div class="is-not-dark-mode">
    <button class="simple-button">
        {text}
    </button>
</div>
