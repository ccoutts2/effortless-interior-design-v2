import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async () => {
	console.log('we are getting webhooks');
	return json({ recevied: true });
};
