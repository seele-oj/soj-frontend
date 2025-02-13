import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import wasmPack from 'vite-plugin-wasm-pack';
import { enhancedImages } from '@sveltejs/enhanced-img';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
	plugins: [enhancedImages(), sveltekit(), wasmPack(['./soj-wasm', './soj-wasm-api']), tailwindcss()],
});
