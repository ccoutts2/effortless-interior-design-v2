<script lang="ts">
	import { getContext } from 'svelte';
	import type { OverlayProps } from '$lib/types';
	import Button from '../buttons/Button.svelte';
	import MobileMenu from '../navigation/MobileMenu.svelte';

	const overlay = getContext('overlay-ctx') as OverlayProps;
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
	.Overlay {
		align-items: center;
		background-color: #f3eee8;
		clip-path: polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%);
		display: flex;
		height: auto;
		justify-content: center;
		left: 0;
		padding-bottom: 10vh;
		position: fixed;
		top: 0;
		transition: clip-path 1s;
		width: 100%;
		z-index: 1000;

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
