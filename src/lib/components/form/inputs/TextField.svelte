<script lang="ts">
	import { type FormFieldProps } from '../types';

	let {
		label,
		fieldName,
		value = $bindable(),
		errors,
		autocomplete,
		required = false,
		constraints = undefined
	}: FormFieldProps = $props();
</script>

<div class="TextField" data-has-error={errors ? 'true' : undefined}>
	<label class="TextField__label" data-has-error={errors ? 'true' : undefined} for={fieldName}
		>{label}</label
	>
	<input
		class="TextField__input"
		name={fieldName}
		id={fieldName}
		bind:value
		type="text"
		{required}
		{autocomplete}
		aria-invalid={errors ? 'true' : undefined}
		aria-describedby={errors ? `${fieldName}-error-message` : undefined}
		{...constraints}
	/>
	{#if errors}
		<span class="Error" id="{fieldName}-error-message">{errors}</span>
	{/if}
</div>

<style lang="scss">
	.TextField {
		display: flex;
		flex-direction: column;
		width: 100%;

		&__label {
			font-size: 0.875rem;
			padding-block: 0.5rem;
			text-transform: uppercase;
		}

		&__input {
			background-color: #fff5f5;
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
