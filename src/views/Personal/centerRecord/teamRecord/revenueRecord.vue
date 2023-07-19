<template>
  <div class="record_detail">
    <BaseList
      :titleList="['货币1', '用户地址', '数量', '日收益', '直推奖励系数', '时间']"
      :isFlex="true"
      :custom="true"
      v-slot="scope"
      :listItem="currentitemlist"
    >
      <span>{{ scope.item.name }}</span>
      <span>{{ scope.item.number }}</span>
      <span>{{ scope.item.fee }}</span>
      <span>{{ scope.item.number }}</span>
      <span>{{ scope.item.number }}</span>
      <span>{{ scope.item.time }}</span>
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
  interface Props {
    listItem?: any[];
  }
  const props = withDefaults(defineProps<Props>(), {
    listItem: () => [],
  });
  const listItemCom = computed(() => {
    return [
      {
        name: 'WT',
        number: '100000',
        type: '转出',
        fee: '200000',
        time: '2023.06.23 16:00:00',
        status: '转出成功',
      },
      {
        name: 'WT',
        number: '100000',
        type: '转出',
        fee: '200000',
        time: '2023.06.23 16:00:00',
        status: '转出成功',
      },
      {
        name: 'WT',
        number: '100000',
        type: '转出',
        fee: '200000',
        time: '2023.06.23 16:00:00',
        status: '转出成功',
      },
      {
        name: 'WT',
        number: '100000',
        type: '转出',
        fee: '200000',
        time: '2023.06.23 16:00:00',
        status: '转出成功',
      },
      {
        name: 'WT',
        number: '100000',
        type: '转出',
        fee: '200000',
        time: '2023.06.23 16:00:00',
        status: '转出成功',
      },
      {
        name: 'WT',
        number: '100000',
        type: '转出',
        fee: '200000',
        time: '2023.06.23 16:00:00',
        status: '转出成功',
      },
    ];
  });
  const page = ref(1);
  const pageSize = ref(5);
  const currentLength = computed(() => {
    return listItemCom.value.length;
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
