<hr class="LineBreak" />

<style lang="scss">
	@use '$lib/styles/partials/breakpoints';

	.LineBreak {
		width: 100%;
		height: 2px;
		background-color: currentColor;
		margin-block: 1.5rem;

		@include breakpoints.tablet {
			margin-block: 3rem;
		}
	}
</style>
