<script setup lang='ts'>
import { computed, ref, watch } from "vue";
import type { Verify } from "@/interface";
import { VerifySlide, VerifyPoints } from './Verify'

const props = withDefaults(defineProps<Verify>(), {
  locale: navigator.language,
  captchaType: "blockPuzzle",
  figure: null,
  arith: null,
  mode: "pop",
  vSpace: 5,
  explain: "",
  imgSize: () => {
    return { width: "310px", height: "155px" };
  },
  blockSize: () => {
    return { width: "", height: "" };
  },
  barSize: () => {
    return { width: "", height: "" };
  },
});

const instance = ref<HTMLElement>();
const clickShow = ref(false);
const componentType = ref<string>("");
const verifyType = ref<string>("");
const showBox = computed(() => (props.mode == "pop" ? clickShow : true));

function closeBox() {
  clickShow.value = false;
  refresh();
}

function refresh() {
  if (instance.value.refresh) {
    instance.value.refresh();
  }
}

watch(() => props.captchaType, (newValue) => {
  switch (props.captchaType) {
    case 'blockPuzzle':
      verifyType.value = '2'
      componentType.value = VerifySlide
      break
    case 'clickWord':
      verifyType.value = ''
      componentType.value = VerifyPoints
      break
  }
})
</script>

<template>
  <div :class="mode == 'pop' ? 'mask' : ''" v-show="showBox">
    <div
      :class="mode == 'pop' ? 'verifybox' : ''"
      :style="{ 'max-width': parseInt(imgSize.width) + 30 + 'px' }"
    >
      <div class="verifybox-top" v-if="mode == 'pop'">
        请完成安全验证
        <span class="verifybox-close" @click="closeBox">
          <i class="iconfont icon-close"></i>
        </span>
      </div>
      <div
        class="verifybox-bottom"
        :style="{ padding: mode == 'pop' ? '15px' : '0' }"
      >
        <!-- 验证码容器 -->
        <components
          v-if="componentType"
          :is="componentType"
          :captchaType="captchaType"
          :type="verifyType"
          :figure="figure"
          :arith="arith"
          :mode="mode"
          :vSpace="vSpace"
          :explain="explain"
          :imgSize="imgSize"
          :blockSize="blockSize"
          :barSize="barSize"
          ref="instance"
        ></components>
      </div>
    </div>
  </div>
</template>

<style lang='' scoped></style>