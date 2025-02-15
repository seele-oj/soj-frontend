<script module>
    import { defineMeta } from '@storybook/addon-svelte-csf';
   
    import News from './News.svelte';
   
    const { Story } = defineMeta({
      component: News,
    });
  </script>
   
  <Story
    name="News"
    args={{
    }}
  />