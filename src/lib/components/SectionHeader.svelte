<script lang="ts">
	type HeaderTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

	interface SectionHeaderProps {
		header: string;
		headerTag: HeaderTag;
	}

	let { header, headerTag }: SectionHeaderProps = $props();
</script>

<header>
	<svelte:element this={headerTag}>
		{header}
	</svelte:element>
</header>
