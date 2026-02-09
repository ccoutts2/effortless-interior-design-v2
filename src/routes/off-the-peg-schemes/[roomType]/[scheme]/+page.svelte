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

	interface SchemeProps {
		data: PageData;
	}

	let { data }: SchemeProps = $props();

	let isPageReady: boolean = $state(false);

	// Retreive specific product
	const scheme = $derived(data.scheme);

	// Retrieve all products related to scheme;
	const allRelatedSchemes = $derived(data.relatedSchemes);

	// Retreive all available schemes
	const allAvailableSchemes = $derived(data.allSchemes);

	onMount(() => {
		isPageReady = true;
	});
</script>

<main class="Scheme">
	{#if scheme}
		<SchemeWrapper>
			<SchemeInfoWrapper>
				<SchemeInfo
					id={scheme.id}
					name={scheme.name}
					description={scheme.description}
					features={scheme.features}
					price={scheme.prices[0].unitAmount}
					currency={scheme.prices[0].currency}
					priceId={scheme.prices[0].id}
				/>
				<Accordion {accordionData} />
			</SchemeInfoWrapper>
			<SchemeCarousel roomType={scheme.roomType?.name.toLowerCase()} />
		</SchemeWrapper>

		<GridWrapper as="div">
			<p class="col-start-1 col-end-13 mt-12! text-lg md:col-start-6 lg:text-3xl">
				Our Off-the-Peg Design Schemes are expertly curated collections of high-spec fabrics,
				paints, wallpapers and accessories, designed to help you create a stunning home without the
				guesswork.
			</p>
			<p class="col-start-1 col-end-12 mt-24! text-lg md:col-end-9 lg:text-3xl">
				We share our trade margins with our customers, meaning that the designer fabrics, trimmings
				and wallpapers in the schemes are offered at discounts of up to 30%. Many of our suppliers
				are trade-only, meaning that you cannot buy their products unless you have an interior
				designer (or an Off-the-Peg Design Scheme!)
			</p>
		</GridWrapper>
		<section class="Scheme__section">
			<SectionHeader headerTag="h2" header="What's inluded?" textCenter={true} />
			<p>This Off-the-Peg Design Scheme takes the form of a PDF file which contains:</p>
			<ul>
				<CheckList>Your Design Specification, containing prices and product details</CheckList>
				<CheckList>High-quality renderings of the design scheme in an example room</CheckList>
				<CheckList
					>A detailed step-by-step guide to help you pull your design scheme together Holly's Little
					Black Book A link to your Order Request Form</CheckList
				>
			</ul>
			<p class="mt-6!">
				See more <span class="underline"><a href="/">information</a></span> about what's included in
				your purchase, and other important information.
			</p>
		</section>
		<div class="PageBreak" aria-label="A divider to break up different page content."></div>
		<section>
			<SectionHeader
				headerTag="h2"
				header="Related {scheme.roomTypeName} Schemes"
				textCenter={true}
			/>

			<div class="MoreSchemes">
				<div class="MoreSchemes__viewport">
					<ul class="MoreSchemes__list">
						{#each allRelatedSchemes as product}
							<li class="MoreSchemes__item">
								<article class="MoreSchemes__product">
									<div>
										<h4>{product.name}</h4>
										<span>£</span>
									</div>

									<div class="MoreSchemes__image">
										<img src={product.images[0]} alt={`${product.name} design scheme.`} />
									</div>

									<a href="/off-the-peg-schemes/{product.roomType?.slug}/{product.id}"
										><span class="visually-hidden"
											>View the {product.roomType?.name} product page.</span
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

	.PageBreak {
		width: 100%;
		height: 2px;
		background-color: currentColor;
		margin-block: 4rem;
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
		margin: auto;

		&__viewport {
			overflow-x: auto;
			scroll-snap-type: x mandatory;
			-webkit-overflow-scrolling: touch;
		}

		&__list {
			cursor: grab;
			display: flex;

			:active {
				cursor: grabbing;
			}
		}

		&__item {
			flex: 0 0 60%;
			min-width: 0;
			scroll-snap-align: start;
			padding-left: 1rem;
			transform: translate3d(0, 0, 0);

			@include breakpoints.tablet {
				flex: 0 0 40%;
			}

			@include breakpoints.laptop {
				flex: 0 0 25%;
			}
		}

		&__product {
			display: flex;
			flex-direction: column-reverse;
		}

		&__image {
			position: relative;
			width: 100%;
			height: clamp(15rem, 25rem, 30rem);

			img {
				position: absolute;
				object-fit: cover;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
			}
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
