// html压缩以及html注入
import type { PluginOption } from 'vite';
import { createHtmlPlugin } from "vite-plugin-html" // html插件(使用变量、压缩)

export default (viteEnv: ImportMetaEnv): PluginOption[] => {
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