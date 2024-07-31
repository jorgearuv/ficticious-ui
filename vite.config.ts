import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'
import { peerDependencies } from './package.json'
import tailwindcss from 'tailwindcss'

export default defineConfig({
  plugins: [
    react(),
    dts({ exclude: ['**/*.stories.ts', '**/*.test.ts'], rollupTypes: true }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, './src/index.ts'),
      name: 'ficticious-ui',
      fileName: format => `ficticious-ui.${format}.js`,
      formats: ['es', 'cjs', 'umd'],
    },
    rollupOptions: {
      external: [...Object.keys(peerDependencies), 'tailwindcss'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          tailwindcss: 'tailwindcss',
        },
      },
    },
    sourcemap: true,
    minify: true,
    emptyOutDir: true,
    outDir: 'dist',
  },
  css: {
    postcss: {
      plugins: [tailwindcss],
    },
  },
})
