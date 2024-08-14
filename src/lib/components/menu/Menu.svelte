<script lang="ts">
	import { page } from '$app/stores';
</script>

<nav class="p-3 h-20 bg-gradient-to-b from-white to-white/0 via-white/95">
	<ul class="flex justify-between">
		<li>
			<a class:text-skyblue-800={$page.url.pathname === '/upload'} href="/upload">Dodaj zdjęcie</a>
		</li>
		<li>
			<a class:text-skyblue-800={$page.url.pathname === '/gallery'} href="/gallery">Galeria</a>
		</li>
		<li>
			<a class:text-skyblue-800={$page.url.pathname === '/gallery-user'} href="/gallery-user"
				>Twoje zdjęcia</a
			>
		</li>
	</ul>
</nav>

<style>
	ul > li > a {
		@apply font-bold no-underline text-lg;
	}
</style>
