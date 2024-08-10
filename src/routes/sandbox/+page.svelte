<script lang="ts">
	import Button from '$lib/components/button/Button.svelte';
	import PhotoUpload from './../../lib/components/photo-upload/PhotoUpload.svelte';
</script>

<h2 class="text-2xl">Buttons</h2>
<div class="flex flex-wrap gap-4">
	<Button>Upload Image</Button>
	<Button variant="secondary">Button Gray</Button>
	<Button disabled={true}>Upload Image</Button>
	<Button variant="secondary" disabled={true}>Upload Image</Button>
</div>

<h2 class="mt-4 text-2xl">Upload Photo</h2>
<PhotoUpload action="?/upload-photo" />

<br>
