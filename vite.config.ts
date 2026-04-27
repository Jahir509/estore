import { defineConfig } from 'vite';

export default defineConfig({
  optimizeDeps: {
    // Disabled by default - YOU control when optimization happens
    disabled: process.env.VITE_OPTIMIZE !== 'true',
  },
  ssr: {
    noExternal: true,
  },
});
