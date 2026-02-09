<script lang="ts">
	import type { Snippet } from 'svelte';

	interface GridWrapper {
		as: keyof HTMLElementTagNameMap;
		columns?: number;
		gap?: number;
		children: Snippet;
	}

	let { as = 'section', columns = 12, gap = 1, children }: GridWrapper = $props();
</script>

<svelte:element
	this={as}
	class="GridWrapper"
	style="grid-template-columns: {columns}; gap: {gap}rem;"
>
	{@render children()}
</svelte:element>

<style lang="scss">
	.GridWrapper {
		display: grid;
		grid-template-columns: repeat(12, 1fr);
		grid-template-rows: 1fr auto;
		padding: 1rem 1.5rem;
	}
</style>
