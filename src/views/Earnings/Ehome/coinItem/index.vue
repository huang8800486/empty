<template>
  <div class="coin_item_wrap">
    <div class="coin_tit_wrap" @click="openContent">
      <div class="coin_tit">
        <div class="coin_first">
          <div class="head_img">{{ coinItemList.id }}</div>
        </div>
        <div class="coin_second">
          <div class="coin_tex com_tit">
            <p>{{ $t('common.Token') }}</p>
            <span>{{ coinItemList.coin_symbol }}</span>
          </div>
        </div>
        <div class="coin_three">
          <div class="coin_rate com_tit">
            <p>{{ $t('common.Dailyrate') }}</p>
            <span>{{ coinItemList.return_rate }}%</span>
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
            <h3>{{ coinItemList.product_name }}</h3>
            <p>{{ $t('common.Burnt') }}: {{ coinItemList.balance }}</p>
            <p>{{ $t('common.Deposited') }}: {{ coinItemList.deposited }}</p>
            <p v-if="coinItemList.status === 3">{{ $t('common.redeemable') }}: {{ coinItemList.redeemable }}</p>
          </div>
        </div>
        <div class="coin_second">
          <div class="coin_input_content">
            <div class="input_item" v-for="(item, index) in children" :key="index">
              <BaseInput v-model="item.value" :disabled="item.name === 'redemption'" :placeholder="item.placeholder" />
              <a href="javascript:;" class="max" @click="maxFun(item)" :class="{ hide: item.name !== 'subscribe' }">{{
                $t('common.Max')
              }}</a>
              <BaseButton
                :btnId="nanoid()"
                :disabled="item.disabled || (!item.value && item.name != 'redemption')"
                @callback="buyFun(item)"
                >{{ item.text }}</BaseButton
              >
            </div>
          </div>
        </div>
        <div class="coin_three">
          <div class="item_text" v-if="coinItemList.status === 2">
            <p>{{ $t('common.income') }}:</p>
            <span>{{ coinItemList.coin_symbol }} : {{ coinItemList.income }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="">
  import { nanoid } from 'nanoid';
  import { usePublicMethod, useStoreMethod } from '/@/utils/publicMethod';
  import { fixN } from '/@/utils/BigNumber';
  import { getDepositUSDT, getDepositWT, setBurnWT, setRedemption } from '/@/services';
  interface Props {
    coinItemList: any;
  }
  const { options, getUserInfo, getProvider, getFullAccount } = useStoreMethod();
  const { Toast, t } = usePublicMethod();
  const props = withDefaults(defineProps<Props>(), {
    coinItemList: () => {},
  });
  const isShow = ref(true);
  const openContent = () => {
    isShow.value = !isShow.value;
  };
  const children = ref<any>([]);
  const typeList = computed(() => {
    return {
      USDT: {
        methods: getDepositUSDT,
      },
      WT: {
        methods: getDepositWT,
      },
    };
  });
  watchEffect(() => {
    children.value = props.coinItemList.children;
  });

  watch(
    () => children.value[0].value,
    (newValue, oldValue) => {
      children.value[2].value = fixN.div(newValue, 100);
    },
    { deep: true }
  );
  watch(
    () => children.value[2].value,
    (newValue, oldValue) => {
      children.value[0].value = fixN.mul(newValue, 100);
    },
    { deep: true }
  );
  const maxFun = (item: any) => {
    console.log('item', item);
    if (item.name === 'subscribe') {
      if (+getUserInfo.value.usdt_balance > props.coinItemList.max_price) {
        item.value = props.coinItemList.max_price;
      } else {
        item.value = getUserInfo.value.usdt_balance;
      }
    }
  };
  // 认购
  const buyFun = (item: any) => {
    const signer = toRaw(getProvider.value);
    const signOriginData = {
      address: getFullAccount.value,
      product_id: props.coinItemList.id,
    };
    let signData: any = {};
    if (item.name === 'redemption') {
      signData = signOriginData;
    } else if (item.name === 'subscribe' || item.name === 'burning') {
      signData = Object.assign(signOriginData, { amount: children.value[0].value });
      if (!children.value[0].value) {
        return '';
      }
    }
    const trasSign = JSON.stringify(signData);

    signer
      .signMessage(trasSign)
      .then((sign: any) => {
        const obj = {
          address: getFullAccount.value,
          signature: sign,
          data: trasSign,
        };

        let methosObj = null;
        if (item.name === 'subscribe') {
          methosObj = typeList.value[props.coinItemList.coin_symbol].methods;
        } else if (item.name === 'burning') {
          methosObj = setBurnWT;
        } else if (item.name === 'redemption') {
          methosObj = setRedemption;
        }
        methosObj(obj)
          .then((result: any) => {
            options.setUpdataTime(new Date().getTime());
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
          .catch((err: any) => {
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
