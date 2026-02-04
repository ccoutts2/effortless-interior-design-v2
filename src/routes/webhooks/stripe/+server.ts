import { SECRET_STRIPE_WEBHOOK } from '$env/static/private';
import { stripe } from '$lib/server/stripe/stripe';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	const signature = request.headers.get('stripe-signature');
	const body = await request.text();

	if (!signature) {
		return new Response('unauthorized', { status: 401 });
	}
	try {
		const event = stripe.webhooks.constructEvent(body, signature, SECRET_STRIPE_WEBHOOK);
		console.log('TYPE', event.type);
		switch (event.type) {
			case 'payment_intent.succeeded': {
				console.log(event.type);
				console.log(event.data.object);
				break;
			}
			case 'product.created': {
				console.log(event.type);
				console.log(event.data.object);
			}
			case 'payment_method.attached': {
				console.log(event.type);
				console.log(event.data.object);
				break;
			}
			default:
				console.log(`Unhandled event type ${event.type}.`);
		}
	return json({ received: true });
		return new Response(`Webhook Error: ${message}`, { status: 400 });
	}

	console.log('we are getting webhooks');
	return json({ recevied: true });
};
