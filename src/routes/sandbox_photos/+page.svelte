<script lang="ts">
	import Gallery from 'svelte-image-gallery';

	export let data: { photos: string[] } | undefined; // Typ danych z load
	let imageNames: string[] = data?.photos || []; // Używamy zdjęć z load

	const imageUrls = imageNames.map((name) => `${name}`);

	let selectedImage: string | null = null; // Przechowuje URL wybranego obrazu
	let showModal = false; // Kontroluje widoczność modala

	// Funkcja wywoływana po kliknięciu na miniaturkę
	function openModal(url: string) {
		console.log('Opening modal for image:', url);
		selectedImage = url.replace('/thumbnails/', '/photos/');
		showModal = true;
	}

	// Funkcja zamykająca modal
	function closeModal() {
		console.log('Closing modal');
		showModal = false;
		selectedImage = null;
	}

	// Funkcja obsługująca kliknięcia w galerii
	function handleClick(e: CustomEvent) {
		const url = e.detail.src; // Odczytuje URL obrazu z detali eventu
		openModal(url); // Otwiera modal z wybranym obrazem
	}

	console.log('Image URLs:', imageUrls);
</script>

<h2 class="text-2xl">Photos</h2>
<br />
<div class="flex flex-wrap gap-4">
	<Gallery gap="10" maxColumnWidth="200" on:click={handleClick}>
		{#each imageUrls as url}
			<img src={url} alt="" style="cursor: pointer;" />
		{/each}
	</Gallery>
</div>

<!-- Modal -->
{#if showModal}
	<div class="modal" role="dialog" tabindex="0" on:click={closeModal}>
		<div class="modal-content" role="document" on:click|stopPropagation>
			<button class="modal-close text-xl" aria-label="Close" on:click={closeModal}> &times; </button>

			<img src={selectedImage} alt="" />
		</div>
	</div>
{/if}

<style>
	:global(img) {
		opacity: 0.9;
		transition: all 0.2s;
	}
	:global(img):hover {
		opacity: 1;
		transform: scale(1.04);
	}

	/* Stylowanie modala */
	.modal {
		display: flex;
		justify-content: center;
		align-items: center;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.8);
		z-index: 1000;
	}

	.modal-content {
		position: absolute;
		width: auto;
		height: 80vh;
		overflow: hidden;
	}

	.modal-content img {
		height: 100%;
		width: auto;
		object-fit: cover;
	}

	.modal-close {
		position: absolute;
		top: 10px;
		right: 20px;
		font-size: 40px;
		color: white;
		cursor: pointer;
		z-index: 1010;
    	padding: 10px 10px 20px 10px;
	}
	.modal-close:hover {         
    	background-color: rgba(0, 0, 0, 0.5);
	}
</style>
