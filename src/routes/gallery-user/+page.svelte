<script lang="ts">
	import { nextImage, prevImage } from '$lib/utils/modal';
	import {
		faChevronLeft,
		faChevronRight,
		faTrashCan,
		faXmark
	} from '@fortawesome/free-solid-svg-icons';
	import { onMount } from 'svelte';
	import Fa from 'svelte-fa';
	import Gallery from 'svelte-image-gallery';

	export let data: { photos: string[] } | undefined;

	let imageNames: string[] = data?.photos || [];
	let isLoading: boolean = true;

	let imageUrls = imageNames.map((name) => `${name}`);
	let selectedImage: string | null = null;
	let showModal = false;
	let currentIndex = 0;
	let columnCount : number;

	onMount(() => {
		const columns = getColumnCount();
		if (columns !== null) {
			columnCount = columns;
		} else {
			columnCount = 2;
		}
	});

	function getColumnCount() {
		const columnCount = localStorage.getItem('columnCount');
		return columnCount ? parseInt(columnCount, 10) : null;
	}

	function stripBaseUrl(url: string): string {
		return url.replace(/^https?:\/\/[^/]+/, '');
	}

	const setCurrentIndex = (index: number) => {
		currentIndex = index;
	};

	const setSelectedImage = (image: string) => {
		selectedImage = image;
	};

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

	function goToNextImage() {
		nextImage(currentIndex, imageUrls, setCurrentIndex, setSelectedImage);
	}

	function goToPreviousImage() {
		prevImage(currentIndex, imageUrls, setCurrentIndex, setSelectedImage);
	}

	async function getUsername() {
		try {
			const response = await fetch('/api/current-user', {
				method: 'GET'
			});

			if (!response.ok) {
				throw new Error('Failed to fetch user data');
			}

			const data = await response.json();
			return data.user.username;
		} catch (error) {
			console.error('Error:', error);
		}
	}

	async function limitPhotos(): Promise<string[]> {
		const username = await getUsername();
		return imageUrls.filter((url) => new RegExp(`${username}\\d+`).test(url));
	}

	onMount(async () => {
		imageUrls = await limitPhotos();
		isLoading = false;
	});

	$: innerWidth = 0
</script>

<svelte:window bind:innerWidth />

<div class="flex flex-wrap gap-4">
	{#if isLoading}
		<p>Loading images...</p>
	{:else}
		<Gallery gap="10" maxColumnWidth={innerWidth/(columnCount+1)} on:click={handleClick}>
			{#each imageUrls as url, index}
				<img src={url} alt="" style="cursor: pointer;" />
			{/each}
		</Gallery>
	{/if}
</div>

<!-- Modal -->
{#if showModal}
	<div class="modal" role="dialog" tabindex="0" on:click={closeModal}>
		<div class="modal-content" role="document" on:click|stopPropagation>
			<button class="modal-close text-xl" aria-label="Close" on:click={closeModal}>
				<Fa scale="0.8" icon={faXmark} />
			</button>
			<img src={selectedImage} alt="" />

			<!-- Navigation Arrows -->
			<button class="arrow left-arrow" on:click={goToPreviousImage} aria-label="Previous Image">
				<Fa icon={faChevronLeft} />
			</button>
			<button class="arrow right-arrow" on:click={goToNextImage} aria-label="Next Image">
				<Fa icon={faChevronRight} />
			</button>

			<!-- Delete Button -->
			<button
				class="modal-delete text-xl"
				on:click={async () => {
					const response = await fetch('', {
						method: 'DELETE',
						body: JSON.stringify({ filename: selectedImage }),
						headers: {
							'Content-Type': 'application/json'
						}
					});

					if (response.ok) {
						console.log('File deleted successfully');
						location.reload();
					} else {
						console.error('Failed to delete the file', response.statusText);
					}
				}}
				aria-label="Delete Image"
			>
				<Fa scale="0.8" icon={faTrashCan} class="hover:text-red-800" />
			</button>
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
		width: 95vw; /* Umożliwia pełne wypełnienie ekranu */
		height: 95vh; /* Umożliwia pełne wypełnienie ekranu */
		overflow: hidden;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.modal-content img {
		max-width: 100%; /* Umożliwia pełne wypełnienie kontenera w szerokości */
		max-height: 100%; /* Umożliwia pełne wypełnienie kontenera w wysokości */
		object-fit: cover; /* Umożliwia zachowanie proporcji obrazu */
	}

	.modal-close {
		position: absolute;
		top: 10px;
		right: 20px;
		font-size: 40px;
		color: white;
		cursor: pointer;
		z-index: 1010;
		padding: 10px;
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
		height: 80%;
		width: 50%;
		z-index: 1010;
	}

	.left-arrow {
		left: 0; /* Ustawiamy lewą strzałkę przy lewej krawędzi */
		padding-left: 10px;
		display: flex;
		justify-content: flex-start; /* Wyrównanie do lewej */
		align-items: center;
	}

	.right-arrow {
		right: 0; /* Ustawiamy prawą strzałkę przy prawej krawędzi */
		padding-right: 10px;
		display: flex;
		justify-content: flex-end; /* Wyrównanie do prawej */
		align-items: center;
	}

	.left-arrow::before {
		content: '';
		position: absolute;
		top: 50%;
		transform: translate(-50%, -50%);
		width: 60px; /* Rozmiar faktycznego obszaru, który zmienia kolor */
		height: 60px;
		background-color: transparent;
		transition: background-color 0.2s;
	}
	.right-arrow::before {
		content: '';
		position: absolute;
		top: 50%;
		transform: translate(50%, -50%);
		width: 60px; /* Rozmiar faktycznego obszaru, który zmienia kolor */
		height: 60px;
		background-color: transparent;
		transition: background-color 0.2s;
	}

	/* Hover effect with smaller area */
	.arrow:hover::before {
		background-color: rgba(0, 0, 0, 0.3); /* Kolor podczas hovera */
	}
	.modal-delete {
		position: absolute;
		top: 10px;
		left: 20px;
		font-size: 40px;
		color: white;
		cursor: pointer;
		z-index: 1010;
		padding: 10px;
	}
	.modal-delete:hover {
		background-color: rgba(0, 0, 0, 0);
	}
</style>
