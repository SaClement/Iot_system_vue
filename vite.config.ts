import { fileURLToPath } from 'url';
import { defineConfig, loadEnv } from 'vite';
import { setupVitePlugins, define } from './build';

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig(configEnv => {
  const viteEnv = loadEnv(configEnv.mode, process.cwd());
  
  return {
    base: viteEnv.BASE_URL,
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '~': fileURLToPath(new URL('./', import.meta.url))
      }
    },
    define,
    plugins: [
      setupVitePlugins(configEnv),
      AutoImport({ resolvers: [ElementPlusResolver()] }),
      Components({ resolvers: [ElementPlusResolver()] })
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "./src/styles/scss/global.scss" as *;`
        }
      }
    },
    assetsInclude: ['/public/**'],
    server: {
      fs: { strict: false },
      host: '0.0.0.0',
      port: 3200,
      open: true
    },
    build: {
      brotliSize: false,
      sourcemap: false
    }
  }
})
