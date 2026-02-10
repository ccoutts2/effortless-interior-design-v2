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
				schemes: {
					include: {
						scheme: {
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

		if (!basket || basket.schemes.length === 0) {
			throw redirect(302, '/shopping/error');
		}

		const itemsToPurchase = basket.schemes.map((scheme) => {
			return {
				priceId: scheme.scheme.prices[0].id,
				schemeId: scheme.schemeId
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

		const schemeId = form.get('schemeId') as string;

		if (!schemeId) {
			return { status: 400, body: { message: 'Invalid schemeId' } };
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

			await prisma.schemesInBasket.delete({
				where: {
					schemeId_basketId: {
						schemeId: schemeId,
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
