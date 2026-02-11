import prisma from '$lib/server/prisma';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies }) => {
	const sessionCookie = cookies.get('session');

	let productsInBasket = null;
	if (sessionCookie) {
		productsInBasket = await fetchProductsInBasket(sessionCookie);
	}

	return {
		productsInBasket
	};
};

const fetchProductsInBasket = async (sessionId: string) => {
	const basket = await prisma.basket.findUnique({
		where: { sessionId: sessionId }
	});

	if (!basket) {
		return null;
	}

	const products = await prisma.productsInBasket.findMany({
		where: { basketId: basket.id },
		select: {
			productId: true,
			basketId: true,
			product: {
				select: {
					name: true,
					images: true,
					prices: {
						select: {
							id: true,
							unitAmount: true,
							currency: true
						}
					}
				}
			}
		}
	});

	return products;
};
