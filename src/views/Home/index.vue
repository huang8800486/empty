<template>
  <div class="home_content_wrapper">
    <div class="page_img">
      <img src="@/assets/images/page_bg.png" alt="" />
    </div>
    <div class="home_content">
      <div class="wrap">
        <div class="home_banner">
          <div class="banner_text">
            <h2>World Token decentralized financial platform</h2>
            <div class="banner_btn">
              <BaseButton type="white">stake</BaseButton>
              <BaseButton>获取WT</BaseButton>
            </div>
          </div>
          <div class="banner_img">
            <img src="@/assets/images/banner_img.png" alt="" />
          </div>
        </div>
      </div>
      <!-- <div class="home_swiper">
        <div class="wrap">
          <detailMessage />
        </div>
      </div> -->
      <div class="wrap">
        <div class="home_intro">
          <div class="buy_box">
            <div class="buy_title">
              <BaseTitle
                :title="'节点认购'"
                :text="'<span>节点价格：200u一个</span><p>福利：享受伞下网体提现3%手续费和排单币燃烧的30%，平级拿下面平级的节点收益的10%</p>'"
                :class="getSmallScreen ? 'center' : ''"
              />
            </div>
            <div class="buy_img">
              <!-- <img src="@/assets/images/buy_img.png" alt="" /> -->
              <buyNode />
            </div>
          </div>
          <div class="intro_box">
            <div class="intro_img">
              <img src="@/assets/images/intro_img.png" alt="" />
            </div>
            <div class="intro_text">
              <BaseTitle :title="'WT介绍'" :text="noteText" :class="getSmallScreen ? 'center' : ''" />
            </div>
          </div>
          <div class="relate_box">
            <BaseTitle :title="'夥伴'" type="center" />
            <div class="relate_list_wrap">
              <div class="relate_list" v-for="(item, index) in relateList" :key="index">
                <div class="img_box">
                  <img :src="item.img" alt="" />
                </div>
                <span>{{ item.name }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="">
  import { getImages } from '/@/utils/common';
  import { usePublicMethod, useStoreMethod } from '/@/utils/publicMethod';
  import { useLocale } from '/@/locales/useLocale';
  import detailMessage from './detailMessage.vue';
  import buyNode from './buyNode.vue';
  const { getScreen } = useStoreMethod();
  const getSmallScreen = computed(() => {
    return getScreen.value.index < 2;
  });
  const noteText = computed(() => {
    return `
      <p>WT通证经济为WorldToken生态系统提供动力，秉承依靠共识者且最终回馈共识者的精神，让资产的归属彻底去中心化，实现真正共赢、共治、共享，致力构建更完善目健康的去中心化金生态体系，建立一个更加公平的世界。平台币发行总量2100万枚、通过利润回购销毁、生态应用销毁等方式最终通缩至210万枚。</p>
      <p>WorldToken初始价：1USDT</p>
      <p>具体分配方式如下：</p>
      <p>80%全部用于质押挖矿</p>
      <p>10%社区激励，生态建设</p>
      <p>5%技术团队</p>
      <p>5%机构</p>`;
  });
  const relateList = computed(() => {
    return [
      {
        name: 'HashKey Group',
        img: getImages('white-logo.png'),
      },
      {
        name: 'OKX NFT',
        img: getImages('OKXNFT.png'),
      },
      {
        name: 'Coin98',
        img: getImages('Coin98.png'),
      },
      {
        name: 'OpenMeta',
        img: getImages('OpenMeta.png'),
      },
      {
        name: 'CoinMarketCap',
        img: getImages('CoinMarketCap.png'),
      },
      {
        name: 'APE NFT',
        img: getImages('APENFT.png'),
      },
      {
        name: 'Element',
        img: getImages('Element.png'),
      },
      {
        name: 'Certik',
        img: getImages('Certik.png'),
      },
    ];
  });
</script>
