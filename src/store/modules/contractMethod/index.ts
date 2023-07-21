import { defineStore } from 'pinia';
import { store } from '/@/store';
import { ContratStateType, userInfoType } from './types';
import { initState } from './reducer';
import { useGetters } from './hooks';
import { formatUnits, formatDigit, toString, getContractMethod } from '/@/utils/formatEth';
import { fixD, getString, base64ToJs } from '/@/utils/common';
import { useStoreMethod } from '/@/utils/publicMethod';
import { getProduct, getOrder } from '/@/services';

export const useContractStore = defineStore({
  id: 'app-contractMethod',
  state: (): ContratStateType => initState,
  getters: useGetters(),
  actions: {
    SETLEDGERINSTANCE(info: any) {
      this.ledgerInstance = info;
    },
    SETLEDGERTOKEN(info: string | number) {
      this.ledgerToken = info;
    },
    SETUSDTTOKEN(info: string | number) {
      this.USDTToken = info;
    },
    SETUSDTINSTANCE(info: any) {
      this.usdtInstance = info;
    },
    SETWTINSTANCE(info: any) {
      this.wtInstance = info;
    },
    SETWTTOKEN(info: string | number) {
      this.WTToken = info;
    },
    setUserInfo(info: userInfoType) {
      this.userInfo = info;
    },
    setUserCode(info: Partial<number>) {
      this.userCode = info;
    },
    async initContractMethod() {
      console.log('initContractMethod');
      // 全網已鑄造NFT
      // getContractMethod(this.GAMEINSTANCE, 'lastUserId', 'totalUser', { toS: true });
    },
    async initAccountMethod(fullAccount: Partial<string>) {
      console.log('few');
    },
    async initApproveMethod(fullAccount: Partial<string>) {
      this.initApproveUsdtMethod(fullAccount);
      this.initApproveWtMethod(fullAccount);
    },
    async initApproveUsdtMethod(fullAccount: Partial<string>) {
      const balance = await this.usdtInstance.balanceOf(fullAccount); // 查询用户的余额
      const allowance = await this.usdtInstance.allowance(fullAccount, this.ledgerToken); // 查询授权的余额
      if (Number(allowance.toString()) > 0 && Number(allowance.toString()) >= Number(balance.toString())) {
        console.log('isUsdtApprove-成功APPROVE-', true);
        this.isUsdtApprove = true;
      } else {
        console.log('isUsdtApprove-失败APPROVE-', false);
        this.isUsdtApprove = false;
      }
    },
    async initApproveWtMethod(fullAccount: Partial<string>) {
      const balance = await this.wtInstance.balanceOf(fullAccount); // 查询用户的余额
      const allowance = await this.wtInstance.allowance(fullAccount, this.ledgerToken); // 查询授权的余额
      if (Number(allowance.toString()) > 0 && Number(allowance.toString()) >= Number(balance.toString())) {
        console.log('isWtApprove-成功APPROVE-', true);
        this.isWtApprove = true;
      } else {
        console.log('isWtApprove-失败APPROVE-', false);
        this.isWtApprove = false;
      }
    },
    async intProductOrder(fullAccount: Partial<string>) {
      const productIds: any = [];
      getProduct()
        .then((result: any) => {
          if (result && result.length) {
            for (let i = 0; i < result.length; i++) {
              const item = result[i];
              productIds.push(item.id);
              const obj = {
                balance: '0',
                deposited: '0',
                redeemable: '0',
                income: '',
                children: [
                  {
                    name: 'subscribe',
                    value: '',
                    placeholder: '请输入质押数量',
                    text: '认购',
                    disabled: true,
                  },
                  {
                    name: 'redemption',
                    value: '',
                    placeholder: '0',
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
                orderList: [],
              };
              this.coinList[item.coin_symbol][item.id] = obj;
            }
          }
          if (productIds.length > 0) {
            getOrder({ address: fullAccount, product_ids: productIds })
              .then((res: any) => {
                console.log('getOrder', res, res.length);
                this.originList = [];
                this.originList.length = 0;
                if (res && res.length) {
                  for (let j = 0; j < res.length; j++) {
                    const items = res[j];
                    const origin = this.coinList[items.coin_symbol][items.product_id];
                    // if (items.)
                    origin.status = items.status;
                    origin.orderList = items;
                    origin.income = items.income;
                    origin.balance = items.prepayments_price;
                    origin.deposited = items.order_price;
                    origin.redeemable = items.order_price + +items.income;
                    origin.children[1].value = origin.redeemable;
                    if (origin.status === 0) {
                      origin.children[0].disabled = true;
                      origin.children[1].disabled = true;
                      origin.children[2].disabled = false;
                    } else if (origin.status === 1) {
                      origin.children[0].disabled = false;
                      origin.children[1].disabled = true;
                      origin.children[2].disabled = true;
                    } else if (origin.status === 2) {
                      origin.children[0].disabled = true;
                      origin.children[1].disabled = true;
                      origin.children[2].disabled = true;
                    } else if (origin.status === 3) {
                      origin.children[0].disabled = true;
                      origin.children[1].disabled = false;
                      origin.children[2].disabled = true;
                    }
                    this.originList.push(origin);
                  }
                }
              })
              .catch((err) => {
                console.log('getOrder', err);
                this.originList = [];
                this.originList.length = 0;
              });
          }
        })
        .catch((err) => {
          console.log('getProduct', err);
        });
    },
  },
});

// Need to be used outside the setup
export function useContractStoreWithOut() {
  return useContractStore(store);
}
