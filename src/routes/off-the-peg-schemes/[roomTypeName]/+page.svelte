<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	console.log(data);
</script>

<main>
	<ul>
		{#each data.schemes as scheme}
			<li>{scheme.name}</li>
		{/each}
	</ul>
</main>
