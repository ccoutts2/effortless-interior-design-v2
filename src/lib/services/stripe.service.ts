import { PUBLIC_DOMAIN } from '$env/static/public';
import { stripe } from '$lib/server/stripe/stripe';

export const StripeService = {
	async stripePayment(items: { priceId: string; productId: string }[]) {
		if (!items || items.length === 0) {
			throw new Error('Invalid priceId: must be a non-empty string');
		}

		try {
			return await stripe.checkout.sessions.create({
				ui_mode: 'embedded',
				line_items: items.map((item) => ({
					price: item.priceId,
					quantity: 1
				})),
				optional_items: [
					{
						price: 'price_1SzNUbFDhgGDMpbYzt5jzsVD',
						quantity: 1
					}
				],
				metadata: {
					productId: items.map((item) => item.productId).join(',')
				},
				mode: 'payment',
				return_url: `${PUBLIC_DOMAIN}/shopping/success?session_id={CHECKOUT_SESSION_ID}`
			});
		} catch (error) {
			console.error('Stripe Session Error:', error);
			throw error;
		}
	},

	async retrieveSession(sessionId: string) {
		return await stripe.checkout.sessions.retrieve(sessionId, {
			expand: ['line_items', 'optional_items']
		});
	}
};
