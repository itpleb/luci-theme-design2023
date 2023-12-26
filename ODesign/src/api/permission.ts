import type { MenuListResult } from '@/api/model/permissionModel';
import { request } from '@/utils/request';

const Api = {
  MenuList: '/get-menu-list-i18n',
};

const SiteMenus = {
  code: 0,
  data: {
    list: [
      {
        path: '/list',
        name: 'list',
        component: 'LAYOUT',
        redirect: '/list/base',
        meta: {
          title: {
            zh_CN: '列表页',
            en_US: 'List',
          },
          icon: 'view-list',
        },
        children: [
          {
            path: 'base',
            name: 'ListBase',
            component: '/list/base/index',
            meta: {
              title: {
                zh_CN: '基础列表页',
                en_US: 'Base List',
              },
            },
          },
          {
            path: 'card',
            name: 'ListCard',
            component: '/list/card/index',
            meta: {
              title: {
                zh_CN: '卡片列表页',
                en_US: 'Card List',
              },
            },
          },
          {
            path: 'filter',
            name: 'ListFilter',
            component: '/list/filter/index',
            meta: {
              title: {
                zh_CN: '筛选列表页',
                en_US: 'Filter List',
              },
            },
          },
          {
            path: 'tree',
            name: 'ListTree',
            component: '/list/tree/index',
            meta: {
              title: {
                zh_CN: '树状筛选列表页',
                en_US: 'Tree List',
              },
            },
          },
        ],
      },
      {
        path: '/form',
        name: 'form',
        component: 'LAYOUT',
        redirect: '/form/base',
        meta: {
          title: {
            zh_CN: '表单页',
            en_US: 'Form',
          },
          icon: 'edit-1',
        },
        children: [
          {
            path: 'base',
            name: 'FormBase',
            component: '/form/base/index',
            meta: {
              title: {
                zh_CN: '基础表单页',
                en_US: 'Base Form',
              },
            },
          },
          {
            path: 'step',
            name: 'FormStep',
            component: '/form/step/index',
            meta: {
              title: {
                zh_CN: '分步表单页',
                en_US: 'Step Form',
              },
            },
          },
        ],
      },
      {
        path: '/detail',
        name: 'detail',
        component: 'LAYOUT',
        redirect: '/detail/base',
        meta: {
          title: {
            zh_CN: '详情页',
            en_US: 'Detail',
          },
          icon: 'layers',
        },
        children: [
          {
            path: 'base',
            name: 'DetailBase',
            component: '/detail/base/index',
            meta: {
              title: {
                zh_CN: '基础详情页',
                en_US: 'Base Detail',
              },
            },
          },
          {
            path: 'advanced',
            name: 'DetailAdvanced',
            component: '/detail/advanced/index',
            meta: {
              title: {
                zh_CN: '多卡片详情页',
                en_US: 'Card Detail',
              },
            },
          },
          {
            path: 'deploy',
            name: 'DetailDeploy',
            component: '/detail/deploy/index',
            meta: {
              title: {
                zh_CN: '数据详情页',
                en_US: 'Data Detail',
              },
            },
          },
          {
            path: 'secondary',
            name: 'DetailSecondary',
            component: '/detail/secondary/index',
            meta: {
              title: {
                zh_CN: '二级详情页',
                en_US: 'Secondary Detail',
              },
            },
          },
        ],
      },
      {
        path: '/frame',
        name: 'Frame',
        component: 'Layout',
        redirect: '/frame/doc',
        meta: {
          icon: 'internet',
          title: {
            zh_CN: '外部页面',
            en_US: 'External',
          },
        },
        children: [
          {
            path: 'doc',
            name: 'Doc',
            component: 'IFrame',
            meta: {
              frameSrc: 'https://tdesign.tencent.com/starter/docs/vue-next/get-started',
              title: {
                zh_CN: '使用文档（内嵌）',
                en_US: 'Documentation(IFrame)',
              },
            },
          },
          {
            path: 'TDesign',
            name: 'TDesign',
            component: 'IFrame',
            meta: {
              frameSrc: 'https://tdesign.tencent.com/vue-next/getting-started',
              title: {
                zh_CN: 'TDesign 文档（内嵌）',
                en_US: 'TDesign (IFrame)',
              },
            },
          },
          {
            path: 'TDesign2',
            name: 'TDesign2',
            component: 'IFrame',
            meta: {
              frameSrc: 'https://tdesign.tencent.com/vue-next/getting-started',
              frameBlank: true,
              title: {
                zh_CN: 'TDesign 文档（外链',
                en_US: 'TDesign Doc(Link)',
              },
            },
          },
        ],
      },
    ],
  },
};

export function getMenuList() {
  // return request.get<MenuListResult>({
  //   url: Api.MenuList,
  // });

  return new Promise<MenuListResult>((resolve: any) => {
    resolve(SiteMenus.data);
  });
}
