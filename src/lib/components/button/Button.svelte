<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { ButtonVariant } from './button-variant';

	export let variant: ButtonVariant = 'primary';
	export let type: 'button' | 'reset' | 'submit' | null = 'button';
	export let disabled: boolean = false;
	export let disableRoundedCorners: 'left' | 'right' | 'both' | false = false;

	$: disabledClass = () => {
		if (disabled) {
			return 'grayscale-[90%]';
		}
		return '';
	};

	$: variantClass = () => {
		switch (variant) {
			case 'primary':
				return 'bg-skyblue-600' + (!disabled ? ' hover:bg-skyblue-800' : '');
			case 'secondary':
				return 'bg-gray-500' + (!disabled ? ' hover:bg-gray-700' : '');
		}
	};

	$: disabledRoundedCornersClass = () => {
		switch (disableRoundedCorners) {
			case 'left':
				return 'rounded-l-none';
			case 'right':
				return 'rounded-r-none';
			case 'both':
				return 'rounded-none';
			default:
				return '';
		}
	};

	const dispatch = createEventDispatcher();

	function handleClick() {
		dispatch('click');
	}
</script>

<button
	{disabled}
	{type}
	class={`${variantClass()} text-white rounded px-4 py-2 transition-colors ${disabledClass()} ${disabledRoundedCornersClass()}`}
	on:click={handleClick}
>
	<slot></slot>
</button>
