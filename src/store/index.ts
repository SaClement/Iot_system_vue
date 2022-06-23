import type { App } from 'vue';
import { createPinia } from 'pinia';

export function setupStore(app: App) {
  const store = createPinia();
  app.use(store);
}

export * from './modules'; // 组件
export * from './subscribe'; // 订阅
