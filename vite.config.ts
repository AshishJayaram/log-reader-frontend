// vite.config.ts
import angular from '@analogjs/vite-plugin-angular';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [angular()],
  server: {
    port: 4200,
    // historyApiFallback is NOT valid here. Angular handles routing itself.
  }
});
