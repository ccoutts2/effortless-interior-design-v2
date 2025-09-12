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
			padding-block: 0.5rem;
			text-transform: uppercase;
		}

		&__input {
			padding: 0.25rem;
			border-bottom: 1px solid black;
			background-color: #e7e7e7;

			&:not(:placeholder-shown):invalid {
				box-shadow: inset 0px 0px 3px 1px #f00;
			}
		}
	}
	.Error {
		color: #dc2626;
		display: flex;
		gap: 0.2rem;
		margin-bottom: 0.25rem;
	}
</style>
