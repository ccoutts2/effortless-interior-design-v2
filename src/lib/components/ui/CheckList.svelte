<script lang="ts">
	import { Check } from '@lucide/svelte';
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<li class="CheckList">
	<span class="CheckList__icon"><Check size={14} /></span>
	<span class="CheckList__text">{@render children()}</span>
</li>

<style lang="scss">
	.CheckList {
		width: 100%;
		display: flex;
		align-items: center;
		gap: 0.5rem;

		&__icon {
			padding-left: 1rem;
		}

		&__text {
			font-size: 0.875rem;
		}
	}
</style>
