<template>
  <div class="earning_content">
    <div class="wrap">
      <div class="earning_revenue_record">
        <BaseList
          :titleList="[$t('common.Stakingpool'), $t('common.Token'), $t('common.quantity'), $t('common.Time')]"
          :isFlex="true"
          :custom="true"
          v-slot="scope"
          :listItem="currentitemlist"
        >
          <span>{{ scope.item.type }}</span>
          <span>{{ scope.item.symbol }}</span>
          <span>{{ scope.item.amount }}</span>
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
    </div>
  </div>
</template>

<script setup lang="ts" name="">
  import { getDepositIncome } from '/@/services';
  import { usePublicMethod, useStoreMethod } from '/@/utils/publicMethod';
  import { getString, formatTime } from '/@/utils/common';
  const { getFullAccount, getUserInfo, getUserCode, getUpdataTime } = useStoreMethod();
  const listItemCom = ref([]);
  const currentLength = ref(0);
  const page = ref(1);
  const pageSize = ref(10);
  const initInvitation = () => {
    getDepositIncome({ address: getFullAccount.value, page_num: page.value, page_size: pageSize.value })
      .then((result: any) => {
        listItemCom.value = result.message;
        currentLength.value = result.totalIndex;
      })
      .catch((err: any) => {
        console.log('getDepositIncome', err);
      });
  };

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
