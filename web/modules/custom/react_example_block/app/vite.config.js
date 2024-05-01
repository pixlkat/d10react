import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

const port = 5173;
const origin = `${process.env.DDEV_PRIMARY_URL}:${port}`;

export default defineConfig({
  plugins: [react()],
  build: {
    // output dir for production build
    outDir: path.resolve(__dirname, 'dist'),
    emptyOutDir: true,

    rollupOptions: {
      input: path.resolve(__dirname, 'src/index.jsx'),
      output: {
        entryFileNames: '[name].js',
      }
    },

    manifest: true,
  },

  // Adjust Vites dev server for DDEV
  // https://vitejs.dev/config/server-options.html
  server: {
    // respond to all network requests:
    host: '0.0.0.0',
    port: port,
    strictPort: true,
    // Defines the origin of the generated asset URLs during development
    origin: origin
  },

});
