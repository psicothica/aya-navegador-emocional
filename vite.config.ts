import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import {defineConfig} from 'vite';

// O app é publicado no GitHub Pages em https://psicothica.github.io/aya-navegador-emocional/
// (e depois em outro subcaminho/domínio): os assets precisam sair com esse prefixo.
export default defineConfig({
  base: '/aya-navegador-emocional/',
  plugins: [react(), tailwindcss()],
});
