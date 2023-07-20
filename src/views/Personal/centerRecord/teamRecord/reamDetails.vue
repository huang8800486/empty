<template>
  <div class="record_detail">
    <BaseList
      :titleList="['地址', '产品', '货币', '金额', '开始时间', '结束时间']"
      :isFlex="true"
      :custom="true"
      v-slot="scope"
      :listItem="currentitemlist"
    >
      <span>{{ getString(scope.item.address, 4, 4) }}</span>
      <span>{{ scope.item.product_name }}</span>
      <span>{{ scope.item.coin_symbol }}</span>
      <span>{{ scope.item.order_price }}</span>
      <span>{{ formatTime(scope.item.start_time) }}</span>
      <span>{{ formatTime(scope.item.end_time) }}</span>
    </BaseList>
  </div>
  <div class="record_pagation">
    <BasePagation
      :total="currentLength"
      :current-page="page"
      :display="pageSize"
      :pagegroup="3"
      @callback="detailPagechange"
      v-if="currentLength > pageSize"
    />
  </div>
</template>

<script setup lang="ts" name="">
  import { getTeamInfo } from '/@/services';
  import { usePublicMethod, useStoreMethod } from '/@/utils/publicMethod';
  import { getString, formatTime } from '/@/utils/common';
  const { getFullAccount, getUserInfo, getUserCode, getUpdataTime } = useStoreMethod();
  const listItemCom = ref([]);
  const currentLength = ref(0);
  const page = ref(1);
  const pageSize = ref(10);
  const peosonObj = ref({
    totalPeople: 0,
    level: 0,
  });
  const initInvitation = () => {
    getTeamInfo({ address: getFullAccount.value, page_num: page.value, page_size: pageSize.value })
      .then((result: any) => {
        console.log('getTeamInfo', result);
        listItemCom.value = result.message;
        currentLength.value = result.totalIndex;
        peosonObj.value.totalPeople = result.totalPeople;
        peosonObj.value.level = result.level;
      })
      .catch((err: any) => {
        console.log('getTeamInfo', err);
      });
  };

  defineExpose({ peosonObj }); // 使用 defineExpose()方法 暴露出去
  watchEffect(() => {
    if (getUserCode.value > -1) {
      initInvitation();
      setInterval(() => {
        initInvitation();
      }, 30 * 1000);
    }
  });
  watch(
    () => getUpdataTime.value,
    (newValue) => {
      if (newValue) {
        initInvitation();
      }
    }
  );
  const currentitemlist = computed(() => {
    return listItemCom.value;
    // if (currentLength.value <= pageSize.value) {
    //   return listItemCom.value;
    // }
    // return listItemCom.value.slice((page.value - 1) * pageSize.value, page.value * pageSize.value);
  });
  const detailPagechange = (num: number) => {
    page.value = num;
  };
</script>
