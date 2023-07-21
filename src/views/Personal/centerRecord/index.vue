<template>
  <div class="center_record_wrap">
    <div class="record_nav_list">
      <a
        href="javascript:;"
        class="record_nav"
        v-for="(item, index) in recordNav"
        :key="index"
        :class="{ on: currentIndex === index }"
        @click="switchRecord(index)"
      >
        <span> {{ item.text }}</span>
      </a>
    </div>
    <div class="record_content_list">
      <div
        class="record_content"
        v-for="(item, index) in recordNav"
        :key="index"
        v-show="currentIndex === index"
        @click="switchRecord(index)"
      >
        <component :is="currentComp(item.name)" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="">
  import assetsRecord from './assetsRecord/assetsRecord.vue';
  import nodeIncomeRecord from './nodeIncomeRecord/nodeIncomeRecord.vue';
  import teamRecord from './teamRecord/teamRecord.vue';
  import algebraRecord from './algebraRecord/algebraRecord.vue';
  import directRecord from './directRecord/directRecord.vue';
  import myDirectRecord from './myDirectRecord/myDirectRecord.vue';
  const route = useRoute();

  const currentIndex = ref(0);
  watch(
    () => route,
    (newValue) => {
      if (newValue.query && newValue.query.type) {
        currentIndex.value = +newValue.query.type;
      }
    },
    { immediate: true, deep: true }
  );
  const recordNav = computed(() => {
    return [
      { name: 'assetsRecord', text: '资产' },
      { name: 'nodeIncomeRecord', text: '节点收益' },
      { name: 'teamRecord', text: '团队收益' },
      // { name: 'algebraRecord', text: '代数' },
      { name: 'directRecord', text: '直推收益' },
      { name: 'myDirectRecord', text: '我的直推' },
    ];
  });
  const switchRecord = (index: number) => {
    currentIndex.value = index;
  };
  const typeMap = {
    assetsRecord: assetsRecord,
    nodeIncomeRecord: nodeIncomeRecord,
    teamRecord: teamRecord,
    // algebraRecord: algebraRecord,
    directRecord: directRecord,
    myDirectRecord: myDirectRecord,
  };
  const currentComp = (type: string) => {
    if (Object.keys(typeMap).includes(type)) {
      return typeMap[type];
    }
    return typeMap[0];
  };
</script>
