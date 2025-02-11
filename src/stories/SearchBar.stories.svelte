<script module>
    import { defineMeta } from '@storybook/addon-svelte-csf';
   
    import SearchBar from './SearchBar.svelte';
   
    const { Story } = defineMeta({
      component: SearchBar,
    });
  </script>
   
  <Story
    name="SearchBar"
    args={{
    }}
  />