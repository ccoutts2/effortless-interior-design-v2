import prisma from '$lib/server/prisma';
import { redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

interface SchemeProps {
	cookies: any;
	params: {
		roomTypeSlug: string;
		scheme: string;
	};
}

const fetchScheme = async (id: number) => {
	const scheme = await prisma.scheme.findUniqueOrThrow({
		where: { id },
		include: {
			images: {
				orderBy: { schemeIndex: 'asc' }
			}
		}
	});
	return scheme;
};

const fetchAllSchemes = async () => {
	const allSchemes = await prisma.scheme.findMany({
		where: {
			isAvailable: true
		},
		include: {
			images: {
				orderBy: { schemeIndex: 'asc' }
			},
			roomType: true
		}
	});

	return allSchemes;
};

export const load: PageServerLoad = async ({ params }: SchemeProps) => {
	const scheme = await fetchScheme(Number(params.scheme));
	const allSchemes = await fetchAllSchemes();

	return {
		scheme,
		relatedSchemes: allSchemes.filter(
			(s) => s.roomTypeName === scheme.roomTypeName && s.id !== scheme.id
		),
		allSchemes: allSchemes.filter((s) => s.id !== scheme.id)
	};
};

export const actions = {
	default: async ({ request, cookies }) => {
		const form = await request.formData();
		const schemeId = form.get('schemeId');

		if (!schemeId || isNaN(Number(schemeId))) {
			return { status: 400, body: { message: 'Invalid schemeId' } };
		}

		const sessionCookie = cookies.get('session');

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
				schemeId: Number(schemeId),
				basketId: basket.id
			};
			await prisma.schemesInBasket.upsert({
				where: { schemeId_basketId: schemeInBasketId },
				update: {},
				create: {
					basketId: basket.id,
					schemeId: Number(schemeId)
				}
			});

			return {
				status: 200,
				body: { message: 'Item added to basket successfully.' }
			};
		} catch (error) {
			console.log(error);
			return {
				status: 500,
				body: { message: 'Failed to add item to basket.' }
			};
		}
	}
} satisfies Actions;
