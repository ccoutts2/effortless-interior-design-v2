<script lang="ts">
	import type { Snippet } from 'svelte';

	import type { HTMLAnchorAttributes } from 'svelte/elements';

	interface NavLinkProps extends HTMLAnchorAttributes {
		children: Snippet;
	}

	let { children, ...props }: NavLinkProps = $props();
</script>

<a {...props} class="NavLink">
	{@render children?.()}
</a>

<style>
	.NavLink {
		font-size: clamp(0.875rem, 3vw, 1rem);
	}
</style>
