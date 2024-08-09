<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { ButtonVariant } from './button-variant';

	export let variant: ButtonVariant = 'primary';
	export let type: 'button' | 'reset' | 'submit' | null = 'button';
	export let disabled: boolean = false;

	$: disabledClass = () => {
		if (disabled) {
			return 'grayscale-[75%]';
		}
		return '';
	};

	$: variantClass = () => {
		switch (variant) {
			case 'primary':
				return 'bg-amber-500' + (!disabled ? ' hover:bg-amber-700' : '');
			case 'secondary':
				return 'bg-gray-500' + (!disabled ? ' hover:bg-gray-700' : '');
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
	class={`${variantClass()} text-white rounded px-4 py-2 transition-colors ${disabledClass()}`}
	on:click={handleClick}
>
	<slot></slot>
</button>
