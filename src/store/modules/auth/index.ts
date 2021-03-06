import { unref } from 'vue';
import { defineStore } from 'pinia';
import { router as globalRouter } from '@/router';
import { useRouterPush } from '@/composables';
import { fetchLogin, fetchUserInfo } from '@/service';
import { getUserInfo, getToken, setUserInfo, setToken, setRefreshToken, clearAuthStorage, getLanguage, setLanguage } from '@/utils'; // 工具（获取用户信息，获取token，设置用户信息，设置token，设置异步token，清除用户缓存）

interface AuthState {
  /** 用户信息 */
  userInfo: Auth.UserInfo;
  /** 用户token */
  token: string;
  /** 登录的加载状态 */
  loginLoding: boolean;
  /** 用户语言 */
  language: string;
}

export const useAuthStore = defineStore('auth-store', {
  state: (): AuthState => ({
    userInfo: getUserInfo(),
    token: getToken(),
    loginLoding: false,
    language: getLanguage()
  }),
  getters: {
    /** 是否登录 */
    isLogin(state) {
      return Boolean(state.token);
    }
  },
  actions: {
    /** 重置auth状态 */
    resetAuthStore() {
      const { toLogin } = useRouterPush(false);
      const route = unref(globalRouter.currentRoute);

      clearAuthStorage();
      this.$reset();

      if (route.meta.requiresAuth) {
        toLogin();
      }
    },
    /**
     * 根据token进行登录
     * @param backendToken - 返回的token
     */
    async loginByToken(backendToken: ApiAuth.Token) {
      const { toLoginRedirect } = useRouterPush(false);

      // 先把token存储到缓存中
      const { token, refreshToken } = backendToken;
      setToken(token);
      setRefreshToken(refreshToken);

      // 获取用户信息
      const { data } = await fetchUserInfo();
      if (data) {
        // 成功后把用户信息存储到缓存中
        setUserInfo(data);

        // 更新状态
        Object.assign(this, { userInfo: data, token });

        // 跳转登录后的地址
        toLoginRedirect();

        // 登录成功弹出欢迎提示
        // window.$notification?.success({
        //   title: '登录成功!',
        //   content: `欢迎回来，${data.userName}!`,
        //   duration: 3000
        // });
      } else {
        // 不成功则重置状态
        this.resetAuthStore();
      }
    },
    /**
     * 登录
     * @param username - 手机号
     * @param password - 密码
     * @param code - 验证码
     */
    async login(username: string, password: string, code: string) {
      // this.loginLoding = true;
      const { data } = await fetchLogin(username, password, code);
      if (data) {
        await this.loginByToken(data);
      }
      this.loginLoding = false;
    },
    
    /**
     * 设置用户语言
     * @param locale 
     */
    setAuthLanguage(locale: string) {
			this.language = locale
			setLanguage(locale)
		},
  }
});
