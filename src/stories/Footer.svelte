<script lang="ts">
    import './footer.css';
    import SocialMediaButton from './SocialMediaButton.svelte';
  
    interface Props {
      desktop?: boolean;
    }

    const { desktop = true }: Props = $props();
</script>

<footer class="footer">
    <div class="footer-row footer-row-1">
      <img src="/seele-oj-logo_bright.svg" alt="Logo" class="footer-logo" />
    </div>
  
    <div class="footer-row footer-row-2">
      <nav class="footer-nav">
        <a href="/sitemap" class="footer-link">사이트맵</a>
        <a href="/privacy-policy" class="footer-link">개인정보처리방침</a>
        <a href="/about-us" class="footer-link">About Us</a>
        <a href="/terms-of-use" class="footer-link">개인정보 수집 및 이용 동의</a>
        <a href="/contact-us" class="footer-link">Contact Us</a>
        <a href="/status" class="footer-link">서버상태</a>
      </nav>
    </div>
  
    <div class="footer-row footer-row-3">
      <div class="footer-agpl">
        <img src="/agplv3.svg" alt="AGPL 3.0" class="agpl-logo" />
      </div>
      <div class="footer-social">
        <SocialMediaButton image_url="/discord.svg" link_to="https://discord.gg/jan4BB96uy"/>
        <SocialMediaButton image_url="/github.svg" link_to="https://github.com/seele-oj"/>
      </div>
    </div>
  </footer>