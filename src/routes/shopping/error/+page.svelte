<script lang="ts">
	import { browser } from '$app/environment';

	function navBack() {
		if (browser) {
			window.history.back();
		}
	}
</script>

<div class="flex min-h-screen flex-col items-center justify-center">
	<div class="mb-6">There was an error processing your request</div>

	<button class="" onclick={navBack}> Go back </button>
</div>
