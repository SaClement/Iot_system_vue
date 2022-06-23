import { loadEnv, ConfigEnv, PluginOption } from 'vite';
import { createHtmlPlugin } from "vite-plugin-html" // html插件(使用变量、压缩)

export default (config: ConfigEnv): PluginOption[] => {
  const viteEnv = loadEnv(config.mode, process.cwd());
  
  return createHtmlPlugin({
    minify: true, // 是否压缩html
    inject: { // 注入HTML的数据
      data: {
        appName: viteEnv.VITE_APP_NAME,
        appTitle: viteEnv.VITE_APP_TITLE
      }
    }
  });
};