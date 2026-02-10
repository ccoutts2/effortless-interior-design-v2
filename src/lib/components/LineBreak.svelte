<div class="LineBreak" aria-label="A divider to break up different page content."></div>

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
