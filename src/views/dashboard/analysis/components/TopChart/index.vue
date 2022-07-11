<script setup lang='ts'>
import { toggleDark } from '@/composables';

const toast = () => {
  ElMessage.warning('Error')
}
</script>

<template>
  <div>dwad1</div>
  <el-button @click="toast">El Message</el-button>
  <el-button @click="toggleDark()" type="primary">点击</el-button>
  <el-button @click="toggleDark()" type="success">点击</el-button>
  <el-button @click="toggleDark()" type="warning">点击</el-button>
  <el-button @click="toggleDark()" type="danger">点击</el-button>
  <el-button @click="toggleDark()" type="info">点击</el-button>
  <p>
    Full Example:
    <a
      href="https://github.com/element-plus/element-plus-vite-starter"
      target="_blank"
    >element-plus-vite-starter</a>
    | On demand Example:
    <a
      href="https://github.com/element-plus/unplugin-element-plus"
      target="_blank"
    >unplugin-element-plus/examples/vite</a>
  </p>
</template>

<style lang='scss'>
.ep-button{
  margin: 10px
}
</style>