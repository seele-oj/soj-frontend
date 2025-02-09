<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
 
  import Navbar from './Navbar.svelte';
 
  const { Story } = defineMeta({
    component: Navbar,
  });
</script>
 
<Story
  name="Desktop Navbar"
  args={{
    desktop: true,
  }}
/>