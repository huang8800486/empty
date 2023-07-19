<template>
  <div class="coin_item_wrap">
    <div class="coin_tit_wrap" @click="openContent">
      <div class="coin_tit">
        <div class="coin_first">
          <div class="head_img"></div>
        </div>
        <div class="coin_second">
          <div class="coin_tex com_tit">
            <p>货币</p>
            <span>{{ coinItemList.coin }}</span>
          </div>
        </div>
        <div class="coin_three">
          <div class="coin_rate com_tit">
            <p>日利率</p>
            <span>{{ coinItemList.rate }}</span>
          </div>
        </div>
        <div class="down" :class="{ on: isShow }">
          <img src="@/assets/images/arrow.png" alt="" />
        </div>
      </div>
    </div>
    <div class="item_siginle_wrap" :class="{ on: isShow }">
      <div class="item_siginle">
        <div class="coin_first">
          <div class="asset">
            <h3>{{ coinItemList.days }}天</h3>
            <p>余额: {{ coinItemList.balance }}</p>
            <p>已存入: {{ coinItemList.income }}</p>
            <p>可赎回的: {{ coinItemList.redeemable }}</p>
          </div>
        </div>
        <div class="coin_second">
          <div class="coin_input_content">
            <div class="input_item" v-for="(item, index) in coinItemList.children" :key="index">
              <BaseInput v-model="item.value" :disabled="true" :placeholder="item.placeholder" />
              <a href="javascript:;" class="max">最大</a>
              <BaseButton>{{ item.text }}</BaseButton>
            </div>
          </div>
        </div>
        <div class="coin_three">
          <div class="item_text">
            <p>收益:</p>
            <span>{{ coinItemList.coin }} : 12323</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="">
  interface Props {
    coinItemList: any;
  }
  const props = withDefaults(defineProps<Props>(), {
    coinItemList: () => {},
  });
  const data = ref('');
  const isShow = ref(false);
  const openContent = () => {
    isShow.value = !isShow.value;
  };
</script>
