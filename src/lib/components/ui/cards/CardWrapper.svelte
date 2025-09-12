<script lang="ts">
	import Button from '$lib/components/buttons/Button.svelte';
	import type { Snippet } from 'svelte';

	interface CardWrapperProps {
		children: Snippet;
		href: string;
		hiddenText: string;
	}

	let { children, href, hiddenText }: CardWrapperProps = $props();
</script>

<article class="CardWrapper">
	<a {href}>
		<Button data-content="Visit">Visit</Button>
		<span class="visually-hidden">
			{hiddenText}
		</span>
	</a>
	{@render children?.()}
</article>

<style lang="scss">
	.CardWrapper {
		display: flex;
		flex-direction: column-reverse;
		gap: 1rem;
		overflow: hidden;
		position: relative;

		&:hover :global(h2),
		&:hover :global(h3),
		&:hover :global(h4) {
			text-decoration: underline;
		}

		a::after {
			content: '';
			inset: 0;
			position: absolute;
		}

		:global(button) {
			position: relative;
			z-index: 2;
		}
	}
</style>
