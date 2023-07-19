<template>
  <div class="assets_record_wrap">
    <Bsoon />
    <!-- <div class="record_detail_wrap recode_inner">
      <div class="text_title">
        <h2>团队等级: 0</h2>
        <h3>累计收益</h3>
        <h4>0.00 USDT</h4>
        <div class="text_nav_wrap">
          <a
            href="javascript:;"
            class="text_nav"
            v-for="(item, index) in secondNav"
            :key="index"
            :class="{ on: currentIndex === index }"
            @click="switchRecord(index)"
          >
            <span>{{ item }}</span>
          </a>
        </div>
        <h5 v-if="currentIndex === 1">团队总人数: <span>0</span></h5>
      </div>
      <div class="item_list" v-show="currentIndex === 0">
        <revenueRecord />
      </div>
      <div class="item_list" v-show="currentIndex === 1">
        <reamDetails />
      </div>
    </div> -->
  </div>
</template>

<script setup lang="ts" name="">
  import revenueRecord from './revenueRecord.vue';
  import reamDetails from './reamDetails.vue';
  const secondNav = computed(() => {
    return ['收益记录', '团队详情'];
  });
  const currentIndex = ref(0);
  const switchRecord = (index: number) => {
    currentIndex.value = index;
  };
</script>
