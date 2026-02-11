<script lang="ts">
	import { getContext } from 'svelte';
	import type { OverlayProps } from '$lib/types';

	import MobileMenu from '../navigation/MobileMenu.svelte';
	import { X } from '@lucide/svelte';

	const overlay = getContext<OverlayProps>('overlay-ctx');
</script>

<div class="Overlay {overlay.isOpen ? 'reveal' : ''}">
	<div class="Overlay__button {overlay.overlayContent === MobileMenu ? 'bottom' : 'top'}">
		<button onclick={() => (overlay.isOpen = false)} type="button" aria-label="Close overlay"
			><X /></button
		>
	</div>
	{#if overlay.overlayContent}
		<svelte:component this={overlay.overlayContent} />
	{/if}
</div>

<style lang="scss">
	@use '$lib/styles/partials/breakpoints';

	.Overlay {
		background-color: #e5ddd3;
		clip-path: polygon(100% 0, 100% 0, 100% 100%, 100% 100%);
		height: 100vh;
		min-height: 100vh;
		overflow: auto;
		position: fixed;
		right: 0;
		top: 0;
		transition: clip-path 0.5s;
		width: 85%;
		z-index: 1000;

		@include breakpoints.laptop {
			width: 26%;
		}

		&.reveal {
			clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
		}

		&__button {
			position: absolute;
			z-index: 1000;

			&.top {
				right: 0.5rem;
				top: 1rem;
			}

			&.bottom {
				bottom: 1rem;
				right: 0.5rem;
			}
		}
	}
</style>
