<script lang="ts">
	import type { Snippet } from 'svelte';

	let { title, children }: { title: string; children?: Snippet } = $props();
</script>

<header class="PageHeader">
	<h1 style="view-transition-name: page-header;">{title}</h1>
	{@render children?.()}
</header>

<style lang="scss">
	@use '$lib/styles/partials/breakpoints.scss';

	.PageHeader {
		padding: 1rem;
		text-align: center;

		@include breakpoints.tablet {
			padding: 2rem 3rem;
		}

		@include breakpoints.desktop {
			padding: 3rem 5rem;
		}

		h1 {
			font-size: clamp(1.5rem, 3vw, 3rem);
		}
	}
</style>
