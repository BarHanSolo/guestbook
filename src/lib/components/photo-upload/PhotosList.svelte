<script lang="ts">
	let fileList: string[] | null = null;
	export async function getAllPhotos() {
		try {
			const response = await fetch('/sandbox');
			if (response.ok) {
				const data = await response.json();
				fileList = data.files;  // Zwracamy listę plików z klucza `files`
			} else {
				console.error('Failed to fetch files');
			}
		} catch (error) {
			console.error('Error fetching files:', error);
		}
	}
	export { fileList };
</script>