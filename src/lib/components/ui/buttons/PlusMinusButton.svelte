<script lang="ts">
	interface PlusMinusButtonProps {
		isOpen: boolean;
		onClick?: () => void;
	}

	let { isOpen, onClick }: PlusMinusButtonProps = $props();
</script>

<button type="button" onclick={onClick} class="Plus {isOpen ? 'Minus' : ''}"
	><span class="visually-hidden">{isOpen ? 'Collapse' : 'Expand'}</span></button
>

<style lang="scss">
	.Plus {
		height: 1rem;
		position: relative;
		width: 1rem;

		&::after,
		&::before {
			content: '';
			background-color: currentColor;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%) rotate(-90deg);
			transition: all 0.5s cubic-bezier(0.76, 0, 0.24, 1);
		}

		&::before {
			height: 1px;
			width: 100%;
		}

		&::after {
			height: 100%;
			width: 1px;
		}
	}

	.Minus::after {
		transform: translate(-50%, -50%) rotate(90deg);
	}

	.Minus::before {
		opacity: 0;
	}
</style>
