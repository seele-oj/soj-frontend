<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";

  import Paragraph from "./Paragraph.svelte";

  const { Story } = defineMeta({
    component: Paragraph,
  });
</script>

<Story
  name="Paragraph"
  args={{
    name: "News",
  }}
/>
