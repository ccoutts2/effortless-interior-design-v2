<script lang="ts">
	import type { Snippet } from 'svelte';

	import type { HTMLAnchorAttributes } from 'svelte/elements';

	interface NavLinkProps extends HTMLAnchorAttributes {
		children: Snippet;
		isMobileMenu?: boolean;
	}

	let { children, isMobileMenu = false, ...props }: NavLinkProps = $props();
</script>

<a {...props} class="NavLink" data-mobile-menu={isMobileMenu}>
	{@render children?.()}
</a>

<style>
	.NavLink {
		font-size: clamp(0.875rem, 3vw, 1rem);
	}

	.NavLink[data-mobile-menu] {
		font-size: 2rem;
	}
</style>
