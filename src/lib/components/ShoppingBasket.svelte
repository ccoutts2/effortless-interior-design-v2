<script lang="ts">
	import type { OverlayProps } from '$lib/types';
	import { getContext } from 'svelte';

	const context = getContext<OverlayProps>('overlay-ctx');

	console.log(context.data);
</script>

{#if context}
	{#each context.data as item}
		<ul class="flex flex-col">
			<li>
				<article>
					<h3>{item.scheme.name}</h3>
					<div><img src={item.scheme.images[0].url} alt="" /></div>
				</article>
			</li>
		</ul>
	{/each}
{/if}

<style lang="scss">
	div {
		background-color: chocolate;
	}
</style>
