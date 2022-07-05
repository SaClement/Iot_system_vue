<script setup lang='ts'>
import { computed, onMounted, ref, watch } from "vue";
import { VerifySlide, VerifyPoints } from "./Verify";

interface VerifyItemSize {
  // 验证组件各个模块的宽度
  width: string;
  // 验证组件各个模块的高度
  height: string;
}

type CaptchaType = "blockPuzzle" | "clickWord" | null

interface Proxy {
  locale: string;
  captchaType: CaptchaType;
  figure?: number | null;
  arith?: number | null;
  mode: string;
  vSpace?: number;
  explain?: string;
  imgSize?: VerifyItemSize;
  blockSize?: VerifyItemSize;
  barSize?: VerifyItemSize;
}

const props = withDefaults(defineProps<Proxy>(), {
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

const instance = ref<HTMLDivElement>();
const clickShow = ref(false);
const verifyType = ref<string>("");
const showBox = computed(() => (props.mode == "pop" ? clickShow : true));
const componentType = computed(() => {
  return props.captchaType == "blockPuzzle" ? VerifySlide : VerifyPoints;
});

const closeBox = () => {
  clickShow.value = false;
  refresh();
}

const refresh = () => {
  if (instance?.value?.refresh) {
    instance?.value?.refresh();
  }
}

watch(
  () => props.captchaType,
  (newValue) => {
    switch (props.captchaType) {
      case "blockPuzzle":
        verifyType.value = "2";
        break;
      case "clickWord":
        verifyType.value = "";
        break;
    }
  }
);

onMounted(() => {
  console.log(instance,'instance')
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
        <keep-alive>
          <component
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
          ></component>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<style lang='' scoped></style>