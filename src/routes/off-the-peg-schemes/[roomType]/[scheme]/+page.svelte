<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import { invalidateAll } from '$app/navigation';
	import AddBasketForm from '$lib/components/form/AddBasketForm.svelte';
	import ClipImage from '$lib/components/ClipImage.svelte';
	import ShoppingBasket from '$lib/components/ShoppingBasket.svelte';
	import type { OverlayProps } from '$lib/types';
	import type { PageData } from './$types';
	import Price from '$lib/components/Price.svelte';
	import SchemeWrapper from '$lib/components/SchemeWrapper.svelte';
	import SchemeInfoWrapper from '$lib/components/SchemeInfoWrapper.svelte';

	interface SchemeProps {
		data: PageData;
	}

	const overlay = getContext('overlay-ctx') as OverlayProps;

	let { data }: SchemeProps = $props();

	let isPageReady: boolean = $state(false);

	// Retreive specific product
	const scheme = $derived(data.scheme);

	// Retrieve all products related to scheme;
	const allRelatedSchemes = $derived(data.relatedSchemes);

	// Retreive all available schemes
	const allAvailableSchemes = $derived(data.allSchemes);

	let addingToBasket: boolean = $state(false);

	onMount(() => {
		isPageReady = true;
	});
</script>

<main class="Scheme">
	{#if scheme}
		<SchemeWrapper>
			<SchemeInfoWrapper>
				<article class="Product__information">
					<div>
						<span>{scheme.roomTypeName}</span>
						<h1>{scheme.name}</h1>
						<div class="Product__price">
							{#if scheme.prices && scheme.prices.length > 0}
								<Price price={scheme.prices[0].unitAmount} currency={scheme.prices[0].currency} />
							{/if}

							<!-- TODO: show discount price -->
							<span><strong>£70</strong></span>
						</div>
						<p>{scheme.description}</p>
					</div>
					<AddBasketForm
						action="?/addToBasket"
						enhance={() => {
							addingToBasket = true;
							overlay.overlayContent = ShoppingBasket;

							// @ts-ignore
							return async ({ update }) => {
								await update();
								await invalidateAll();
								addingToBasket = false;
								overlay.isOpen = true;
							};
						}}
						buttonLabel={addingToBasket ? 'Adding' : 'Add to basket'}
					>
						<input type="hidden" name="schemeId" value={scheme.id} />
					</AddBasketForm>
					{#if scheme.prices && scheme.prices.length > 0}
						<form action="?/purchaseProduct" method="POST">
							<input type="hidden" name="price_id" value={scheme.prices[0].id} />
							<button type="submit" role="link">Checkout Now</button>
						</form>
					{/if}
				</article>
			</SchemeInfoWrapper>
			<div class="overflow-hidden">
				{#if scheme.images.length > 0}
					<ClipImage isComponentReady={isPageReady} src={scheme.images[0]} description="" />
				{/if}
			</div>
		</SchemeWrapper>
		<section>
			<h2>Related {scheme.roomTypeName} Schemes</h2>
			<ul class="flex gap-8">
				{#each allRelatedSchemes as product}
					<li>
						<article class="RelatedScheme">
							<h4>{product.name}</h4>
							<span>£</span>
							<div>
								<img src={product.images[0]} alt={`${product.name} design scheme.`} />
							</div>

							<a href="/off-the-peg-schemes/{product.roomType?.slug}/{product.id}"
								><span class="visually-hidden">View the {product.roomType?.name} product page.</span
								></a
							>
						</article>
					</li>
				{/each}
			</ul>
		</section>
		<section>
			<h2>More Schemes</h2>
			<ul class="flex flex-wrap gap-8">
				{#each allAvailableSchemes as product}
					<li>
						<article class="RelatedScheme">
							<div>
								<h4>{product.name}</h4>
								{#if product.prices && product.prices.length > 0}
									<span class="block uppercase"
										>{product.prices[0].currency} {product.prices[0].unitAmount}</span
									>
								{/if}
								<span class="text-sm">{product.roomTypeName}</span>
							</div>

							<div>
								<img src={product.images[0]} alt="{product.name} image" />
							</div>
							<a href="/off-the-peg-schemes/{product.roomType?.slug}/{product.id}"
								><span class="visually-hidden">View {product.name}'s page</span></a
							>
						</article>
					</li>
				{/each}
			</ul>
		</section>
	{:else}
		<p>No schemes to see!</p>
	{/if}
</main>

<style lang="scss">
	@use '$lib/styles/partials/breakpoints';

	.Scheme {
		margin: 0 auto;
		width: 100%;
	}

	// .Product {
	// 	display: flex;
	// 	justify-content: space-between;

	// 	@include breakpoints.desktop {
	// 		flex-direction: row-reverse;
	// 	}
	// 	&__information {
	// 		display: flex;
	// 		flex-direction: column;
	// 		gap: 2rem;
	// 	}

	// 	&__price {
	// 		display: flex;
	// 		gap: 1rem;
	// 	}
	// }

	.RelatedScheme {
		display: flex;
		flex-direction: column-reverse;
		position: relative;

		a::after {
			content: '';
			inset: 0;
			position: absolute;
		}
	}
</style>
