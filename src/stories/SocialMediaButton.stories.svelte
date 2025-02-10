<script module>
    import { defineMeta } from "@storybook/addon-svelte-csf";
  
    import SocialMediaButton from "./SocialMediaButton.svelte";
  
    const { Story } = defineMeta({
      component: SocialMediaButton,
    });
  </script>
  
  <Story
    name="Social Media Button"
    args={{
      image_url: "/discord.svg",
      link_to: "https://discord.com",
    }}
  />
  