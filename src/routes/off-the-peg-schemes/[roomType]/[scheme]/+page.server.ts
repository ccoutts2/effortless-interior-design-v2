import prisma from '$lib/server/prisma';
import { redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { StripeService } from '$lib/services/stripe.service';

interface SchemeProps {
	cookies: any;
	params: {
		roomType: string;
		scheme: string;
	};
	url: any;
}

const fetchScheme = async (id: string) => {
	const scheme = await prisma.scheme.findUniqueOrThrow({
		where: { id },
		select: {
			id: true,
			name: true,
			description: true,
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
	return scheme;
};

const fetchAllSchemes = async () => {
	const allSchemes = await prisma.scheme.findMany({
		where: {
			active: true
		},
		select: {
			id: true,
			name: true,
			description: true,
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

	return allSchemes;
};

export const load: PageServerLoad = async ({ params, url }: SchemeProps) => {
	const scheme = await fetchScheme(params.scheme);
	const allSchemes = await fetchAllSchemes();
	const schemeInfoTab = url.searchParams.get('information') ?? 'included';

	return {
		scheme,
		relatedSchemes: allSchemes.filter(
			(s) => s.roomTypeName === scheme.roomTypeName && s.id !== scheme.id
		),
		allSchemes: allSchemes.filter((s) => s.id !== scheme.id),
		schemeInfoTab
	};
};

export const actions = {
	addToBasket: async ({ request, cookies }) => {
		const form = await request.formData();
		const schemeId = form.get('schemeId') as string;

		if (!schemeId) {
			return { status: 400, body: { message: 'Invalid schemeId' } };
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

			const schemeInBasketId = {
				schemeId: schemeId,
				basketId: basket.id
			};
			await prisma.schemesInBasket.upsert({
				where: { schemeId_basketId: schemeInBasketId },
				update: {},
				create: {
					basketId: basket.id,
					schemeId: schemeId
				}
			});

			const schemesInBasket = await prisma.schemesInBasket.findMany({
				where: { basketId: basket.id },
				orderBy: {
					createdAt: 'asc'
				},
				include: {
					scheme: {
						include: {
							roomType: true
						}
					}
				}
			});

			return {
				status: 200,
				body: { message: 'Item added to basket successfully.', schemesInBasket }
			};
		} catch (error) {
			console.log(error);
			return {
				status: 500,
				body: { message: 'Failed to add item to basket.' }
			};
		}
	},
	purchaseProduct: async ({ request, cookies }) => {
		const form = await request.formData();
		const priceId = form.get('price_id') as string;
		const schemeId = form.get('scheme_id') as string;

		if (!priceId || !schemeId) {
			throw redirect(302, '/shopping/error');
		}
		const session = await StripeService.stripePayment([{ priceId, schemeId }]);

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
	}
} satisfies Actions;
