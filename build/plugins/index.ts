import type { PluginOption } from 'vite';
import vue from './vue';
import html from './html';
import iconify from './iconify';
import unplugin from './unplugin';
import unocss from './unocss';
import mock from './mock';
import visualizer from './visualizer';
import compress from './compress';

export function setupVitePlugins(viteEnv: ImportMetaEnv): (PluginOption | PluginOption[])[] {
  const plugins = [vue, html(viteEnv), ...unplugin, ...iconify, unocss, mock];

  if (viteEnv.VITE_VISUALIZER === '1') {
    plugins.push(visualizer);
  }

  if(viteEnv.VITE_COMPRESS === '1') {
    plugins.push(compress(viteEnv));
  }

  return plugins;
}
