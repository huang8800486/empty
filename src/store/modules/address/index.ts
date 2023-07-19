import { defineStore } from 'pinia';
import { store } from '/@/store';
import { AddressState } from './types';
import { initState } from './reducer';
import { useGetters } from './hooks';

export const useAddressStore = defineStore({
  id: 'app-address',
  state: (): AddressState => initState,
  getters: useGetters(),
  actions: {
    setFullAccount(info: Partial<string>) {
      this.fullAccount = info;
    },
    setCurrentAccount(info: Partial<string>) {
      this.currentAccount = info;
    },
    setInviteAddress(info: Partial<string | null>) {
      this.inviteAddress = info;
    },
    setBlockTime(info: Partial<number>) {
      this.blockTime = info;
    },
    setChianId(info: Partial<string | number>) {
      this.chianId = info;
    },
    setProvider(info: any) {
      this.provider = info;
    },
  },
});

// Need to be used outside the setup
export function useAddressStoreWithOut() {
  return useAddressStore(store);
}
