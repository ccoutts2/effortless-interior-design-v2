<script lang="ts">
	interface RoomCardProps {
		roomName: string;
		slug: string;
		imageCover: string;
		imageReveal: string;
	}
	let { roomName, slug, imageCover, imageReveal }: RoomCardProps = $props();
</script>

<article class="RoomCard">
	<h3 class="RoomCard__name">{roomName}</h3>

	<div class="RoomCard__imageContainer">
		<img src={imageReveal} alt="The {roomName} reveal image is on display." />
		<img src={imageCover} alt="The {roomName} cover is on display." />
	</div>
	<a href="/off-the-peg-schemes/{slug}"
		><span class="visually-hidden">Click to see {roomName} schemes</span></a
	>
</article>

<style lang="scss">
	.RoomCard {
		display: flex;
		flex-direction: column-reverse;
		margin: 0 auto;
		position: relative;
		width: clamp(18rem, 100%, 30rem);

		&__name {
			bottom: 1rem;
			color: #ffffff;
			font-size: clamp(1.125rem, 2vw, 1.5rem);
			font-weight: 600;
			left: 1rem;
			position: absolute;
			text-transform: uppercase;
			transition: all 0.3s ease-in-out;
			z-index: 5;
		}

		&__imageContainer {
			aspect-ratio: 3/4;
			height: 100%;
			position: relative;
			width: 100%;

			&::after {
				content: '';
				background-color: rgba(0, 0, 0, 0.3);
				height: 100%;
				left: 0;
				position: absolute;
				top: 0;
				width: 100%;
			}

			img {
				height: 100%;
				left: 0;
				object-fit: cover;
				opacity: 1;
				position: absolute;
				top: 0;
				transition: opacity 0.2s ease-in-out;
				width: 100%;
			}
		}

		a::after {
			content: '';
			inset: 0;
			position: absolute;
		}

		&:hover &__name {
			color: #ff3600;
			text-decoration: underline;
		}

		&:hover img:last-of-type {
			opacity: 0;
		}
	}
</style>
