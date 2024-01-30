import { AxiosRequestConfig } from 'axios';

import { useUserStore } from '@/store';
import { RequestOptions } from '@/types/axios';
import { encryptRsaString } from '@/utils/encrypt';
import { createAxios, request } from '@/utils/request';

const Api = {
  Login: '/cgi-bin/luci/apm/auth',
  Logout: '/cgi-bin/luci/apm/logout',
  ApList: '/cgi-bin/luci/apm/list',
  SystemOverviewStatus: '/cgi-bin/luci/admin/status/overview',
  bandwidth_status: '/cgi-bin/luci/apm/bandwidth_status',
};

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
      withCredentials: false,
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

export function getRealtimeBandwidthStatus(dev: string = 'pppoe-wan') {
  console.log('getRealtimeBandwidthStatus');
  return apmGet<any>(
    {
      url: `${Api.bandwidth_status}?dev=${dev}`,
    } as any,
    {
      isReturnNativeResponse: true,
    },
  );
}

export function getSystemOverviewStatus(status: string = '1') {
  console.log('getSystemOverviewStatus');
  return apmGet<any>(
    {
      url: `${Api.SystemOverviewStatus}?status=${status}`,
    } as any,
    {
      isReturnNativeResponse: true,
    },
  );
}
