import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { cloudflare } from '@cloudflare/vite-plugin'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'

export default defineConfig({
 plugins: [
  TanStackRouterVite({
   target: 'react',
   routesDirectory: './src/react-app/routes',
   generatedRouteTree: './src/react-app/routeTree.gen.ts',
  }),
  react(),
  cloudflare(),
  tailwindcss(),
 ],
})
