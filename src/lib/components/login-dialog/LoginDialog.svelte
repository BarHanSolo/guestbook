<script lang="ts">
	import { getBrowserToken } from '$lib/utils/browser-token';
	import { onMount } from 'svelte';

	let dialog: HTMLDialogElement;
	let token: string | null;

	onMount(() => {
		token = getBrowserToken();
		// if (!token) {
		// 	dialog.showModal();
		// }
	});
</script>

<dialog bind:this={dialog}>hello</dialog>
