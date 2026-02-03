<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageProps } from './$types';
	import { loadStripe } from '@stripe/stripe-js';
	import { PUBLIC_STRIPE_KEY } from '$env/static/public';
	import { goto } from '$app/navigation';

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

		goto('/shopping/error');
	});
</script>

<div class="flex min-h-screen items-center justify-center py-12">
	<div class="bg-secondary bg-opacity-40 rounded-lg p-8 shadow-xl">
		<div id="checkout"></div>
	</div>
</div>
