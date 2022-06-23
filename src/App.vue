<script setup lang="ts">
// import { zhCN, dateZhCN } from 'naive-ui';
// import { NaiveProvider } from '@/components';
import { ElConfigProvider } from 'element-plus'
import { useThemeStore, subscribeStore } from '@/store';

const theme = useThemeStore();

subscribeStore();
</script>

<template>
  <el-config-provider>
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
