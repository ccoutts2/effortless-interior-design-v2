<script lang="ts">
	import NavLink from './NavLink.svelte';

	let isSubMenuOpen: boolean = $state(false);

	function openSubMenu() {
		isSubMenuOpen = !isSubMenuOpen;
	}
</script>

<nav class="MobileMenu">
	<ul class="MobileMenu__list">
		<li class="MobileMenu__item">
			<NavLink data-mobile-menu={true} href="/">Home</NavLink>
		</li>
		<li class="MobileMenu__item">
			<NavLink data-mobile-menu={true} href="/services">Services</NavLink>
		</li>
		<li class="MobileMenu__item"><NavLink data-mobile-menu={true} href="/about">About</NavLink></li>
		<li class="MobileMenu__item">
			<div class="flex w-full justify-between">
				<span>
					<NavLink data-mobile-menu={true} href="/off-the-peg-scehemes">Off-The-Peg-Schemes</NavLink
					>
				</span>
				<span><button onclick={openSubMenu}>&times;</button></span>
			</div>

			<ul class="MobileMenu__subMenu {isSubMenuOpen ? 'open' : ''}">
				<li class="MobileMenu__item">Bedroom</li>
				<li class="MobileMenu__item">Bathroom</li>
				<li class="MobileMenu__item">Kitchen</li>
				<li class="MobileMenu__item">Living Room</li>
			</ul>
		</li>
		<li class="MobileMenu__item">
			<NavLink data-mobile-menu={true} href="/contact">Contact</NavLink>
		</li>
	</ul>
</nav>

<style lang="scss">
	.MobileMenu {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: flex-start;
		width: 100%;
		height: 100%;

		&__list {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			width: 100%;
		}

		&__item {
			border-bottom: 1px solid black;
			padding: 0.25rem;
			width: 100%;
		}

		&__subMenu {
			overflow: hidden;
			max-height: 0;
			transition: max-height 1.1s cubic-bezier(0, 1.09, 0.83, 1);

			&.open {
				max-height: 150px;
			}
		}
	}
</style>
