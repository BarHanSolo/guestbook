<script lang="ts">
	import LoginDialog from '$lib/components/login-dialog/LoginDialog.svelte';
	import Menu from '$lib/components/menu/Menu.svelte';
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

<section class="flex flex-col gap-2 py-2 min-h-screen">
	<header class="sticky z-50 top-0">
		<Menu />
	</header>
	<main class="p-2">
		<slot />
		<style>
			body {
				font-family: 'Cormorant SC';
			}
		</style>
	</main>
	<!-- TODO: Footer goes here -->
</section>

{#if mounted}
	<LoginDialog userData={$user} />
{/if}
