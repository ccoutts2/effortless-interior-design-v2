import type Stripe from 'stripe';
import type { Product } from '$lib/types';
import prisma from '$lib/server/prisma';

const mapStripeProductToDbProduct = ({
	id,
	name,
	active,
	description,
	images,
	marketing_features: features,
	metadata,
	created,
	updated
}: Stripe.Product): Product => ({
	id,
	name,
	active,
	description,
	images,
	features: features.map(({ name }) => name || '').filter((name) => !!name) as string[],
	metadata,
	roomTypeName: metadata.roomType || null,
	created: new Date(created * 1000),
	updated: new Date(updated * 1000)
});

export const upsertProduct = async (product: Stripe.Product) => {
	const dbProduct = mapStripeProductToDbProduct(product);
	const roomTypeConnection = dbProduct.roomTypeName
		? { connect: { name: dbProduct.roomTypeName } }
		: undefined;

	try {
		await prisma.scheme.upsert({
			where: { id: dbProduct.id },
			update: {
				name: dbProduct.name,
				active: dbProduct.active,
				description: dbProduct.description,
				features: dbProduct.features,
				images: dbProduct.images,
				metadata: dbProduct.metadata as any,
				roomType: roomTypeConnection,
				updatedAt: dbProduct.updated
			},
			create: {
				id: dbProduct.id,
				name: dbProduct.name,
				active: dbProduct.active,
				description: dbProduct.description,
				features: dbProduct.features,
				metadata: dbProduct.metadata as any,
				roomType: roomTypeConnection,
				createdAt: dbProduct.created,
				updatedAt: dbProduct.updated
			}
		});
	} catch (error) {
		console.log(error);
	}
};

const mapStripePriceToDbPrice = ({ id }: Stripe.Price) => {};

export const upsertPrice = async (price: Stripe.Price) => {};
