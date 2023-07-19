<template>
  <div class="header_top" :class="{ header_market: isMarket, fixed: getScroll.scrollTop > 20 }">
    <div class="header_content">
      <div class="header_left">
        <div class="nav_wrap" @click="switchNav" v-if="getSmallScreen" :class="{ on: smallFlag }">
          <div class="span_box">
            <span v-for="(item, index) in 3" :key="index"></span>
          </div>
        </div>
        <Logo :isMarket="isMarket" />
      </div>
      <div class="header_right">
        <div class="other_content">
          <Navigation v-if="getBigScreen" />
          <ConnectWallet />
        </div>
      </div>
    </div>

    <SmallNav v-if="getSmallScreen" :show="smallFlag" @callback="smallFlag = false" />
  </div>
</template>

<script setup lang="ts" name="">
  import Logo from './logo.vue';
  import Lang from './lang/lang.vue';
  import Theme from './theme/theme.vue';
  import Navigation from './navigation.vue';
  import ExchangeRate from './exchangeRate/index.vue';
  import SmallNav from './smallNav.vue';
  import { useStoreMethod } from '/@/utils/publicMethod';
  const { getFullAccount, getSmallScreen, getBigScreen, getScroll } = useStoreMethod();
  const smallFlag = ref(false);
  const route = useRoute();
  const isMarket = computed(() => {
    if (route.name === 'market') {
      return true;
    }
    return false;
  });
  const switchNav = () => {
    if (smallFlag.value) {
      setTimeout(() => {
        smallFlag.value = !smallFlag.value;
      }, 300);
    } else {
      smallFlag.value = !smallFlag.value;
    }
  };
</script>
