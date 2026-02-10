<script lang="ts">
	import RoomCard from '$lib/components/cards/RoomCard.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';

	const rooms = [
		{
			roomName: 'Bathroom',
			slug: 'bathroom',
			imageCover: 'https://picsum.photos/id/1/400/600',
			imageReveal: 'https://picsum.photos/id/33/400/600'
		},
		{
			roomName: 'Bedroom',
			slug: 'bedroom',
			imageCover: 'https://picsum.photos/id/70/400/600',
			imageReveal: 'https://picsum.photos/id/6/400/600'
		},
		{
			roomName: 'Kitchen',
			slug: 'kitchen',
			imageCover: 'https://picsum.photos/id/26/400/600',
			imageReveal: 'https://picsum.photos/id/34/400/600'
		},
		{
			roomName: 'Living Room',
			slug: 'living-room',
			imageCover: 'https://picsum.photos/id/20/400/600',
			imageReveal: 'https://picsum.photos/id/40/400/600'
		}
	];
</script>

<main class="Schemes">
	<PageHeader title="Off The Peg Design Schemes" />

	<p class="mt-4 mb-8! text-center">
		Our Off-the-Peg Design Schemes are expertly curated collections of high-spec fabrics, paints,
		wallpapers and accessories, designed to help you create a stunning home without the guesswork.
		We share our trade margins with our customers, meaning that the designer fabrics, trimmings and
		wallpapers in the schemes are offered at discounts of up to <span class="font-semibold"
			>30%</span
		>. Many of our suppliers are trade-only, meaning that you cannot buy their products unless you
		have an interior designer (or an Off-the-Peg Design Scheme!)
	</p>
	<ul class="Schemes__list">
		{#each rooms as room}
			<li>
				<RoomCard
					roomName={room.roomName}
					slug={room.slug}
					imageCover={room.imageCover}
					imageReveal={room.imageReveal}
				/>
			</li>
		{/each}
	</ul>
</main>

<style lang="scss">
	@use '$lib/styles/partials/breakpoints.scss';

	.Schemes {
		display: flex;
		flex-direction: column;
		margin: 0 auto;
		padding: 1rem;

		&__list {
			display: grid;
			grid-template-columns: 1fr;
			gap: 1rem;
			width: 100%;
			place-items: center;

			@include breakpoints.tablet {
				gap: 2rem;
				grid-template-columns: 1fr 1fr;
			}
		}

		li {
			width: 100%;
		}
	}
</style>
