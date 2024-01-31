<template>
  <t-row :gutter="16" class="row-container">
    <t-col :xs="12" :xl="6">
      <t-card
        :title="'DHCP ' + $t('pages.dashboard.DhcpList.assignment')"
        class="dashboard-rank-card"
        :bordered="false"
      >
        <!-- <template #actions>
          <t-radio-group default-value="dateVal" variant="default-filled">
            <t-radio-button value="dateVal">{{ $t('pages.dashboard.rankList.week') }}</t-radio-button>
            <t-radio-button value="monthVal">{{ $t('pages.dashboard.rankList.month') }}</t-radio-button>
          </t-radio-group>
        </template> -->
        <t-table :data="DHCP_LIST" :columns="DHCP_COLUMNS" row-key="macaddr">
          <template #index="{ rowIndex }">
            <span :class="getRankClass(rowIndex)">
              {{ rowIndex + 1 }}
            </span>
          </template>
          <template #expires="{ row }">
            {{ row.expires > -1 ? StringExtensions.format('%t', row.expires) : '' }}
          </template>
          <template #operation="slotProps">
            <t-link theme="primary" @click="rehandleClickOp(slotProps)">{{
              $t('pages.dashboard.rankList.info')
            }}</t-link>
          </template>
        </t-table>
      </t-card>
    </t-col>
    <t-col :xs="12" :xl="6">
      <t-card
        :title="'DHCPv6 ' + $t('pages.dashboard.DhcpList.assignment')"
        class="dashboard-rank-card"
        :bordered="false"
      >
        <!-- <template #actions>
          <t-radio-group default-value="dateVal" variant="default-filled">
            <t-radio-button value="dateVal">{{ $t('pages.dashboard.rankList.week') }}</t-radio-button>
            <t-radio-button value="monthVal">{{ $t('pages.dashboard.rankList.month') }}</t-radio-button>
          </t-radio-group>
        </template> -->
        <t-table :data="DHCPv6_LIST" :columns="DHCPv6_COLUMNS" row-key="macaddr">
          <template #index="{ rowIndex }">
            <span :class="getRankClass(rowIndex)">
              {{ rowIndex + 1 }}
            </span>
          </template>
          <template #expires="{ row }">
            {{ row.expires > -1 ? StringExtensions.format('%t', row.expires) : '' }}
          </template>
          <template #operation="slotProps">
            <t-link theme="primary" @click="rehandleClickOp(slotProps)">{{
              $t('pages.dashboard.rankList.info')
            }}</t-link>
          </template>
        </t-table>
      </t-card>
    </t-col>
  </t-row>
</template>

<script setup lang="ts">
import type { TdBaseTableProps } from 'tdesign-vue-next';
import { computed, defineProps, onBeforeUnmount, onMounted, ref } from 'vue';

import { getApList } from '@/api/apm';
import { ISystemOverview } from '@/api/model/systemOverview';
import { t } from '@/locales';
import { StringExtensions } from '@/utils/cbi';

const props = defineProps({
  // eslint-disable-next-line vue/prop-name-casing, vue/require-prop-types
  SystemOverview: {} as ISystemOverview | any,
});

const DHCP_COLUMNS: TdBaseTableProps['columns'] = [
  {
    align: 'center',
    colKey: 'hostname',
    title: t('pages.dashboard.DhcpList.columns.hostname'),
    width: 170,
    fixed: 'left',
  },
  {
    align: 'left',
    ellipsis: false,
    colKey: 'ipaddr',
    title: t('pages.dashboard.DhcpList.columns.ipaddr'),
  },
  {
    align: 'center',
    colKey: 'macaddr',

    title: t('pages.dashboard.DhcpList.columns.macaddr'),
  },
  {
    align: 'center',
    colKey: 'expires',
    title: t('pages.dashboard.DhcpList.columns.remainingLeaseTerm'),
    width: 170,
  },
  {
    align: 'center',
    colKey: 'operation',
    title: t('pages.dashboard.apColumns.operation'),
    width: 70,
    fixed: 'right',
  },
];
// eslint-disable-next-line camelcase
const DHCPv6_COLUMNS: TdBaseTableProps['columns'] = [
  {
    align: 'center',
    colKey: 'hostname',
    title: t('pages.dashboard.DhcpList.columns.hostname'),
    width: 170,
    fixed: 'left',
  },
  {
    align: 'left',
    ellipsis: false,
    colKey: 'ip6addr',
    title: t('pages.dashboard.DhcpList.columns.ipaddrV6'),
  },
  {
    align: 'center',
    colKey: 'duid',

    title: t('pages.dashboard.DhcpList.columns.DUID'),
  },
  {
    align: 'center',
    colKey: 'expires',
    title: t('pages.dashboard.DhcpList.columns.remainingLeaseTerm'),
    width: 170,
  },
  {
    align: 'center',
    colKey: 'operation',
    title: t('pages.dashboard.apColumns.operation'),
    width: 70,
    fixed: 'right',
  },
];

const DHCP_LIST = computed(() => {
  return props.SystemOverview.leases;
});
// eslint-disable-next-line camelcase
const DHCPv6_LIST = computed(() => {
  return props.SystemOverview.leases6;
});

const rehandleClickOp = (val: MouseEvent) => {
  console.log(val);
};
const getRankClass = (index: number) => {
  return ['dashboard-rank', { 'dashboard-rank__top': index < 3 }];
};
const fnGetApListStarting = ref(false);
onMounted(() => {
  fnGetApListStarting.value = true;
  console.log('onMounted　fnGetApList');
  const fnGetApList = () => {
    if (!fnGetApListStarting.value) {
      return;
    }
    getApList()
      .then((data) => {
        console.log('fnGetApList: ', data);
        setTimeout(() => {
          fnGetApList();
        }, 3000);
      })
      .catch(() => {
        setTimeout(() => {
          fnGetApList();
        }, 3000);
      });
  };
  setTimeout(() => {
    fnGetApList();
  }, 3000);
});

onBeforeUnmount(() => {
  fnGetApListStarting.value = false;
});
</script>

<style lang="less" scoped>
.dashboard-rank-card {
  padding: var(--td-comp-paddingTB-xxl) var(--td-comp-paddingLR-xxl);

  :deep(.t-card__header) {
    padding: 0;
  }

  :deep(.t-card__title) {
    font: var(--td-font-title-large);
    font-weight: 400;
  }

  :deep(.t-card__body) {
    padding: 0;
    margin-top: var(--td-comp-margin-xxl);
  }
}

.dashboard-rank__cell {
  display: inline-flex;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  color: white;
  font-size: 14px;
  background-color: var(--td-gray-color-5);
  align-items: center;
  justify-content: center;
  font-weight: 700;

  &--top {
    background: var(--td-brand-color);
  }
}
</style>
