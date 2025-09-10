<script lang="ts">
	import { getContext } from 'svelte';
	import type { OverlayProps } from '$lib/types';

	const overlay = getContext('overlay-ctx') as OverlayProps;
</script>

<div class="Overlay {overlay.isOpen ? 'reveal' : ''}">
	<button class="Overlay__button" onclick={() => (overlay.isOpen = false)}>&times;</button>
	<div class="Overlay__content">
		{#if overlay.overlayContent}
			<svelte:component this={overlay.overlayContent} />
		{/if}
	</div>
</div>

<style lang="scss">
	.Overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.7);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1000;
		clip-path: polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%);
		transition: all 0.5s;

		&.reveal {
			background-color: red;
			clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
		}

		&__button {
			position: absolute;
			top: 10px;
			right: 10px;
			background: none;
			border: none;
			font-size: 2rem;
			cursor: pointer;
			z-index: 10001;
		}

		&__content {
			width: 100%;
			height: 100%;
		}
	}
</style>
