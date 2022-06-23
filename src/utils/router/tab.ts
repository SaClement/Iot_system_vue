import { EnumStorageKey } from '@/enum'; // 枚举 （枚举缓存密钥）
import type { GlobalTabRoute } from '@/interface'; // 接口（全局选项卡路由）
import { setLocal, getLocal } from '../storage'; // 缓存 （获取，设置缓存）

/** 缓存多页签数据 */
export function setTabRoutes(data: GlobalTabRoute[]) {
  setLocal(EnumStorageKey['tab-routes'], data);
}

/** 获取缓存的多页签数据 */
export function getTabRoutes() {
  const routes: GlobalTabRoute[] = [];
  const data = getLocal<GlobalTabRoute[]>(EnumStorageKey['tab-routes']);
  if (data) {
    const defaultTabRoutes = data.map(item => ({
      ...item,
      scrollPosition: {
        left: 0,
        top: 0
      }
    }));
    routes.push(...defaultTabRoutes);
  }
  return routes;
}

/** 清空多页签数据 */
export function clearTabRoutes() {
  setTabRoutes([]);
}
