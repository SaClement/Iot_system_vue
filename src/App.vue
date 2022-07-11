<script setup lang="ts">
// import { zhCN, dateZhCN } from 'naive-ui';
// import { NaiveProvider } from '@/components';
import { useThemeStore, subscribeStore } from '@/store';
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const theme = useThemeStore();

subscribeStore();
</script>

<template>
  <el-config-provider :locale="zhCn" namespace="ep">
    <router-view/>
  </el-config-provider>
</template>

<style lang="scss">
#app {
  height: 100vh;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  .bc_provider-mian{
    height: 100%;
  }
}
</style>
