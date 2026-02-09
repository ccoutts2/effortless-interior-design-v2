import type Stripe from 'stripe';
import type { Price, Product, ProductMetaData } from '$lib/types';
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
				metadata: dbProduct.metadata as ProductMetaData,
				roomType: roomTypeConnection,
				updatedAt: dbProduct.updated
			},
			create: {
				id: dbProduct.id,
				name: dbProduct.name,
				active: dbProduct.active,
				description: dbProduct.description,
				features: dbProduct.features,
				metadata: dbProduct.metadata as ProductMetaData,
				roomType: roomTypeConnection,
				createdAt: dbProduct.created,
				updatedAt: dbProduct.updated
			}
		});
	} catch (error) {
		console.log(error);
	}
};

export const deleteProduct = async (product: Stripe.Product) => {
	const dbProduct = mapStripeProductToDbProduct(product);

	try {
		await prisma.scheme.delete({
			where: { id: dbProduct.id }
		});
	} catch (error) {
		console.log(error);
	}
};

const mapStripePriceToDbPrice = ({
	id,
	product,
	active,
	currency,
	type,
	unit_amount: unitAmount,
	created
}: Stripe.Price): Price => ({
	id,
	schemeId: typeof product === 'string' ? product : product.id,
	active,
	currency,
	type,
	unitAmount,
	created: new Date(created * 1000)
});

export const upsertPrice = async (price: Stripe.Price) => {
	const dbPrice = mapStripePriceToDbPrice(price);

	try {
		await prisma.schemePrice.upsert({
			where: { id: dbPrice.id },
			update: {
				id: dbPrice.id,
				schemeId: dbPrice.schemeId,
				active: dbPrice.active,
				currency: dbPrice.currency,
				type: dbPrice.type,
				unitAmount: dbPrice.unitAmount as number
			},
			create: {
				id: dbPrice.id,
				schemeId: dbPrice.schemeId,
				active: dbPrice.active,
				currency: dbPrice.currency,
				type: dbPrice.type,
				unitAmount: dbPrice.unitAmount as number,
				createdAt: dbPrice.created
			}
		});
	} catch (error) {
		console.log(error);
	}
};

export const deletePrice = async (price: Stripe.Price) => {
	const dbPrice = mapStripePriceToDbPrice(price);

	try {
		await prisma.schemePrice.delete({
			where: { id: dbPrice.id }
		});
	} catch (error) {
		console.log(error);
	}
};

export const upsertCustomer = async (session: Stripe.Checkout.Session) => {
	const email = session.customer_details?.email;
	const name = session.customer_details?.name;
	const schemeId = session.metadata?.schemeId;

	if (!email) {
		return;
	}

	try {
		const user = await prisma.user.upsert({
			where: { email: email },
			update: { name: name },
			create: {
				email: email,
				name: name,
				isActive: false
			}
		});

		if (schemeId) {
			await prisma.order.create({
				data: {
					userId: user.id,
					totalPrice: session.amount_total || 0,
					withConsultation: false,
					schemes: {
						create: {
							schemeId: schemeId
						}
					}
				}
			});
		}
	} catch (error) {
		console.log(error);
	}
};
