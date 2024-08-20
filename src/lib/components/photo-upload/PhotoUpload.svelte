<script lang="ts">
	import { simpleID } from '$lib/utils/simple-id';
	import { faCamera } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import Button from '../button/Button.svelte';

	export let action: string;
	export let captureNew: boolean = false;

	let fileName: string | undefined;

	const id = simpleID('file-input');

	function handleFileChanged(event: Event): void {
		const input = event.target as HTMLInputElement;
		if (input.files) {
			const fileNames = Array.from(input.files).map(file => file.name);
			fileName = fileNames.join(', ');
		}
	}

	$: capture = captureNew ? 'environment' : (undefined as 'environment' | undefined);
</script>

<form class="flex" method="post" {action} enctype="multipart/form-data">
	<div class="flex">
		{#if captureNew}
		<input
			type="file"
			name="file"
			accept="image/*"
			{id}
			class="hidden"
			required
			on:change={handleFileChanged}
			{capture}
		/>
		{:else}
			<input
			type="file"
			name="file"
			accept="image/*"
			{id}
			class="hidden"
			required
			on:change={handleFileChanged}
			{capture}
			multiple
		/>
		{/if}
		<label
			for={id}
			class="flex flex-1 items-center bg-gray-500 hover:bg-gray-600 text-white rounded rounded-r-none px-4 py-2 cursor-pointer max-w-40"
		>
			{#if captureNew}
				<div class="px-1.5">
					<Fa scale={1.2} icon={faCamera} />
				</div>
			{:else}
				<div class="truncate">
					{fileName || 'Wybierz zdjęcia'}
				</div>
			{/if}
		</label>
	</div>
	<Button type="submit" disabled={!fileName} disableRoundedCorners="left">Wyślij</Button>
</form>
