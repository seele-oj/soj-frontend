<script lang="ts">
    import Navbar from '../stories/Navbar.svelte';
    import { onMount } from 'svelte';
    import { navbarVisible } from '$lib/navbarStore';
    import { goto, afterNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import { get } from 'svelte/store';
    
    function checkWasmSupport(url: URL) {
		if (url.pathname !== '/browser-not-supported' && typeof WebAssembly !== 'object') {
			goto('/browser-not-supported');
		}
	}

    onMount(() => {
		const currentPage = get(page);
		checkWasmSupport(currentPage.url);

		afterNavigate((navigation) => {
            if (navigation.to?.url != null) {
			    checkWasmSupport(navigation.to?.url);
            }
		});
	});
</script>

{#if $navbarVisible}
<Navbar navItems={['Home', 'Contests', 'Explore']} navItemUrls={['/', '/contests', '/explore']} />
{/if}

<slot />