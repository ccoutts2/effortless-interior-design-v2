<script lang="ts">
	import NavLink from '$lib/components/navigation/NavLink.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
</script>

<main class="Schemes">
	<PageHeader title="Off The Peg Design Schemes" />

	<ul class="Schemes__list">
		<li>
			<article class="Schemes__card">
				<h3>Bathroom</h3>
				<div class="Schemes__cardImageContainer">
					<img src="https://placehold.co/400x600" alt="" />
				</div>
				<a href="/off-the-peg-schemes/bathroom"
					><span class="visually-hidden">Click to see Bathroom Room schemes</span></a
				>
			</article>
		</li>
		<li>
			<article class="Schemes__card">
				<h3>Bedroom</h3>
				<div class="Schemes__cardImageContainer">
					<img src="https://placehold.co/400x600" alt="" />
				</div>
				<a href="/off-the-peg-schemes/bedroom"
					><span class="visually-hidden">Click to see Bedroom schemes</span></a
				>
			</article>
		</li>
		<li>
			<article class="Schemes__card">
				<h3>Kitchen</h3>
				<div class="Schemes__cardImageContainer">
					<img src="https://placehold.co/400x600" alt="" />
				</div>
				<a href="/off-the-peg-schemes/kitchen"
					><span class="visually-hidden">Click to see Kitchen schemes</span></a
				>
			</article>
		</li>
		<li>
			<article class="Schemes__card">
				<h3>Living Room</h3>
				<div class="Schemes__cardImageContainer">
					<img src="https://placehold.co/400x600" alt="" />
				</div>
				<a href="/off-the-peg-schemes/living-room"
					><span class="visually-hidden">Click to see Living Room schemes</span></a
				>
			</article>
		</li>
	</ul>
</main>

<style lang="scss">
	@use '$lib/styles/partials/breakpoints.scss';

	.Schemes {
		display: flex;
		flex-direction: column;
		margin: 0 auto;

		&__list {
			display: grid;
			grid-template-columns: 1fr;
			gap: 1rem;
			width: 100%;
			place-items: center;

			@include breakpoints.tablet {
				grid-template-columns: 1fr 1fr;
			}
		}

		&__card {
			display: flex;
			flex-direction: column-reverse;
			max-height: 31.25rem;
			max-width: 20.8rem;
			position: relative;

			&:hover h3 {
				text-decoration: underline;
			}

			img {
				aspect-ratio: 3/4;
				height: 100%;
				object-fit: cover;
				width: 100%;
			}

			a::after {
				content: '';
				position: absolute;
				inset: 0;
			}
		}
	}
</style>
