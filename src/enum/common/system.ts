/**
 * 布局组件名称
 * basic - 基本布局
 * blank - 空白布局
 */
export enum EnumLayoutComponentName {
  basic = 'basic-layout',
  blank = 'blank-layout'
}

/** 登录模块 */
export enum EnumLoginModule {
  'pwd-login' = '账密登录',
  'code-login' = '手机验证码登录',
  'register' = '注册',
  'reset-pwd' = '重置密码',
  'bind-wechat' = '微信绑定'
}