<script lang="ts">
	interface TestimonialProps {
		text: string;
	}
	let { text }: TestimonialProps = $props();
</script>

<article class="Testimonial">
	<h3>
		<span class="visually-hidden">A customer's review</span>
	</h3>
	<blockquote>
		<p>{text}</p>
	</blockquote>
</article>

<style lang="scss">
	.Testimonial {
		background-color: #ffffff;
		background-position: center center;
		border-color: #f5f5f5;
		border-radius: 0.75rem;
		border-style: solid;
		border-width: 1px;
		min-width: 20rem;
		padding: 2rem;

		blockquote {
			color: #333;
			font-size: 1.25rem;
			font-style: italic;
			line-height: 1.5;
			margin: 0;
			max-width: 45ch;
		}
	}
</style>
