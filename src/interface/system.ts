import type { VNodeChild } from 'vue';
import type { RouteLocationNormalizedLoaded } from 'vue-router';
// import type { MenuItemProps } from 'element-plus';

/** 菜单项配置 */
export type GlobalMenuOption = {
  key: string;
  label: string;
  routeName: string;
  routePath: string;
  icon?: () => VNodeChild;
  children?: GlobalMenuOption[];
};

/** 面包屑 */
// export type GlobalBreadcrumb = MenuItemProps & {
//   index: string;
//   label: string;
//   disabled: boolean;
//   routeName: string;
//   hasChildren: boolean;
//   children?: GlobalBreadcrumb[];
// };

/** 多页签Tab的路由 */
export interface GlobalTabRoute extends Pick<RouteLocationNormalizedLoaded, 'name' | 'path' | 'meta'> {
  /** 滚动的位置 */
  scrollPosition: {
    left: number;
    top: number;
  };
}
