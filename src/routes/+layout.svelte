<script>
    import Navbar from '../stories/Navbar.svelte';
    import { navbarVisible } from '$lib/navbarStore';
</script>

{#if $navbarVisible}
<Navbar navItems={['Home', 'Contests', 'Explore']} navItemUrls={['/', '/contests', '/explore']} />
{/if}

<slot />