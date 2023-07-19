<template>
  <div class="assets_record_wrap">
    <Bsoon />
    <!-- <div class="record_detail_wrap recode_inner">
      <div class="text_title">
        <h3>累计收益</h3>
        <h4>0.00 USDT</h4>
        <div class="text_nav_wrap">
          <a href="javascript:;" class="text_nav on"> 收益记录 </a>
        </div>
        <div class="text_secode_nav">
          <a
            href="javascript:;"
            class="s_nav"
            v-for="(item, index) in secondNav"
            :key="index"
            :class="{ on: currentIndex === index }"
            @click="switchRecord(index)"
          >
            <span>{{ item }}</span>
          </a>
        </div>
      </div>

      <div class="item_list" v-show="currentIndex === 0">
        <excRecord />
      </div>
    </div> -->
  </div>
</template>

<script setup lang="ts" name="">
  import excRecord from './excRecord.vue';
  const secondNav = computed(() => {
    return ['交易'];
  });
  const currentIndex = ref(0);
  const switchRecord = (index: number) => {
    currentIndex.value = index;
  };
</script>
