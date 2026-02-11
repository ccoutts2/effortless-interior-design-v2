<script lang="ts">
	import { onMount } from 'svelte';
	import ClipImage from '$lib/components/ClipImage.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import type { Product } from '$lib/types';

	let { data }: { data: { products: Product[] } } = $props();

	let isPageReady: boolean = $state(false);

	onMount(() => {
		isPageReady = true;
	});
</script>

{#if data?.products?.length > 0}
	<main class="RoomTypeName">
		<PageHeader title={data.products[0].roomType?.name ?? 'Schemes'}>
			<p class="my-8 italic">
				Elegant {data.products[0].roomType?.name?.toLowerCase() ?? ''} schemes for your liking
			</p>
		</PageHeader>
		<ul class="RoomTypeName__list">
			{#each data.products as scheme}
				<li class="RoomTypeName__item">
					<div class="RoomTypeName__imageWrapper">
						{#if scheme.images}
							<ClipImage
								isComponentReady={isPageReady}
								src={scheme.images[0]}
								description={scheme.metadata?.altDescription ??
									`This is the layout for ${scheme.roomTypeName}`}
							/>
						{/if}
					</div>

					<h3>Our {scheme.name} schemes</h3>

					<p>{scheme.description}</p>

					<a href="/off-the-peg-schemes/{scheme.roomType?.slug}/{scheme.id}" class="btn"
						>Visit<span class="visually-hidden">the {scheme.name} page</span></a
					>
				</li>
			{/each}
		</ul>
	</main>
{:else}
	<h1>There are no schemes!</h1>
	<a href="/off-the-peg-schemes"> Please go back. </a>
{/if}

<style lang="scss">
	@use '../../../lib/styles/partials/breakpoints';

	.RoomTypeName {
		display: flex;
		flex-direction: column;
		padding: 1rem;

		&__list {
			display: grid;
			gap: 1rem;
			grid-template-columns: 1fr;
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
