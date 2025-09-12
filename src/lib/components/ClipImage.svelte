<script lang="ts">
	interface ClipImage {
		isComponentReady: boolean;
		src: string;
		description: string;
	}
	let { isComponentReady, src, description }: ClipImage = $props();
</script>

<img class={isComponentReady ? 'ready' : ''} {src} alt={description} />

<style>
	img {
		clip-path: polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%);
		display: block;
		height: 100%;
		object-fit: cover;
		scale: 1.1;
		transition: all 1s cubic-bezier(0.43, 1.09, 0.51, 1.01);
		width: 100%;
	}
	img.ready {
		clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
		scale: 1;
	}
</style>
