import { RequestOptions } from '@/types/axios';
import { request } from '@/utils/request';
import { AxiosRequestConfig } from 'axios';
import { encryptRsaString } from '@/utils/encrypt';

const Api = {
  Login: '/auth',
  Logout: '/logout',
  ApList: '/list',
};
//https://192.168.6.1/cgi-bin/luci/?status=1&_=0.0022052374561096766
const apmGet = <T = any>(config: AxiosRequestConfig | any, options?: RequestOptions): Promise<T> => {
  config.luciAuth = true;
  return request.get<T>(config, options);
};

const apmPost = <T = any>(config: AxiosRequestConfig | any, options?: RequestOptions): Promise<T> => {
  config.luciAuth = true;
  return request.post<T>(config, options);
};

export function login(userInfo: Record<string, unknown> | any) {
  const useEncryptPWD = false;
  const rsaPwd = useEncryptPWD ? encryptRsaString(userInfo.password) : userInfo.password;
  console.log('rsaPwd: ', rsaPwd);
  return apmPost<any>(
    {
      url: Api.Login,
      data: JSON.stringify({ method: 'login', params: [userInfo.account, rsaPwd] }),
    },
    {
      isReturnNativeResponse: true,
    },
  );
}

export function getApList() {
  return apmGet<any>({
    url: Api.ApList,
  } as any);
}
