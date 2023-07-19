<template>
  <div class="earning_content">
    <div class="wrap">
      <div class="earning_home">
        <div class="coin_list_nav">
          <a
            href="javascript:;"
            class="coin_nav"
            v-for="(item, index) in coinNav"
            :key="index"
            :class="{ on: index === currentIndex }"
            @click="switchTab(index)"
          >
            {{ item }}
          </a>
        </div>
        <div class="coin_list_content">
          <div class="coin_list_con" v-for="(item, index) in coinNav" :key="index" v-show="currentIndex === index">
            <template v-if="coinList[item].length > 0">
              <div class="coin_list_si" v-for="(e, i) in coinList[item]" :key="i">
                <CoinItem :coinItemList="e" />
              </div>
            </template>
            <template v-else>
              <div class="coin_nodata">暂无数据</div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="">
  import CoinItem from './coinItem/index.vue';
  import { coinListManage } from './config';
  const currentIndex = ref<number>(0);
  const coinNav = computed(() => {
    return ['USDT', 'WT'];
  });
  const switchTab = (index: number) => {
    if (currentIndex.value === index) {
      return;
    }
    currentIndex.value = index;
  };
  const { coinList } = coinListManage();
</script>
