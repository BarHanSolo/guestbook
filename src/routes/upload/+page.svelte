<script>
	import PhotoUpload from '$lib/components/photo-upload/PhotoUpload.svelte';
</script>

<section class="flex flex-col gap-4">
	<section class="flex flex-col items-center gap-6">
		<PhotoUpload action="?/upload-photo" />

		<PhotoUpload action="?/upload-photo" captureNew={true} />
	</section>
</section>
