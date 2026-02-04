<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const items = data.items;
</script>

<main>
	<h1>Thank you for your purchase!</h1>
	<p>
		Your payment was successful and an email will be sent to {data.customerEmail} for:
	</p>
	<ul>
		{#each items?.data as item}
			<li>{item.description}</li>
		{/each}
	</ul>
	<a href="/">Go back home</a>
</main>
