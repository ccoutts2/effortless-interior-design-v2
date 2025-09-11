<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const scheme = data.scheme;
</script>

<main>
	<h1>{scheme.name}</h1>
	<h2>{scheme.description}</h2>
	<h3>£{scheme.price}</h3>
</main>
