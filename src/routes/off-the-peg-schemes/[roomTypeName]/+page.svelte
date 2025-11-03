<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import Button from '$lib/components/buttons/Button.svelte';
	import ClipImage from '$lib/components/ClipImage.svelte';
	import { slugify } from '$lib/utils/slugify';

	let { data }: { data: PageData } = $props();

	let isPageReady: boolean = $state(false);

	onMount(() => {
		isPageReady = true;
	});
</script>

<main class="RoomTypeName">
	<ul class="RoomTypeName__list">
		{#each data.schemes as scheme}
			<li class="RoomTypeName__item">
				<div class="RoomTypeName__imageWrapper">
					<ClipImage isComponentReady={isPageReady} src={scheme.images[0].url} description="" />
				</div>

				<h3>Our {scheme.name} schemes</h3>

				<p>{scheme.description}</p>

				<!-- Slugify not working for living room - need to fix -->
				<a href="/off-the-peg-schemes/{slugify(scheme.roomTypeName!)}/{scheme.id}"
					><Button data-content="Visit">Visit</Button><span class="visually-hidden"
						>Link to {scheme.name} page</span
					></a
				>
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

		&__item {
			display: flex;
			flex-direction: column;
			gap: 1.5rem;
			overflow: hidden;
			position: relative;

			&:hover h3 {
				text-decoration: underline;
			}

			a::after {
				content: '';
				inset: 0;
				position: absolute;
			}

			:global(button) {
				position: relative;
				z-index: 2;
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
