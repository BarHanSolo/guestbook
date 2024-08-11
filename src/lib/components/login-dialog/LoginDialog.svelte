<script lang="ts">
	import { getBrowserToken } from '$lib/utils/browser-token';
	import { onMount } from 'svelte';
	import Button from '../button/Button.svelte';

	let dialog: HTMLDialogElement;
	let username: string = '';
	let token: string | null;

	onMount(() => {
		token = getBrowserToken();
		if (!token) {
			dialog.showModal();
		}
	});

	function generateToken(event: SubmitEvent) {
		event.preventDefault();

		fetch('/api/generate-token', {
			method: 'POST',
			body: JSON.stringify({ username })
		}).then(() => {
			dialog.close();
		});
	}
</script>

<dialog bind:this={dialog}>
	<h2>Jak się nazywasz?</h2>
	<form class="flex" on:submit={generateToken}>
		<input
			bind:value={username}
			name="username"
			type="text"
			required
			class="border px-2 rounded rounded-r-none border-skyblue-700 h-10"
		/>
		<Button type="submit" disabled={!username.length} disableRoundedCorners="left">OK</Button>
	</form>
</dialog>
