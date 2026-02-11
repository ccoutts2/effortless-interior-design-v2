<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<main>
	<pre>{JSON.stringify(data.productsInBasket, null, 2)}</pre>
</main>
