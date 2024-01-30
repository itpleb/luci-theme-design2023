<template>
  <t-row :gutter="[16, 16]">
    <t-col :xs="12" :xl="3">
      <t-card
        :title="t('pages.dashboard.topPanel.system')"
        :bordered="false"
        :class="{ 'dashboard-item systemOverview-1': true, 'dashboard-item--main-color': false }"
      >
        <!-- <template #actions>
          {{
            t('pages.dashboard.topPanel.averageLoad') +
            ' ' +
            StringExtensions.format(
              '%.02f, %.02f, %.02f',
              (SystemOverview.loadavg[0] / 65535.0).toFixed(2),
              (SystemOverview.loadavg[1] / 65535.0).toFixed(2),
              (SystemOverview.loadavg[2] / 65535.0).toFixed(2),
            )
          }}
        </template> -->

        <t-row :gutter="[16, 16]">
          <!-- <span :style="{ fontSize: `${resizeTime * 28}px` }">{{ item.number }}</span> -->
          <t-col :flex="1">
            <table class="t-table--layout-auto">
              <tbody class="t-table__body">
                <tr>
                  <td>
                    <t-space>
                      <t-space
                        direction="vertical"
                        align="center"
                        :size="9"
                        :title="t('pages.dashboard.topPanel.memoryAvailableMB') + ' ' + memoryInfo.available"
                      >
                        <t-progress
                          theme="circle"
                          :label="memoryInfo.availablePercentage + '%'"
                          :percentage="memoryInfo.availablePercentage"
                          :size="'small'"
                          :status="'success'"
                        ></t-progress>
                        <div>{{ t('pages.dashboard.topPanel.memoryAvailable') }}</div>
                      </t-space>
                      <t-space
                        direction="vertical"
                        align="center"
                        :size="9"
                        :title="t('pages.dashboard.topPanel.memoryCachedB') + ' ' + memoryInfo.cached"
                      >
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
                  </td>
                </tr>
                <tr>
                  <td>
                    <span align="left"> {{ t('pages.dashboard.topPanel.totalMemory') + ' ' + memoryInfo.total }}</span>
                    <span
                      class="loadavg"
                      align="right"
                      :title="
                        t('pages.dashboard.topPanel.averageLoad') +
                        ' ' +
                        StringExtensions.format(
                          '%.02f, %.02f, %.02f',
                          (SystemOverview.loadavg[0] / 65535.0).toFixed(2),
                          (SystemOverview.loadavg[1] / 65535.0).toFixed(2),
                          (SystemOverview.loadavg[2] / 65535.0).toFixed(2),
                        )
                      "
                      >{{
                        StringExtensions.format(
                          '%.02f, %.02f, %.02f',
                          (SystemOverview.loadavg[0] / 65535.0).toFixed(2),
                          (SystemOverview.loadavg[1] / 65535.0).toFixed(2),
                          (SystemOverview.loadavg[2] / 65535.0).toFixed(2),
                        )
                      }}</span
                    >
                  </td>
                </tr>
              </tbody>
            </table>
          </t-col>
          <t-col :flex="1">
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
                                width: Math.floor((SystemOverview.conncount / SystemOverview.connmax) * 100) + 'px',
                              }"
                            ></div>
                            <div class="t-progress__info conn-progress-info">
                              {{
                                SystemOverview.conncount +
                                ' / ' +
                                SystemOverview.connmax +
                                '(' +
                                parseInt(((SystemOverview.conncount / SystemOverview.connmax) * 100).toString()) +
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
                      <td class="">{{ StringExtensions.format('%t', SystemOverview.uptime) }}</td>
                    </tr>
                    <!-- <tr class="">
                  <td class="">纸质签署</td>
                  <td class="">2022-01-01</td>
                </tr> -->
                  </tbody>
                </table>
              </div>
            </div>
          </t-col>
        </t-row>

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
                  <td class="content">{{ SystemOverview.cpuinfo }}</td>
                </tr>
                <!-- <tr class="">
                      <td class="title">{{ t('pages.dashboard.temperature') }}</td>
                      <td class="content">{{ SystemOverview.temperature }}</td>
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
    <t-col :xs="12" :xl="9" class="realtime-status"
      ><embed
        id="bwsvg"
        style="width: 100%; height: 300px; border: 1px solid #000000; background-color: #ffffff"
        src="/resources/bandwidth.svg"
      />
      <div style="text-align: right"><small id="scale">-</small></div>
      <br />
      <table style="width: 100%; min-width: table-layout: fixed" cellspacing="3">
        <tr>
          <td style="text-align: right; vertical-align: top">
            <strong style="border-bottom: 2px solid blue">{{ t('pages.dashboard.topPanel.inbound') }}</strong>
          </td>
          <td id="rx_bw_cur" class="nowrap">0 kbit/s%<br />(0 kB/s)</td>

          <td style="text-align: right; vertical-align: top">
            <strong>{{ t('pages.dashboard.topPanel.average') }}</strong>
          </td>
          <td id="rx_bw_avg" class="nowrap">0 kbit/s<br />(0 kB/s)</td>

          <td style="text-align: right; vertical-align: top">
            <strong>{{ t('pages.dashboard.topPanel.peak') }}</strong>
          </td>
          <td id="rx_bw_peak" class="nowrap">0 kbit/s<br />(0 kB/s)</td>
        </tr>
        <tr>
          <td style="text-align: right; vertical-align: top">
            <strong style="border-bottom: 2px solid green">{{ t('pages.dashboard.topPanel.outbound') }}</strong>
          </td>
          <td id="tx_bw_cur" class="nowrap">0 kbit/s<br />(0 kB/s)</td>

          <td style="text-align: right; vertical-align: top">
            <strong>{{ t('pages.dashboard.topPanel.average') }}</strong>
          </td>
          <td id="tx_bw_avg" class="nowrap">0 kbit/s<br />(0 kB/s)</td>

          <td style="text-align: right; vertical-align: top">
            <strong> {{ t('pages.dashboard.topPanel.peak') }}</strong>
          </td>
          <td id="tx_bw_peak" class="nowrap">0 kbit/s<br />(0 kB/s)</td>
        </tr>
      </table>
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
import { computed, defineProps, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';

import { ISystemOverview } from '@/api/model/systemOverview';
// 导入样式
import { t } from '@/locales';
import { useSettingStore } from '@/store';
import { StringExtensions } from '@/utils/cbi';

import { startRealtimeBandwidthStatusMonitor, stopRealtimeBandwidthStatusMonitor } from './pppoe-wan';

const props = defineProps({
  SystemOverview: {} as ISystemOverview | any,
});

echarts.use([LineChart, BarChart, CanvasRenderer]);

const memoryInfo = computed(() => {
  const memoryInfoRef = (props.SystemOverview as any).memory;
  const cached = `${parseInt((memoryInfoRef.cached / 1024 / 1024).toString(), 10)} MB`;
  const available = `${parseInt((memoryInfoRef.available / 1024 / 1024).toString(), 10)} MB`;
  const availablePercentage = parseInt(((memoryInfoRef.available / memoryInfoRef.total) * 100).toString(), 10);
  const cachedPercentage = parseInt(((memoryInfoRef.cached / memoryInfoRef.total) * 100).toString(), 10);
  const cachedLabel = `${cached}<br>${cachedPercentage}`;
  const availableLabel = `${available}\r\n${availablePercentage}`;
  return {
    total: `${parseInt((memoryInfoRef.total / 1024 / 1024).toString(), 10)} MB`,
    availablePercentage,
    cachedPercentage,
    available,
    cached,
    // shared: parseInt((memoryInfoRef.shared / 1024 / 1024) + ' MB',
    // free: parseInt((memoryInfoRef.free / 1024 / 1024) + ' MB',
    // buffered: parseInt((memoryInfoRef.buffered / 1024 / 1024) + ' MB',
  };
});

const store = useSettingStore();
const resizeTime = ref(1);
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
  // renderCharts();
  window.setTimeout(startRealtimeBandwidthStatusMonitor, 1000);

  nextTick(() => {
    updateContainer();
  });
});

onBeforeUnmount(() => {
  stopRealtimeBandwidthStatusMonitor();
});

const { width, height } = useWindowSize();
watch([width, height], () => {
  updateContainer();
});

// watch(
//   () => store.brandTheme,
//   () => {
//     changeChartsTheme([refundChart]);
//   },
// );

// watch(
//   () => store.mode,
//   () => {
//     [moneyChart, refundChart].forEach((item) => {
//       item.dispose();
//     });

//     renderCharts();
//   },
// );
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
      .loadavg {
        position: relative;
        float: right;
      }
    }
    td.title {
      width: auto;
      padding-right: 5px;
    }
    td.content {
      width: 100% !important;
    }
  }
}
.systemOverview-2 {
  // padding-top: 10.5px;
  // padding-bottom: 10.5px;
  table {
    td.title {
      width: auto;
      padding-right: 5px;
    }
    td.content {
      width: 100% !important;
    }
  }
}
.realtime-status {
  table {
    tr {
      td {
        vertical-align: top;
      }
      td.nowrap {
        white-space: nowrap;
      }
    }
  }
}
</style>
