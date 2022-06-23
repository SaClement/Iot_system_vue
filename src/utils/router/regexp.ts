import { LoginModuleKey } from "@/interface";

/** 获取登录模块页面的动态路由正则 */
export function getLoginModuleRegExp() {
  const modules: LoginModuleKey[] = ['pwd-login', 'code-login', 'register', 'reset-pwd', 'bind-wechat'];
  return modules.join('|')
}