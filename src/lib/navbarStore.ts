import { writable } from 'svelte/store';

export const navbarVisible = writable(false);
export const navbarSelected = writable(0);
export const navbarBack = writable("");