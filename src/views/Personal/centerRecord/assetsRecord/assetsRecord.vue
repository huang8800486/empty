<template>
  <div class="assets_record_wrap">
    <!-- <Bsoon /> -->
    <div class="second_nav_wrap">
      <a
        href="javascript:;"
        v-for="(item, index) in secondNav"
        :key="index"
        :class="{ on: currentIndex === index }"
        @click="switchRecord(index)"
      >
        <span>{{ item }}</span>
      </a>
    </div>
    <div class="record_detail_wrap">
      <div class="item_list" v-show="currentIndex === 0">
        <assetsData1 />
      </div>
      <div class="item_list" v-show="currentIndex === 1">
        <assetsData2 />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="">
  import assetsData1 from './assetsData1.vue';
  import assetsData2 from './assetsData2.vue';
  import { usePublicMethod, useStoreMethod } from '/@/utils/publicMethod';
  const { Toast, t } = usePublicMethod();
  const secondNav = computed(() => {
    return [t('common.Assets'), t('common.Assetrecord')];
  });
  const currentIndex = ref(0);
  const switchRecord = (index: number) => {
    currentIndex.value = index;
  };
</script>
