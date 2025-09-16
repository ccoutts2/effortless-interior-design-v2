import prisma from '$lib/server/prisma';
import { redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

interface SchemeProps {
	cookies: any;
	params: {
		roomTypeName: string;
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

const fetchSchemes = async (roomTypeName: string) => {
	const schemes = await prisma.scheme.findMany({
		where: {
			roomTypeName: {
				equals: roomTypeName,
				mode: 'insensitive'
			},
			isAvailable: true
		},
		include: {
			images: {
				orderBy: { schemeIndex: 'asc' }
			}
		}
	});
	return schemes;
};

const fetchAllSchemes = async () => {
	const allSchemes = await prisma.scheme.findMany({
		where: {
			isAvailable: true
		},
		include: {
			images: {
				orderBy: { schemeIndex: 'asc' }
			}
		}
	});

	return allSchemes;
};

const fetchSchemesInBasket = async (sessionId: string) => {
	const basket = await prisma.basket.findUnique({
		where: { sessionId: sessionId }
	});

	if (!basket) {
		return null;
	}

	const schemes = await prisma.schemesInBasket.findMany({
		where: { basketId: basket.id },
		include: {
			scheme: {
				include: {
					images: true,
					roomType: true
				}
			}
		}
	});

	return schemes;
};

export const load: PageServerLoad = async ({ params, cookies }: SchemeProps) => {
	const scheme = await fetchScheme(Number(params.scheme));
	const schemes = await fetchSchemes(params.roomTypeName);

	const allSchemes = await fetchAllSchemes();

	const sessionCookie = cookies.get('session');

	let schemesInBasket = null;
	if (sessionCookie) {
		schemesInBasket = await fetchSchemesInBasket(sessionCookie);
	}

	return {
		scheme,
		schemes,
		allSchemes,
		schemesInBasket
	};
};

export const actions = {
	default: async ({ request, cookies }) => {
		const form = await request.formData();
		const schemeId = form.get('schemeId');

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

			await prisma.schemesInBasket.create({
				data: {
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
		}
	}
} satisfies Actions;
