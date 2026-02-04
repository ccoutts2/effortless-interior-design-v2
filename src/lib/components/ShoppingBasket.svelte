<script lang="ts">
	import type { OverlayProps } from '$lib/types';
	import { getContext } from 'svelte';

	const context = getContext<OverlayProps>('overlay-ctx');
</script>

{#if context?.data}
	<ul class="flex flex-col-reverse">
		{#each context.data as item}
			<li>
				<article>
					<h3>{item.scheme.name}</h3>
					{#if item.scheme.images?.length > 0}
						<div><img src={item.scheme.images[0].url} alt="" /></div>
					{/if}
				</article>
			</li>
		{/each}
	</ul>
{/if}

<style lang="scss">
	div {
		background-color: chocolate;
	}
</style>
