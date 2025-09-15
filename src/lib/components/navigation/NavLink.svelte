<script lang="ts">
	import type { Snippet } from 'svelte';

	import type { HTMLAnchorAttributes } from 'svelte/elements';

	interface NavLinkProps extends HTMLAnchorAttributes {
		children: Snippet;
		isMobileMenu?: boolean;
		isButtonStyle?: boolean;
	}

	let { children, isMobileMenu = false, isButtonStyle = false, ...props }: NavLinkProps = $props();
</script>

<a {...props} class="NavLink" data-mobile-menu={isMobileMenu} data-button={isButtonStyle}>
	{@render children?.()}
</a>

<style lang="scss">
	.NavLink[data-mobile-menu='false'] {
		font-size: clamp(0.875rem, 3vw, 1rem);
	}

	.NavLink[data-mobile-menu='true'] {
		font-size: clamp(1.75rem, 3vw, 2rem);
	}

	.NavLink[data-button='true'] {
		align-items: center;
		background-color: #f6f1eb;
		border: 1px solid #403a34;
		color: #403a34;
		display: flex;
		flex: 1;
		justify-content: center;
		max-width: fit-content;
		min-width: 5rem;
		padding: 0.5rem;
		position: relative;
		text-transform: uppercase;

		&::after {
			content: '';
			align-items: center;
			background-color: #403a34;
			color: #f3eee8 !important;
			display: flex;
			inset: 0;
			justify-content: center;
			position: absolute;
			transform-origin: top;
			transform: scaleY(0);
			transition: transform 0.55s cubic-bezier(0, 1.09, 0.83, 1);
		}

		&:hover {
			&::after {
				content: attr(data-content);
				transform: scaleY(1);
			}
		}
	}
</style>
