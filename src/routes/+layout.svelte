<script lang="ts">
	import LoginDialog from '$lib/components/login-dialog/LoginDialog.svelte';
	import { onMount } from 'svelte';
	import { user, type User } from '../store/userStore';
	import '../styles/tailwind.css';

	export let data: { user: User };

	let mounted: boolean = false;

	onMount(() => {
		user.set(data.user);
		mounted = true;
	});
</script>

<!-- TODO: Header goes here -->
<main class="p-2 h-screen w-screen">
	<slot />
	<style>
		body {
			font-family: 'Cormorant SC';
		}
	</style>
</main>
<!-- TODO: Footer goes here -->

{#if mounted}
	<LoginDialog userData={$user} />
{/if}
