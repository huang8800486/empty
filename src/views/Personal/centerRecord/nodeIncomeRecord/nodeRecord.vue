<template>
  <div class="record_detail">
    <BaseList
      :titleList="[$t('common.type'), $t('common.Useraddress'), $t('common.Dailyincome'), $t('common.Time')]"
      :isFlex="true"
      :custom="true"
      v-slot="scope"
      :listItem="currentitemlist"
    >
      <span>{{ scope.item.type }}</span>
      <span>{{ getString(scope.item.address, 4, 4) }}</span>
      <span>{{ scope.item.amount }} {{ scope.item.symbol }}</span>
      <span>{{ formatTime(scope.item.time) }}</span>
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
  import { getNodeIncome } from '/@/services';
  import { usePublicMethod, useStoreMethod } from '/@/utils/publicMethod';
  import { getString, formatTime } from '/@/utils/common';
  const { getFullAccount, getUserInfo, getUserCode, getUpdataTime } = useStoreMethod();
  const listItemCom = ref([]);
  const currentLength = ref(0);
  const page = ref(1);
  const pageSize = ref(10);
  const totalObj = ref({
    totalUSDTIncome: '',
    totalWTIncome: '',
  });
  const initInvitation = () => {
    getNodeIncome({ address: getFullAccount.value, page_num: page.value, page_size: pageSize.value })
      .then((result: any) => {
        listItemCom.value = result.message;
        currentLength.value = result.totalIndex;
        totalObj.value.totalUSDTIncome = result.totalUSDTIncome;
        totalObj.value.totalWTIncome = result.totalWTIncome;
      })
      .catch((err: any) => {
        console.log('getNodeIncome', err);
      });
  };

  defineExpose({ totalObj }); // 使用 defineExpose()方法 暴露出去
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
