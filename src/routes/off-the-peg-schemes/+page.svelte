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
