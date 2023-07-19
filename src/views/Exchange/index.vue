<template>
  <div class="exchange_content_wrapper">
    <div class="exchange_content">
      <div class="exchange_title">
        <h2>兑换</h2>
        <span>兑换手续费 1%</span>
      </div>
      <div class="wrap">
        <div class="exchange_detail">
          <div class="detail_box">
            <div class="detail_title">
              <div class="coin">
                <img src="@/assets/images/logo_coin.png" alt="" />
                <p>WT</p>
              </div>
              <span>余额: 0.00</span>
            </div>
            <div class="detail_input">
              <BaseInput v-model="wtValue" placeholder="请输入数量$WT" :maxIcon="true" />
            </div>
          </div>
          <div class="detail_switch">
            <img src="@/assets/images/switch.png" alt="" />
          </div>
          <div class="detail_box">
            <div class="detail_title">
              <div class="coin">
                <img src="@/assets/images/usdt.svg" alt="" />
                <p>USDT</p>
              </div>
              <span>余额: 0.00</span>
            </div>
            <div class="detail_input">
              <BaseInput v-model="usdtValue" placeholder="请输入数量$USDT" :maxIcon="true" />
            </div>
          </div>
          <div class="detail_button">
            <BaseButton>兑换</BaseButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="">
  const wtValue = ref('');
  const usdtValue = ref('');
</script>
