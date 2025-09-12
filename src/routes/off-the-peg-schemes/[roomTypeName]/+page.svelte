<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import Button from '$lib/components/buttons/Button.svelte';
	import ClipImage from '$lib/components/ClipImage.svelte';
	import { slugify } from '$lib/utils/slugify';
	import CardWrapper from '$lib/components/ui/cards/CardWrapper.svelte';

	let { data }: { data: PageData } = $props();

	let isPageReady: boolean = $state(false);

	onMount(() => {
		isPageReady = true;
	});
</script>

<main class="RoomTypeName">
	<ul class="RoomTypeName__list">
		{#each data.schemes as scheme}
			<li>
				<CardWrapper
					href="/off-the-peg-schemes/{slugify(scheme.roomTypeName!)}/{scheme.id}"
					hiddenText="Link to {scheme.name} page"
				>
					<div class="RoomTypeName__imageWrapper">
						<ClipImage isComponentReady={isPageReady} src={scheme.images[0].url} description="" />
					</div>
					<h3>Our {scheme.name} schemes</h3>
					<p>{scheme.description}</p>
				</CardWrapper>
			</li>
		{/each}
	</ul>
</main>

<style lang="scss">
	@use '../../../lib/styles/partials/breakpoints';

	.RoomTypeName {
		display: flex;
		flex-direction: column;
		padding: 1rem;

		&__list {
			display: grid;
			gap: 1rem;
			grid-template-columns: 1;
			height: 100%;

			@include breakpoints.tablet {
				grid-template-columns: repeat(2, 1fr);
			}
		}

		&__imageWrapper {
			aspect-ratio: 4 / 3;
			border-radius: 0.5rem;
			margin-bottom: 1rem;
			max-height: 30rem;
			overflow: hidden;
			width: 100%;
		}
	}
</style>
