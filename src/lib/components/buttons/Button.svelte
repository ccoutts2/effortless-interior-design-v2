<script lang="ts">
	import type { Snippet } from 'svelte';

	import type { HTMLButtonAttributes } from 'svelte/elements';

	interface ButtonProps extends HTMLButtonAttributes {
		children: Snippet;
	}

	let { children, ...props }: ButtonProps = $props();
</script>

<button {...props} class="Button">
	{@render children?.()}
</button>

<style lang="scss">
	.Button {
		align-items: center;
		display: flex;
		background-color: #f6f1eb;
		border: 1px solid #403a34;
		color: #403a34;
		flex: 1;
		justify-content: center;
		max-width: 12rem;
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
