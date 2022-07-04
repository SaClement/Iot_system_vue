/** 请求环境配置 */
type ServiceEnv = Record<
  Service.HttpEnv,
  {
    /** 请求环境 */
    env: Service.HttpEnv;
    /** 请求地址 */
    url: string;
  }
>;

/** 请求的环境 */
export const serviceEnv: ServiceEnv = {
  test: {
    env: 'test',
    url: 'http://47.105.88.139:16509'
  },
  prod: {
    env: 'prod',
    url: 'http://47.105.80.201:9001'
  }
};
