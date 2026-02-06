<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<section class="SchemeWrapper">
	{@render children()}
</section>

<style lang="scss">
	@use '$lib/styles/partials/breakpoints';
	@use '$lib/styles/partials/mixins';

	.SchemeWrapper {
		padding: 1rem 1.5rem;
		@include mixins.flex($direction: column-reverse, $align: flex-start, $gap: 1rem);

		@include breakpoints.laptop {
			padding-inline: 4rem;
			flex-direction: row-reverse;
			gap: 2rem;
		}
	}
</style>
