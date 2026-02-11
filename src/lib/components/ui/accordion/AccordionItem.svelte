<script lang="ts">
	import { slide } from 'svelte/transition';
	import PlusMinusButton from '../buttons/PlusMinusButton.svelte';

	let { title, content, name }: { title: string; content: string; name?: string } = $props();

	let details: HTMLDetailsElement | undefined = $state();

	let toggled = $state(false);

	const toggleAccordion = (event: Event) => {
		event.preventDefault();

		if (!details?.open) {
			details!.open = true;
			toggled = true;
		} else {
			toggled = false;
			details!.open = false;
		}
	};
</script>

<details {name} class="AccordionItem" bind:open={toggled} bind:this={details}>
	<summary class="AccordionItem__header" onclick={toggleAccordion}>
		<span class="AccordionItem__title">
			{title}
		</span>
		<PlusMinusButton isOpen={toggled} />
	</summary>
	{#if toggled}
		<div class="AccordionItem__content" transition:slide={{ duration: 500 }}>
			{@html content}
		</div>
	{/if}
</details>

<style lang="scss">
	@use '$lib/styles/partials/mixins';
	@use '$lib/styles/partials/variables';

	.AccordionItem {
		@include mixins.flex($direction: column);

		&[open] {
			block-size: auto;
		}

		&__header {
			@include mixins.flex($justify: space-between, $align: center);
			border-bottom: 1px solid variables.$color--line-divider;
			cursor: pointer;
			// Hide marker on Firefox
			list-style-type: none;
			margin-inline: -0.5rem;
			padding: 0.5rem;
			transition: background-color 0.2s ease-out;
			position: relative;

			// Hide marker on Chrome & future proof
			&::-webkit-details-marker,
			&::marker {
				display: none;
			}

			&::before {
				content: '';
				display: block;
				inset: 0 -0.5rem;
				position: absolute;
			}
		}

		&__title {
			font-weight: 500;
			margin: 0;
			padding-block: 0.25rem;
			z-index: 10;
		}

		&__content {
			padding-block: 0.5rem;

			:global(p) {
				margin-top: 0.5rem;
				font-size: 0.875rem;
			}
		}
	}
</style>
