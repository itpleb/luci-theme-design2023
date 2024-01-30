import { defineStore } from 'pinia';

import { login as luciLogin } from '@/api/apm';
import { usePermissionStore } from '@/store';
import type { UserInfo } from '@/types/interface';

const InitUserInfo: UserInfo = {
  name: '', // 用户名，用于展示在页面右上角头像处
  roles: [], // 前端权限模型使用 如果使用请配置modules/permission-fe.ts使用
};

export const useUserStore = defineStore('user', {
  state: () => ({
    token: 'main_token', // 默认token不走权限
    userInfo: { ...InitUserInfo },
  }),
  getters: {
    roles: (state) => {
      return state.userInfo?.roles;
    },
  },
  actions: {
    async login(userInfo: Record<string, unknown>) {
      // const mockLogin = async (userInfo: Record<string, unknown>) => {
      //   // 登录请求流程
      //   console.log(`用户信息:`, userInfo);
      //   // const { account, password } = userInfo;
      //   // if (account !== 'td') {
      //   //   return {
      //   //     code: 401,
      //   //     message: '账号不存在',
      //   //   };
      //   // }
      //   // if (['main_', 'dev_'].indexOf(password) === -1) {
      //   //   return {
      //   //     code: 401,
      //   //     message: '密码错误',
      //   //   };
      //   // }
      //   // const token = {
      //   //   main_: 'main_token',
      //   //   dev_: 'dev_token',
      //   // }[password];

      //   return {
      //     code: 200,
      //     message: '登录成功',
      //     data: 'main_token',
      //   };
      // };
      console.log(`用户信息:`, userInfo);
      const res: any = await luciLogin(userInfo);
      console.log(`Login Result:`, res);
      //   {
      //     "id": null,
      //     "result": "9b4ef270c3c8c3ed6fce589add36b494",
      //     "error": null
      // }
      if (res.data.result) {
        if (res.data.code === undefined) {
          res.code = 200;
        }
        res.message = '登录成功';
        res.data = res.data.result;
      }
      // const res = await mockLogin(userInfo);
      if (res.code === 200) {
        this.token = res.data;
        const cookie = res.data;

        document.cookie = `sysauth=${cookie}`;

        this.setUserInfo({
          name: userInfo.account,
          roles: ['all'],
        });
      } else {
        throw res;
      }
    },
    async setUserInfo(userInfo: UserInfo) {
      this.userInfo = userInfo;
      console.log('setUserInfo: ', this.userInfo);
    },
    async getUserInfo() {
      console.log('getUserInfo: ', this.userInfo);
      // const mockRemoteUserInfo = async (token: string) => {
      //   if (token === 'main_token') {
      //     return {
      //       name: 'Tencent',
      //       roles: ['all'], // 前端权限模型使用 如果使用请配置modules/permission-fe.ts使用
      //     };
      //   }
      //   return {
      //     name: 'td_dev',
      //     roles: ['UserIndex', 'DashboardBase', 'login'], // 前端权限模型使用 如果使用请配置modules/permission-fe.ts使用
      //   };
      // };
      // const res = await mockRemoteUserInfo(this.token);
      // this.userInfo = res;
    },
    async logout() {
      this.token = '';
      this.userInfo = { ...InitUserInfo };
    },
  },
  persist: {
    afterRestore: () => {
      const permissionStore = usePermissionStore();
      permissionStore.initRoutes();
    },
    key: 'user',
    paths: ['token'],
  },
});
