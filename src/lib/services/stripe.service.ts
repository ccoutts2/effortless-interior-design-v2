// $lib/services/stripe.service.ts
import Stripe from 'stripe';
import { PUBLIC_DOMAIN } from '$env/static/public';
import { SECRET_STRIPE_KEY } from '$env/static/private';

const stripe = new Stripe(SECRET_STRIPE_KEY);

export const StripeService = {
	async stripePayment(priceId: string) {
		if (!priceId || typeof priceId !== 'string') {
			throw new Error('Invalid priceId: must be a non-empty string');
		}

		try {
			return await stripe.checkout.sessions.create({
				ui_mode: 'embedded',
				line_items: [{ price: priceId, quantity: 1 }],
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
			expand: ['line_items']
		});
	}
};
