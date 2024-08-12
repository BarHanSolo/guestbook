<script lang="ts">
	import { onMount } from 'svelte';
	import { user, type User } from '../../../store/userStore';
	import Button from '../button/Button.svelte';

	export let userData: null | User;

	let dialog: HTMLDialogElement;
	let username: string = '';

	onMount(() => {
		if (!userData) {
			dialog.showModal();
		}
	});

	function generateToken(event: SubmitEvent) {
		event.preventDefault();

		fetch('/api/generate-token', {
			method: 'POST',
			body: JSON.stringify({ username })
		})
			.then((res) => res.json())
			.then((res) => {
				console.log(res);
				dialog.close();
				user.set(res);
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
