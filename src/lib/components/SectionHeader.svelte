<script lang="ts">
	type HeaderTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

	interface SectionHeaderProps {
		header: string;
		headerTag: HeaderTag;
	}

	let { header, headerTag }: SectionHeaderProps = $props();
</script>

<header class="SectionHeader">
	<svelte:element this={headerTag}>
		{header}
	</svelte:element>
</header>

<style lang="scss">
	.SectionHeader {
		margin: 0 auto;

		h1 {
			font-size: clamp(1.5rem, 3vw, 3rem);
			padding: 4rem 1rem;
		}

		h2 {
			font-size: clamp(1.25rem, 3vw, 2.5rem);
			padding: 4rem 1rem 2rem;
		}
	}
</style>
