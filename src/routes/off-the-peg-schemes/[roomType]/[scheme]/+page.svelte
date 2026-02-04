<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import ClipImage from '$lib/components/ClipImage.svelte';
	import ShoppingBasket from '$lib/components/ShoppingBasket.svelte';
	import type { OverlayProps } from '$lib/types';
	import type { PageData } from './$types';
	import AddBasketForm from '$lib/components/form/AddBasketForm.svelte';
	import { invalidateAll } from '$app/navigation';

	interface SchemeProps {
		data: PageData;
	}

	const overlay = getContext('overlay-ctx') as OverlayProps;

	let { data }: SchemeProps = $props();

	let isPageReady: boolean = $state(false);

	onMount(() => {
		isPageReady = true;
	});

	// Retreive specific product
	const scheme = $derived(data.scheme);

	// Retrieve all products related to scheme;
	const allRelatedSchemes = $derived(data.relatedSchemes);

	// Retreive all available schemes
	const allAvailableSchemes = $derived(data.allSchemes);

	// TODO: This is a temporary measure - need to figure out how to incoporate into database
	const discountedPrice = (price: number, discount: number) => {
		return price * (1 - discount);
	};

	let addingToBasket: boolean = $state(false);
</script>

<main class="Scheme">
	<section class="Scheme__product Product">
		<article class="Product__information">
			<div>
				<span>{scheme.roomTypeName}</span>
				<h1>{scheme.name}</h1>
				<div class="Product__price">
					<span class="Product__oldPrice">£{scheme.stripePriceId}</span><span
						><strong>£{discountedPrice(Number(scheme.stripePriceId), 0.3)}</strong></span
					>
				</div>
				<p>{scheme.description}</p>
			</div>
			<AddBasketForm
				action="?/addToBasket"
				enhance={() => {
					addingToBasket = true;
					overlay.overlayContent = ShoppingBasket;
					overlay.isOpen = true;
					// @ts-ignore
					return async ({ update }) => {
						await update();
						await invalidateAll();
						addingToBasket = false;
					};
				}}
				buttonLabel={addingToBasket ? 'Adding' : 'Add to basket'}
			>
				<input type="hidden" name="schemeId" value={scheme.id} />
			</AddBasketForm>
			<form action="?/purchaseProduct" method="POST">
				<input type="hidden" name="price_id" value="price_1SwiwzFDhgGDMpbYx4W10WVz" />
				<button type="submit" role="link">Checkout Now</button>
			</form>
		</article>
		<div class="overflow-hidden">
			{#if scheme.images.length > 0}
				<ClipImage isComponentReady={isPageReady} src={scheme.images[0].url} description="" />
			{/if}
		</div>
	</section>
	<section>
		<h2>Related {scheme.roomTypeName} Schemes</h2>
		<ul class="flex gap-8">
			{#each allRelatedSchemes as product}
				<li>
					<article class="RelatedScheme">
						<h4>{product.name}</h4>
						<span>£{product.stripePriceId}</span>
						<div>
							<img src={product.images[0].url} alt="{product.name} image" />
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
							<span class="block">£{product.stripePriceId}</span>
							<span class="text-sm">{product.roomTypeName}</span>
						</div>

						<div>
							<img src={product.images[0].url} alt="{product.name} image" />
						</div>
						<a href="/off-the-peg-schemes/{product.roomType?.slug}/{product.id}"
							><span class="visually-hidden">View {product.name}'s page</span></a
						>
					</article>
				</li>
			{/each}
		</ul>
	</section>
</main>

<style lang="scss">
	@use '../../../../lib/styles/partials/breakpoints';

	.Scheme {
		display: flex;
		flex-direction: column;

		&__product {
			display: flex;
			flex-direction: column;
		}
	}

	.Product {
		display: flex;
		justify-content: space-between;

		@include breakpoints.desktop {
			flex-direction: row-reverse;
		}
		&__information {
			display: flex;
			flex-direction: column;
			gap: 2rem;
		}

		&__price {
			display: flex;
			gap: 1rem;
		}

		&__oldPrice {
			text-decoration: line-through;
		}
	}

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
