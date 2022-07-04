<script lang="ts" setup>
import { ref, computed, nextTick, reactive, watch, getCurrentInstance, onMounted } from "vue"
import type { Verify } from "@/interface";
import { aesEncrypt } from "./../utils/ase"
import { resetSize } from './../utils/util'
import { fetchReqGet, fetchReqCheck } from "@/service";
import { log } from "console";

const props = withDefaults(defineProps<Verify>(), {
  captchaType: null,
  type: '1',
  mode: 'fixed',
  vSpace: 5,
  explain: '向右滑动完成验证',
  imgSize: () => {
    return {
      width: '310px',
      height: '155px'
    }
  },
  blockSize: () => {
    return {
      width: '50px',
      height: '50px'
    }
  },
  barSize:() => {
    return {
      width: '310px',
      height: '40px'
    }
  }
}) 
const instance = getCurrentInstance()
const barArea = ref(null);
const secretKey = ref('');                //后端返回的加密秘钥 字段
const passFlag = ref<boolean>(false);     //是否通过的标识
const backImgBase = ref<string>('');      //验证码背景图片
const blockBackImgBase = ref<string>(''); //验证滑块的背景图片
const backToken = ref<string>('');            //后端返回的唯一token值
const startMoveTime = ref<Date | number>();  //移动开始的时间
const endMovetime = ref<Date | number>();    //移动结束的时间
const tipsBackColor = ref<string>('');        //提示词的背景颜色
const tipWords = ref<string>('');
const text = ref<string>('');
const finishText = ref<string>('');
const setSize = reactive({
  imgHeight: 0,
  imgWidth: 0,
  barHeight: 0,
  barWidth: 0
}),
const top = ref<number>(0);
const left = ref<number>(0);
const moveBlockLeft = ref<any>(''); 
const leftBarWidth = ref<any>(''); 
// 移动中样式
const moveBlockBackgroundColor = ref<string>(''); 
const leftBarBorderColor = ref<string>('#ddd');
const iconColor = ref<string>(''); 
const iconClass = ref<string>('icon-right');
const status = ref<boolean>(false);	    //鼠标状态
const isEnd = ref<boolean> (false);		//是够验证完成
const showRefresh = ref<boolean> (true);
const transitionLeft = ref<string>('');
const transitionWidth = ref<string>('');

const resetSizeNode = computed(() => {return resetSize})
const verifyBarArea = computed(() => {return barArea.value })

function init() {
  text.value = props.explain
  getPictrue();

  nextTick(() => {
    let setSize = resetSize(instance)	//重新设置宽度高度
    console.log(setSize);
    
    // for (let key in setSize) {
    //   toRef(setSize[key], key)
    // }
  })

  window.removeEventListener("touchmove", function (e) {
    move(e);
  });
  window.removeEventListener("mousemove", function (e) {
    move(e);
  });

  //鼠标松开
  window.removeEventListener("touchend", function () {
    end();
  });
  window.removeEventListener("mouseup", function () {
    end();
  });

  window.addEventListener("touchmove", function (e) {
    move(e);
  });
  window.addEventListener("mousemove", function (e) {
    move(e);
  });

  //鼠标松开
  window.addEventListener("touchend", function () {
    end();
  });
  window.addEventListener("mouseup", function () {
    end();
  });
};

//鼠标按下
function start (e) {
  e = e || window.event
  if (!e.touches) {  //兼容PC端
    var x = e.clientX;
  } else {           //兼容移动端
    var x = e.touches[0].pageX;
  }
  startLeft = Math.floor(x - verifyBarArea.getBoundingClientRect().left);
  startMoveTime.value = +new Date();    //开始滑动的时间
  if (isEnd.value == false) {
    text.value = ''
    moveBlockBackgroundColor.value = '#337ab7'
    leftBarBorderColor.value = '#337AB7'
    iconColor.value = '#fff'
    e.stopPropagation();
    status.value = true;
  }
};
//鼠标移动
function move (e) {
  e = e || window.event
  if (status.value && isEnd.value == false) {
    if (!e.touches) {  //兼容PC端
      var x = e.clientX;
    } else {           //兼容移动端
      var x = e.touches[0].pageX;
    }
    var bar_area_left = verifyBarArea.getBoundingClientRect().left;
    var move_block_left = x - bar_area_left //小方块相对于父元素的left值
    if (move_block_left >= verifyBarArea.offsetWidth - parseInt(parseInt(props.blockSize.width) / 2) - 2) {
      move_block_left = verifyBarArea.offsetWidth - parseInt(parseInt(props.blockSize.width) / 2) - 2;
    }
    if (move_block_left <= 0) {
      move_block_left = parseInt(parseInt(props.blockSize.width) / 2);
    }
    //拖动后小方块的left值
    moveBlockLeft.value = (move_block_left - startLeft) + "px"
    leftBarWidth.value = (move_block_left - startLeft) + "px"
  }
},
//鼠标松开
function end () {
  endMovetime.value = +new Date();
    //判断是否重合
    if (this.status && this.isEnd == false) {
      var moveLeftDistance = parseInt((this.moveBlockLeft || '').replace('px', ''));
      moveLeftDistance = moveLeftDistance * 310 / parseInt(this.setSize.imgWidth)
      let data = {
        captchaType: this.captchaType,
        "pointJson": this.secretKey ? aesEncrypt(JSON.stringify({
          x: moveLeftDistance,
          y: 5.0
        }), this.secretKey) : JSON.stringify({x: moveLeftDistance, y: 5.0}),
        "token": this.backToken
      }
      fetchReqGet(data).then(result => {
        let res=result.data;
        if (res.repCode == "0000") {
        moveBlockBackgroundColor.value = '#5cb85c'
        leftBarBorderColor.value = '#5cb85c'
        iconColor.value = '#fff'
        iconClass.value = 'icon-check'
        showRefresh.value = false
        isEnd.value = true;
        if (props.mode == 'pop') {
          setTimeout(() => {
            this.$parent.clickShow = false;
            refresh();
          }, 1500)
        }
        passFlag.value = true
        tipWords.value = `${((endMovetime.value - startMoveTime.value) / 1000).toFixed(2)}s验证成功`
        var captchaVerification = secretKey.value ? aesEncrypt(backToken.value + '---' + JSON.stringify({
          x: moveLeftDistance,
          y: 5.0
        }), secretKey.value) : backToken.value + '---' + JSON.stringify({x: moveLeftDistance, y: 5.0})
        setTimeout(() => {
          tipWords.value = ""
          instance.parent.closeBox();
          instance.parent.emit('success', {captchaVerification})
        }, 1000)
      } else {
        moveBlockBackgroundColor.value = '#d9534f'
        leftBarBorderColor.value = '#d9534f'
        iconColor.value = '#fff'
        iconClass.value = 'icon-close'
        passFlag.value = false
        setTimeout(function () {
          refresh();
        }, 1000);
        instance.parent.emit('error', instance)
        tipWords.value = "验证失败"
        setTimeout(() => {
          tipWords.value = ""
        }, 1000)
      }
    })
    status.value = false;
  }
};

