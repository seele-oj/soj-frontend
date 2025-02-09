<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";

  import Footer from "./Footer.svelte";

  const { Story } = defineMeta({
    component: Footer,
  });
</script>

<Story
  name="Desktop Footer"
  args={{
    desktop: true,
  }}
/>
