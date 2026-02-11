import prisma from '$lib/server/prisma';
import { StripeService } from '$lib/services/stripe.service';
import { fail, redirect, type Actions } from '@sveltejs/kit';

export const actions = {
	purchaseBasket: async ({ cookies }) => {
		const sessionId = cookies.get('session');

		// TODO: redirect to appropriate page

		if (!sessionId) {
			throw redirect(302, '/');
		}

		const basket = await prisma.basket.findUnique({
			where: { sessionId },
			include: {
				products: {
					include: {
						product: {
							include: {
								prices: {
									where: { active: true },
									take: 1
								}
							}
						}
					}
				}
			}
		});

		if (!basket || basket.products.length === 0) {
			throw redirect(302, '/shopping/error');
		}

		const itemsToPurchase = basket.products.map((product) => {
			return {
				priceId: product.product.prices[0].id,
				productId: product.productId
			};
		});

		const session = await StripeService.stripePayment(itemsToPurchase);

		if (session?.client_secret) {
			cookies.set('client-secret', session.client_secret, {
				path: '/',
				httpOnly: true,
				secure: true,
				sameSite: 'strict'
			});
			throw redirect(302, '/shopping/checkout');
		}
		throw redirect(302, '/shopping/error');
	},
	deleteItem: async ({ cookies, request }) => {
		const form = await request.formData();

		const productId = form.get('productId') as string;

		if (!productId) {
			return { status: 400, body: { message: 'Invalid productId' } };
		}

		const sessionId = cookies.get('session');

		// TODO: redirect to appropriate page

		if (!sessionId) {
			redirect(302, '/');
		}

		try {
			const basket = await prisma.basket.findUnique({
				where: { sessionId }
			});

			if (!basket) {
				return fail(404, { message: 'Basket not found' });
			}

			await prisma.productsInBasket.delete({
				where: {
					productId_basketId: {
						productId: productId,
						basketId: basket.id
					}
				}
			});
		} catch (error) {
			console.log(error);
		}

		return { success: true };
	}
} satisfies Actions;
