<script lang="ts">
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { onMount, type Snippet } from 'svelte';
	import type { ClassValue } from 'svelte/elements';

	interface SlideInProps {
		children: Snippet;
		as?: string;
		class?: ClassValue;
	}

	let { children, as = 'section', ...props }: SlideInProps = $props();

	let el: HTMLElement;

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);

		if (!el) return;

		gsap.set(el.children, { opacity: 1, y: 0 });

		const ctx = gsap.context(() => {
			gsap.from(el.children, {
				y: 50,
				opacity: 0,
				delay: 0.3,
				duration: 1,
				stagger: 0.2,
				scrollTrigger: {
					trigger: el,
					start: 'top bottom-=25%'
				}
			});
		}, el);

		return () => ctx.revert();
	});
</script>

<svelte:element this={as} bind:this={el} class={props.class}>
	{@render children?.()}
</svelte:element>
