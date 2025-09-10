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
	.NavLink[data-mobile-menu='false'] {
		font-size: clamp(0.875rem, 3vw, 1rem);
	}

	.NavLink[data-mobile-menu='true'] {
		font-size: clamp(1.75rem, 3vw, 2rem);
	}
</style>
