<script lang="ts">
	import Gallery from 'svelte-image-gallery';

	export let data: { photos: string[] } | undefined;
	let imageNames: string[] = data?.photos || [];

	function stripBaseUrl(url: string): string {
		return url.replace(/^https?:\/\/[^/]+/, '');
	}

	const imageUrls = imageNames.map((name) => `${name}`);

	let selectedImage: string | null = null;
	let showModal = false;
	let currentIndex = 0;

	function openModal(index: number) {
		currentIndex = index;
		selectedImage = imageUrls[currentIndex].replace('/thumbnails/', '/photos/');
		showModal = true;
	}

	function closeModal() {
		showModal = false;
		selectedImage = null;
	}

	function handleClick(e: CustomEvent) {
		const url = e.detail.src;
		const index = imageUrls.indexOf(stripBaseUrl(url));
		openModal(index);
	}

	function nextImage() {
		currentIndex = (currentIndex + 1) % imageUrls.length;
		selectedImage = imageUrls[currentIndex].replace('/thumbnails/', '/photos/');
	}

	function prevImage() {
		currentIndex = (currentIndex - 1 + imageUrls.length) % imageUrls.length;
		selectedImage = imageUrls[currentIndex].replace('/thumbnails/', '/photos/');
	}
</script>

<h2 class="text-2xl">Photos</h2>
<br />
<div class="flex flex-wrap gap-4">
	<Gallery gap="10" maxColumnWidth="200" on:click={handleClick}>
		{#each imageUrls as url, index}
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

			<!-- Navigation Arrows -->
			<button class="arrow left-arrow" on:click={prevImage} aria-label="Previous Image">&#8249;</button>
			<button class="arrow right-arrow" on:click={nextImage} aria-label="Next Image">&#8250;</button>
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

	/* Modal styling */
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
		position: relative;
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

	/* Arrow styling */
	.arrow {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		font-size: 40px;
		color: white;
		background-color: transparent;
		border: none;
		cursor: pointer;
		padding: 10px 30px 20px 30px;
		z-index: 1010;
	}

	.left-arrow {
		left: 10px;
	}

	.right-arrow {
		right: 10px;
	}

	.arrow:hover {
		background-color: rgba(0, 0, 0, 0.3);
	}
</style>
