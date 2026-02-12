import prisma from '$lib/server/prisma';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, cookies }) => {
	const { session } = locals;

	const userSession = await prisma.session.findUnique({
		where: { id: sessionCookie },
		include: {
			user: true
		}
	});

	console.log(userSession);

	const user = userSession?.user;

	const showNewsletterPopup = !user || !user.newsletterSub;

	let productsInBasket = null;

	if (session) {
		productsInBasket = await fetchProductsInBasket(session.id);
	}

	return {
		productsInBasket,
		user,
		showNewsletterPopup,
		userSession
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
