<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";

  import Difficulty from "./Difficulty.svelte";

  const { Story } = defineMeta({
    component: Difficulty,
  });
</script>

<Story name="Difficulty" args={{ major_level: 3, minor_level: 1 }} />
