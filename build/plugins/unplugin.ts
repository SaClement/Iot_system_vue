import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { FileSystemIconLoader } from "unplugin-icons/loaders";
import { getSrcPath } from "../utils";

const srcPath = getSrcPath();
const customIconPath = `${srcPath}/assets/svg`;

export default [
  Icons({
    compiler: 'vue3',
    customCollections: {
      custom: FileSystemIconLoader(customIconPath)
    },
    scale: 1,
    defaultClass: 'inline-block'
  }),
  AutoImport({
    dts: 'src/typings/auto-imports.d.ts',
    imports: ['vue', '@vueuse/core', 'vue-router'],
    resolvers: [ElementPlusResolver()],
  }),
  Components({
    dts: 'src/typings/components.d.ts',
    resolvers: [
      ElementPlusResolver({ importStyle: 'sass' }),
      IconsResolver({ customCollections: ['custom'] })
    ],
  }),
]