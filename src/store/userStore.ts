import { writable } from 'svelte/store';

export type User = {
	username: string;
	id: string;
};

export const user = writable<null | User>(null);
