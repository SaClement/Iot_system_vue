import type { Router } from 'vue-router';
import { useTitle } from '@vueuse/core'; // vueuse工具库
import { createPermissionGuard } from './permission';
import { ElLoading } from 'element-plus';
/**
 * 路由守卫函数
 * @param router - 路由实例
 */
export function createRouterGuard(router: Router) {
  const loadingbar = ElLoading.service({ fullscreen: true })
  router.beforeEach(async (to, from, next) => {
    // 页面跳转权限处理
    await createPermissionGuard(to, from, next, router);
  });
  router.afterEach(to => {
    // 设置document title
    useTitle(to.meta.title);
    // 结束 loadingBar
    loadingbar.close()
  });
}
