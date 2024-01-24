<template>
  <t-row :gutter="[16, 16]">
    <t-col flex="340px">
      <t-card
        :title="t('pages.dashboard.topPanel.memory') + ' ' + memoryInfo.total"
        :bordered="false"
        :class="{ 'dashboard-item': true, 'dashboard-item--main-color': '0' == -1110 }"
      >
        <template #actions>
          {{
            t('pages.dashboard.topPanel.averageLoad') +
            ' ' +
            String.format(
              '%.02f, %.02f, %.02f',
              (SystemOverview.loadavg[0] / 65535.0).toFixed(2),
              (SystemOverview.loadavg[1] / 65535.0).toFixed(2),
              (SystemOverview.loadavg[2] / 65535.0).toFixed(2),
            )
          }}
        </template>
        <t-space>
          <!-- <span :style="{ fontSize: `${resizeTime * 28}px` }">{{ item.number }}</span> -->
          <t-space direction="vertical" align="center" :size="9">
            <t-progress
              theme="circle"
              :label="memoryInfo.availablePercentage + '%'"
              :percentage="memoryInfo.availablePercentage"
              :size="'small'"
              :status="'success'"
            ></t-progress>
            <div>{{ t('pages.dashboard.topPanel.memoryAvailable') }}</div>
          </t-space>
          <t-space direction="vertical" align="center" :size="9">
            <t-progress
              theme="circle"
              :label="memoryInfo.cachedPercentage + '%'"
              :percentage="memoryInfo.cachedPercentage"
              :size="'small'"
              :status="'error'"
            ></t-progress>
            <div>{{ t('pages.dashboard.topPanel.memoryCached') }}</div>
          </t-space>
          <t-space direction="vertical" align="center" :size="9">
            <t-progress
              theme="circle"
              :label="memoryInfo.availablePercentage + '%'"
              :percentage="memoryInfo.availablePercentage"
              :size="'small'"
              :status="'error'"
            ></t-progress>
            <div>{{ t('pages.dashboard.topPanel.cpuusage') }}</div>
          </t-space>
        </t-space>
      </t-card>
    </t-col>
    <t-col flex="340px">
      <t-card
        title=""
        :bordered="false"
        :class="{ 'dashboard-item systemOverview-1': true, 'dashboard-item--main-color': '0' == -1110 }"
      >
        <div class="t-table t-size-s t-table--striped t-table--column-resizable systemOverview" tabindex="0">
          <div class="t-table__content">
            <table class="t-table--layout-auto">
              <tbody class="t-table__body">
                <tr class="">
                  <td class="title">{{ t('pages.dashboard.topPanel.onlineUser') }}</td>
                  <td class="content">{{ SystemOverview.userinfo }}</td>
                </tr>
                <tr class="">
                  <td class="">{{ t('pages.dashboard.topPanel.onlineConnection') }}</td>
                  <td class="">
                    <div class="t-progress">
                      <div
                        class="t-progress__bar t-progress--plump t-progress--under-ten t-progress--status--default conn-progress"
                      >
                        <div
                          class="t-progress__inner"
                          :style="{
                            width: parseInt((SystemOverview.conncount / SystemOverview.connmax) * 100) + 'px',
                          }"
                        ></div>
                        <div class="t-progress__info conn-progress-info">
                          {{
                            SystemOverview.conncount +
                            ' / ' +
                            SystemOverview.connmax +
                            '(' +
                            parseInt((SystemOverview.conncount / SystemOverview.connmax) * 100) +
                            '%)'
                          }}
                        </div>
                      </div>
                      <!---->
                    </div>
                  </td>
                </tr>
                <tr class="">
                  <td class="">{{ t('pages.dashboard.topPanel.localTime') }}</td>
                  <td class="">{{ SystemOverview.localtime }}</td>
                </tr>
                <tr class="">
                  <td class="">{{ t('pages.dashboard.topPanel.uptime') }}</td>
                  <td class="">{{ String.format('%t', SystemOverview.uptime) }}</td>
                </tr>
                <!-- <tr class="">
                  <td class="">纸质签署</td>
                  <td class="">2022-01-01</td>
                </tr> -->
              </tbody>
            </table>
          </div>
        </div>
      </t-card>
    </t-col>
    <t-col>
      <t-card
        :title="'IPv4 ' + t('pages.dashboard.topPanel.system')"
        :bordered="false"
        :class="{ 'dashboard-item': true, 'dashboard-item--main-color': '0' == -1110 }"
      >
        <template #actions>
          <t-link href="javascript:void(0)" style="line-height: 24px" @click="openNetworkSetting">操作</t-link>
        </template>
        <t-list>
          <t-list-item> WAN 类型：dhcp </t-list-item>
          <t-list-item> 地址：192.168.7.178 </t-list-item>
          <t-list-item> 子网掩码：255.255.255.0 </t-list-item>
          <t-list-item> 网关：192.168.7.1 </t-list-item>
          <t-list-item> DNS 1：192.168.7.1 </t-list-item>
          <t-list-item> 到期时间：7h 25m 37s </t-list-item>
          <t-list-item> 已连接：4h 34m 23s </t-list-item>
        </t-list>
      </t-card>
    </t-col>
  </t-row>
