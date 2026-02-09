<script lang="ts">
	type HeaderTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

	interface SectionHeaderProps {
		header: string;
		headerTag: HeaderTag;
		textCenter?: boolean;
	}

	let { header, headerTag, textCenter = false }: SectionHeaderProps = $props();
</script>

<header class="SectionHeader" data-centered={textCenter}>
	<svelte:element this={headerTag}>
		{header}
	</svelte:element>
</header>

<style lang="scss">
	@use '$lib/styles/partials/breakpoints.scss';

	.SectionHeader {
		padding: 1rem;

		&[data-centered='true'] :where(h1, h2, h3, h4, h5, h6) {
			text-align: center;
		}

		@include breakpoints.tablet {
			padding: 2rem 3rem;
		}

		@include breakpoints.desktop {
			padding: 3rem 5rem;
		}

		h1 {
			font-size: clamp(1.25rem, 3vw, 2.25rem);
		}

		h2 {
			font-size: clamp(1.125rem, 3vw, 2rem);
		}
	}
</style>
