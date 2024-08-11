<script lang="ts">
	import Button from '../button/Button.svelte';

	export let action: string;

	let fileName: string | undefined;

	function handleFileChanged(event: Event): void {
		const input = event.target as HTMLInputElement;
		fileName = input.files?.[0]?.name;
	}
</script>

<form class="flex" method="post" {action} enctype="multipart/form-data">
	<div class="flex">
		<input
			type="file"
			name="file"
			accept="image/*"
			id="file-input"
			class="hidden"
			required
			on:change={handleFileChanged}
		/>
		<label
			for="file-input"
			class="bg-gray-500 text-white rounded rounded-r-none px-4 py-2 cursor-pointer text-center max-w-40 truncate"
		>
			{fileName || 'Wybierz zdjęcie'}
		</label>
	</div>
	<Button type="submit" disabled={!fileName}>Wyślij</Button>
</form>
