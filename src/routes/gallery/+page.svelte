<script lang="ts">
	import OptionsColumnsDialog from '$lib/components/options-colums-dialog/OptionsColumnsDialog.svelte';
	import { nextImage, prevImage } from '$lib/utils/modal';
	import {
		faChevronLeft,
		faChevronRight,
		faDownload,
		faXmark
	} from '@fortawesome/free-solid-svg-icons';
	import { onMount } from 'svelte';
	import Fa from 'svelte-fa';
	import Gallery from 'svelte-image-gallery';

	export let data: { photos: string[] } | undefined;

	const regex = /\/uploads\/photos\/([^0-9]+)(?=\d+\.\w+)/;
	let imageUrls: string[] = data?.photos || [];
	let selectedImage: string | null = null;
	console.log(selectedImage)
	let userOfSelectedImage: string | null = null;
	console.log(userOfSelectedImage);
	let showModal = false;
	let currentIndex = 0;
	let columnCount = 2;

	onMount(() => {
		columnCount = getColumnCount();
	});

	function downloadImage() {
		const link = document.createElement('a');
		link.href = selectedImage!;
		link.download = link.href.split('/').pop()!;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}

	function getColumnCount() {
		return (columnCount = parseInt(localStorage.getItem('columnCount') as string));
	}

	function handleColumnChange(event: { detail: number }) {
		columnCount = event.detail;
	}

	function stripBaseUrlAndEncode(url: string): string {
		let strippedUrl = url.replace(/^https?:\/\/[^/]+/, '');
		let encodedUrl = decodeURIComponent(strippedUrl);
		encodedUrl = encodedUrl.replace(/%2F/g, '/');
		return encodedUrl;
	}

	function openModal(index: number) {
		currentIndex = index;
		console.log(currentIndex)
		console.log(imageUrls[currentIndex])
		selectedImage = imageUrls[currentIndex].replace('/thumbnails/', '/photos/');
		showModal = true;
	}

	function closeModal() {
		showModal = false;
		selectedImage = null;
	}

	function handleClick(e: CustomEvent) {
		const url = e.detail.src;
		console.log(stripBaseUrlAndEncode(url))
		const index = imageUrls.indexOf(stripBaseUrlAndEncode(url));
		console.log(index)
		setSelectedImage(stripBaseUrlAndEncode(url).replace('/thumbnails/', '/photos/'));
		openModal(index);
	}

	function setCurrentIndex(index: number) {
		currentIndex = index;
	}

	function setSelectedImage(image: string) {
		selectedImage = image;
		const match = image.match(regex);
		if (match) {
			userOfSelectedImage = match[1].trim();
		}
	}

	function goToNextImage() {
		nextImage(currentIndex, imageUrls, setCurrentIndex, setSelectedImage);
	}

	function goToPreviousImage() {
		prevImage(currentIndex, imageUrls, setCurrentIndex, setSelectedImage);
	}

	$: innerWidth = 0;
</script>

<svelte:window bind:innerWidth />

<OptionsColumnsDialog bind:columnCount on:columnChange={handleColumnChange} />

<div class="flex flex-wrap gap-4">
	<Gallery gap="10" maxColumnWidth={innerWidth / (columnCount + 1)} on:click={handleClick}>
		{#each imageUrls as url, index}
			<img src={url} alt="" style="cursor: pointer;" />
		{/each}
	</Gallery>
</div>

<!-- Modal -->
{#if showModal}
	<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
	<!-- TODO: Replace with real <dialog> element to handle a11y mess -->
	<div class="modal" role="dialog" tabindex="0" on:click={closeModal}>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div class="modal-content" role="document" on:click|stopPropagation>
			<button class="modal-close text-xl" aria-label="Close" on:click={closeModal}
				><Fa scale="0.8" icon={faXmark} /></button
			>
			<img src={selectedImage}  class="max-h-[80%]" alt="" />
			<!-- Navigation Arrows -->
			<button class="arrow left-arrow" on:click={goToPreviousImage} aria-label="Previous Image">
				<Fa icon={faChevronLeft} />
			</button>
			<button class="arrow right-arrow" on:click={goToNextImage} aria-label="Next Image">
				<Fa icon={faChevronRight} />
			</button>
			<!-- Picture downloading -->
			<button class="modal-download" on:click={downloadImage}>
				<Fa scale="0.8" icon={faDownload} />
			</button>
			<p class="image-uploader w-3/5 truncate" title="{userOfSelectedImage}">Przesłane przez: {userOfSelectedImage}</p>
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
		width: 95vw;
		height: 95vh;
		overflow: hidden;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.modal-content img {
		max-width: 100%;
		max-height: 90%;
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
		padding: 10px;
	}
	.modal-close:hover {
		background-color: rgba(0, 0, 0, 0.5);
	}

	.modal-download {
		position: absolute;
		bottom: 10px;
		right: 20px;
		font-size: 40px;
		color: white;
		cursor: pointer;
		z-index: 1010;
		padding: 10px;
	}
	.modal-download:hover {
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
		left: 0;
		padding-left: 10px;
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}

	.right-arrow {
		right: 0;
		padding-right: 10px;
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}

	.left-arrow::before {
		content: '';
		position: absolute;
		top: 50%;
		transform: translate(-50%, -50%);
		width: 60px;
		height: 60px;
		background-color: transparent;
		transition: background-color 0.2s;
	}
	.right-arrow::before {
		content: '';
		position: absolute;
		top: 50%;
		transform: translate(50%, -50%);
		width: 60px;
		height: 60px;
		background-color: transparent;
		transition: background-color 0.2s;
	}

	.arrow:hover::before {
		background-color: rgba(0, 0, 0, 0.125);
	}

	.image-uploader {
		font-size: 0.8em;
		text-align: left;
		margin-top: 10px; 
		color: #fff;
		position: absolute; 
		bottom: 10px;
		left: 20px;
	}
</style>
