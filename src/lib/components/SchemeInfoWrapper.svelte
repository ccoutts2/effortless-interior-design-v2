<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<div class="SchemeInfoWrapper">
	{@render children()}
</div>

<style lang="scss">
	@use '$lib/styles/partials/breakpoints';

	.SchemeInfoWrapper {
		height: 100%;
		padding-block: 1rem;
		position: sticky;
		top: 1rem;
		width: 100%;

		@include breakpoints.laptop {
			padding-inline: 3rem;
			width: 50%;
		}
	}
</style>
