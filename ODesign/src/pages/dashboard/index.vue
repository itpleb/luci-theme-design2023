<template>
  <div>
    <!-- 顶部 card  -->
    <top-panel class="row-container" :SystemOverview="SystemOverviewRef" />
    <div class="row-container">
      <t-row :gutter="[16, 16]">
        <t-col :xs="12" :xl="3">
          <t-card
            :title="'IPv4 WAN ' + t('pages.dashboard.state')"
            :bordered="false"
            :class="{ 'dashboard-item': true, 'dashboard-item--main-color': false }"
          >
            <t-row :gutter="16">
              <t-col flex="16px" align="center">
                <img src="/resources/icons/ethernet.png" />

                <small>
                  <t-link v-if="systemOverviewWan.link" :href="systemOverviewWan.link" theme="primary">
                    {{ systemOverviewWan?.ifname !== '' ? systemOverviewWan?.ifname : '?' }}</t-link
                  >
                  {{ systemOverviewWan?.ifname !== '' ? '' : '?' }}
                </small>
              </t-col>
              <t-col flex="auto">
                <t-list>
                  <t-list-item-meta
                    v-if="!systemOverviewWan.link"
                    :description="t('pages.dashboard.notConnected')"
                  ></t-list-item-meta>
                  <t-list-item-meta
                    v-if="systemOverviewWan.proto"
                    :description="'WAN 类型：' + systemOverviewWan.proto"
                  ></t-list-item-meta>

                  <t-list-item-meta
                    v-if="systemOverviewWan.ipaddr"
                    :description="'地址：' + systemOverviewWan.ipaddr"
                  ></t-list-item-meta>

                  <t-list-item-meta
                    v-if="systemOverviewWan.netmask"
                    :description="'子网掩码：' + systemOverviewWan.netmask"
                  ></t-list-item-meta>

                  <t-list-item-meta
                    v-if="systemOverviewWan.gwaddr"
                    :description="'网关：' + systemOverviewWan.gwaddr"
                  ></t-list-item-meta>

                  <t-list-item-meta
                    v-if="systemOverviewWan.dns.length > 0"
                    :description="'DNS 1：' + (systemOverviewWan.dns.length > 0 ? systemOverviewWan.dns[0] : '')"
                  ></t-list-item-meta>

                  <t-list-item-meta
                    v-if="systemOverviewWan.dns.length > 1"
                    :description="'DNS 2：' + (systemOverviewWan.dns.length > 1 ? systemOverviewWan.dns[1] : '')"
                  ></t-list-item-meta>

                  <t-list-item-meta
                    v-if="systemOverviewWan.expires > 0"
                    :description="
                      '到期时间：' +
                      (systemOverviewWan.expires > -1 ? StringExtensions.format('%t', systemOverviewWan.expires) : '')
                    "
                  ></t-list-item-meta>

                  <t-list-item-meta
                    v-if="systemOverviewWan.ifname"
                    :description="'已连接：' + StringExtensions.format('%t', systemOverviewWan.uptime)"
                  ></t-list-item-meta>
                </t-list>
              </t-col>
            </t-row>
          </t-card>
          <t-card
            :title="'IPv6 WAN ' + t('pages.dashboard.state')"
            :bordered="false"
            :class="{ 'dashboard-item': true, 'dashboard-item--main-color': false }"
          >
            <t-row :gutter="16">
              <t-col flex="16px" align="center">
                <img src="/resources/icons/ethernet.png" />
                <small
                  ><t-link v-if="systemOverviewWan6.link" :href="systemOverviewWan6.link" theme="primary">{{
                    systemOverviewWan6?.ifname !== '' ? systemOverviewWan6?.ifname : '?'
                  }}</t-link>
                  {{ systemOverviewWan6?.ifname !== '' ? '' : '?' }}
                </small>
              </t-col>
              <t-col flex="auto">
                <t-list>
                  <t-list-item-meta
                    v-if="!systemOverviewWan6.link"
                    :description="t('pages.dashboard.notConnected')"
                  ></t-list-item-meta>
                  <t-list-item-meta
                    v-if="systemOverviewWan6.proto"
                    :description="'WAN 类型：' + systemOverviewWan6.proto"
                  ></t-list-item-meta>

                  <t-list-item-meta
                    v-if="systemOverviewWan6.ipaddr"
                    :description="'地址：' + systemOverviewWan6.ipaddr"
                  ></t-list-item-meta>

                  <t-list-item-meta
                    v-if="systemOverviewWan6.netmask"
                    :description="'子网掩码：' + systemOverviewWan6.netmask"
                  ></t-list-item-meta>

                  <t-list-item-meta
                    v-if="systemOverviewWan6.gwaddr"
                    :description="'网关：' + systemOverviewWan6.gwaddr"
                  ></t-list-item-meta>

                  <t-list-item-meta
                    v-if="systemOverviewWan6.dns.length > 0"
                    :description="'DNS 1：' + (systemOverviewWan6.dns.length > 0 ? systemOverviewWan6.dns[0] : '')"
                  ></t-list-item-meta>

                  <t-list-item-meta
                    v-if="systemOverviewWan6.dns.length > 1"
                    :description="'DNS 2：' + (systemOverviewWan6.dns.length > 1 ? systemOverviewWan6.dns[1] : '')"
                  ></t-list-item-meta>

                  <t-list-item-meta
                    v-if="systemOverviewWan6.expires > 0"
                    :description="
                      '到期时间：' +
                      (systemOverviewWan6.expires > -1 ? StringExtensions.format('%t', systemOverviewWan6.expires) : '')
                    "
                  ></t-list-item-meta>

                  <t-list-item-meta
                    v-if="systemOverviewWan6.ifname"
                    :description="'已连接：' + StringExtensions.format('%t', systemOverviewWan6.uptime)"
                  ></t-list-item-meta>
                </t-list>
              </t-col>
            </t-row>
          </t-card>
        </t-col>
        <t-col :xs="12" :xl="9"> <dhcp-list :SystemOverview="SystemOverviewRef" class="row-container" /> </t-col>
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
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';

