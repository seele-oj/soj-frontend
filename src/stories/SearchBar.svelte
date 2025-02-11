<script lang="ts">
    import './search_bar.css';
  
    interface Props {
        onSearch?: (query: string) => void;
    }

    const { onSearch }: Props = $props();
</script>

