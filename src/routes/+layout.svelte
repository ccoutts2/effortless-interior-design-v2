<script lang="ts">
	import '../lib/styles/globals.css';
	import favicon from '$lib/assets/favicon.svg';
	import { type Snippet } from 'svelte';
	import { setContext } from 'svelte';
	import type { OverlayProps } from '$lib/types';

	import Header from '$lib/components/layout/Header.svelte';
	import NavLink from '$lib/components/navigation/NavLink.svelte';
	import Overlay from '$lib/components/ui/Overlay.svelte';
	import SubMenu from '$lib/components/navigation/SubMenu.svelte';

	let { children }: { children: Snippet } = $props();

	const overlayState = $state<OverlayProps>({
		isOpen: false,
		overlayContent: null
	});

	setContext('overlay-ctx', overlayState);

	let isActive: boolean = $state(false);

	function onMouseEnter() {
		isActive = true;
	}

	function onMouseLeave() {
		isActive = false;
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Header>
	<ul class="flex flex-1 justify-start gap-8">
		<li><NavLink isMobileMenu={false} href="/services">Services</NavLink></li>
		<li><NavLink isMobileMenu={false} href="/about">About</NavLink></li>
		<li>
			<NavLink isMobileMenu={false} href="/off-the-peg-schemes">Off-The-Peg-Schemes</NavLink>
		</li>
		<li><NavLink isMobileMenu={false} href="/contact">Contact</NavLink></li>
	</ul>
</Header>
{@render children?.()}

<Overlay />
