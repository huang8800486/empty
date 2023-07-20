<template>
  <div class="record_detail">
    <BaseList
      :titleList="['昵称', '地址', '伞下最高等级', '团队等级', '理财总价值']"
      :isFlex="true"
      :custom="true"
      v-slot="scope"
      :listItem="currentitemlist"
    >
      <span>{{ scope.item.nick_name }}</span>
      <span>{{ getString(scope.item.address, 4, 4) }}</span>
      <span>0</span>
      <span>0</span>
      <span>0</span>
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
  import { setInvitationData } from '/@/services';
  import { usePublicMethod, useStoreMethod } from '/@/utils/publicMethod';
  import { getString } from '/@/utils/common';
  const { getFullAccount, getUserInfo, getUserCode, getUpdataTime } = useStoreMethod();
  const listItemCom = ref([]);
  const page = ref(1);
  const pageSize = ref(10);
  const initInvitation = () => {
    setInvitationData({ address: getFullAccount.value, page_num: page.value, page_size: pageSize.value })
      .then((result: any) => {
        console.log('setInvitationData', result);
        listItemCom.value = result;
      })
      .catch((err: any) => {
        console.log('setInvitationData', err);
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
  const currentLength = computed(() => {
    return getUserInfo.value.total_invitation;
  });
  const currentitemlist = computed(() => {
    if (currentLength.value <= pageSize.value) {
      return listItemCom.value;
    }
    return listItemCom.value.slice((page.value - 1) * pageSize.value, page.value * pageSize.value);
  });
  const detailPagechange = (num: number) => {
    page.value = num;
  };
</script>
