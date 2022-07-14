import { request, mockRequest } from '../request';

/**
 * 获取验证码
 * @param phone - 手机号
 * @returns - 返回boolean值表示是否发送成功
 */
export function fetchSmsCode(phone: string) {
  return mockRequest.post<boolean>('/getSmsCode', { phone });
}

/**
 * 登录
 * @param userName - 用户名
 * @param passWord - 密码
 * @param code - 验证码
 */
export function fetchLogin(userName: string, passWord: string, code: string) {
  return mockRequest.post<ApiAuth.Token>('/loginByPwd', { userName, passWord, code });
}

/** 获取用户信息 */
export function fetchUserInfo() {
  return mockRequest.get<ApiAuth.UserInfo>('/getUserInfo');
}

/**
 * 获取用户路由数据
 * @param userId - 用户id
 * @description 后端根据用户id查询到对应的角色类型，并将路由筛选出对应角色的路由数据返回前端
 */
export function fetchUserRoutes(userId: string) {
  return mockRequest.post<ApiRoute.Route>('/getUserRoutes', { userId });
}

export function fetchTestToken() {
  return mockRequest.post('/testToken', { userName: 'Soybean' });
}

export function fetchUpdateToken(refreshToken: string) {
  return mockRequest.post('/updateToken', { refreshToken });
}

//获取验证图片  以及token
export function fetchReqGet(data: any) {
  return mockRequest.post<ApiAuth.Token>('/captcha/get', data);
}

//滑动或者点选验证
export function fetchReqCheck(data: any) {
  return mockRequest.post<ApiAuth.Token>('/captcha/check', data);
}
