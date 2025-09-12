<script lang="ts">
	import Button from '$lib/components/buttons/Button.svelte';
	import ClipImage from '$lib/components/ClipImage.svelte';
	import ShoppingBasket from '$lib/components/ShoppingBasket.svelte';
	import CardWrapper from '$lib/components/ui/cards/CardWrapper.svelte';
	import type { OverlayProps } from '$lib/types';
	import { slugify } from '$lib/utils/slugify';
	import { Heart } from '@lucide/svelte';
	import type { PageData } from './$types';

	import { getContext, onMount } from 'svelte';

	interface SchemeProps {
		data: PageData;
	}

	const overlay = getContext('overlay-ctx') as OverlayProps;

	let { data }: SchemeProps = $props();

	let isPageReady: boolean = $state(false);

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

	let isLiked: boolean = $state(false);
	let fill: string = $state('');

	const getLikedSchemes = () => {
		const savedItems = localStorage.getItem('likedSchemes');
		return savedItems ? JSON.parse(savedItems) : [];
	};

	const isSchemeLiked = () => {
		let likedSchemes = getLikedSchemes();

		const schemeIndex = likedSchemes.indexOf(scheme.id);

		if (schemeIndex === -1) {
			likedSchemes.push(scheme.id);
			isLiked = true;
		} else {
			likedSchemes.splice(schemeIndex, 1);
			isLiked = false;
		}

		localStorage.setItem('likedSchemes', JSON.stringify(likedSchemes));
	};

	onMount(() => {
		isPageReady = true;
		const likedSchemes = getLikedSchemes();
		isLiked = likedSchemes.includes(scheme.id);
	});

	$effect(() => {
		if (isLiked) {
			fill = '#5d3a40';
		} else {
			fill = '';
		}

		const likedSchemes = getLikedSchemes();
		if (likedSchemes.includes(scheme.id)) {
			fill = '#5d3a40';
		} else {
			fill = '';
		}
	});
</script>

<main class="Scheme">
	<section class="Scheme__product Product">
		<article class="Product__information">
			<div>
				<div class="flex justify-between">
					<p>{scheme.roomTypeName}</p>
					<spam
						><button onclick={isSchemeLiked}><Heart style="fill:{fill}" strokeWidth="1" /></button
						></spam
					>
				</div>

				<h1>{scheme.name}</h1>
				<div class="Product__price">
					<span class="Product__oldPrice">£{scheme.price}</span><span
						><strong>£{discountedPrice(Number(scheme.price), 0.3)}</strong></span
					>
				</div>
				<p>{scheme.description}</p>
			</div>
			<div>
				<Button data-content="Add to basket" onclick={openShoppingBasket}>Add to basket</Button>
			</div>
		</article>
		<div class="overflow-hidden">
			<ClipImage isComponentReady={isPageReady} src={scheme.images[0].url} description="" />
		</div>
	</section>
	<section>
		<h2>Related {scheme.roomTypeName} Schemes</h2>
		<ul class="flex gap-8">
			{#each filteredProducts as product}
				<li>
					<CardWrapper
						href="/off-the-peg-schemes/{slugify(product.roomTypeName!)}/{product.id}"
						hiddenText="View {product.name}'s page"
					>
						<h4>{product.name}</h4>
						<span>£{product.price}</span>
						<div>
							<img src={product.images[0].url} alt="{product.name} image" />
						</div>
					</CardWrapper>
				</li>
			{/each}
		</ul>
	</section>
	<section>
		<h2>More Schemes</h2>
		<ul class="flex gap-8">
			{#each filteredAlProducts as product}
				<li>
					<CardWrapper
						href="/off-the-peg-schemes/{slugify(product.roomTypeName!)}/{product.id}"
						hiddenText="View {product.name}'s page"
					>
						<div>
							<h4>{product.name}</h4>
							<span class="block">£{product.price}</span>
							<span class="text-sm">{product.roomTypeName}</span>
						</div>

						<div>
							<img src={product.images[0].url} alt="{product.name} image" />
						</div>
					</CardWrapper>
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
</style>
