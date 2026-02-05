import type { Component } from 'svelte';
import type { PaymentType } from '../generated/prisma/enums';

export interface OverlayProps {
	isOpen: boolean;
	overlayContent: Component | null;
	data?: any;
}

// Stripe related types

export type Product = {
	id: string;
	name: string;
	active: boolean;
	description?: string | null;
	features: string[];
	images: string[];
	metadata?: ProductMetaData | null;
	roomTypeName: string | null;
	roomType?: {
		name: string;
		slug: string;
	} | null;
	created: Date;
	updated: Date;
};

export type Price = {
	id: string;
	schemeId: string;
	active: boolean;
	currency: string;
	unitAmount: number | null;
	type: PaymentType;
	created: Date;
};

export type ProductMetaData = {
	altDescription?: string;
	roomTypeName?: string;
};
