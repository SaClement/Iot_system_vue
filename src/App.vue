<script setup lang="ts">
import { useThemeStore, subscribeStore, useAuthStore } from '@/store';
import { useI18n } from 'vue-i18n';
import { languageJson } from './i18n';
import { getLanguage } from './utils';

// const { t } = useI18n()
const theme = useThemeStore();
const auth = useAuthStore();
const locale = computed(() => languageJson[auth.language].el);

subscribeStore();

onMounted(() => {
  console.log(locale)
})
</script>

<template>
  <el-config-provider :locale="locale" namespace="ep" class="h-full">
    <router-view />
  </el-config-provider>
</template>

<style lang="scss">
#app {
  height: 100vh;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
