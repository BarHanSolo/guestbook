<script>
	import LoginDialog from '$lib/components/login-dialog/LoginDialog.svelte';
	import '../styles/tailwind.css';
</script>

<!-- TODO: Header goes here -->
<main class="p-2 h-screen w-screen">
	<slot />
	<style>
		body {
			font-family: 'Cormorant SC'; /* Zmień na swoją czcionkę */
		}
	</style>
</main>
<!-- TODO: Footer goes here -->

<LoginDialog />
