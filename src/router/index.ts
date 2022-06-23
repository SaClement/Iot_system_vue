import type { App } from 'vue';
import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';
import { transformAuthRoutesToVueRoutes } from '@/utils';
import { constantRoutes } from './routes'; // 固定路由
import { scrollBehavior } from './helpers'; // 滚动行为
import { createRouterGuard } from './guard'; // 路由守卫

const createHistoryFunc = import.meta.env.VITE_IS_VERCEL === '1' ? createWebHashHistory : createWebHistory;

export const router = createRouter({
  history: createHistoryFunc(import.meta.env.BASE_URL),
  routes: transformAuthRoutesToVueRoutes(constantRoutes),
  scrollBehavior
});

export async function setupRouter(app: App) {
  app.use(router);
  createRouterGuard(router);
  await router.isReady();
}

export * from './routes';
