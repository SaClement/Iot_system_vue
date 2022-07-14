<script setup lang='ts'>
import { ElLoading, FormInstance, FormRules } from "element-plus";
import { EnumLoginModule } from "@/enum";
import { useAuthStore } from "@/store";
import { useRouterPush } from "@/composables";
import { formRules } from "@/utils";
// import { OtherLogin } from './components';

type Verification = {
  captchaVerification: string
}

const auth = useAuthStore();
const { login } = useAuthStore();
const { toLoginModule } = useRouterPush();

const formRef = ref<FormInstance | null>(null);
const model = reactive({
  username: "liugaobo",
  password: "Poick#147",
  code: ""
});
const rules: FormRules = {
  username: formRules.username,
  password: formRules.password,
  code: formRules.code
};
const rememberMe = ref(false);
const verifitionShow = ref(false);
const loadingInstance = ElLoading.service({
  text: "登录中...",
})

async function handleSubmit(formEl: FormInstance | null) {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      verifitionShow.value = true
    } else {
      console.log(fields);
    }
  });
}

function handleLogin(params: Verification) {
  model.code = params.captchaVerification;
  const { username, password, code } = model;
  login(username, password, code);
  verifitionShow.value = false
  loadingInstance.close();
}
</script>

<template>
  <el-form ref="formRef" :model="model" :rules="rules" size="large">
    <el-form-item prop="username" label="用户名">
      <el-input v-model="model.username" placeholder="请输入用户名" />
    </el-form-item>
    <el-form-item prop="password" label="密码">
      <el-input
        v-model="model.password"
        type="password"
        :show-password="true"
        placeholder="请输入密码"
      />
    </el-form-item>
    <el-space
      fill
      wrap
      direction="vertical"
      style="width: 100%"
      class="bc_space-mian"
    >
      <div class="bc_space-box">
        <el-checkbox @checked="rememberMe">记住我</el-checkbox>
        <el-button
          :text="true"
          :plain="true"
          @click="toLoginModule('reset-pwd')"
          >忘记密码？</el-button
        >
      </div>
      <el-button
        type="primary"
        size="large"
        :round="true"
        :loading="auth.loginLoding"
        @click="handleSubmit(formRef)"
      >
        确定
      </el-button>
      <!-- <div class="bc_space-box bc_btn-box">
        <el-button  @click="toLoginModule('code-login')">
          {{ EnumLoginModule['code-login'] }}
        </el-button>
        <div style="width:12px"></div>
        <el-button  @click="toLoginModule('register')">
          {{ EnumLoginModule.register }}
        </el-button>
      </div> -->
    </el-space>
    <!-- <other-login /> -->
    <verifition 
      @success="handleLogin"
      :mode="'fixed'"
      :explain="'向右滑动验证登录'"
      :captchaType="'blockPuzzle'"
      :imgSize="{width:'340px',height:'200px'}"
      ref="verify">
    </verifition>
  </el-form>
</template>

<style lang='scss' scoped>
.bc_space-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.bc_btn-box {
  .ep-button {
    flex: 1;
  }
}

.bc_block-button {
  width: 100%;
}
</style>