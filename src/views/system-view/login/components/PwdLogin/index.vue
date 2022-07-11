<script setup lang='ts'>
import type { FormInstance, FormRules } from "element-plus";
import { EnumLoginModule } from "@/enum";
import { useAuthStore } from "@/store";
import { useRouterPush } from "@/composables";
import { formRules } from "@/utils";
// import { OtherLogin } from './components';

const auth = useAuthStore();
const { login } = useAuthStore();
const { toLoginModule } = useRouterPush();

const formRef = ref<FormInstance | null>(null);
const model = reactive({
  phone: "15170283876",
  pwd: "abc123456",
});
const rules: FormRules = {
  phone: formRules.phone,
  pwd: formRules.pwd,
};
const rememberMe = ref(false);

async function handleSubmit(formEl: FormInstance | null) {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      const { phone, pwd } = model;
      login(phone, pwd, "pwd");
    }else{
      console.log(fields)
    }
  });
}
</script>

<template>
  <el-form ref="formRef" :model="model" :rules="rules" size="large">
    <el-form-item prop="phone" label="账号">
      <el-input v-model="model.phone" placeholder="请输入手机号码" />
    </el-form-item>
    <el-form-item prop="pwd" label="密码">
      <el-input
        v-model="model.pwd"
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
  </el-form>
</template>

<style lang='scss' scoped>
.bc_space-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.bc_btn-box {
  .el-button {
    flex: 1;
  }
}

.bc_block-button {
  width: 100%;
}
</style>