<script lang="ts">
  import "./smbutton.css";

  interface Props {
    image_url: string;
    link_to: string;
  }

  const { image_url, link_to }: Props = $props();
</script>

<a
  href={link_to}
  target="_blank"
  rel="noopener noreferrer"
  class="social-btn"
>
  <img src={image_url} alt="Discord" class="social-icon" />
</a>
