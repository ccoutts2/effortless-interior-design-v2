<script lang="ts">
	import { getContext } from 'svelte';
	import { invalidateAll } from '$app/navigation';
	import AddBasketForm from './form/AddBasketForm.svelte';
	import Form from './form/Form.svelte';
	import Price from './Price.svelte';
	import ShoppingBasket from './ShoppingBasket.svelte';
	import type { OverlayProps } from '$lib/types';

	interface SchemeInfoProps {
		id: string;
		name: string;
		description: string | null;
		features: string[];
		price: number | null;
		currency: string;
		priceId: string;
	}
	let { id, name, description, features, price, currency, priceId }: SchemeInfoProps = $props();

	const overlay = getContext('overlay-ctx') as OverlayProps;

	let addingToBasket: boolean = $state(false);
</script>

<article class="SchemeInfo">
	<header class="SchemeInfo__header">
		<h2>{name}</h2>
		<Price {price} {currency} />
	</header>

	<div class="SchemeInfo__info">
		<h3>Description</h3>
		<p>{description}</p>
	</div>

	<div class="SchemeInfo__info">
		<h3>Features</h3>
		<dl>
			<dt>File Name:</dt>
			<dd>{name}</dd>
			<dt>Type:</dt>
			<dd>{features[0]}</dd>
			<dt>Size:</dt>
			<dd>{features[1]}</dd>
		</dl>
	</div>
	<div class="SchemeInfo__buttons">
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
			<input type="hidden" name="schemeId" value={id} />
		</AddBasketForm>

		<Form action="?/purchaseProduct" buttonLabel="Checkout Now">
			<input type="hidden" name="price_id" value={priceId} />
			<input type="hidden" name="scheme_id" value={id} />
		</Form>
	</div>
</article>

<style lang="scss">
	@use '$lib/styles/partials/breakpoints';
	@use '$lib/styles/partials/mixins';

	.SchemeInfo {
		width: 100%;

		&__header {
			@include mixins.flex($direction: column, $align: flex-start, $gap: 0.25rem);

			@include breakpoints.laptop {
				align-items: center;
				flex-direction: row;
				gap: 0;
				justify-content: space-between;
			}

			h2 {
				font-size: 1.75rem;
				font-weight: 400;
				text-transform: uppercase;
			}
		}

		&__info {
			margin-block: 1.5rem 0.5rem;
			width: 100%;

			h3 {
				font-weight: 400;
				font-size: 1.125rem;
			}

			p {
				padding-top: 0.5rem;
				font-size: 0.875rem;
			}

			dl {
				font-size: 0.875rem;
			}

			dt {
				font-weight: 600;
				margin-top: 0.25rem;
			}
		}

		&__buttons {
			@include mixins.flex($direction: column, $gap: 1rem);
			margin-top: 2rem;

			@include breakpoints.laptop {
				@include mixins.flex($direction: row, $justify: flex-start, $gap: 1rem);
			}
		}
	}
</style>
