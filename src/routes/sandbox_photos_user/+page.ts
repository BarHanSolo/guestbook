import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async (event) => { // Dodajemy event jako argument
    try {
        const response = await event.fetch('/sandbox'); // Użyj event.fetch
        if (!response.ok) {
            throw new Error('Failed to fetch files');
        }

        const data = await response.json();
        return {
            photos: data.files // Zwracamy listę plików z klucza `files`
        };
    } catch (err) {
        console.error('Error fetching files:', err);
        throw error(500, { message: 'Unable to load photos' });
    }
};
