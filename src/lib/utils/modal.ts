export function nextImage(currentIndex: number, imageUrls: string[], setCurrentIndex: (index: number) => void, setSelectedImage: (image: string) => void) {
    currentIndex = (currentIndex + 1) % imageUrls.length;
    const selectedImage = imageUrls[currentIndex].replace('/thumbnails/', '/photos/');
    setCurrentIndex(currentIndex);
    setSelectedImage(selectedImage);
}

export function prevImage(currentIndex: number, imageUrls: string[], setCurrentIndex: (index: number) => void, setSelectedImage: (image: string) => void) {
    currentIndex = (currentIndex - 1 + imageUrls.length) % imageUrls.length;
    const selectedImage = imageUrls[currentIndex].replace('/thumbnails/', '/photos/');
    setCurrentIndex(currentIndex);
    setSelectedImage(selectedImage);
}