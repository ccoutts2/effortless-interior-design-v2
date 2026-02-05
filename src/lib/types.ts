import type { Component } from 'svelte';

export interface OverlayProps {
	isOpen: boolean;
	overlayContent: Component | null;
	data?: any;
}

export type Product = {
	id: string;
	name: string;
	active: boolean;
	description?: string | null;
	features: string[];
	metadata?: Object | null;
	created: Date;
	updated: Date;
};

export type Price = {};
