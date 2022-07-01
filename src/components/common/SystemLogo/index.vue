<script setup lang='ts'>
import { SvgFillLogo, SvgLogo } from './components'
interface Props {
  fill?: boolean;
}

withDefaults(defineProps<Props>(), {
  fill: false
})
</script>

<template>
  <div>
    <svg-fill-log v-if="fill"></svg-fill-log>
    <svg-logo v-else></svg-logo>
  </div>
</template>

<style lang='' scoped></style>