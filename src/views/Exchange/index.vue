<template>
  <div class="exchange_content_wrapper">
    <div class="exchange_content">
      <div class="exchange_title">
        <h2>{{ $t('common.Swap') }}</h2>
        <span>{{ $t('common.Exchangefee') }}</span>
      </div>
      <div class="wrap">
        <div class="exchange_detail">
          <div class="detail_box">
            <div class="detail_title">
              <div class="coin">
                <img :src="topCoinImage" alt="" />
                <p>{{ topCoinTitle }}</p>
              </div>
              <span>{{ $t('common.Balance') }}: {{ topBalance }}</span>
            </div>
            <div class="detail_input">
              <BaseInput
                v-model="topValue"
                :placeholder="`${$t('common.Pleaseenterusdt')}${topCoinTitle}`"
                :isDemi="true"
                :maxIcon="true"
                @callback="maxFun('top')"
              />
            </div>
          </div>
          <div class="detail_switch">
            <!-- <a href="javascript:;" @click="switchType"><img src="@/assets/images/switch.png" alt="" /></a> -->
            <a href="javascript:;"><img src="@/assets/images/switch.png" alt="" /></a>
          </div>
          <div class="detail_box">
            <div class="detail_title">
              <div class="coin">
                <img :src="bottomCoinImage" alt="" />
                <p>{{ bottomCoinTitle }}</p>
              </div>
              <span>{{ $t('common.Balance') }}: {{ bottomBalance }}</span>
            </div>
            <div class="detail_input">
              <BaseInput
                v-model="topValue"
                :placeholder="`${$t('common.Pleaseenterusdt')}${bottomCoinTitle}`"
                :isDemi="true"
                :maxIcon="true"
                @callback="maxFun('bottom')"
              />
            </div>
          </div>
          <div class="detail_button">
            <BaseButton :btnId="nanoid()" @callback="exchange">{{ $t('common.Swap') }}</BaseButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="">
  import { nanoid } from 'nanoid';
  import { getImages } from '/@/utils/common';
  import { usePublicMethod, useStoreMethod } from '/@/utils/publicMethod';
  import { setSwap } from '/@/services';
  const { Toast, t } = usePublicMethod();
  const { options, contract, getFullAccount, getIsButtonLoading, getUserInfo, getProvider } = useStoreMethod();
  const topValue = ref('');
  const bottomValue = ref('');
  const currentType = ref(1);
  const switchType = () => {
    currentType.value = currentType.value === 0 ? 1 : 0;
  };
  watch(
    () => topValue.value,
    (newValue) => {
      bottomValue.value = newValue;
    }
  );
  const topCoinImage = computed(() => {
    return currentType.value === 0 ? getImages('logo_coin.png') : getImages('usdt.svg');
  });
  const bottomCoinImage = computed(() => {
    return currentType.value === 0 ? getImages('usdt.svg') : getImages('logo_coin.png');
  });
  const topCoinTitle = computed(() => {
    return currentType.value === 0 ? 'wt' : 'usdt';
  });
  const bottomCoinTitle = computed(() => {
    return currentType.value === 0 ? 'usdt' : 'wt';
  });
  const topBalance = computed(() => {
    return currentType.value === 0 ? getUserInfo.value.wt_balance : getUserInfo.value.usdt_balance;
  });
  const bottomBalance = computed(() => {
    return currentType.value === 0 ? getUserInfo.value.usdt_balance : getUserInfo.value.wt_balance;
  });
  const maxFun = (type: string) => {
    if (type === 'top') {
      topValue.value = currentType.value === 0 ? getUserInfo.value.wt_balance : getUserInfo.value.usdt_balance;
    }
    if (type === 'bottom') {
      topValue.value = currentType.value === 0 ? getUserInfo.value.usdt_balance : getUserInfo.value.wt_balance;
    }
  };

  const exchange = () => {
    const signer = toRaw(getProvider.value);
    const signData = {
      amount: topValue.value,
      symbol_from: topCoinTitle.value,
      symbol_to: bottomCoinTitle.value,
    };
    const trasSign = JSON.stringify(signData);
    signer
      .signMessage(trasSign)
      .then((sign: any) => {
        options.setIsButtonLoading(new Date().getTime());
        const obj = {
          address: getFullAccount.value,
          signature: sign,
          data: trasSign,
        };
        setSwap(obj)
          .then((result: any) => {
            options.setUpdataTime(new Date().getTime());
            options.setIsButtonLoading(new Date().getTime());
            if (result.message) {
              Toast.success(result.message, {
                timeout: 2000,
              });
            } else {
              Toast.success(t('common.comfirm'), {
                timeout: 2000,
              });
            }
          })
          .catch((err) => {
            options.setIsButtonLoading(new Date().getTime());
            if (err.message) {
              Toast.error(err.message, {
                timeout: 2000,
              });
            } else {
              Toast.success(t('common.fail'), {
                timeout: 2000,
              });
            }
          });
      })
      .catch((err: any) => {
        console.log('err', err);
        options.setIsButtonLoading(new Date().getTime());
        Toast.clear();
        if (err.message) {
          Toast.error(err.message, {
            timeout: 2000,
          });
        } else {
          Toast.success(t('common.fail'), {
            timeout: 2000,
          });
        }
      });
  };
</script>
