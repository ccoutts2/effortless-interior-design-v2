<script lang="ts">
	import { ShoppingCart, User } from '@lucide/svelte';
	import type { Snippet } from 'svelte';
	import NavLink from '../navigation/NavLink.svelte';
	import Button from '../buttons/Button.svelte';

	interface HeaderProps {
		children: Snippet;
		dataIsAdmin?: boolean;
		onClick?: () => void;
	}

	let { children, dataIsAdmin = false, onClick }: HeaderProps = $props();
</script>

<header class="NavBar">
	<div class="NavBar__button">
		<Button data-content="Menu">Menu</Button>
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
		{#if !dataIsAdmin}
			<button onclick={onClick}>
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
