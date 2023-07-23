<template>
  <div class="earning_content">
    <div class="wrap">
      <div class="earning_revenue_record">
        <BaseList
          :titleList="['质押池', '货币', '数量', '时间', '排单状态']"
          :isFlex="true"
          :custom="true"
          :isShowPage="true"
          v-slot="scope"
          :listItem="currentitemlist"
        >
          <span>{{ scope.item.product_name }}</span>
          <span>{{ scope.item.coin_symbol }}</span>
          <span>{{ scope.item.orderList.order_price }}</span>
          <span>{{ formatTime(scope.item.orderList.start_time) }}</span>
          <span>{{ isOpen(scope.item.orderList.is_open) }}</span>
        </BaseList>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="">
  import { useStoreMethod } from '/@/utils/publicMethod';
  import { formatTime } from '/@/utils/common';
  const { getCoinList, getOriginList } = useStoreMethod();

  const currentitemlist = computed(() => {
    const array: any = [];
    if (getOriginList.value.length > 0) {
      for (let i = 0; i < getOriginList.value.length; i++) {
        if (getOriginList.value[i].status !== 1) {
          array.push(getOriginList.value[i]);
        }
      }
    }
    return array;
  });
  const isOpen = (status: any) => {
    console.log('status', status);
    if (status == 0) {
      return '排单中';
    } else if (status == 1) {
      return '排单成功';
    } else if (status == 2) {
      return '排单失败';
    }
    return '';
  };
</script>
