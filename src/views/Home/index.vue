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
              <BaseButton>{{ $t('common.BuyWT') }}</BaseButton>
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
      <div class="wrap" id="buyNode">
        <div class="home_intro">
          <div class="buy_box">
            <div class="buy_title">
              <BaseTitle
                :title="$t('common.NodeSubscription')"
                :text="`<span>${$t('common.Nodeprice')}</span>
                <p>${$t('common.NodeText')}</p>
                `"
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
              <BaseTitle :title="$t('common.WTintroduction')" :text="noteText" :class="getSmallScreen ? 'center' : ''" />
            </div>
          </div>
          <div class="relate_box">
            <BaseTitle :title="$t('common.Partner')" type="center" />
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
  const { t } = usePublicMethod();
  const getSmallScreen = computed(() => {
    return getScreen.value.index < 2;
  });
  const noteText = computed(() => {
    return `
      <p>${t('common.intro_01')}</p>
      <p>${t('common.intro_02')}</p>
      <p>${t('common.intro_03')}</p>
      <p>${t('common.intro_04')}</p>
      <p>${t('common.intro_05')}</p>
      <p>${t('common.intro_06')}</p>
      <p>${t('common.intro_07')}</p>
      `;
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
