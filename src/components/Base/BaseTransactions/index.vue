<template>
  <div class="recent_transactions_list">
    <div class="recent_item clearfix" :class="{ flex: flexItem }" v-for="(item, index) in recentList" :key="index">
      <div class="recent_titles flex_item" @click="goToDetail(item)">
        <div class="img_box">
          <img :src="item.image" alt="" />
        </div>
        <div class="title_box sub_item">
          <span>{{ item.name }}</span>
          <p>{{ item.description }}</p>
        </div>
      </div>
      <div class="recent_buy items flex_item">
        <div class="buy_item sub_item">
          <a :href="`https://bscscan.com/address/${item.from}`" target="_blank">{{ getString(item.from) }}</a>
          <a href="javascript:;" class="behavior" :class="item.behavior">{{ item.behavior }}</a>
        </div>
      </div>
      <div class="recent_owner items flex_item">
        <div class="buy_item sub_item">
          <span>{{ item.tokenId }}</span>
          <p>TokenId</p>
        </div>
      </div>
      <div class="recent_tx items flex_item">
        <div class="buy_item sub_item">
          <a :href="`https://bscscan.com/tx/${item.tx}`" target="_blank">{{ getString(item.tx) }}</a>
          <p>TX</p>
        </div>
      </div>
      <div class="recent_bt items flex_item">
        <div class="buy_item sub_item">
          <h4>{{ getPrice(item) }} {{ getTokenCoin(item.dealToken) }}</h4>
          <p>{{ formatTime(+item.time * 1000) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { getString, formatTime, getTokenCoin, millisecondFormat, fixD } from '/@/utils/common';
  import { fixN } from '/@/utils/BigNumber';
  import { formatUnits, formatNumber } from '/@/utils/formatEth';
  const router = useRouter();
  interface RecentType {
    image: string;
    name: string;
    description: string;
    behavior: string;
    buyText: string;
    from: string;
    to: string;
    tx: string;
    tokenId: string;
    price: string;
    time: string;
    dealToken: string;
  }
  interface Props {
    recentList?: Array<RecentType>;
    flexItem?: boolean;
  }
  const emit = defineEmits<{
    (e: string, value: number): void;
  }>();
  const props = withDefaults(defineProps<Props>(), {
    recentList: () => [],
    flexItem: false,
  });
  const getPrice = (item: any) => {
    return fixD(fixN.div(item.price, formatNumber), 0) || 0;
  };
  const goToDetail = (item: any) => {
    router.push(`/card/${item.address}/${item.tokenId}`);
  };
</script>
