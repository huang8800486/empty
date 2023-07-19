<template>
  <div class="market_content_wrapper">
    <div class="market_title">
      <div class="wrap">
        <div class="titles">
          <img src="@/assets/images/bsc.svg" alt="" />
          <h2>BSC市场</h2>
        </div>
        <div class="mark_text_wrap">
          <div class="mark_text" v-for="(item, index) in markText" :key="index">
            <div class="imgs">
              <img :src="item.image" alt="" />
            </div>
            <div class="text">
              <h3>{{ item.name }}</h3>
              <span>{{ item.value }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="market_content_wrap">
      <div class="wrap">
        <div class="market_content">
          <div class="market_search_box">
            <span>以太坊资产</span>
            <div class="search_input">
              <img src="@/assets/images/search_img.png" alt="" />
              <BaseInput v-model="searchValue" placeholder="搜索资产名称、代码或地址" />
            </div>
          </div>
          <div class="market_list_wrap">
            <div class="base_components_list_layout">
              <div class="base_components_list one">
                <div class="title_list" v-if="titleList.length">
                  <span v-for="(item, index) in titleList" :key="index"> {{ item }}</span>
                </div>
                <div class="list_item_wrap">
                  <div class="list_item">
                    <div class="item" v-for="(item, index) in currentitemlist" :key="index">
                      <span>
                        <div class="coin_box">
                          <div class="coin_img">
                            <img :src="item.image" alt="" />
                          </div>
                          <div class="coin_text">
                            <em>{{ item.name }}</em>
                            <p>{{ item.coin }}</p>
                          </div>
                        </div>
                      </span>
                      <span>
                        <div class="coin_text">
                          <em>{{ item.totalSupply }}</em>
                          <p>{{ item.rateTotalSupply }}</p>
                        </div>
                      </span>
                      <span>
                        <div class="coin_text">
                          <em>{{ item.supplyYear }}</em>
                        </div>
                      </span>
                      <span>
                        <div class="coin_text">
                          <em>{{ item.totalBorrow }}</em>
                          <p>{{ item.rateTotalBorrow }}</p>
                        </div>
                      </span>
                      <span>
                        <div class="coin_text">
                          <em>{{ item.apyConst }}</em>
                        </div>
                      </span>
                      <span>
                        <div class="coin_text">
                          <em>{{ item.apyStable }}</em>
                        </div>
                      </span>
                      <span>
                        <div class="coin_text">
                          <a href="javascript:;">等待开放</a>
                        </div>
                      </span>
                    </div>
                  </div>
                </div>
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
  import { markTextManage } from './config';
  const searchValue = ref('');
  const { markText } = markTextManage();
  const titleList = computed(() => {
    return ['资产', '供应总量', '供应年度', '总借入', '借APY，变量', '借APY，稳定', '操作'];
  });
  const currentitemlist = computed(() => {
    return [
      {
        name: 'Dai Stablecoin',
        coin: 'DAI',
        totalSupply: '38.37M',
        rateTotalSupply: '$38.36M',
        supplyYear: '2.37%',
        totalBorrow: '27.71M',
        rateTotalBorrow: '$27.70M',
        apyConst: '3.68%',
        apyStable: '—',
        image: getImages('dai.svg'),
      },
      {
        name: 'Frax',
        coin: 'FRAX',
        totalSupply: '1.0000000',
        rateTotalSupply: '$1.00',
        supplyYear: '0%',
        totalBorrow: '0',
        rateTotalBorrow: '$0',
        apyConst: '—',
        apyStable: '—',
        image: getImages('frax.svg'),
      },
      {
        name: 'LUSD Stablecoin',
        coin: 'LUSD',
        totalSupply: '2.85M',
        rateTotalSupply: '$2.85M',
        supplyYear: '2.25%',
        totalBorrow: '2.00M',
        rateTotalBorrow: '$2.00M',
        apyConst: '3.58%',
        apyStable: '—',
        image: getImages('lusd.svg'),
      },
      {
        name: 'USD Coin',
        coin: 'USDC',
        totalSupply: '261.17M',
        rateTotalSupply: '$261.17M',
        supplyYear: '3.23%',
        totalBorrow: '235.24M',
        rateTotalBorrow: '$235.24M',
        apyConst: '4.00%',
        apyStable: '—',
        image: getImages('usdc.svg'),
      },
      {
        name: 'Tether',
        coin: 'USDT',
        totalSupply: '152.22M',
        rateTotalSupply: '$152.30M',
        supplyYear: '4.23%',
        totalBorrow: '122.47M',
        rateTotalBorrow: '$122.54M',
        apyConst: '5.88%',
        apyStable: '—',
        image: getImages('usdt.svg'),
      },
      {
        name: '1inch Network',
        coin: '1INCH',
        totalSupply: '352.28K',
        rateTotalSupply: '$121.23K',
        supplyYear: '0.02%',
        totalBorrow: '11.67K',
        rateTotalBorrow: '$4.02K',
        apyConst: '0.66%',
        apyStable: '—',
        image: getImages('1inch.svg'),
      },
      {
        name: 'Aave Token',
        coin: 'AAVE',
        totalSupply: '337.24K',
        rateTotalSupply: '$26.90M',
        supplyYear: '0%',
        totalBorrow: '—',
        rateTotalBorrow: '',
        apyConst: '—',
        apyStable: '—',
        image: getImages('aave.svg'),
      },
      {
        name: 'Balancer',
        coin: 'BAL',
        totalSupply: '159.96K',
        rateTotalSupply: '$799.87K',
        supplyYear: '1.57%',
        totalBorrow: '30.49K',
        rateTotalBorrow: '$152.45K',
        apyConst: '10.7%',
        apyStable: '—',
        image: getImages('bal.svg'),
      },
      {
        name: 'Coinbase Wrapped Staked ETH',
        coin: 'cbETH',
        totalSupply: '8.78K',
        rateTotalSupply: '$18.28M',
        supplyYear: '0.08%',
        totalBorrow: '674.0',
        rateTotalBorrow: '$1.40M',
        apyConst: '1.20%',
        apyStable: '—',
        image: getImages('cbeth.svg'),
      },
      {
        name: 'Curve DAO Token',
        coin: 'CRV',
        totalSupply: '3.05M',
        rateTotalSupply: '$2.59M',
        supplyYear: '4.46%',
        totalBorrow: '1.56M',
        rateTotalBorrow: '$1.32M',
        apyConst: '14.0%',
        apyStable: '—',
        image: getImages('crv.svg'),
      },
      {
        name: 'Ethereum Name Service',
        coin: 'ENS',
        totalSupply: '5.44K',
        rateTotalSupply: '$54.57K',
        supplyYear: '0.14%',
        totalBorrow: '500.3',
        rateTotalBorrow: '$5.02K',
        apyConst: '1.86%',
        apyStable: '—',
        image: getImages('ens.svg'),
      },
      {
        name: 'Lido DAO Token',
        coin: 'LDO',
        totalSupply: '312.06K',
        rateTotalSupply: '$737.39K',
        supplyYear: '1.29%',
        totalBorrow: '100.25K',
        rateTotalBorrow: '$236.90K',
        apyConst: '5.12%',
        apyStable: '—',
        image: getImages('ldo.svg'),
      },
      {
        name: 'ChainLink',
        coin: 'LINK',
        totalSupply: '834.29K',
        rateTotalSupply: '$5.95M',
        supplyYear: '>0.01%',
        totalBorrow: '17.50K',
        rateTotalBorrow: '$124.8',
        apyConst: '0.33%',
        apyStable: '—',
        image: getImages('link.svg'),
      },
      {
        name: 'Maker',
        coin: 'MKR',
        totalSupply: '2.67K',
        rateTotalSupply: '$2.49M',
        supplyYear: '0.40%',
        totalBorrow: '476.9',
        rateTotalBorrow: '$443.3',
        apyConst: '2.81%',
        apyStable: '—',
        image: getImages('mkr.svg'),
      },
      {
        name: 'Rocket Pool ETH',
        coin: 'rETH',
        totalSupply: '27.00K',
        rateTotalSupply: '$58.03M',
        supplyYear: '>0.01%',
        totalBorrow: '442.01',
        rateTotalBorrow: '$949.82',
        apyConst: '0.25%',
        apyStable: '—',
        image: getImages('reth.svg'),
      },
      {
        name: 'Synthetix Network Token',
        coin: 'SNX',
        totalSupply: '85.00K',
        rateTotalSupply: '$197.72K',
        supplyYear: '4.20%',
        totalBorrow: '43.04K',
        rateTotalBorrow: '$100.10K',
        apyConst: '13.3%',
        apyStable: '—',
        image: getImages('snx.svg'),
      },
      {
        name: 'Uniswap',
        coin: 'UNI',
        totalSupply: '225.79K',
        rateTotalSupply: '$1.34M',
        supplyYear: '0.02%',
        totalBorrow: '8.75K',
        rateTotalBorrow: '$51.79',
        apyConst: '0.60%',
        apyStable: '—',
        image: getImages('uni.svg'),
      },
      {
        name: 'Wrapped BTC',
        coin: 'WBTC',
        totalSupply: '7.46K',
        rateTotalSupply: '$232.26M',
        supplyYear: '0.06%',
        totalBorrow: '701.3',
        rateTotalBorrow: '$21.84M',
        apyConst: '0.84%',
        apyStable: '—',
        image: getImages('wbtc.svg'),
      },
      {
        name: 'Ethereum',
        coin: 'ETH',
        totalSupply: '305.69K',
        rateTotalSupply: '$610.07M',
        supplyYear: '1.74%',
        totalBorrow: '170.40K',
        rateTotalBorrow: '$340.08M',
        apyConst: '3.72%',
        apyStable: '—',
        image: getImages('eth.svg'),
      },
      {
        name: 'Wrapped liquid staked Ether 2.0',
        coin: 'wstETH',
        totalSupply: '374.09K',
        rateTotalSupply: '$845.04M',
        supplyYear: '>0.01%',
        totalBorrow: '7.11K',
        rateTotalBorrow: '$16.05M',
        apyConst: '0.44%',
        apyStable: '—',
        image: getImages('wsteth.svg'),
      },
    ];
  });
</script>
