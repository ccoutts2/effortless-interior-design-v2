// $lib/services/stripe.service.ts
import Stripe from 'stripe';
import { PUBLIC_DOMAIN } from '$env/static/public';
import { SECRET_STRIPE_KEY } from '$env/static/private';

const stripe = new Stripe(SECRET_STRIPE_KEY);

export const StripeService = {
	async stripePayment(priceId: string) {
		try {
			return await stripe.checkout.sessions.create({
				ui_mode: 'embedded',
				line_items: [{ price: priceId, quantity: 1 }],
				mode: 'payment',
				return_url: `${PUBLIC_DOMAIN}/shopping/paid?session_id={CHECKOUT_SESSION_ID}`
			});
		} catch (error) {
			console.error('Stripe Session Error:', error);
			throw error;
		}
	}
};
