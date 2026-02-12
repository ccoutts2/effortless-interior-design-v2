<script lang="ts">
	import type { Snippet } from 'svelte';
	import Button from '../ui/buttons/Button.svelte';

	import type { HTMLFormAttributes } from 'svelte/elements';

	interface FormProps extends HTMLFormAttributes {
		action?: string;
		children: Snippet;
		enhance?: any;
		buttonLabel: string;
		onClick?: () => void;
	}

	let { action, children, enhance, buttonLabel, onClick }: FormProps = $props();
</script>

<form class="Form" method="POST" {action} use:enhance>
	{@render children?.()}
	<Button data-content={buttonLabel} type="submit" onclick={onClick} inverted={true}
		>{buttonLabel}</Button
	>
</form>

<style lang="scss">
	@use '../../../lib/styles/partials/breakpoints';
	@use '../../../lib/styles/partials/mixins';

	.Form {
		@include mixins.flex($direction: column, $justify: flex-start, $align: flex-start, $gap: 2rem);
		width: 100%;

		@include breakpoints.tablet {
			max-width: 35rem;
		}
	}
</style>
