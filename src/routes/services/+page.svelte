<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import type { PageData } from './$types';
	import EmailField from '$lib/components/form/inputs/EmailField.svelte';
	import Form from '$lib/components/form/Form.svelte';

	let { data }: { data: PageData } = $props();

	const { form, enhance, message, errors } = superForm(data.form);
</script>

<Form {enhance}>
	{#if $message}
		<span class="Error text-lg">{$message.text}</span>
	{/if}
	<fieldset class="w-full">
		<legend class="visually-hidden">Enter your email to sign up to the newsletter</legend>
		<EmailField
			fieldName="email"
			label="Your email"
			value={$form.email}
			errors={$errors.email}
			autocomplete="email"
			required
		/>
	</fieldset>
</Form>
