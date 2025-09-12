<script lang="ts">
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import TestimonialWrapper from '$lib/components/ui/TestimonialWrapper.svelte';
	import Testimonial from '$lib/components/ui/Testimonial.svelte';
	import SectionHeader from '$lib/components/SectionHeader.svelte';

	interface CustomerTestimonial {
		text: string;
	}
	const customerTestimonial: CustomerTestimonial[] = [
		{
			text: "I've tried countless products, but this is the first one that genuinely delivered on its promise. It's an absolute game-changer!"
		},
		{
			text: 'Exceptional quality and incredible service. The team was so helpful and went above and beyond to make sure I was happy with my purchase. Highly recommend!'
		},
		{
			text: "I was a bit skeptical at first, but this product completely blew me away. It's easy to use and the results are even better than I expected. I'm a customer for life."
		},
		{
			text: "This is by far the best [product/service category] I've ever used. The attention to detail is remarkable, and it has made a huge difference in my daily routine."
		},
		{
			text: "From the moment I placed my order, the experience was seamless. The product arrived quickly, and it's even better in person. I can't wait to see what they come out with next!"
		}
	];
</script>

<svelte:head>
	<title>Effortless Interior Design | Home</title>
	<meta
		name="description"
		content="Showcasing how Effortless Interior Design can help your home."
	/>
</svelte:head>

<main class="Home">
	<div class="h-[80vh] w-full">
		<img class="h-full w-full object-cover" src="/assets/images/eid15 (1).webp" alt="placeholder" />
	</div>

	<SectionHeader headerTag="h1" header="Who is Holly Lomax?" />

	<div class="h-[25vh]"></div>
	<TestimonialWrapper>
		{#each customerTestimonial as testimonial}
			<li><Testimonial text={testimonial.text} /></li>
		{/each}
	</TestimonialWrapper>
	<div class="h-[100vh]"></div>
</main>

<style lang="scss">
	.Home {
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}
</style>