</template>

<script lang="ts">
export default {
  name: 'DashboardOverview',
};
</script>

<script setup lang="ts">
import { useWindowSize } from '@vueuse/core';
import { BarChart, LineChart } from 'echarts/charts';
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { nextTick, onMounted, ref, watch, computed, defineProps } from 'vue';

// 导入样式
import { t } from '@/locales';
import { useSettingStore } from '@/store';
import { changeChartsTheme } from '@/utils/color';

import { constructInitDashboardDataset } from '../index';

import '@/utils/cbi';

import { ISystemOverview } from '@/api/model/systemOverview';
const props = defineProps({
  SystemOverview: {} as any as ISystemOverview,
});

echarts.use([LineChart, BarChart, CanvasRenderer]);
const memoryInfoRef = ref({
  total: 522846208,
  shared: 1646592,
  free: 410247168,
  cached: 29904896,
  available: 388775936,
  buffered: 8536064,
});

const memoryInfo = computed(() => {
  const cached = `${parseInt(memoryInfoRef.value.cached / 1024 / 1024)} MB`;
  const available = `${parseInt(memoryInfoRef.value.available / 1024 / 1024)} MB`;
  const availablePercentage = parseInt((memoryInfoRef.value.available / memoryInfoRef.value.total) * 100);
  const cachedPercentage = parseInt((memoryInfoRef.value.cached / memoryInfoRef.value.total) * 100);
  const cachedLabel = `${cached}<br>${cachedPercentage}`;
  const availableLabel = `${available}\r\n${availablePercentage}`;
  return {
    total: parseInt(memoryInfoRef.value.total / 1024 / 1024) + ' MB',
    availablePercentage,
    cachedPercentage,
    available,
    cached,
    // shared: parseInt(memoryInfoRef.value.shared / 1024 / 1024) + ' MB',
    // free: parseInt(memoryInfoRef.value.free / 1024 / 1024) + ' MB',
    // buffered: parseInt(memoryInfoRef.value.buffered / 1024 / 1024) + ' MB',
  };
});

const openNetworkSetting = () => {};

const store = useSettingStore();
const resizeTime = ref(1);

const PANE_LIST = [
  {
    title: 'pages.dashboard.topPanel.memory',
    type: 'memory',
    number: '¥ 28,425.00',
    upTrend: '20.5%',
    leftType: 'echarts-line',
    total: 522846208,
    shared: 1646592,
    free: 410247168,
    cached: 29904896,
    available: 388775936,
    buffered: 8536064,
  },
  {
    title: 'pages.dashboard.topPanel.card2',
    number: '¥ 768.00',
    downTrend: '20.5%',
    leftType: 'echarts-bar',
  },
  {
    title: 'pages.dashboard.topPanel.card3',
    number: '1126',
    upTrend: '20.5%',
    leftType: 'icon-usergroup',
  },
  {
    title: 'pages.dashboard.topPanel.card4',
    number: 527,
    downTrend: '20.5%',
    leftType: 'icon-file-paste',
  },
];

// moneyCharts
let moneyContainer: HTMLElement;
let moneyChart: echarts.ECharts;
const renderMoneyChart = () => {
  if (!moneyContainer) {
    moneyContainer = document.getElementById('moneyContainer');
  }
  moneyChart = echarts.init(moneyContainer);
  moneyChart.setOption(constructInitDashboardDataset('line'));
};

// refundCharts
let refundContainer: HTMLElement;
let refundChart: echarts.ECharts;
const renderRefundChart = () => {
  if (!refundContainer) {
    refundContainer = document.getElementById('refundContainer');
  }
  refundChart = echarts.init(refundContainer);
  refundChart.setOption(constructInitDashboardDataset('bar'));
};

const renderCharts = () => {
  renderMoneyChart();
  renderRefundChart();
};

// chartSize update
const updateContainer = () => {
  if (document.documentElement.clientWidth >= 1400 && document.documentElement.clientWidth < 1920) {
    resizeTime.value = Number((document.documentElement.clientWidth / 2080).toFixed(2));
  } else if (document.documentElement.clientWidth < 1080) {
    resizeTime.value = Number((document.documentElement.clientWidth / 1080).toFixed(2));
  } else {
    resizeTime.value = 1;
  }
  // moneyChart.resize({
  //   width: resizeTime.value * 120,
  //   // height: resizeTime.value * 100,
  // });
  // refundChart.resize({
  //   width: resizeTime.value * 120,
  //   // height: resizeTime.value * 56,
  // });
};

onMounted(() => {
  renderCharts();
  nextTick(() => {
    updateContainer();
  });
});

const { width, height } = useWindowSize();
watch([width, height], () => {
  updateContainer();
});

watch(
  () => store.brandTheme,
  () => {
    changeChartsTheme([refundChart]);
  },
);

watch(
  () => store.mode,
  () => {
    [moneyChart, refundChart].forEach((item) => {
      item.dispose();
    });

    renderCharts();
  },
);
</script>

<style lang="less" scoped>
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
  padding: 10.5px;
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
