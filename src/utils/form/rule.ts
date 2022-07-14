import { Ref } from 'vue';
import type { FormItemRule } from 'element-plus'
import { REGEXP_PWD } from '@/config';

/** 表单规则 */
interface CustomFormRules {
  /** 用户名 */
  username: FormItemRule[];
  /** 密码 */
  password: FormItemRule[];
  /** 验证码 */
  code: FormItemRule[];
}

/** 表单规则 */
export const formRules: CustomFormRules = {
  username: [
    { required: true, message: '请输入用户名' },
  ],
  password: [
    { required: true, message: '请输入密码' },
    { pattern: REGEXP_PWD, message: '密码为8-18位数字/字符/符号，至少2种组合', trigger: 'input' }
  ],
  code: []
};

/** 获取确认密码的表单规则 */
export function getConfirmPwdRule(pwd: Ref<string>) {
  const confirmPwdRule: FormItemRule[] = [
    { required: true, message: '请输入确认密码' },
    {
      validator: (rule: any, value: any, callback: any) => {
        if (!isBlankString(value) && value !== pwd.value) {
          return callback(rule.message);
        }
        return callback();
      },
      message: '输入的值与密码不一致',
      trigger: 'input'
    }
  ];
  return confirmPwdRule;
}

/** 获取图片验证码的表单规则 */
export function getImgCodeRule(imgCode: Ref<string>) {
  const imgCodeRule: FormItemRule[] = [
    { required: true, message: '请输入验证码' },
    {
      validator: (rule: any, value: any, callback: any) => {
        if (!isBlankString(value) && value !== imgCode.value) {
          return callback(rule.message);
        }
        return callback();
      },
      message: '验证码不正确',
      trigger: 'blur'
    }
  ];
  return imgCodeRule;
}

/** 是否为空字符串 */
function isBlankString(str: string) {
  return str.trim() === '';
}
