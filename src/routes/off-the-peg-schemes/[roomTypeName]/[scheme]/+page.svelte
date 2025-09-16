<script lang="ts">
	import Button from '$lib/components/buttons/Button.svelte';
	import ClipImage from '$lib/components/ClipImage.svelte';
	import Form from '$lib/components/form/Form.svelte';
	import ShoppingBasket from '$lib/components/ShoppingBasket.svelte';
	import type { OverlayProps } from '$lib/types';
	import { slugify } from '$lib/utils/slugify';
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';

	import { getContext, onMount } from 'svelte';

	interface SchemeProps {
		data: PageData;
	}

	const overlay = getContext('overlay-ctx') as OverlayProps;

	let { data }: SchemeProps = $props();

	console.log(data.schemesInBasket);

	let isPageReady: boolean = $state(false);

	onMount(() => {
		isPageReady = true;
	});

	const scheme = $derived(data.scheme);

	const allSchemes = $derived(data.schemes);

	const allAvailableSchemes = $derived(data.allSchemes);

	const openShoppingBasket = () => {
		overlay.isOpen = true;
		overlay.overlayContent = ShoppingBasket;
	};

	const discountedPrice = (price: number, discount: number) => {
		return price * (1 - discount);
	};

	const filteredProducts = $derived(allSchemes.filter((schemeId) => schemeId.id !== scheme.id));

	const filteredAlProducts = $derived(
		allAvailableSchemes.filter((schemeId) => schemeId.id !== scheme.id)
	);
</script>

<main class="Scheme">
	<section class="Scheme__product Product">
		<article class="Product__information">
			<div>
				<span>{scheme.roomTypeName}</span>
				<h1>{scheme.name}</h1>
				<div class="Product__price">
					<span class="Product__oldPrice">£{scheme.price}</span><span
						><strong>£{discountedPrice(Number(scheme.price), 0.3)}</strong></span
					>
				</div>
				<p>{scheme.description}</p>
			</div>
			<Form {enhance}>
				<input type="hidden" name="schemeId" value={scheme.id} />
				<Button type="submit" data-content="Add to basket" onclick={openShoppingBasket}
					>Add to basket</Button
				>
			</Form>
		</article>
		<div class="overflow-hidden">
			<ClipImage isComponentReady={isPageReady} src={scheme.images[0].url} description="" />
		</div>
	</section>
	<section class="my-[25vh]">
		{#if data.schemesInBasket}
			<ul></ul>
			{#each data.schemesInBasket as basketItem}
				<li>{basketItem.scheme.name}</li>
			{/each}
		{/if}
	</section>
	<section>
		<h2>Related {scheme.roomTypeName} Schemes</h2>
		<ul class="flex gap-8">
			{#each filteredProducts as product}
				<li>
					<article class="RelatedScheme">
						<h4>{product.name}</h4>
						<span>£{product.price}</span>
						<div>
							<img src={product.images[0].url} alt="{product.name} image" />
						</div>
						<!-- Slugify not working for living room - need to fix -->
						<a href="/off-the-peg-schemes/{slugify(product.roomTypeName!)}/{product.id}"
							><span class="visually-hidden">View {product.name}'s page</span></a
						>
					</article>
				</li>
			{/each}
		</ul>
	</section>
	<section>
		<h2>More Schemes</h2>
		<ul class="flex gap-8">
			{#each filteredAlProducts as product}
				<li>
					<article class="RelatedScheme">
						<div>
							<h4>{product.name}</h4>
							<span class="block">£{product.price}</span>
							<span class="text-sm">{product.roomTypeName}</span>
						</div>

						<div>
							<img src={product.images[0].url} alt="{product.name} image" />
						</div>
						<a href="/off-the-peg-schemes/{slugify(product.roomTypeName!)}/{product.id}"
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
