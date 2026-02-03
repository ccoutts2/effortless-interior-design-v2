<script lang="ts">
	import TestimonialWrapper from '$lib/components/ui/TestimonialWrapper.svelte';
	import Testimonial from '$lib/components/ui/Testimonial.svelte';
	import SectionHeader from '$lib/components/SectionHeader.svelte';
	import TextWithCta from '$lib/components/ui/TextWithCta.svelte';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import NavLink from '$lib/components/navigation/NavLink.svelte';
	import Form from '$lib/components/form/Form.svelte';
	import EmailField from '$lib/components/form/inputs/EmailField.svelte';
	import { superForm } from 'sveltekit-superforms';
	import TextField from '$lib/components/form/inputs/TextField.svelte';
	import SlideIn from '$lib/components/SlideIn.svelte';

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

	let { data }: { data: PageData } = $props();

	const { form, enhance, message, errors } = superForm(data.form);

	let scrollContainer: HTMLElement;
	let tl: GSAPTimeline;

	let cont: HTMLElement;
	let panels: HTMLElement[];

	const testimonialsCount: number = $state(customerTestimonial.length);
	const width = testimonialsCount * 50;

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);

		// gsap.set(scrollContainer, {
		// 	clipPath: 'polygon(15% 10%, 85% 10%, 85% 90%, 15% 90%)'
		// });

		// if (!scrollContainer) return;

		// tl = gsap.timeline().to(scrollContainer, {
		// 	clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
		// 	ease: 'none',
		// 	scrollTrigger: {
		// 		trigger: scrollContainer,
		// 		start: 'top bottom',
		// 		end: 'bottom bottom',
		// 		scrub: true
		// 	}
		// });

		// doesnt work for tablet or mobile and laptop

		panels = gsap.utils.toArray('#panels-container .panel');

		tl = gsap.timeline();

		tl.to(panels, {
			x: () => -1 * (cont.scrollWidth - innerWidth),
			ease: 'none',
			scrollTrigger: {
				trigger: cont,
				pin: true,
				markers: true,
				start: 'center center',
				scrub: 1,
				end: () => '+=' + (cont.scrollWidth - innerWidth)
			}
		});
	});
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
		<img class="h-full w-full object-cover" src="/assets/images/hero.webp" alt="placeholder" />
	</div>

	<SlideIn>
		<SectionHeader headerTag="h1" header="Who is Holly Lomax?" />
		<div class="Home__bio">
			<TextWithCta ctaText="Learn More" href="/about">
				<p>
					Holly Lomax, founder of Effortless Interior Design, is a Cambridge-educated interior
					designer with a background in architectural history and a deep understanding of historic
					buildings. Her work is rooted in the English country house tradition, but brought to life
					through joyful colour, bold fabric combinations, and a strong sense of character. She
					creates interiors that are comfortable, personal and timeless.
				</p>
				<p>
					Holly works with clients across the UK and abroad, offering a collaborative approach to
					decoration, with authenticity and integrity at the heart of everything she does. Through
					her bespoke design services, she helps busy, design-conscious homeowners create beautiful
					homes that feel grounded, joyful and lived in.
				</p>
				<p>
					Holly works with clients across the UK and abroad, offering a collaborative approach to
					decoration, with authenticity and integrity at the heart of everything she does. Through
					her bespoke design services, she helps busy, design-conscious homeowners create beautiful
					homes that feel grounded, joyful and lived in.
				</p>
			</TextWithCta>

			<div class="Home__bioImageContainer">
				<img
					src="assets/images/portrait-lg.webp"
					srcset="assets/images/portrait-sm.webp 400w, 
				assets/images/portrait-md.webp 800w,
				assets/images/portrait-lg.webp 1200w,"
					sizes="(max-width: 600px) 100vw, 600px"
					alt="A woman is leaning against a white shelving unit filled with books, a lamp and a plant. She is smiling past the camera, wearing a blue shirt and patterned vest shirt."
					width={600}
					height={800}
					loading="lazy"
				/>
			</div>
		</div>
	</SlideIn>

	<SlideIn>
		<SectionHeader headerTag="h2" textCenter={true} header="Interior Design Services" />

		<TextWithCta ctaText="Learn More" href="/services" centred={true}>
			<p>
				Whether you're looking for a completely bespoke interior design service or simply tailored
				guidance, Effortless Interior Design offers a range of services to suit the needs of
				different clients all over the world - all with the same considered, expert approach.
			</p>
		</TextWithCta>
	</SlideIn>

	<!-- <TestimonialWrapper>
		{#each customerTestimonial as testimonial}
			<li><Testimonial text={testimonial.text} /></li>
		{/each}
	</TestimonialWrapper> -->

	<!-- be able to navigate between testimonials -->
	<section id="panels">
		<ul id="panels-container" style="width: {width}%" bind:this={cont}>
			{#each customerTestimonial as testimonial, i}
				<li id="panel-{i + 1}" class="panel red">
					<Testimonial text={testimonial.text} />
				</li>
			{/each}
		</ul>
	</section>

	<SlideIn>
		<SectionHeader headerTag="h2" header="What is an off-the-peg design scheme?" />

		<div class="relative h-[100vh] w-full overflow-hidden">
			<img
				bind:this={scrollContainer}
				src="assets/images/peg-scheme-lg.webp"
				srcset="assets/images/peg-scheme-sm.webp 400w, 
                assets/images/peg-scheme-md.webp 800w,
                assets/images/peg-scheme-lg.webp 1200w,"
				sizes="(max-width: 600px) 100vw, 600px"
				alt="An render of an off the peg design scheme."
				width={2400}
				height={1800}
				loading="lazy"
				class="absolute h-full w-full object-cover"
			/>
		</div>
		<div class="py-6">
			<TextWithCta ctaText="Discover the schemes" href="/off-the-peg-schemes" centred={true}>
				<p>
					Off-the-Peg Design Schemes are professionally curated decoration schemes, designed to
					bring clarity, confidence and exceptional quality to your project - whether you're
					decorating on a tight timeline or managing the process yourself.
				</p>
				<p>
					Each scheme presents a complete palette of high-spec fabrics, wallpapers, paints and
					accessories, sourced from trusted trade suppliers and combined into a cohesive,
					characterful design. It's the same calibre of specification you'd expect from a top
					interior designer - delivered in a flexible, self-directed format that puts you in
					control.
				</p>
				<p>
					The schemes are fully customisable and suitable for any room in the house. They come with
					a detailed step-by-step guide, expert tips on pulling your scheme together, and
					recommended fabric combinations to help you get started with ease. You'll also gain access
					to trade-only suppliers and shared trade discounts of up to 30% on fabrics and
					furnishings.
				</p>
				<p>
					For homeowners seeking a polished result without the lead time of a full interior design
					service, Off-the-Peg Design Schemes offer a streamlined, supportive solution - combining
					design expertise with flexibility and speed. To explore the schemes or learn more about
					how they work, visit the <span><NavLink href="/">FAQ page</NavLink></span> or click below.
				</p>
			</TextWithCta>
		</div>
	</SlideIn>

	<aside class="Home__newsletterSub">
		<SectionHeader headerTag="h2" textCenter={true} header="Sign up to our newsletter" />
		<p>For insights & behind the scenes updates, sign up for our newsletter</p>
		<Form {enhance} buttonLabel="Sign up">
			{#if $message}
				<span class="Error text-lg">{$message.text}</span>
			{/if}
			<fieldset class="flex w-full flex-col items-center justify-between">
				<legend class="visually-hidden"
					>Enter your email, optionally your name too, to sign up to the newsletter</legend
				>
				<EmailField
					fieldName="email"
					label="Your email"
					value={$form.email}
					errors={$errors.email}
					autocomplete="email"
					required
				/>
				<TextField
					fieldName="name"
					label="Your name (optional)"
					value={$form.name ?? ''}
					errors={$errors.name}
					autocomplete="name"
				/>
			</fieldset>
		</Form>
	</aside>
</main>

<style lang="scss">
	@use '../lib/styles/partials/breakpoints';

	#panels #panels-container {
		height: 50vh;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		align-items: center;
		justify-content: center;
		-ms-flex-wrap: nowrap;
		flex-wrap: nowrap;
		padding: 0;
		overflow: hidden;
		background-color: #ddd;
	}
	#panels #panels-container .panel {
		position: relative;
		min-width: 20vw;
		height: 50vh;
		overflow: hidden;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		color: #333;
		text-align: left;
		border-right: 1px solid #f00;
	}

	.Home {
		display: flex;
		flex-direction: column;

		&__bio {
			display: flex;
			flex-direction: column-reverse;
			gap: 3rem;
			justify-content: space-between;
			align-items: center;

			@include breakpoints.tablet {
				padding-inline: 3rem;
			}

			@include breakpoints.desktop {
				flex-direction: row-reverse;
				padding-inline: 5rem;
			}
		}

		&__bioImageContainer {
			max-width: 30rem;
			width: 100%;
			max-height: 40rem;
			flex: 1;
		}

		&__newsletterSub {
			margin: 0 auto;
		}
	}
</style>
