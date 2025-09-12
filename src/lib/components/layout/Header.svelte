<script lang="ts">
	import { Heart, ShoppingCart, User } from '@lucide/svelte';
	import { getContext, onMount, type Snippet } from 'svelte';
	import NavLink from '../navigation/NavLink.svelte';
	import Button from '../buttons/Button.svelte';

	interface HeaderProps {
		children: Snippet;
		dataIsAdmin?: boolean;
	}

	let { children, dataIsAdmin = false }: HeaderProps = $props();

	import MobileMenu from '../navigation/MobileMenu.svelte';
	import type { OverlayProps } from '$lib/types';
	import ShoppingBasket from '../ShoppingBasket.svelte';

	const overlay = getContext('overlay-ctx') as OverlayProps;

	function openMobileOverlay() {
		overlay.isOpen = true;
		overlay.overlayContent = MobileMenu;
	}

	function openShoppingOverlay() {
		overlay.isOpen = true;
		overlay.overlayContent = ShoppingBasket;
	}
</script>

<header class="NavBar">
	<div class="NavBar__button">
		<Button data-content="Menu" onclick={openMobileOverlay}>Menu</Button>
	</div>
	<nav class="NavBar__navEl">
		{@render children?.()}
	</nav>
	<div class="NavBar__logo">
		<a href="/">
			<img src="/assets/logos/eid-logo.webp" alt="Effortless Interior Design text" />
		</a>
	</div>
	<div class="NavBar__icon">
		<button>
			<Heart />
		</button>
		{#if !dataIsAdmin}
			<button onclick={openShoppingOverlay}>
				<ShoppingCart />
			</button>
		{:else}
			<NavLink href="/">
				<User />
			</NavLink>
		{/if}
	</div>
</header>

<style lang="scss">
	@use '../../styles/partials/breakpoints';

	.NavBar {
		align-items: center;
		display: flex;
		justify-content: space-between;
		padding: 1rem;
		width: 100%;

		@include breakpoints.tablet {
			padding-inline: 2rem;
		}

		@include breakpoints.desktop {
			padding: 2rem 4rem;
		}

		&__button {
			display: flex;
			flex: 1;
			justify-content: flex-start;

			@include breakpoints.desktop {
				display: none;
			}
		}
		&__navEl {
			display: none;

			@include breakpoints.desktop {
				display: flex;
				flex: 1;
				justify-content: flex-start;
			}
		}

		&__logo {
			flex: 1;
			max-width: 18rem;
		}

		&__icon {
			display: flex;
			flex: 1;
			justify-content: flex-end;
		}
	}
</style>
