import { request } from '@/utils/request';

const Api = {
  Login: '/auth',
  Logout: '/logout',
};

export function login(userInfo: Record<string, unknown>) {
  return request.post<any>(
    {
      url: Api.Login,
      // luciAuth: true,
      data: JSON.stringify({ method: 'login', params: [userInfo.account, userInfo.password] }),
    },
    {
      isReturnNativeResponse: true,
    },
  );
}
