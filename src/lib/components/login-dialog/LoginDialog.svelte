<script lang="ts">
	import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
	import { onMount } from 'svelte';
	import Fa from 'svelte-fa';
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
				user.set(res);
				dialog.close();
			});
		saveColumnCount();
	}

	function saveColumnCount() {
		localStorage.setItem('columnCount', '2');
	}
</script>

<dialog bind:this={dialog} class="bg-[url('/s.webp')] bg-center w-11/12 h-1/2">
	<!-- wrapper for dialog body, there might be a bug with <dialog> element, if you give it display flex, close() method doesn't close   -->
	<div class="w-full h-full flex items-center justify-center">
		<div class="flex flex-col gap-8">
			<h2 class="text-center text-xl">Jak się nazywasz?</h2>
			<form class="flex" on:submit={generateToken}>
				<input
					bind:value={username}
					name="username"
					type="text"
					required
					class="border px-2 rounded rounded-r-none border-skyblue-700 h-10"
				/>
				<Button type="submit" disabled={!username.length} disableRoundedCorners="left">
					<Fa icon={faArrowRight}></Fa>
				</Button>
			</form>
		</div>
	</div>
</dialog>
