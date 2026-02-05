import prisma from '$lib/server/prisma';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies }) => {
	const sessionCookie = cookies.get('session');

	let schemesInBasket = null;
	if (sessionCookie) {
		schemesInBasket = await fetchSchemesInBasket(sessionCookie);
	}

	return {
		schemesInBasket
	};
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
					roomType: true
				}
			}
		}
	});

	return schemes;
};
