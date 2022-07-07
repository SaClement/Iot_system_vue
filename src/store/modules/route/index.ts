import type { Router } from 'vue-router';
import { defineStore } from 'pinia';
import { fetchUserRoutes } from '@/service'; // 后台服务（请求用户路由）
import {
  getUserInfo,
  transformAuthRouteToMenu,
  transformAuthRoutesToVueRoutes,
  transformRouteToList,
  getCacheRoutes
} from '@/utils';// 工具（用户信息，转换用户路由为菜单，转换用户路由为Vue路由，转换路由为数组，获取缓存路由）
import type { GlobalMenuOption } from '@/interface';
import { useTabStore } from '../tab';

interface RouteState {
  /** 是否添加过动态路由 */
  isAddedDynamicRoute: boolean;
  /** 路由首页name */
  routeHomeName: AuthRoute.RouteKey;
  /** 菜单 */
  menus: GlobalMenuOption[];
  menusList: AuthRoute.Route[];
  /** 缓存的路由名称 */
  cacheRoutes: string[];
}

export const useRouteStore = defineStore('route-store', {
  state: (): RouteState => ({
    isAddedDynamicRoute: false,
    routeHomeName: 'dashboard_analysis',
    menus: [],
    menusList: [],
    cacheRoutes: []
  }),
  actions: {
    /**
     * 初始化动态路由
     * @param router - 路由实例
     */
    async initDynamicRoute(router: Router) {
      const { initHomeTab } = useTabStore();

      const { userId } = getUserInfo();
      if (!userId) return;
      const { data } = await fetchUserRoutes(userId);
      console.log(data)
      if (data) {
        this.routeHomeName = data.home;
        this.menus = transformAuthRouteToMenu(data.routes);
        this.menusList = transformRouteToList(data.routes);

        const vueRoutes = transformAuthRoutesToVueRoutes(data.routes);
        console.log(vueRoutes,'vueRoutes')
        vueRoutes.forEach(route => {
          router.addRoute(route);
        });

        this.cacheRoutes = getCacheRoutes(vueRoutes);

        initHomeTab(data.home, router);
        this.isAddedDynamicRoute = true;
      }
    }
  }
});
