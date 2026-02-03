<script lang="ts">
	import { getContext } from 'svelte';
	import type { OverlayProps } from '$lib/types';
	import Button from '../buttons/Button.svelte';
	import MobileMenu from '../navigation/MobileMenu.svelte';

	const overlay = getContext<OverlayProps>('overlay-ctx');
</script>

<div class="Overlay {overlay.isOpen ? 'reveal' : ''}">
	{#if overlay.overlayContent}
		<svelte:component this={overlay.overlayContent} />
	{/if}

	<div class="Overlay__button {overlay.overlayContent === MobileMenu ? 'bottom' : 'top'}">
		<Button data-content="Close" onclick={() => (overlay.isOpen = false)}>Close</Button>
	</div>
</div>

<style lang="scss">
	@use '$lib/styles/partials/breakpoints';

	.Overlay {
		align-items: center;
		background-color: #f3eee8;
		clip-path: polygon(100% 0, 100% 0, 100% 100%, 100% 100%);
		display: flex;
		height: auto;
		justify-content: center;
		right: 0;
		padding: 1rem;
		position: fixed;
		top: 0;
		transition: clip-path 1s;
		width: 100%;
		z-index: 1000;

		@include breakpoints.desktop {
			width: 25%;
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
				right: 0.5rem;
				bottom: 1rem;
			}
		}
	}
</style>
