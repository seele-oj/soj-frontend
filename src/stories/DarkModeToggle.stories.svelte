<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";

  import DarkModeToggle from "./DarkModeToggle.svelte";

  const { Story } = defineMeta({
    component: DarkModeToggle,
  });
</script>

<Story name="DarkModeToggle" args={{}} />
