import type Stripe from 'stripe';
import type { Product } from '$lib/types';
import prisma from '$lib/server/prisma';

const mapStripeProductToDbProduct = ({
	id,
	name,
	active,
	description,
	marketing_features: features,
	metadata,
	created,
	updated
}: Stripe.Product): Product => ({
	id,
	name,
	active,
	description,
	features: features.map(({ name }) => name || '').filter((name) => !!name) as string[],
	metadata,
	created: new Date(created),
	updated: new Date(updated)
});

export const upsertProduct = async (product: Stripe.Product) => {
	const dbProduct = mapStripeProductToDbProduct(product);

	try {
		await prisma.scheme.upsert({
			where: { id: dbProduct.id },
			update: {
				name: dbProduct.name,
				active: dbProduct.active,
				description: dbProduct.description,
				features: dbProduct.features,
				metadata: dbProduct.metadata as any,
				updatedAt: dbProduct.updated
			},
			create: {
				id: dbProduct.id,
				name: dbProduct.name,
				active: dbProduct.active,
				description: dbProduct.description,
				features: dbProduct.features,
				metadata: dbProduct.metadata as any,
				createdAt: dbProduct.created,
				updatedAt: dbProduct.updated
			}
		});
	} catch (error) {
		console.log(error);
	}
};

const mapStripePriceToDbPrice = ({ id }: Stripe.Product) => {};

export const upsertPrice = async (price: Stripe.Price) => {};