function refresh () {
  showRefresh.value = true
  finishText.value = ''

  transitionLeft.value = 'left .3s'
  moveBlockLeft.value = 0

  leftBarWidth.value = undefined
  transitionWidth.value = 'width .3s'

  leftBarBorderColor.value = '#ddd'
  moveBlockBackgroundColor.value = '#fff'
  iconColor.value = '#000'
  iconClass.value = 'icon-right'
  isEnd.value = false

  getPictrue()
  setTimeout(() => {
    transitionWidth.value = ''
    transitionLeft.value = ''
    text.value = props.explain
  }, 300)
};

// 请求背景图片和验证图片
function getPictrue() {
  let data = {
    captchaType: props.captchaType
  }
  fetchReqGet(data).then(result => {
    let res = result.data;
    if (res?.code == "0000") {
      backImgBase.value = res.repData.originalImageBase64
      blockBackImgBase.value = res.repData.jigsawImageBase64
      backToken.value = res.repData.token
      secretKey.value = res.repData.secretKey
    } else {
      tipWords.value = res.repMsg;
    }
  })
};

watch(
  () => props.type,
  (newValue) => {
    // type变化则全面刷新
    init()
  },
  { immediate: true}
);

onMounted(() => {
  instance['onselectstart'] = function () {
    return false
  }
})
</script>

<template>
  <div style="position: relative">
    <div
      v-if="props.type === '2'"
      class="verify-img-out"
      :style="{ height: parseInt(setSize.imgHeight) + vSpace + 'px' }"
    >
      <div
        class="verify-img-panel"
        :style="{ width: setSize.imgWidth, height: setSize.imgHeight }"
      >
        <img
          :src="'data:image/png;base64,' + backImgBase"
          alt=""
          style="width: 100%; height: 100%; display: block"
        />
        <div class="verify-refresh" @click="refresh" v-show="showRefresh">
          <i class="iconfont icon-refresh"></i>
        </div>
        <transition name="tips">
          <span
            class="verify-tips"
            v-if="tipWords"
            :class="passFlag ? 'suc-bg' : 'err-bg'"
            >{{ tipWords }}</span
          >
        </transition>
      </div>
    </div>
    <!-- 公共部分 -->
    <div
      ref="barArea"
      class="verify-bar-area"
      :style="{
        width: setSize.imgWidth,
        height: barSize.height,
        'line-height': barSize.height,
      }"
    >
      <span class="verify-msg" style="color: #807b7b" v-text="text"></span>
      <div
        class="verify-left-bar"
        :style="{
          width: leftBarWidth !== undefined ? leftBarWidth : barSize.height,
          height: barSize.height,
          'border-color': leftBarBorderColor,
          transition: transitionWidth,
        }"
      >
        <span
          class="verify-msg"
          style="color: #807b7b"
          v-text="finishText"
        ></span>
        <div
          class="verify-move-block"
          @touchstart="start"
          @mousedown="start"
          :style="{
            width: barSize.height,
            height: barSize.height,
            'background-color': moveBlockBackgroundColor,
            left: moveBlockLeft,
            transition: transitionLeft,
          }"
        >
          <i
            :class="['verify-icon iconfont', iconClass]"
            :style="{ color: iconColor }"
          ></i>
          <div
            v-if="props.type === '2'"
            class="verify-sub-block"
            :style="{
              width: Math.floor((parseInt(setSize.imgWidth) * 47) / 310) + 'px',
              height: setSize.imgHeight,
              top: '-' + (parseInt(setSize.imgHeight) + vSpace) + 'px',
              'background-size': setSize.imgWidth + ' ' + setSize.imgHeight,
            }"
          >
            <img
              :src="'data:image/png;base64,' + blockBackImgBase"
              alt=""
              style="width: 100%; height: 100%; display: block"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
