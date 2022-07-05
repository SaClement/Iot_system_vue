
<script setup lang="ts">
/**
 * VerifyPoints
 * @description 点选
 * */
import {
  ref,
  watch,
  getCurrentInstance,
  reactive,
  computed,
  onMounted,
  defineExpose,
} from "vue";
import {
  resetSize,
  _code_chars,
  _code_color1,
  _code_color2,
} from "./../utils/util";
import { aesEncrypt } from "./../utils/ase";
import { fetchReqGet, fetchReqCheck } from "@/service";
import { Interface } from "readline";
import { nextTick } from "process";

interface VerifyItemSize {
  // 验证组件各个模块的宽度
  width: string;
  // 验证组件各个模块的高度
  height: string;
}

type CaptchaType = "blockPuzzle" | "clickWord" | null

interface Proxy {
  locale?: string;
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
  mode: "fixed",
  type: "1",
  captchaType: null,
  vSpace: 5,
  imgSize: () => {
    return {
      width: "310px",
      height: "155px",
    };
  },
  barSize: () => {
    return {
      width: "310px",
      height: "40px",
    };
  },
});

const verifyPoints = ref<HTMLDivElement>();
const barArea = ref("canvas");
const secretKey = ref(""); //后端返回的加密秘钥 字段
const checkNum = ref<number>(3); //默认需要点击的字数
const fontPos = reactive<Array<any>>([]); //选中的坐标信息
const num = ref<number>(1); //点击的记数
const pointBackImgBase = ref<string>(""); //后端获取到的背景图片
let checkPosArr = reactive<Array<any>>([]); //用户点击的坐标
let poinTextList = reactive<Array<any>>([]); //后端返回的点击字体顺序
const backToken = ref<string>(""); //后端返回的token值
let setSize = reactive({
  imgHeight: 0,
  imgWidth: 0,
  barHeight: 0,
  barWidth: 0,
});
const tempPoints = reactive<Array<any>>([]);
const text = ref<string>("");
const barAreaColor = ref<any | string>(undefined);
const barAreaBorderColor = ref<any | string>(undefined);
const bindingClick = ref<boolean>(true);
const showRefresh = ref<boolean>(true);
const resetSizeNode = computed(() => {
  return resetSize;
});
const verifyCanvas = computed(() => {
  return barArea.value;
});

//加载页面
function init() {
  fontPos.splice(0, fontPos.length);
  checkPosArr.splice(0, checkPosArr.length);
  num.value = 1;
  getPictrue();
  // nextTick(() => {
  //   setSize = resetSize(verifyPoints); //重新设置宽度高度
  //   verifyPoints.value.emit("ready", verifyPoints);
  // });
}

function canvasClick(e: MouseEvent) {
  checkPosArr.push(getMousePos(verifyCanvas, e));
  if (num == checkNum) {
    num.value = createPoint(getMousePos(verifyCanvas, e));
    //按比例转换坐标值
    checkPosArr = pointTransfrom(checkPosArr, setSize);
    //等创建坐标执行完
    setTimeout(() => {
      // var flag = comparePos(fontPos, checkPosArr);
      //发送后端请求
      var captchaVerification = secretKey
        ? aesEncrypt(
            backToken + "---" + JSON.stringify(checkPosArr),
            secretKey.value
          )
        : backToken + "---" + JSON.stringify(checkPosArr);
      let data = {
        captchaType: props.captchaType,
        pointJson: secretKey
          ? aesEncrypt(JSON.stringify(checkPosArr), secretKey.value)
          : JSON.stringify(checkPosArr),
        token: backToken,
      };
      // fetchReqCheck(data).then((result) => {
      //   let res = result.data;
      //   if (res && res.repCode == "0000") {
      //     barAreaColor.value = "#4cae4c";
      //     barAreaBorderColor.value = "#5cb85c";
      //     text.value = "验证成功";
      //     bindingClick.value = false;
      //     if (props.mode == "pop") {
      //       setTimeout(() => {
      //         proxy.parent.clickShow = false;
      //         refresh();
      //       }, 1500);
      //     }
      //     proxy.parent.emit("success", { captchaVerification });
      //   } else {
      //     proxy.parent.emit("error", proxy);
      //     barAreaColor.value = "#d9534f";
      //     barAreaBorderColor.value = "#d9534f";
      //     text.value = "验证失败";
      //     setTimeout(() => {
      //       refresh();
      //     }, 700);
      //   }
      // });
    }, 400);
  }
  if (num < checkNum) {
    num.value = createPoint(getMousePos(verifyCanvas, e));
  }
}

