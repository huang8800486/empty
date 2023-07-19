import { AddressState } from './types';

export const initState: AddressState = {
  provider: '', // signer
  fullAccount: '', // 完整地址
  currentAccount: '', // 省略地址
  inviteAddress: '', // 邀请链接
  blockTime: 0, // 区块时间, 秒
  chianId: '', // 链ID
};
