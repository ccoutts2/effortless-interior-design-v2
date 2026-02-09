<script lang="ts">
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import { ChevronLeft, ChevronRight } from '@lucide/svelte';

	let { roomType }: { roomType: string | undefined } = $props();

	let section: HTMLElement;
	let slides: HTMLElement[] = [];

	let currentIndex: number = $state(0);

	onMount(() => {
		const ctx = gsap.context(() => {
			slides = gsap.utils.toArray('.SchemeCarousel__slide');

			gsap.set('.SchemeCarousel__carousel', { 'scroll-snap-type': 'none' });

			slides.forEach((slide, i) => {
				slide.classList.add('SchemeCarousel__slideAbs');
				gsap.set(slide.children, { opacity: i === 0 ? 1 : 0 });
			});
		}, section);

		return () => ctx.revert();
	});

	const nextSlide = () => {
		changeSlide(1);
	};

	const prevSlide = () => {
		changeSlide(-1);
	};

	function changeSlide(dir: number) {
		const oldLayers = slides[currentIndex].children;

		currentIndex = gsap.utils.wrap(0, slides.length, (currentIndex += dir));

		const newLayers = slides[currentIndex].children;

		gsap.killTweensOf([oldLayers, newLayers]);

		gsap
			.timeline({ defaults: { ease: 'power2.inOut' } })

			.to(
				oldLayers,
				{
					duration: 0.4,
					opacity: 0
				},
				0
			)

			.to(
				newLayers,
				{
					duration: 0.4,
					opacity: 1,
					stagger: 0.1
				},
				0.1
			);
	}
</script>

<section class="SchemeCarousel" bind:this={section}>
	<div class="SchemeCarousel__carousel" aria-label="carousel of images">
		{#each { length: 7 }, i}
			<figure class="SchemeCarousel__slide">
				<img
					src="https://meathrznzeujphllwqbq.supabase.co/storage/v1/object/public/Effortless%20Interior%20Design%20Assets/{roomType}/img{i +
						1}.avif"
					alt=""
				/>
			</figure>
		{/each}
	</div>

	<nav class="SchemeCarousel__nav">
		<button class="SchemeCarousel__button" data-is-prev onclick={prevSlide}><ChevronLeft /></button>
		<button class="SchemeCarousel__button" data-is-next onclick={nextSlide}><ChevronRight /></button
		>
	</nav>
</section>

<style lang="scss">
	@use '$lib/styles/partials/breakpoints';

	.SchemeCarousel {
		width: 100%;
		overflow: hidden;
		position: relative;

		@include breakpoints.laptop {
			width: 50%;
		}

		&__carousel {
			-webkit-overflow-scrolling: touch;
			display: flex;
			gap: 0.75rem;
			height: 70vh;
			overflow-x: auto;
			scroll-snap-type: x mandatory;
			width: 100vw;
		}

		&__slide {
			align-items: center;
			color: white;
			display: flex;
			flex-direction: column;
			flex: 0 0 75%;
			justify-content: center;
			overflow: hidden;
			position: relative;
			scroll-snap-align: center;

			img {
				height: 100%;
				object-fit: cover;
				position: absolute;
				width: 100%;
			}
		}

		&__nav {
			align-items: center;
			display: flex;
			justify-content: space-between;
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			width: 100%;
		}

		&__button {
			color: white;

			&[data-is-prev] {
				left: 0;
			}

			&[data-is-next] {
				right: 0;
			}
		}

		:global(.SchemeCarousel__slideAbs) {
			height: 70vh;
			left: 50%;
			position: absolute;
			top: 50%;
			transform: translate(-50%, -50%);
			width: 100vw;

			@include breakpoints.laptop {
				width: 75vw;
			}
		}
	}
</style>