//获取坐标
function getMousePos(obj: any, e: MouseEvent) {
  var x = e.offsetX;
  var y = e.offsetY;
  return { x, y };
}

//创建坐标点
function createPoint(pos: object) {
  tempPoints.push(Object.assign({}, pos));
  return ++num.value;
}

function refresh() {
  tempPoints.splice(0, tempPoints.length);
  barAreaColor.value = "#000";
  barAreaBorderColor.value = "#ddd";
  bindingClick.value = true;
  fontPos.splice(0, fontPos.length);
  checkPosArr.splice(0, checkPosArr.length);
  num.value = 1;
  getPictrue();
  text.value = "验证失败";
  showRefresh.value = true;
}

// 请求背景图片和验证图片
function getPictrue() {
  let data = {
    captchaType: props.captchaType,
  };
  // fetchReqGet(data).then((result) => {
  //   let res = result.data;
  //   if (res && res.token == "0000") {
  //     pointBackImgBase.value = res.token.originalImageBase64;
  //     backToken.value = res.token.token;
  //     secretKey.value = res.token.secretKey;
  //     poinTextList = res.token.wordList;
  //     text.value = "请依次点击【" + poinTextList.join(",") + "】";
  //   } else {
  //     text.value = res.repMsg;
  //   }
  // });
}

//坐标转换函数
function pointTransfrom(pointArr: Array<any>, imgSize: any) {
  var newPointArr: Array<any> = pointArr.map((p) => {
    let x = Math.round((310 * p.x) / parseInt(imgSize.imgWidth));
    let y = Math.round((155 * p.y) / parseInt(imgSize.imgHeight));
    return { x, y };
  });
  return newPointArr;
}

defineExpose({ refresh });

watch(
  () => props.type,
  (newValue) => {
    // type变化则全面刷新
    init();
  },
  { immediate: true }
);

onMounted(() => {
  console.log(verifyPoints);
  
  // proxy.$el.onselectstart = function () {
  //   return false;
  // };
});
</script>

<template>
  <div style="position: relative">
    <div class="verify-img-out">
      <div
        class="verify-img-panel"
        :style="{
          width: setSize.imgWidth,
          height: setSize.imgHeight,
          'background-size': setSize.imgWidth + ' ' + setSize.imgHeight,
          'margin-bottom': vSpace + 'px',
        }"
      >
        <div
          class="verify-refresh"
          style="z-index: 3"
          @click="refresh"
          v-show="showRefresh"
        >
          <i class="iconfont icon-refresh"></i>
        </div>
        {{ pointBackImgBase }}
        <img
          :src="'data:image/png;base64,' + pointBackImgBase"
          ref="canvas"
          alt=""
          style="width: 100%; height: 100%; display: block"
          @click="bindingClick ? canvasClick($event) : undefined"
        />

        <div
          v-for="(tempPoint, index) in tempPoints"
          :key="index"
          class="point-area"
          :style="{
            'background-color': '#1abd6c',
            color: '#fff',
            'z-index': 9999,
            width: '20px',
            height: '20px',
            'text-align': 'center',
            'line-height': '20px',
            'border-radius': '50%',
            position: 'absolute',
            top: tempPoint.y - 10 + 'px',
            left: tempPoint.x - 10 + 'px',
          }"
        >
          {{ index + 1 }}
        </div>
      </div>
    </div>
    <!-- 'height': this.barSize.height, -->
    <div
      class="verify-bar-area"
      :style="{
        width: setSize.imgWidth,
        color: barAreaColor,
        'border-color': barAreaBorderColor,
        'line-height': barSize.height,
      }"
    >
      <span class="verify-msg" style="color: #807b7b">{{ text }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>