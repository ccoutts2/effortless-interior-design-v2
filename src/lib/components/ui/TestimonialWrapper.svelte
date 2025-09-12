<script lang="ts">
	import { onMount, type Snippet } from 'svelte';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	interface TestimonialWrapperProps {
		children: Snippet;
	}

	let { children }: TestimonialWrapperProps = $props();

	let testimonials: HTMLUListElement | null;

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);

		function getScrollAmount() {
			let testimonialsWidth = testimonials?.scrollWidth;
			return -(testimonialsWidth! - window.innerWidth);
		}

		const tween = gsap.to(testimonials, {
			x: getScrollAmount,
			duration: 3,
			ease: 'none'
		});

		ScrollTrigger.create({
			trigger: '.TestimonialWrapper',
			start: 'top 20%',
			end: () => `+=${getScrollAmount() * -1}`,
			pin: true,
			animation: tween,
			scrub: 1,
			invalidateOnRefresh: true
		});
	});
</script>

<section class="TestimonialWrapper">
	<ul class="TestimonialWrapper__testimonials" bind:this={testimonials}>
		{@render children?.()}
	</ul>
</section>

<style lang="scss">
	.TestimonialWrapper {
		overflow: hidden;
		position: relative;

		&__testimonials {
			display: flex;
			gap: clamp(2rem, 3vw, 5rem);
		}
	}
</style>
