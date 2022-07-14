import type { ProxyOptions } from "vite";

export function createViteProxy(isOpenProxy: boolean, envConfig: EnvConfig) {
  if (!isOpenProxy) undefined;
  const proxy: Record<string, string | ProxyOptions> = {
    [envConfig.proxy]: {
      target: envConfig.url,
      changeOrigin: true,
      // 将/api前缀去掉，调用原有api
      rewrite: path => path.replace(new RegExp(`^${envConfig.proxy}`), '')
    }
  }
  return proxy;
}