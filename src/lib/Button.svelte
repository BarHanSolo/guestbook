<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { ButtonVariant } from './types/button-variant';

	export let variant: ButtonVariant = 'primary';
	export let disabled: boolean = false;

	const dispatch = createEventDispatcher();

	function getButtonVariantClass(): string {
		switch (variant) {
			case 'primary':
				return 'bg-amber-500' + (!disabled ? ' hover:bg-amber-700' : '');
			case 'secondary':
				return 'bg-gray-500' + (!disabled ? ' hover:bg-gray-700' : '');
		}
	}

	function getDisabledClass(): string {
		if (disabled) {
			return 'grayscale-[75%]';
		}
		return '';
	}

	function handleClick() {
		dispatch('click');
	}
</script>

<button
	{disabled}
	class={`${getButtonVariantClass()} text-white rounded px-4 py-2 transition-colors ${getDisabledClass()}`}
	on:click={handleClick}
>
	<slot></slot>
</button>
