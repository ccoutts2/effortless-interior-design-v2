import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import prisma from '$lib/server/prisma';
import type { LayoutServerLoad } from './$types';
import z from 'zod';

const schema = z.object({
	email: z.string().email(),
	name: z.string().min(1, 'Please enter a valid name').optional()
});

export const load: LayoutServerLoad = async ({ locals, cookies }) => {
	const { session, user } = locals;
	const form = await superValidate(zod(schema), { id: 'modal' });

	const dismissNewsletter = cookies.get('newsletter_dismissed') === 'true';

	let productsInBasket = null;

	if (session) {
		productsInBasket = await fetchProductsInBasket(session.id);
	}

	const showNewsletterPopup = user ? !user.newsletterSub : !dismissNewsletter;

	return {
		productsInBasket,
		user,
		showNewsletterPopup,
		form
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
