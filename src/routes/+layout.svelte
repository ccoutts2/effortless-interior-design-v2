<script lang="ts">
	import '../lib/styles/globals.css';
	import favicon from '$lib/assets/favicon.svg';
	import type { Snippet } from 'svelte';

	import Header from '$lib/components/layout/Header.svelte';
	import NavLink from '$lib/components/navigation/NavLink.svelte';

	let { children }: { children: Snippet } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Header>
	<ul class="flex flex-1 justify-start gap-8">
		<li><NavLink href="/">Services</NavLink></li>
		<li><NavLink href="/about">About</NavLink></li>
		<li><NavLink href="/about">Off-The-Peg-Schemes</NavLink></li>
		<li><NavLink href="/about">Contact</NavLink></li>
	</ul>
</Header>
{@render children?.()}
