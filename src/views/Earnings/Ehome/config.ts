import { getProduct, getOrder } from '/@/services';
import { useStoreMethod } from '/@/utils/publicMethod';
export function coinListManage() {
  const coinList = ref({
    USDT: {},
    WT: {},
  });
  const productIds = ref<any>([]);
  const { getFullAccount, getUserCode } = useStoreMethod();
  watchEffect(() => {
    if (getUserCode.value > -1) {
      initProduct();
    }
  });
  const initProduct = () => {
    getProduct()
      .then((result: any) => {
        if (result && result.length) {
          for (let i = 0; i < result.length; i++) {
            const item = result[i];
            productIds.value.push(item.id);

            const obj = {
              balance: '0',
              deposited: '0',
              redeemable: '0',
              income: '',
              children: [
                {
                  name: 'subscribe',
                  value: '',
                  placeholder: '先启用',
                  text: '认购',
                  disabled: true,
                },
                {
                  name: 'redemption',
                  value: '',
                  placeholder: '请输入赎回数量',
                  text: '赎回',
                  disabled: true,
                },
                {
                  name: 'burning',
                  value: '',
                  placeholder: '请输入燃烧数量',
                  text: '燃烧WT',
                  disabled: false,
                },
              ],
              ...item,
              status: 0,
            };
            if (item.coin_symbol === 'USDT') {
              coinList.value[item.coin_symbol][item.id] = obj;
            }
            if (item.coin_symbol === 'WT') {
              coinList.value[item.coin_symbol][item.id] = obj;
            }
          }
        }
        console.log('productIds.value', productIds.value);
        if (productIds.value.length > 0) {
          getOrder({ address: getFullAccount.value, product_ids: productIds.value })
            .then((res: any) => {
              console.log('getOrder', res, res.length);
              if (res && res.length) {
                for (let j = 0; j < res.length; j++) {
                  const items = res[j];
                  // if (items.)
                  console.log(items, 'items.status');
                  coinList.value[items.coin_symbol][items.product_id].status = items.status;
                  coinList.value[items.coin_symbol][items.product_id].income = items.income;
                  if (coinList.value[items.coin_symbol][items.product_id].status === 0) {
                    coinList.value[items.coin_symbol][items.product_id].children[0].disabled = true;
                    coinList.value[items.coin_symbol][items.product_id].children[1].disabled = true;
                    coinList.value[items.coin_symbol][items.product_id].children[2].disabled = false;
                  } else if (coinList.value[items.coin_symbol][items.product_id].status === 1) {
                    coinList.value[items.coin_symbol][items.product_id].children[0].disabled = false;
                    coinList.value[items.coin_symbol][items.product_id].children[1].disabled = true;
                    coinList.value[items.coin_symbol][items.product_id].children[2].disabled = true;
                  } else if (coinList.value[items.coin_symbol][items.product_id].status === 2) {
                    coinList.value[items.coin_symbol][items.product_id].children[0].disabled = false;
                    coinList.value[items.coin_symbol][items.product_id].children[1].disabled = false;
                    coinList.value[items.coin_symbol][items.product_id].children[2].disabled = false;
                  } else if (coinList.value[items.coin_symbol][items.product_id].status === 3) {
                    coinList.value[items.coin_symbol][items.product_id].children[0].disabled = true;
                    coinList.value[items.coin_symbol][items.product_id].children[1].disabled = false;
                    coinList.value[items.coin_symbol][items.product_id].children[2].disabled = true;
                  }
                }
              }
            })
            .catch((err) => {
              console.log('getOrder', err);
            });
        }
      })
      .catch((err) => {
        console.log('getProduct', err);
      });
  };

  return {
    coinList,
  };
}
