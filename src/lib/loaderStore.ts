import { writable } from 'svelte/store';

export const loadFinished = writable(false);
export const requireLoad = writable(true);