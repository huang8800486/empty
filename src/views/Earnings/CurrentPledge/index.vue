<template>
  <div class="earning_content">
    <div class="wrap">
      <div class="earning_revenue_record">
        <BaseList
          :titleList="['时间', '质押池', '货币', '数量']"
          :isFlex="true"
          :custom="true"
          :isShowPage="true"
          v-slot="scope"
          :listItem="currentitemlist"
        >
          <span>{{ scope.item.time }}</span>
          <span>{{ scope.item.number }}</span>
          <span>{{ scope.item.type }}</span>
          <span>{{ scope.item.fee }}</span>
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
        number: '200000',
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
