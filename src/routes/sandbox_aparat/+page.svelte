<script lang="ts">
	import PhotoUpload from './../../lib/components/photo-upload/PhotoUpload.svelte';
	
	let videoElement: HTMLVideoElement | null = null;
	let canvasElement: HTMLCanvasElement | null = null;
	let capturedImage: string | null = null;
	let cameraActive = false;

	// Funkcja uruchamiająca kamerę
	async function startCamera() {
		if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
			try {
				const stream = await navigator.mediaDevices.getUserMedia({ video: true });
				if (videoElement) {
					videoElement.srcObject = stream;
					videoElement.play();
					cameraActive = true;
				}
			} catch (error) {
				console.error('Error accessing the camera:', error);
			}
		} else {
			alert('Sorry, your browser does not support camera access.');
		}
	}

	// Funkcja przechwytująca zdjęcie
	function capturePhoto() {
		if (canvasElement && videoElement) {
			const context = canvasElement.getContext('2d');
			if (context) {
				canvasElement.width = videoElement.videoWidth;
				canvasElement.height = videoElement.videoHeight;
				context.drawImage(videoElement, 0, 0, videoElement.videoWidth, videoElement.videoHeight);
				capturedImage = canvasElement.toDataURL('image/png'); // Zapisujemy obraz jako data URL
				stopCamera(); // Po zrobieniu zdjęcia zatrzymujemy kamerę
			}
		}
	}

	// Funkcja zatrzymująca kamerę
	function stopCamera() {
		if (videoElement && videoElement.srcObject) {
			const stream = videoElement.srcObject as MediaStream;
			const tracks = stream.getTracks();
			tracks.forEach(track => track.stop());
			cameraActive = false;
		}
	}

	// Funkcja zapisująca zdjęcie
	async function savePhoto() {
		if (capturedImage) {
			// Konwertowanie data URL na plik Blob
			const response = await fetch(capturedImage);
			const blob = await response.blob();

			// Tworzenie formularza
			const formData = new FormData();
			formData.append('file', blob, 'photo.png');

			// Wysłanie formularza do serwera przy użyciu akcji upload-photo
			try {
				const res = await fetch('/upload-photo', {
					method: 'POST',
					body: formData
				});

				if (res.ok) {
					console.log('Photo uploaded successfully!');
				} else {
					console.error('Failed to upload photo.');
				}
			} catch (error) {
				console.error('Error uploading photo:', error);
			}
		}
	}
</script>

<h2>Take a Photo</h2>
{#if !cameraActive}
	<button on:click={startCamera}>Open Camera</button>
{/if}

{#if cameraActive}
	<div>
		<video bind:this={videoElement} width="100%" autoplay playsinline></video>
		<button on:click={capturePhoto}>Capture Photo</button>
	</div>
{/if}

{#if capturedImage}
	<div>
		<h3>Captured Photo</h3>
		<img src={capturedImage} alt="Captured photo">
		<button on:click={savePhoto}>Upload Photo</button>
	</div>
{/if}

<canvas bind:this={canvasElement} style="display: none;"></canvas>

<style>
	video {
		width: 100%;
		max-width: 100%;
		border: 2px solid #333;
		border-radius: 10px;
	}

	img {
		max-width: 100%;
		border: 2px solid #333;
		border-radius: 10px;
		margin-top: 10px;
	}
</style>
