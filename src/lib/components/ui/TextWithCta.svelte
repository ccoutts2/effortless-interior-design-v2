<script lang="ts">
	import type { Snippet } from 'svelte';
	import NavLink from '../navigation/NavLink.svelte';

	interface TextWithCtaProps {
		children: Snippet;
		ctaText: string;
		href: string;
		centred?: boolean;
	}

	let { children, ctaText, href, centred = false }: TextWithCtaProps = $props();
</script>

<div class="TextWithCta" data-is-centred={centred}>
	{@render children?.()}
	<div>
		<NavLink isButtonStyle={true} data-content={ctaText} {href}>{ctaText}</NavLink>
	</div>
</div>

<style lang="scss">
	@use '../../styles/partials/breakpoints';

	.TextWithCta {
		display: flex;
		flex-direction: column;
		flex: 1;
		gap: 1rem;
		justify-content: space-between;
		line-height: 1.75rem;
		margin: 0 auto;
		max-width: 65ch;
		padding-inline: 1rem;
		text-wrap: pretty;

		&[data-is-centred='true'] {
			justify-content: center;
			text-align: center;
			align-items: center;
		}
	}
</style>
