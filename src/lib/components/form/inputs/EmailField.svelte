<script lang="ts">
	import { type FormFieldProps } from '../types';

	let {
		label,
		fieldName,
		value = $bindable(),
		errors,
		required = false,
		constraints = undefined
	}: FormFieldProps = $props();
</script>

<div class="EmailField" data-has-error={errors ? 'true' : undefined}>
	<label class="EmailField__label" data-has-error={errors ? 'true' : undefined} for={fieldName}
		>{label}</label
	>
	<input
		class="EmailField__input"
		name={fieldName}
		id={fieldName}
		bind:value
		type="email"
		{required}
		autocomplete="email"
		aria-invalid={errors ? 'true' : undefined}
		aria-describedby={errors ? `${fieldName}-error-message` : undefined}
		{...constraints}
	/>
	{#if errors}
		<span class="Error" id="{fieldName}-error-message">{errors}</span>
	{/if}
</div>

<style lang="scss">
	.EmailField {
		display: flex;
		flex-direction: column;
		width: 100%;

		&__label {
			font-size: 0.875rem;
			padding-block: 0.25rem;
			text-transform: uppercase;
		}

		&__input {
			border-bottom: 1px solid black;
			border-radius: 0.25rem 0.25rem 0 0;
			padding: 0.25rem;
		}
	}
	.Error {
		color: #dc2626;
		display: flex;
		gap: 0.2rem;
		margin-bottom: 0.25rem;
	}
</style>
