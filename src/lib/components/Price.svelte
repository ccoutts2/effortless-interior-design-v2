<script lang="ts">
	let { price, currency }: { price: number | null; currency: string } = $props();

	const priceFormat = $derived(
		Intl.NumberFormat('en-GB', {
			currency: currency ?? 'GBP',
			style: 'currency'
		})
	);
</script>

<span class="Product__oldPrice uppercase">
	{price ? priceFormat.format(price / 100) : 'N/A'}
</span>
