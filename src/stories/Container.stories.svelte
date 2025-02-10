<script module>
    import { defineMeta } from "@storybook/addon-svelte-csf";
  
    import Container from "./Container.svelte";
  
    const { Story } = defineMeta({
      component: Container,
    });
  </script>
  
  <Story
    name="Container"
    args={{
    }}
  />