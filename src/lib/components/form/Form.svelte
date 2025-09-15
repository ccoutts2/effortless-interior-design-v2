<script lang="ts">
	import type { Snippet } from 'svelte';
	import Button from '../buttons/Button.svelte';

	interface FormProps {
		action?: string;
		children: Snippet;
		enhance: any;
	}

	let { action, children, enhance }: FormProps = $props();
</script>

<form class="Form" method="POST" {action} use:enhance>
	{@render children?.()}
	<Button data-content="Submit" type="submit">Submit</Button>
</form>

<style lang="scss">
	@use '../../../lib/styles/partials/breakpoints';
	@use '../../../lib/styles/partials/mixins';

	.Form {
		@include mixins.flex($direction: column, $justify: flex-start, $align: flex-start, $gap: 2rem);
		width: 100%;

		@include breakpoints.tablet {
			max-width: 20rem;
		}
	}
</style>
