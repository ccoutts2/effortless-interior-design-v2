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
		width: 50%;
		margin-left: 0.5rem;
		padding: 1rem 3rem;
		position: sticky;
		top: 1rem;
		height: 100%;
	}
</style>
