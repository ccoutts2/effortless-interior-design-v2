<script lang="ts">
	import PlusMinusButton from '../ui/buttons/PlusMinusButton.svelte';
	import NavLink from './NavLink.svelte';
	import SubMenu from './SubMenu.svelte';

	let isSubMenuOpen: boolean = $state(false);

	function openSubMenu() {
		isSubMenuOpen = !isSubMenuOpen;
	}
</script>

<nav class="MobileMenu">
	<ul class="MobileMenu__list">
		<li class="MobileMenu__item">
			<NavLink isMobileMenu={true} href="/">Home</NavLink>
		</li>
		<li class="MobileMenu__item">
			<NavLink isMobileMenu={true} href="/services">Services</NavLink>
		</li>
		<li class="MobileMenu__item"><NavLink isMobileMenu={true} href="/about">About</NavLink></li>
		<li class="MobileMenu__item">
			<div class="flex w-full items-center justify-between">
				<NavLink isMobileMenu={true} href="/off-the-peg-schemes">Off-The-Peg-Schemes</NavLink>

				<PlusMinusButton isOpen={isSubMenuOpen} onClick={openSubMenu} />
			</div>

			<SubMenu {isSubMenuOpen} direction="vertical" />
		</li>
		<li class="MobileMenu__item">
			<NavLink isMobileMenu={true} href="/contact">Contact</NavLink>
		</li>
	</ul>
</nav>

<style lang="scss">
	@use '../../styles/partials/breakpoints';

	.MobileMenu {
		align-items: flex-start;
		display: flex;
		flex-direction: column;
		height: 100%;
		justify-content: flex-start;
		width: 100%;

		@include breakpoints.desktop {
			display: none;
		}

		&__list {
			align-items: flex-start;
			display: flex;
			flex-direction: column;
			width: 100%;
		}

		&__item {
			border-bottom: 1px solid black;
			padding: 0.5rem;
			width: 100%;

			&:last-of-type {
				border-bottom: none;
			}
		}
	}
</style>
