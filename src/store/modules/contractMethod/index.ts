import { defineStore } from 'pinia';
import { store } from '/@/store';
import { ContratStateType, userInfoType } from './types';
import { initState } from './reducer';
import { useGetters } from './hooks';
import { formatUnits, formatDigit, toString, getContractMethod } from '/@/utils/formatEth';
import { fixD, getString, base64ToJs } from '/@/utils/common';
import { useStoreMethod } from '/@/utils/publicMethod';

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
  },
});

// Need to be used outside the setup
export function useContractStoreWithOut() {
  return useContractStore(store);
}
