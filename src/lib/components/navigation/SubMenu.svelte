<script lang="ts">
	import NavLink from './NavLink.svelte';

	interface SubMenuProps {
		isSubMenuOpen: boolean;
		direction: 'vertical' | 'horizontal';
	}

	let { isSubMenuOpen, direction }: SubMenuProps = $props();
</script>

<menu class="SubMenu {isSubMenuOpen ? 'open' : ''}" data-direction={direction}>
	<li class="SubMenu__item">
		<NavLink isMobileMenu={true} href="/schemes/bathroom">Bathroom</NavLink>
	</li>
	<li class="SubMenu__item">
		<NavLink isMobileMenu={true} href="/schemes/bedroom">Bedroom</NavLink>
	</li>
	<li class="SubMenu__item">
		<NavLink isMobileMenu={true} href="/schemes/kitchen">Kitchen</NavLink>
	</li>
	<li class="SubMenu__item">
		<NavLink isMobileMenu={true} href="/schemes/living-room">Living Room</NavLink>
	</li>
</menu>

<style lang="scss">
	.SubMenu {
		display: flex;
		max-height: 0;
		overflow: hidden;
		position: relative;
		transition: max-height 1.1s cubic-bezier(0, 1.09, 0.83, 1);

		&__item {
			border-bottom: 1px solid black;
			padding: 0.5rem;
			width: 100%;

			&:last-of-type {
				border-bottom: none;
			}
		}

		&[data-direction='vertical'] {
			flex-direction: column;

			&.open {
				max-height: 275px;
			}
		}

		&[data-direction='horizontal'] {
			flex-direction: row;
			gap: 2rem;
			width: 75%;
			top: 6em;
			position: absolute;

			&.open {
				max-height: 75px;
			}
		}
	}
</style>
