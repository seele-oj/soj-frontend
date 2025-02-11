import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import wasmPack from 'vite-plugin-wasm-pack';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
	plugins: [sveltekit(), wasmPack(['./soj-wasm', './soj-wasm-api']), tailwindcss()],
});
