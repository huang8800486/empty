<template>
  <div class="record_detail">
    <BaseList :titleList="['货币', '数量', '类型', '时间']" :isFlex="true" :custom="true" v-slot="scope" :listItem="currentitemlist">
      <span>{{ scope.item.symbol }}</span>
      <span>{{ scope.item.amount }}</span>
      <span>{{ scope.item.type }}</span>
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
  import { getFundsRecords } from '/@/services';
  import { usePublicMethod, useStoreMethod } from '/@/utils/publicMethod';
  import { getString, formatTime } from '/@/utils/common';
  const { getFullAccount, getUserInfo, getUserCode, getUpdataTime } = useStoreMethod();
  const listItemCom = ref([]);
  const page = ref(1);
  const pageSize = ref(10);
  const initInvitation = () => {
    getFundsRecords({ address: getFullAccount.value, page_num: page.value, page_size: pageSize.value })
      .then((result: any) => {
        console.log('getFundsRecords', result);
        listItemCom.value = result;
      })
      .catch((err: any) => {
        console.log('getFundsRecords', err);
      });
  };
  watchEffect(() => {
    if (getUserCode.value > -1) {
      initInvitation();
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
  const currentLength = computed(() => {
    return getUserInfo.value.total_invitation;
  });
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
