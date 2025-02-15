<script module>
    import { defineMeta } from '@storybook/addon-svelte-csf';
   
    import HomeHead from './HomeHead.svelte';
   
    const { Story } = defineMeta({
      component: HomeHead,
    });
  </script>
   
  <Story
    name="Home Head"
    args={{
    }}
  />