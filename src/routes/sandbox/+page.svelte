<script>
	import Button from '$lib/components/button/Button.svelte';
</script>

<h2 class="text-2xl">Buttons</h2>
<div class="flex flex-wrap gap-4">
	<Button>Upload Image</Button>
	<Button variant="secondary">Button Gray</Button>
	<Button disabled={true}>Upload Image</Button>
	<Button variant="secondary" disabled={true}>Upload Image</Button>
</div>
