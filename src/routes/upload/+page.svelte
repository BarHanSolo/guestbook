<script>
	import PhotoUpload from '$lib/components/photo-upload/PhotoUpload.svelte';
</script>

<section class="flex flex-col gap-4">
	<section class="flex flex-col items-center gap-6">
		<p
			class="bg-white bg-opacity-50 backdrop-blur-md text-lg text-center p-4 rounded-md shadow-md text-millbrook-900"
		>
			Podziel się swoim własnym spojrzeniem na wyjątkowy dzień w życiu <b>Anny</b> i <b>Jakuba</b> –
			dodaj do Księgi Gości swoje kadry ze świętowania ich zaślubin.
		</p>
		<PhotoUpload action="?/upload-photo" />

		<PhotoUpload action="?/upload-photo" captureNew={true} />
	</section>
</section>