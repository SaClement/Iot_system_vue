import { defineConfig, loadEnv } from 'vite';
import { getEnvConfig } from './.env-config';
import { getRootPath, getSrcPath, setupVitePlugins, viteDefine, createViteProxy } from './build';

// https://vitejs.dev/config/
export default defineConfig(configEnv => {
  const viteEnv = loadEnv(configEnv.mode, process.cwd()) as ImportMetaEnv;

  const rootPath = getRootPath(); //获取根目录路径
  const srcPath = getSrcPath(); //获取Src路径
  const isOpenProxy = viteEnv.VITE_HTTP_PROXY === '1';
  const envConfig = getEnvConfig(viteEnv)

  return {
    base: viteEnv.BASE_URL,
    resolve: {
      alias: {
        '@': srcPath,
        '~': rootPath
      }
    },
    viteDefine,
    plugins: [
      setupVitePlugins(viteEnv),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "./src/styles/element/index.scss" as *;`
        }
      }
    },
    assetsInclude: ['/public/**'],
    server: {
      fs: { strict: false },
      host: '0.0.0.0',
      port: 3200,
      open: false,
      proxy: createViteProxy(isOpenProxy, envConfig) // 处理接口代理
    },
    build: {
      reportCompressedSize: false, // 禁用报告压缩块大小。可以稍微提高构建速度。
      // brotliSize: false, // 在setupVitePlugins中已经处理了对broli的压缩
      sourcemap: false,
      commonjsOptions: {
        ignoreTryCatch: false
      }
    }
  }
})
