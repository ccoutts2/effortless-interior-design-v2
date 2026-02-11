<script lang="ts">
	import type { OverlayProps } from '$lib/types';
	import { getContext } from 'svelte';

	import Price from './Price.svelte';
	import { enhance } from '$app/forms';

	const context = getContext<OverlayProps>('overlay-ctx');
</script>

{#if context?.data}
	<div class="ShoppingBasket">
		<div>
			<p class="ShoppingBasket__label">Basket</p>

			<ul class="ShoppingBasket__items">
				{#each context.data as item}
					<li>
						<article class="ShoppingBasket__item">
							<div class="ShoppingBasket__productContainer">
								<div class="ShoppingBasket__productInfo">
									<span>{item.product.name}</span>
									{#if item.product.prices[0]}
										<Price
											price={item.product.prices[0].unitAmount}
											currency={item.product.prices[0].currency}
										/>
									{/if}
								</div>
								<form method="POST" action="/shopping/basket?/deleteItem" use:enhance>
									<input type="hidden" name="productId" value={item.productId} />
									<button type="submit" class="ShoppingBasket__removeButton">Remove</button>
								</form>
							</div>
							{#if item.product.images[0]}
								<div class="ShoppingBasket__image"><img src={item.product.images[0]} alt="" /></div>
							{/if}
						</article>
					</li>
				{/each}
			</ul>
		</div>
		<div class="ShoppingBasket__button">
			<form method="POST" action="/shopping/basket?/purchaseBasket">
				<button type="submit">Buy</button>
			</form>
		</div>
	</div>
{/if}

<style lang="scss">
	.ShoppingBasket {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: stretch;
		padding-bottom: 1rem;
		height: 100%;

		&__label {
			border-bottom: 1px solid currentColor;
			font-size: 1.25rem;
			padding: 1rem;
			text-transform: uppercase;
		}

		&__items {
			display: flex;
			flex-direction: column-reverse;
			padding: 1rem;
			gap: 2rem;
		}

		&__item {
			align-items: stretch;
			display: flex;
			flex-direction: row-reverse;
			gap: 0.5rem;
			padding-top: 0.5rem;
			position: relative;

			&::after {
				content: '';
				position: absolute;
				height: 1px;
				width: 100%;
				bottom: -1rem;
				left: 0;
				background-color: currentColor;
			}
		}

		&__productContainer {
			display: flex;
			padding-block: 0.75rem;
			flex-direction: column;
			justify-content: space-between;
			flex: 1;
		}

		&__productInfo {
			font-size: 0.875rem;
			display: flex;
			flex-direction: column;
			gap: 0.25rem;
		}

		&__removeButton {
			position: relative;
			text-transform: uppercase;
			font-size: 0.75rem;

			&::after {
				content: '';
				background-color: currentColor;
				bottom: -2px;
				height: 1.5px;
				left: 0;
				position: absolute;
				width: 100%;
			}
		}

		&__image {
			flex: 1;
		}

		&__button {
			padding: 2rem 1rem;
			width: 100%;
		}
	}
</style>
