import type { Component } from 'vue';
import { EnumLayoutComponentName } from '@/enum'; // 枚举（枚举布局组件名称）
import { BasicLayout, BlankLayout } from '@/layouts'; // 布局 （基本布局, 空白布局）
import { views } from '@/views'; // 视图
import type { LayoutComponentName } from '@/interface'; // 接口（布局组件名称）

type LayoutComponent = Record<LayoutComponentName, () => Promise<Component>>;

/**
 * 获取页面导入的vue文件(懒加载的方式)
 * @param layoutType - 布局类型
 */
export function getLayoutComponent(layoutType: LayoutComponentName) {
  const layoutComponent: LayoutComponent = {
    basic: BasicLayout,
    blank: BlankLayout
  };
  console.log(layoutComponent[layoutType])
  return () => setViewComponentName(layoutComponent[layoutType], EnumLayoutComponentName[layoutType]);
}

/**
 * 获取页面导入的vue文件(懒加载的方式)
 * @param routeKey - 路由key
 */
export function getViewComponent(routeKey: AuthRoute.RouteKey) {
  return () => setViewComponentName(views[routeKey], routeKey) as Promise<Component>;
}

/** 给页面组件设置名称 */
async function setViewComponentName(asyncComponent: () => Promise<Component>, name: string) {
  const component = (await asyncComponent()) as { default: Component };
  Object.assign(component.default, { name });
  return component;
}
