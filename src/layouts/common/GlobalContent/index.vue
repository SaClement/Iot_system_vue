<template>
  <div
    :class="{ 'p-16px': showPadding }"
    class="h-full bg-[#f6f9f8] dark:bg-[#101014] transition duration-300 ease-in-out"
  >
    <router-view v-slot="{ Component, route }">
      <transition name="fade-slide" mode="out-in" appear>
        <keep-alive :include="routeStore.cacheRoutes">
          <component :is="Component" v-if="app.reloadFlag" :key="route.path" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import { useAppStore, useRouteStore } from '@/store';

interface Props {
  /** 显示padding */
  showPadding?: boolean;
}

withDefaults(defineProps<Props>(), {
  showPadding: true
});

const app = useAppStore();
const routeStore = useRouteStore();
</script>
<style lang="scss" scoped></style>
