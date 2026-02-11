<script lang="ts">
	import { type Snippet } from 'svelte';

	interface ModalProps {
		children?: Snippet;
		header?: Snippet;
		showModal: boolean;
	}

	let { children, header, showModal = $bindable() }: ModalProps = $props();
	let dialogElement: HTMLDialogElement | null = $state(null);

	$effect(() => {
		if (showModal) {
			dialogElement?.showModal();
			document.body.style.overflow = 'hidden';
		} else {
			dialogElement?.close();
			document.body.style.overflow = '';
		}

		return () => {
			document.body.style.overflow = '';
		};
	});
</script>

{#if showModal}
	<dialog
		bind:this={dialogElement}
		class="Modal"
		onclose={() => (showModal = false)}
		onclick={(e) => {
			if (e.target === dialogElement) showModal = false;
		}}
	>
		<div class="Modal__content">
			<header>
				{@render header?.()}
			</header>

			{@render children?.()}

			<button class="Modal__close" onclick={() => (showModal = false)}> Close </button>
		</div>
	</dialog>
{/if}

<style lang="scss">
	.Modal {
		border-radius: 0.5rem;
		border: none;
		margin: auto;
		min-width: 18rem;
		opacity: 0;
		padding: 0;
		transform: scale(0.9);
		transition:
			opacity 0.3s ease-out,
			transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
			overlay 0.3s ease-out allow-discrete,
			display 0.3s ease-out allow-discrete;

		&[open] {
			opacity: 1;
			transform: scale(1);
		}

		@starting-style {
			&[open] {
				opacity: 0;
				transform: scale(0.9);
			}
		}

		&::backdrop {
			background: rgba(0, 0, 0, 0);
			transition:
				display 0.3s allow-discrete,
				overlay 0.3s allow-discrete,
				background-color 0.3s;
		}

		&[open]::backdrop {
			background: rgba(0, 0, 0, 0.4);
		}

		@starting-style {
			&[open]::backdrop {
				background-color: rgba(0, 0, 0, 0);
			}
		}

		&__content {
			padding: 1rem;
		}

		&__close {
			cursor: pointer;
			display: block;
			margin-top: 1rem;
		}
	}
</style>