import { getSystemOverviewStatus } from '@/api/apm';
// 导入样式
import { t } from '@/locales';
import { StringExtensions } from '@/utils/cbi';

import ApList from './components/ApList.vue';
import DhcpList from './components/DhcpList.vue';
import MiddleChart from './components/MiddleChart.vue';
import OutputOverview from './components/OutputOverview.vue';
import TopPanel from './components/TopPanel.vue';

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
      ipaddr: 'localhost:504367',
      hostname: 'DESKTOP-JTI27UF',
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
  wan6: {} as any,
});

const systemOverviewWan = computed(() => {
  return {
    proto: SystemOverviewRef.value?.wan?.proto ?? '',
    ipaddr: SystemOverviewRef.value?.wan?.ipaddr ?? '',
    link: SystemOverviewRef.value?.wan?.link ?? '',
    netmask: SystemOverviewRef.value?.wan?.netmask ?? '',
    gwaddr: SystemOverviewRef.value?.wan?.gwaddr ?? '',
    expires: SystemOverviewRef.value?.wan?.expires ?? -1,
    uptime: SystemOverviewRef.value?.wan?.uptime ?? 0,
    ifname: SystemOverviewRef.value?.wan?.ifname ?? '',
    dns: SystemOverviewRef.value?.wan?.dns ?? [],
  };
});
const systemOverviewWan6 = computed(() => {
  return {
    proto: SystemOverviewRef.value?.wan6?.proto ?? '',
    ipaddr: SystemOverviewRef.value?.wan6?.ipaddr ?? '',
    link: SystemOverviewRef.value?.wan6?.link ?? '',
    netmask: SystemOverviewRef.value?.wan6?.netmask ?? '',
    gwaddr: SystemOverviewRef.value?.wan6?.gwaddr ?? '',
    expires: SystemOverviewRef.value?.wan6?.expires ?? -1,
    uptime: SystemOverviewRef.value?.wan6?.uptime ?? 0,
    ifname: SystemOverviewRef.value?.wan6?.ifname ?? '',
    dns: SystemOverviewRef.value?.wan6?.dns ?? [],
  };
});

const refreashSystemStatusStarting = ref(false);
onMounted(() => {
  refreashSystemStatusStarting.value = true;
  console.log('refreashSystemStatus');
  const refreashSystemStatus = async () => {
    try {
      if (!refreashSystemStatusStarting.value) {
        return;
      }
      const result = await getSystemOverviewStatus();
      if (result && result.data) {
        console.log('refreashSystemStatus data', result.data);
        SystemOverviewRef.value = result.data;
      }
    } catch (error) {
      console.error(error);
    }
    setTimeout(refreashSystemStatus, 3000);
  };
  setTimeout(refreashSystemStatus, 1000);
});

onBeforeUnmount(() => {
  refreashSystemStatusStarting.value = false;
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
