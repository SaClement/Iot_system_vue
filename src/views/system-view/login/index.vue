<script setup lang='ts'>
import { computed, getCurrentInstance, onMounted, ref } from 'vue';
import type { Component } from 'vue';
import { EnumLoginModule } from '@/enum';
// import { SystemLogo, DarkModeSwitch } from '@/components';
import { useThemeStore } from '@/store';
import { useAppInfo } from '@/composables';
import { getColorPalette, mixColor } from '@/utils';
import type { LoginModuleKey } from '@/interface';
import { LoginBg, PwdLogin, Verifition } from './components'; // LoginBg, CodeLogin, Register, ResetPwd, BindWechat
import { ElCard } from 'element-plus'

interface Props {
  /** 登录模块分类 */
  module: LoginModuleKey;
}

interface LoginModule {
  // 登录模块
  key: LoginModuleKey
  label: EnumLoginModule
  component: Component
}

const props = defineProps<Props>()

const theme = useThemeStore()
const { title } = useAppInfo();

const modules: LoginModule[] = [
  { key: 'pwd-login', label: EnumLoginModule['pwd-login'], component: PwdLogin },
  // { key: 'code-login', label: EnumLoginModule['code-login'], component: CodeLogin },
  // { key: 'register', label: EnumLoginModule.register, component: Register },
  // { key: 'reset-pwd', label: EnumLoginModule['reset-pwd'], component: ResetPwd },
  // { key: 'bind-wechat', label: EnumLoginModule['bind-wechat'], component: BindWechat }
];

const activeModule = computed(() => {
  const active: LoginModule = { ...modules[0] };
  const findItem = modules.find(item => item.key === props.module);
  if (findItem) {
    Object.assign(active, findItem);
  }
  return active;
});

const bgThemeColor = computed(() => (theme.darkMode ? getColorPalette(theme.themeColor, 7) : theme.themeColor));

const bgColor = computed(() => {
  const COLOR_WHITE = '#ffffff';
  const ratio = theme.darkMode ? 0.5 : 0.2;
  return mixColor(COLOR_WHITE, theme.themeColor, ratio);
});
</script>

<template>
  <div class="bc_login-box" :style="{ backgroundColor: bgColor }">
    <!-- <dark-mode-switch
      :dark="theme.darkMode"
      class="absolute left-48px top-24px z-3 text-20px"
      @update:dark="theme.setDarkMode"
    /> -->
    <el-card class="box-card">
      <div class="bc_login-main">
        <header class="bc_login-header">
          <p class="bc_gradient-text">{{ title }}</p>
        </header>
        <main class="bc_form-main">
          <h3 class="bc_form-title">{{ activeModule.label }}</h3>
          <div class="bc_form-main">
            <transition name="fade-slide" mode="out-in" appear>
              <component :is="activeModule.component" />
            </transition>
          </div>
        </main>
      </div>
    </el-card>
    <login-bg :theme-color="bgThemeColor" ref="loginBox"/>

    <verifition></verifition>
  </div>
</template>

<style lang='scss' scoped>
$--s-color-start: #1890ff99;
$--s-color-end: #1890ff99;

.bc_login-box {
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: right;

  .box-card{
    position: relative;
    margin-right: 15vw;
    border-radius: 20px;
    background-color: #eeeeee; 
    z-index: 12;
  }

  .bc_login-main{
    width: 360px;

    .bc_login-header{
      display: flex;
      align-items: center;
      justify-content: center;

      .bc_gradient-text{
        margin: 0;
        display: inline-block;
        font-size: 28px;
        font-weight: 500;
        -webkit-background-clip: text;
        background-clip: text;
        color: #0000;
        white-space: nowrap;
        background-image: linear-gradient(252deg, #1890ff99 0%, #1890ff 100%);
        transition: --s-color-start .3s cubic-bezier(0.4, 0, 0.2, 1), --s-color-end .3s cubic-bezier(0.4, 0, 0.2, 1);
      }
    }
  }

  .bc_form-main {
    padding-top: 24px;
    .bc_form-title{
      font-size: 18px;
      line-height: 1;
      color: #1890ff;
      font-weight: 500;
    }
  }
}
</style>