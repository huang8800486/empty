import { useAddressStoreWithOut } from './index';
import { AddressState } from './types';
import token from '/@/config';
/**
 * getters计算处理
 */
export function useGetters() {
  return {
    getInviteAddress(address: AddressState): string | null {
      return address.inviteAddress;
    },
    // chianId是否一致
    getIsCurrentChianId(address: AddressState): boolean {
      return address.chianId === token.chainId;
    },
    // 节点是否链接
    getIsNodeConnection(this: AddressState): boolean {
      return this.blockTime > 0;
    },
  };
}
/**
 * 使用store数据
 */
export function useAddress() {
  const address = useAddressStoreWithOut();
  const getFullAccount = computed(() => address.fullAccount);
  const getCurrentAccount = computed(() => address.currentAccount);
  const getChianId = computed(() => address.chianId);
  const getInviteAddress = computed(() => address.inviteAddress);
  const getBlockTime = computed(() => address.blockTime); // 可直接获取
  const getIsCurrentChianId = computed(() => address.getIsCurrentChianId); // 也可获取getters计算后的对象
  const getIsNodeConnection = computed(() => address.getIsNodeConnection);
  const getProvider = computed(() => address.provider);
  return {
    address,
    getFullAccount,
    getCurrentAccount,
    getInviteAddress,
    getBlockTime,
    getChianId,
    getIsCurrentChianId,
    getIsNodeConnection,
    getProvider,
  };
}
