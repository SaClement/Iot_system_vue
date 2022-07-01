<script setup lang='ts'>
import { computed } from '@vue/runtime-core'
import type { FollowerPlacement } from 'vueuc'
interface Props {
  /** tooltip显示文本 */
  tooltipContent?: string;
  /** tooltip的位置 */
  placement?: FollowerPlacement;
  /** class 类 */
  contentClass?: string;
}

const props = withDefaults (defineProps<Props>(), {
  tooltipContent: '',
  placement: 'bottom',
  contentClass: ''
})

const showTooltip = computed(() => Boolean(props.tooltipContent))
</script>

<template>
  <div v-if="showTooltip">
    <el-tooltip :placement="placement">
      <template>
        <div :class="contentClass">
          <slot></slot>
        </div>
      </template>
      {{ tooltipContent }}
    </el-tooltip>
  </div>
  <div v-else :class="contentClass">
    <slot></slot>
  </div>
</template>

<style lang='' scoped></style>