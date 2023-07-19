import Web3 from 'web3';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import { providerOptions } from './providerOptions';
import { ThemeEnum } from '/@/store/modules/options/types';
import { getString } from '/@/utils/common';
import { useStoreMethod } from '/@/utils/publicMethod';
import { getBlockNumber, switchNetwork } from '/@/utils/formatEth';
import tokenObj from '/@/config';
// import { getChainData } from '@/web3/tools';
type AccountType = [string];
type chainIdType = number;
export async function updateWeb3Theme(web3Modal: any, theme: ThemeEnum) {
  web3Modal.updateTheme(theme);
}
export function useWallet() {
  const { address, getDarkMode } = useStoreMethod();
  const isSwitchFlag = ref(false);
  //https://github.com/Web3Modal/web3modal#web3modal
  const web3Modal = new Web3Modal({
    theme: getDarkMode.value,
    cacheProvider: true,
    providerOptions,
  });
  // methods wallte.js
  const resetApp = async () => {
    web3Modal.clearCachedProvider();
    address.setFullAccount('');
    address.setCurrentAccount('');
    address.setChianId(-1);
    address.setProvider(null);
  };
  const subscribeProvider = async (provider: any) => {
    if (provider?.on) {
      provider.on('disconnect', () => {
        if (isSwitchFlag.value) return;
        resetApp();
      });
      provider.on('accountsChanged', async (accounts: AccountType) => {
        address.setFullAccount(accounts[0]);
        address.setCurrentAccount(getString(accounts[0], 4, 3));
      });
      provider.on('chainChanged', async (chainId: chainIdType) => {
        address.setChianId(chainId);
        onConnect();
      });
    }
  };
  const onConnect = async () => {
    try {
      const instance = await web3Modal.connect();
      await subscribeProvider(instance);
      const provider = new ethers.providers.Web3Provider(instance);
      getBlockNumber(provider);
      const signer = provider.getSigner();
      const accounts = await provider.listAccounts();
      const account = accounts[0];
      const getNetwork = await provider.getNetwork(); // 坑逼 注意版本 chainId
      address.setProvider(signer);
      address.setFullAccount(account);
      address.setCurrentAccount(getString(account, 4, 4));
      address.setChianId(getNetwork.chainId);
      if (getNetwork.chainId !== tokenObj.chainNetWork) {
        isSwitchFlag.value = true;
        switchNetwork();
      } else {
        isSwitchFlag.value = false;
      }
    } catch (err) {
      web3Modal.clearCachedProvider();
      console.log(err);
    }
  };

  return {
    resetApp,
    web3Modal,
    onConnect,
  };
}
