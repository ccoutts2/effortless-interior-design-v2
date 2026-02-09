<script lang="ts">
	import type { AccordionData } from '$lib/constants/accordionData';
	import AccordionItem from './AccordionItem.svelte';

	let { accordionData, name }: { accordionData: AccordionData[]; name?: string } = $props();
</script>

<div class="Accordion">
	{#each accordionData as { title, content }}
		<AccordionItem {title} {content} {name} />
	{/each}
</div>

<style lang="scss">
	@use '$lib/styles/partials/mixins';

	.Accordion {
		@include mixins.flex($direction: column, $gap: 0.25rem);
		margin-block: 1.5rem;
	}
</style>
