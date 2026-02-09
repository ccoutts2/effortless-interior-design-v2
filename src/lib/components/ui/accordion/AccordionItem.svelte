<script lang="ts">
	import { slide } from 'svelte/transition';

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
		<span
			class="AccordionItem__icon"
			aria-label="Icon toggle for accordion item."
			aria-hidden="true"
			data-is-toggled={toggled}
		>
		</span>
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

		&__icon {
			height: 14px;
			position: relative;
			width: 14px;

			&::before,
			&::after {
				content: '';
				background-color: black;
				left: 50%;
				position: absolute;
				top: 50%;
				transition:
					transform 0.3s ease-in-out,
					opacity 0.3s;
			}

			&::before {
				height: 14px;
				transform: translate(-50%, -50%);
				width: 1px;
			}

			&::after {
				height: 1px;
				transform: translate(-50%, -50%);
				width: 14px;
			}

			&[data-is-toggled='true'] {
				&::before {
					opacity: 1;
					transform: translate(-50%, -50%) rotate(270deg);
				}
			}

			&[data-is-toggled='true'] {
				&::after {
					opacity: 0;
				}
			}
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
