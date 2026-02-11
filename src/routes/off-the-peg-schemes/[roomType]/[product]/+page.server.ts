import prisma from '$lib/server/prisma';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { StripeService } from '$lib/services/stripe.service';

interface ProductProps {
	cookies: any;
	params: {
		roomType: string;
		product: string;
	};
	url: any;
}

const fetchProduct = async (id: string) => {
	const product = await prisma.product.findUniqueOrThrow({
		where: { id },
		select: {
			id: true,
			name: true,
			description: true,
			isScheme: true,
			features: true,
			images: true,
			metadata: true,
			roomTypeName: true,
			roomType: {
				select: {
					name: true,
					slug: true
				}
			},
			prices: {
				where: { active: true },
				select: {
					id: true,
					currency: true,
					unitAmount: true
				}
			}
		}
	});
	return product;
};

const fetchAllProducts = async () => {
	const allProducts = await prisma.product.findMany({
		where: {
			active: true
		},
		select: {
			id: true,
			name: true,
			description: true,
			isScheme: true,
			features: true,
			images: true,
			metadata: true,
			roomTypeName: true,
			roomType: {
				select: {
					name: true,
					slug: true
				}
			},
			prices: {
				where: { active: true },
				select: {
					id: true,
					currency: true,
					unitAmount: true
				}
			}
		}
	});

	return allProducts;
};

export const load: PageServerLoad = async ({ params, url }: ProductProps) => {
	const product = await fetchProduct(params.product);
	const allProducts = await fetchAllProducts();
	const productInfoTab = url.searchParams.get('information') ?? 'included';

	return {
		product,
		relatedProducts: allProducts.filter(
			(s) => s.roomTypeName === product.roomTypeName && s.id !== product.id
		),
		allProducts: allProducts.filter((s) => s.id !== product.id),
		productInfoTab
	};
};

export const actions = {
	addToBasket: async ({ request, cookies }) => {
		const form = await request.formData();
		const productId = form.get('productId') as string;

		if (!productId) {
			return fail(400, { message: 'Invalid productId' });
		}

		const sessionCookie = cookies.get('session');

		// TODO: redirect to appropriate page
		if (!sessionCookie) {
			throw redirect(302, '/');
		}

		try {
			const session = await prisma.session.upsert({
				where: { id: sessionCookie },
				update: {},
				create: {
					id: sessionCookie,
					secretHash: new Uint8Array(),
					lastVerifiedAt: new Date(),
					createdAt: new Date()
				}
			});

			const basket = await prisma.basket.upsert({
				where: { sessionId: session.id },
				update: {},
				create: {
					sessionId: session.id
				}
			});

			const productInBasketId = {
				productId: productId,
				basketId: basket.id
			};
			await prisma.productsInBasket.upsert({
				where: { productId_basketId: productInBasketId },
				update: {},
				create: {
					basketId: basket.id,
					productId: productId
				}
			});

			const productsInBasket = await prisma.productsInBasket.findMany({
				where: { basketId: basket.id },
				orderBy: {
					createdAt: 'asc'
				},
				include: {
					product: {
						include: {
							roomType: true
						}
					}
				}
			});

			return { success: true, message: 'Item added to basket successfully.', productsInBasket };
		} catch (error) {
			console.log(error);
			return fail(500, { message: 'Failed to add item to basket.' });
		}
	},
	purchaseProduct: async ({ request, cookies }) => {
		const form = await request.formData();
		const priceId = form.get('price_id') as string;
		const productId = form.get('product_id') as string;

		if (!priceId || !productId) {
			throw redirect(302, '/shopping/error');
		}

		try {
			const session = await StripeService.stripePayment([{ priceId, productId }]);

			if (session?.client_secret) {
				cookies.set('client-secret', session.client_secret, {
					path: '/',
					httpOnly: true,
					secure: true,
					sameSite: 'strict'
				});
				throw redirect(302, '/shopping/checkout');
			}
		} catch (error) {
			if (error instanceof Response) throw error;

			+console.error('Stripe payment error:', error);
		}

		throw redirect(302, '/shopping/error');
	}
} satisfies Actions;
