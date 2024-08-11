<script>
	import PhotoUpload from '$lib/components/photo-upload/PhotoUpload.svelte';
</script>

<section class="flex flex-col gap-4">
	<h1 class="text-center text-xl">Dodaj zdjęcie</h1>

	<section class="flex flex-col items-center gap-6">
		<PhotoUpload action="?/upload-photo" />

		<PhotoUpload action="?/upload-photo" captureNew={true} />

		<div>
			<a href="/photos" class="p-2 text-amber-800 hover:text-amber-600 underline"
				>Przeglądaj wszystkie zdjęcia</a
			>
		</div>
	</section>
</section>
