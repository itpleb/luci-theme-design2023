<template>
  <div>
    <!-- 顶部 card  -->
    <top-panel class="row-container" :SystemOverview="SystemOverviewRef" />

    <div class="row-container">
      <t-row :gutter="[16, 16]">
        <t-col :xs="6" :xl="3">
          <t-card
            :title="$t('pages.dashboard.topPanel.system')"
            :bordered="false"
            :class="{ 'dashboard-item systemOverview-1': true, 'dashboard-item--main-color': false }"
          >
            <!-- <template #actions>
            <t-radio-group default-value="dateVal" variant="default-filled">
              <t-radio-button value="dateVal">{{ $t('pages.dashboard.rankList.week') }}</t-radio-button>
              <t-radio-button value="monthVal">{{ $t('pages.dashboard.rankList.month') }}</t-radio-button>
            </t-radio-group>
          </template> -->
            <div class="t-table t-size-s t-table--striped t-table--column-resizable systemOverview" tabindex="0">
              <div class="t-table__content">
                <table class="t-table--layout-auto">
                  <tbody class="t-table__body">
                    <tr class="">
                      <td class="title">{{ t('pages.dashboard.deviceModel') }}</td>
                      <td class="content">{{ systemRef.boardinfo.model }}</td>
                    </tr>
                    <tr class="">
                      <td class="title">{{ t('pages.dashboard.cpuinfo') }}</td>
                      <td class="content">{{ SystemOverviewRef.cpuinfo }}</td>
                    </tr>
                    <!-- <tr class="">
                      <td class="title">{{ t('pages.dashboard.temperature') }}</td>
                      <td class="content">{{ SystemOverviewRef.temperature }}</td>
                    </tr> -->
                    <tr class="">
                      <td class="title">{{ t('pages.dashboard.targetPlatform') }}</td>
                      <td class="content">{{ systemRef.boardinfo.release.target }}</td>
                    </tr>
                    <tr class="">
                      <td class="title">{{ t('pages.dashboard.firmwareVersion') }}</td>
                      <td class="content">
                        {{ systemRef.boardinfo.release.distribution + ' ' + systemRef.boardinfo.release.revision }}
                      </td>
                    </tr>
                    <tr class="">
                      <td class="title">{{ t('pages.dashboard.kernelVersion') }}</td>
                      <td class="content">{{ systemRef.boardinfo.kernel }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </t-card>
        </t-col>
        <t-col :xs="6" :xl="3">
          <t-card
            :title="'IPv4 WAN ' + t('pages.dashboard.state')"
            :bordered="false"
            :class="{ 'dashboard-item': true, 'dashboard-item--main-color': false }"
          >
            <template #actions>
              <a :href="SystemOverviewRef.wan.link" style="line-height: 24px; color: blue">{{
                SystemOverviewRef.wan.ifname
              }}</a>
            </template>
            <t-list>
              <t-list-item> WAN 类型：{{ SystemOverviewRef.wan.proto }} </t-list-item>
              <t-list-item> 地址：{{ SystemOverviewRef.wan.ipaddr }} </t-list-item>
              <t-list-item> 子网掩码：{{ SystemOverviewRef.wan.netmask }} </t-list-item>
              <t-list-item> 网关：{{ SystemOverviewRef.wan.gwaddr }} </t-list-item>
              <t-list-item v-if="SystemOverviewRef.wan.dns.length > 0">
                DNS 1：{{ SystemOverviewRef.wan.dns.length > 0 ? SystemOverviewRef.wan.dns[0] : '' }}
              </t-list-item>
              <t-list-item v-if="SystemOverviewRef.wan.dns.length > 1">
                DNS 2：{{ SystemOverviewRef.wan.dns.length > 1 ? SystemOverviewRef.wan.dns[1] : '' }}
              </t-list-item>
              <t-list-item v-if="SystemOverviewRef.wan.expires > 0">
                到期时间：{{
                  SystemOverviewRef.wan.expires > -1 ? StringExtensions.format('%t', SystemOverviewRef.wan.expires) : ''
                }}
              </t-list-item>
              <t-list-item> 已连接：{{ StringExtensions.format('%t', SystemOverviewRef.wan.uptime) }} </t-list-item>
            </t-list>
          </t-card>
        </t-col>
      </t-row>
    </div>
    <!-- AP 列表 -->
    <ap-list class="row-container" />
    <!-- 中部图表  -->
    <middle-chart class="row-container" />
    <!-- 出入库概览 -->
    <output-overview class="row-container" />
  </div>
</template>

<script lang="ts">
export default {
  name: 'DashboardOverview',
};
</script>

<script setup lang="ts">
import MiddleChart from './components/MiddleChart.vue';
import OutputOverview from './components/OutputOverview.vue';
import ApList from './components/ApList.vue';
import TopPanel from './components/TopPanel.vue';
import { ref } from 'vue';

// 导入样式
import { t } from '@/locales';
import { StringExtensions } from '@/utils/cbi';
const SystemOverviewRef = ref({
  memcached: '45468\n',
  swap: {
    free: 0,
    total: 0,
  },
  ethinfo: '',
  leases: [
    {
      expires: 33504,
      macaddr: '70:a6:cc:75:5c:d8',
      ipaddr: '192.168.7.167',
      hostname: 'DESKTOP-JTI27UF',
    },
    {
      expires: 33491,
      macaddr: '70:a6:cc:75:5c:d8',
      ipaddr: '192.168.7.166',
      hostname: 'WRH',
    },
    {
      expires: 33297,
      macaddr: '02:32:4a:56:4e:72',
      ipaddr: '192.168.7.162',
      hostname: false,
    },
    {
      expires: 25834,
      macaddr: '22:18:3a:d2:7e:bd',
      ipaddr: '192.168.7.225',
      hostname: 'HONOR-90',
    },
    {
      expires: 41536,
      macaddr: '8a:0b:19:27:32:6f',
      ipaddr: '192.168.7.164',
      hostname: 'OpenWrt',
    },
    {
      expires: 41534,
      macaddr: 'bc:ff:4d:4a:f7:74',
      ipaddr: '192.168.7.127',
      hostname: 'ESP_4AF774',
    },
  ],
  userinfo: '12\n',
  wifinets: [],
  leases6: [
    {
      expires: 33491,
      hostname: 'DESKTOP-JTI27UF',
      duid: '000100012c43224500155d026916',
      ip6addr: 'fd26:f291:10c7::17d\/128',
    },
    {
      expires: 33470,
      hostname: 'WRH',
      duid: '000100012a3fcd4300e070e9d170',
      ip6addr: 'fd26:f291:10c7::7d5\/128',
    },
  ],
  conncount: 1314,
  connmax: 65536,
  memory: {
    total: 236531712,
    shared: 1089536,
    free: 40579072,
    cached: 46559232,
    available: 90542080,
    buffered: 11284480,
  },
  uptime: 476918,
  cpuinfo: 'ARMv8 Processor rev 4 (v8l) x 2 (56.0°C)',
  wan: {
    proto: 'pppoe',
    ipaddr: '113.87.227.254',
    link: '\/cgi-bin\/luci\/admin\/network\/network\/wan',
    netmask: '255.255.255.255',
    gwaddr: '113.87.224.1',
    expires: -1,
    uptime: 476840,
    ifname: 'pppoe-wan',
    dns: ['202.96.128.166', '202.96.134.133'],
  },
  localtime: 'Wed Jan 24 00:48:52 2024',
  cpuusage: '0%',
  loadavg: [0, 0, 0],
});

const systemRef = ref({
  boardinfo: {
    board_name: 'jdcloud,re-sp-01b',
    rootfs_type: 'squashfs',
    hostname: 'OpenWrt',
    release: {
      distribution: 'OpenWrt',
      revision: 'R23.11.11',
      version: 'SNAPSHOT',
      target: 'ramips/mt7621',
      description: 'OpenWrt ',
    },
    model: 'JDCloud RE-SP-01B',
    kernel: '5.4.266',
    system: 'MediaTek MT7621 ver:1 eco:3',
  },
});
</script>

<style lang="less" scoped>
.row-container:not(:last-child) {
  margin-bottom: 16px;
}
.dashboard-item {
  padding: var(--td-comp-paddingTB-xl) var(--td-comp-paddingLR-xxl);

  :deep(.t-card__header) {
    padding: 0;
  }

  :deep(.t-card__footer) {
    padding: 0;
    // display: none;
    text-align: center;
  }

  :deep(.t-card__title) {
    font: var(--td-font-body-medium);
    color: var(--td-text-color-secondary);
  }

  :deep(.t-card__body) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
    position: relative;
    padding: 0;
    margin-top: var(--td-comp-margin-s);
    // margin-bottom: var(--td-comp-margin-xxl);
  }

  :deep(.t-list-item) {
    padding: 0;
  }

  &:hover {
    cursor: pointer;
  }

  &-top {
    display: flex;
    flex-direction: row;
    align-items: flex-start;

    > span {
      display: inline-block;
      color: var(--td-text-color-primary);
      font-size: var(--td-font-size-headline-medium);
      line-height: var(--td-line-height-headline-medium);
    }
  }

  &-bottom {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    > .t-icon {
      cursor: pointer;
      font-size: var(--td-comp-size-xxxs);
    }
  }

  &-block {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--td-text-color-placeholder);
  }

  &-trend {
    margin-left: var(--td-comp-margin-s);
  }

  &-left {
    position: absolute;
    top: 0;
    right: 0;

    > span {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: var(--td-comp-size-xxxl);
      height: var(--td-comp-size-xxxl);
      background: var(--td-brand-color-light);
      border-radius: 50%;

      .t-icon {
        font-size: 24px;
        color: var(--td-brand-color);
      }
    }
  }

  // 针对第一个卡片需要反色处理
  &--main-color {
    background: var(--td-brand-color);
    color: var(--td-text-color-primary);

    :deep(.t-card__title),
    .dashboard-item-top span,
    .dashboard-item-bottom {
      color: var(--td-text-color-anti);
    }

    .dashboard-item-block {
      color: var(--td-text-color-anti);
      opacity: 0.6;
    }

    .dashboard-item-bottom {
      color: var(--td-text-color-anti);
    }
  }
}

:deep(.conn-progress) {
  position: relative;
  .conn-progress-info {
    position: absolute;
    width: 100%;
    text-align: center;
    left: 0px;
    margin: 0;
  }
}
.systemOverview-1 {
  // padding-top: 10.5px;
  // padding-bottom: 10.5px;
  table {
    td {
      white-space: nowrap !important;
    }
    td.title {
      width: auto;
      padding-right: 5px;
    }
    td.content {
      width: 100%;
      min-width: 150px;
    }
  }
}
</style>
