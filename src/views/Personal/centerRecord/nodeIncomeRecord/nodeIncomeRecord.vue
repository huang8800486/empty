<template>
  <div class="assets_record_wrap">
    <div class="record_detail_wrap recode_inner">
      <div class="text_title">
        <h3>{{ $t('common.Cumulativeincome') }}</h3>
        <h4>{{ totalObj.totalUSDTIncome }} USDT</h4>
        <h4>{{ totalObj.totalWTIncome }} WT</h4>
        <div class="text_nav_wrap">
          <a href="javascript:;" class="text_nav on"> {{ $t('common.Revenuerecord') }} </a>
        </div>
        <!-- <div class="text_secode_nav">
          <a
            href="javascript:;"
            class="s_nav"
            v-for="(item, index) in secondNav"
            :key="index"
            :class="{ on: currentIndex === index }"
            @click="switchRecord(index)"
          >
            <span>{{ item }}</span>
          </a> -->
        <!-- </div> -->
      </div>
      <div class="item_list" v-show="currentIndex === 0">
        <nodeRecord ref="totalRef" />
      </div>
      <!-- <div class="item_list" v-show="currentIndex === 0">
        <feeRecord />
      </div>
      <div class="item_list" v-show="currentIndex === 1">
        <burningCoins />
      </div>
      <div class="item_list" v-show="currentIndex === 2">
        <equalIncome />
      </div> -->
    </div>
  </div>
</template>

<script setup lang="ts" name="">
  import nodeRecord from './nodeRecord.vue';
  import feeRecord from './feeRecord.vue';
  import burningCoins from './burningCoins.vue';
  import equalIncome from './equalIncome.vue';
  import { fixD } from '/@/utils/common';
  const secondNav = computed(() => {
    return ['提现手续费', '燃烧币收益', '平级收益'];
  });
  const currentIndex = ref(0);
  const switchRecord = (index: number) => {
    currentIndex.value = index;
  };
  const totalRef = ref(null);
  const totalObj: any = ref({
    totalUSDTIncome: '',
    totalWTIncome: '',
  });
  watchEffect(() => {
    if (totalRef.value && (totalRef.value as any).totalObj) {
      totalObj.value.totalUSDTIncome = fixD((totalRef.value as any).totalObj.totalUSDTIncome, 3, true);
      totalObj.value.totalWTIncome = fixD((totalRef.value as any).totalObj.totalWTIncome, 3, true);
    }
  });
</script>
