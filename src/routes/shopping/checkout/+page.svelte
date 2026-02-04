<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageProps } from './$types';
	import { loadStripe } from '@stripe/stripe-js';
	import { PUBLIC_STRIPE_KEY } from '$env/static/public';
	import { redirect } from '@sveltejs/kit';

	let { data }: PageProps = $props();

	onMount(async () => {
		const stripe = await loadStripe(PUBLIC_STRIPE_KEY);
		const clientSecret = data.clientSecret;

		if (stripe && clientSecret) {
			const checkout = await stripe.initEmbeddedCheckout({
				clientSecret
			});

			if (checkout) {
				checkout.mount('#checkout');
				return;
			}
		}

		throw redirect(302, '/shopping/error');
	});
</script>

<div class="flex w-full items-center justify-center py-12">
	<div class="w-full rounded-lg p-8 shadow-xl">
		<div id="checkout"></div>
	</div>
</div>
