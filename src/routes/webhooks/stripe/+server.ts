import { SECRET_STRIPE_WEBHOOK } from '$env/static/private';
import { stripe } from '$lib/server/stripe/stripe';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	const signature = request.headers.get('stripe-signature');
	const body = await request.text();

	if (!signature) {
		return new Response('unautorized', { status: 401 });
	}
	try {
		const event = stripe.webhooks.constructEvent(body, signature, SECRET_STRIPE_WEBHOOK);
		console.log('TYPE', event.type);
		switch (event.type) {
			case 'payment_intent.succeeded': {
				const paymentIntent = event.data.object;
				console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
				// Then define and call a method to handle the successful payment intent.
				// handlePaymentIntentSucceeded(paymentIntent);
				break;
			}
			case 'payment_method.attached': {
				const paymentMethod = event.data.object;
				// Then define and call a method to handle the successful attachment of a PaymentMethod.
				// handlePaymentMethodAttached(paymentMethod);
				break;
			}
			default:
				// Unexpected event type
				console.log(`Unhandled event type ${event.type}.`);
		}
	} catch (error) {
		const message = error instanceof Error ? error.message : 'unknown';
		return new Response(`Webhook Error: ${message}`, { status: 400 });
	}

	console.log('we are getting webhooks');
	return json({ recevied: true });
};
