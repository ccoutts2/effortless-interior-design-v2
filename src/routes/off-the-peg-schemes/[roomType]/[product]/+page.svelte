<script lang="ts">
	import { accordionData } from '$lib/constants/accordionData';
	import { onMount } from 'svelte';
	import Accordion from '$lib/components/ui/accordion/Accordion.svelte';
	import CheckList from '$lib/components/ui/CheckList.svelte';
	import GridWrapper from '$lib/components/ui/GridWrapper.svelte';
	import SchemeCarousel from '$lib/components/SchemeCarousel.svelte';
	import SchemeInfo from '$lib/components/SchemeInfo.svelte';
	import SchemeInfoWrapper from '$lib/components/SchemeInfoWrapper.svelte';
	import SchemeWrapper from '$lib/components/SchemeWrapper.svelte';
	import SectionHeader from '$lib/components/SectionHeader.svelte';
	import type { PageData } from './$types';
	import Price from '$lib/components/Price.svelte';
	import Button from '$lib/components/ui/buttons/Button.svelte';
	import LineBreak from '$lib/components/LineBreak.svelte';

	interface PageProps {
		data: PageData;
	}

	let { data }: PageProps = $props();

	let isPageReady: boolean = $state(false);

	const productInfoTab = $derived(data.productInfoTab);

	// Retreive specific product
	const product = $derived(data.product);

	// Retrieve all products related to product;
	const allRelatedProducts = $derived(data.relatedProducts);

	// Retreive all available products
	const allAvailableProducts = $derived(data.allProducts);

	onMount(() => {
		isPageReady = true;
	});
</script>

