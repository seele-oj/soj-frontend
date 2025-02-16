<script module>
    import { defineMeta } from "@storybook/addon-svelte-csf";
  
    import Button from "./Button.svelte";
  
    const { Story } = defineMeta({
      component: Button,
    });
  </script>
  
  <Story name="Button" args={{text: "asdf"}} />
  