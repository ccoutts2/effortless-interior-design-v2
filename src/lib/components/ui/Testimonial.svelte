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
		margin-block: 20vh;
		padding-inline: 2rem;

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