<main class="Scheme">
	{#if product}
		<SchemeWrapper>
			<SchemeInfoWrapper>
				{#if product.prices && product.prices.length > 0}
					<SchemeInfo
						id={product.id}
						name={product.name}
						description={product.description}
						features={product.features}
						price={product.prices[0].unitAmount}
						currency={product.prices[0].currency}
						priceId={product.prices[0].id}
					/>
				{:else}
					<p>Price information unavailable.</p>
				{/if}
				<Accordion {accordionData} />
			</SchemeInfoWrapper>

			<SchemeCarousel roomType={product.roomType?.name.toLowerCase()} />
		</SchemeWrapper>

		<LineBreak />
		<section class="Scheme__section">
			<nav class="Tabs">
				<ul class="Tabs__list">
					<li class="Tabs__item">
						<a
							class="Tabs__tab"
							href="?information=included"
							data-sveltekit-noscroll
							data-sveltekit-replacestate
							class:active={productInfoTab === 'included'}>What's included?</a
						>
					</li>
					<li class="Tabs__item">
						<a
							class="Tabs__tab"
							href="?information=benefits"
							data-sveltekit-noscroll
							data-sveltekit-replacestate
							class:active={productInfoTab === 'benefits'}>What are the benefits?</a
						>
					</li>
					<li class="Tabs__item">
						<a
							class="Tabs__tab"
							href="?information=important"
							data-sveltekit-noscroll
							data-sveltekit-replacestate
							class:active={productInfoTab === 'important'}>Important info</a
						>
					</li>
				</ul>
			</nav>
			{#if productInfoTab === 'included'}
				<div>
					<p class="mb-4!">
						This Off-the-Peg Design Scheme takes the form of a PDF file which contains:
					</p>
					<ul>
						<CheckList>Your Design Specification, containing prices and product details</CheckList>
						<CheckList>High-quality renderings of the design scheme in an example room</CheckList>
						<CheckList
							>A detailed step-by-step guide to help you pull your design scheme together Holly's
							Little Black Book A link to your Order Request Form</CheckList
						>
					</ul>
					<a href="/">View all information</a>
				</div>
			{:else if productInfoTab === 'important'}
				<div>
					<p>
						While we strive to make our renderings as accurate as possible, please be aware that
						they are not to be relied upon as precise indicators of the size, scale, or pattern of
						products. We recommend always ordering samples, reviewing product images on supplier
						websites (provided in the Design Specification), and checking measurements before making
						any final purchases.
					</p>
					<a href="/">View all information</a>
				</div>
			{:else if productInfoTab === 'benefits'}
				<div>
					<ul>
						<CheckList
							>A stunning, professionally designed home for a fraction of the cost of hiring an
							interior designer</CheckList
						>
						<CheckList>Save precious time, money and frustration</CheckList>
						<CheckList>Access to trade-only products and trade discounts</CheckList>
						<CheckList
							>Express your unique taste thanks to our customisable design schemes</CheckList
						>
					</ul>
					<a href="/">View all information</a>
				</div>
			{/if}
		</section>
		<div class="PageBreak" aria-label="A divider to break up different page content."></div>
		<section>
			<SectionHeader
				headerTag="h2"
				header="Related {product.roomTypeName} Schemes"
				textCenter={true}
			/>

			<div class="MoreSchemes">
				<div class="MoreSchemes__viewport">
					<ul class="MoreSchemes__list">
						{#each allRelatedProducts as relatedProduct}
							<li class="MoreSchemes__item">
								<article class="MoreSchemes__product">
									<div class="MoreSchemes__info">
										<h4>{relatedProduct.name}</h4>
										{#if relatedProduct.prices && relatedProduct.prices.length > 0}
											<span
												><Price
													price={relatedProduct.prices[0].unitAmount}
													currency={relatedProduct.prices[0].currency}
												/></span
											>
										{:else}
											<span>£750</span>
										{/if}
									</div>

									<div class="MoreSchemes__image">
										<img
											src={relatedProduct.images[0]}
											alt={`${relatedProduct.name} design scheme.`}
										/>
									</div>

									<a href="/off-the-peg-schemes/{relatedProduct.roomType?.slug}/{relatedProduct.id}"
										><span class="visually-hidden"
											>View the {relatedProduct.roomType?.name} product page.</span
										></a
									>
								</article>
							</li>
						{/each}
					</ul>
				</div>
			</div>
		</section>

		<!-- <section>
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
		</section> -->
	{:else}
		<p>No schemes to see!</p>
	{/if}
</main>

<style lang="scss">
	@use '$lib/styles/partials/breakpoints';

	.Tabs {
		margin-block: 2rem;
		width: 100%;

		&__list {
			display: flex;
			flex-wrap: wrap;
			gap: 0.5rem;
			justify-content: center;

			@include breakpoints.tablet {
				gap: 1rem;
				justify-content: flex-start;
			}
			@include breakpoints.laptop {
				gap: 1.5rem;
			}
		}

		&__item {
			padding: 0.25rem;
			font-size: clamp(1rem, 2vw, 2rem);
		}

		&__tab {
			position: relative;

			&.active::after {
				content: '';
				background-color: black;
				bottom: -4px;
				height: 1px;
				left: 0;
				position: absolute;
				width: 100%;

				@include breakpoints.tablet {
					view-transition-name: active-page;
				}
			}
		}
	}

	.Scheme {
		margin: 0 auto;
		width: 100%;

		&__section {
			padding: 1rem;

			@include breakpoints.tablet {
				padding-inline: 3rem;
			}
		}
	}

	.MoreSchemes {
		width: 100%;
		padding-left: 1rem;
		padding-top: 2rem;
		margin: auto;

		&__viewport {
			overflow-x: auto;
			scroll-snap-type: x mandatory;
			-webkit-overflow-scrolling: touch;
		}

		&__list {
			display: flex;
			padding-left: 1rem;
		}

		&__item {
			flex: 0 0 60%;
			margin-right: 1rem;
			min-width: 0;
			scroll-snap-align: start;
			transform: translate3d(0, 0, 0);

			@include breakpoints.tablet {
				flex: 0 0 45%;
			}

			@include breakpoints.laptop {
				flex: 0 0 25%;
			}
		}

		&__product {
			display: flex;
			flex-direction: column-reverse;
		}

		&__info {
			font-size: 0.875rem;
			margin-top: 0.5rem;

			h4 {
				margin-bottom: 0.25rem;
			}
		}

		&__image {
			position: relative;
			width: 100%;
			aspect-ratio: 3.5 / 5;

			img {
				position: absolute;
				object-fit: cover;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
			}
		}

		a::after {
			content: '';
			position: absolute;
			inset: 0;
		}
	}
</style>
