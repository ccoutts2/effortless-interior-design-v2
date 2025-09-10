import type { Component } from 'svelte';

export interface OverlayProps {
	isOpen: boolean;
	overlayContent: Component | null;
}
