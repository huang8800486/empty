<template>
  <div class="assets_record_wrap">
    <!-- <Bsoon /> -->
    <div class="record_detail_wrap recode_inner">
      <div class="text_title">
        <h2>{{ $t('common.Teamlevel') }}: {{ peosonObj.level }}</h2>
        <h3>{{ $t('common.Cumulativeincome') }}</h3>
        <h4>{{ totalObj.totalUSDTIncome }} USDT</h4>
        <h4>{{ totalObj.totalWTIncome }} WT</h4>
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
        <h5 v-if="currentIndex === 1"
          >{{ $t('common.Totalteamsize') }}: <span>{{ peosonObj.totalPeople }}</span></h5
        >
      </div>
      <div class="item_list" v-show="currentIndex === 0">
        <revenueRecord ref="totalRef" />
      </div>
      <div class="item_list" v-show="currentIndex === 1">
        <reamDetails ref="peosonRef" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="">
  import revenueRecord from './revenueRecord.vue';
  import reamDetails from './reamDetails.vue';
  import { fixD } from '/@/utils/common';
  import { usePublicMethod, useStoreMethod } from '/@/utils/publicMethod';
  const { t } = usePublicMethod();
  const secondNav = computed(() => {
    return [t('common.Revenuerecord'), t('common.TeamDetails')];
  });
  const currentIndex = ref(0);
  const switchRecord = (index: number) => {
    currentIndex.value = index;
  };
  const totalRef = ref(null);
  const peosonRef = ref(null);
  const peosonObj: any = ref({
    totalPeople: 0,
    level: 0,
  });
  const totalObj: any = ref({
    totalUSDTIncome: '',
    totalWTIncome: '',
  });
  watchEffect(() => {
    if (totalRef.value && (totalRef.value as any).totalObj) {
      totalObj.value.totalUSDTIncome = fixD((totalRef.value as any).totalObj.totalUSDTIncome, 3, true);
      totalObj.value.totalWTIncome = fixD((totalRef.value as any).totalObj.totalWTIncome, 3, true);
    }
    if (peosonRef.value && (peosonRef.value as any).peosonObj) {
      peosonObj.value.totalPeople = (peosonRef.value as any).peosonObj.totalPeople;
      peosonObj.value.level = (peosonRef.value as any).peosonObj.level;
    }
  });
</script>
