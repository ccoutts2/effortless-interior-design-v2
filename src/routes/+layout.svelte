<script lang="ts">
	import '$lib/styles/globals.css';
	import { onNavigate } from '$app/navigation';
	import { setContext } from 'svelte';
	import { type Snippet } from 'svelte';
	import favicon from '$lib/assets/favicon.svg';
	import Header from '$lib/components/layout/Header.svelte';
	import NavLink from '$lib/components/navigation/NavLink.svelte';
	import Overlay from '$lib/components/ui/Overlay.svelte';
	import type { OverlayProps } from '$lib/types';
	import type { PageData } from './$types';
	import Modal from '$lib/components/ui/Modal.svelte';
	import EmailField from '$lib/components/form/inputs/EmailField.svelte';
	import TextField from '$lib/components/form/inputs/TextField.svelte';
	import Form from '$lib/components/form/Form.svelte';
	import { superForm } from 'sveltekit-superforms';
	import { enhance as svelteEnhance } from '$app/forms';

	let { children, data }: { children: Snippet; data: PageData } = $props();

	const overlayState = $state<OverlayProps>({
		isOpen: false,
		overlayContent: null,
		data: data.productsInBasket ?? null
	});

	const handleOutsideClick = (e: MouseEvent) => {
		const target = e.target as HTMLElement;

		if (overlayState.isOpen === true) {
			if (!target.closest('.Overlay')) {
				overlayState.isOpen = !overlayState.isOpen;
			}
		}
	};

	const { form, enhance, message, errors } = superForm(data.form);

	setContext('overlay-ctx', overlayState);

	$effect(() => {
		overlayState.data = data.productsInBasket ?? null;
		if (overlayState.isOpen === true) {
			document.body.classList.add('overlay-open');
			const timeout = setTimeout(() => {
				document.addEventListener('click', handleOutsideClick);
			}, 0);

			return () => {
				clearTimeout(timeout);
				document.body.classList.remove('overlay-open');
				document.removeEventListener('click', handleOutsideClick);
			};
		}
	});

	let isActive: boolean = $state(false);

	function onMouseEnter() {
		isActive = true;
	}

	function onMouseLeave() {
		isActive = false;
	}

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});

	let showModal = $derived(data.showNewsleterPopup);
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Header>
	<ul class="flex flex-1 justify-start gap-8">
		<li><NavLink isMobileMenu={false} href="/services">Services</NavLink></li>
		<li><NavLink isMobileMenu={false} href="/about">About</NavLink></li>
		<li>
			<NavLink isMobileMenu={false} href="/off-the-peg-schemes">Off-The-Peg-Schemes</NavLink>
		</li>
		<li><NavLink isMobileMenu={false} href="/contact">Contact</NavLink></li>
	</ul>
</Header>
{@render children?.()}

<Modal bind:showModal>
	{#snippet header()}
		<h2>Newsletter signup</h2>
		<small><em>do you want to keep up to date with trends?</em></small>
		<hr />
	{/snippet}
	<div>
		<form method="POST" action="?/dismissNewsletter" use:svelteEnhance>
			<button type="submit">No</button>
		</form>
		<button type="button">Yes</button>
		<div>
			<Form {enhance} buttonLabel="Sign up" action="?/newsletterRegister">
				{#if $message}
					<span class="Error text-lg">{$message.text}</span>
				{/if}
				<fieldset class="flex w-full flex-col items-center justify-between">
					<legend class="visually-hidden"
						>Enter your email, optionally your name too, to sign up to the newsletter</legend
					>
					<EmailField
						fieldName="modalEmail"
						label="Your email"
						value={$form.email}
						errors={$errors.email}
						autocomplete="email"
						required
					/>
					<TextField
						fieldName="modalName"
						label="Your name (optional)"
						value={$form.name ?? ''}
						errors={$errors.name}
						autocomplete="name"
					/>
				</fieldset>
			</Form>
		</div>
	</div>
</Modal>
<Overlay />

<style lang="scss">
	:global(a) {
		opacity: 1;
		text-decoration: none;
		transition: opacity 0.3s ease-in-out;
	}

	:global(nav:has(a:hover) a:not(:hover)) {
		opacity: 0.25;
	}

	:global(.overlay-open) {
		overflow: hidden;
	}

	@keyframes old-slide-up {
		to {
			opacity: 0;
			transform: translateY(-50%);
		}
	}

	@keyframes new-slide-up {
		from {
			opacity: 0;
			transform: translateY(50%);
		}
	}

	:root::view-transition-old(page-header) {
		animation: 800ms cubic-bezier(0.63, 0.09, 0.11, 1.04) both old-slide-up;
	}

	:root::view-transition-new(page-header) {
		animation: 800ms cubic-bezier(0.63, 0.09, 0.11, 1.04) both new-slide-up;
		animation-delay: 500ms;
	}
</style>
