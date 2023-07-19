import getAccounts from './getAccounts';
import { useToast } from 'vue-toastification';
import { useI18n } from '/@/hooks/web/useI18n';
/**
 * 获取用户地址
 * @param type
 */
interface walletErr {
  code: number;
  message: string;
}
export default function connectWallet() {
  const { t } = useI18n();
  const toast = useToast();
  if (!window.ethereum) {
    // toast.error('Please reconnect', {
    //   timeout: 2000,
    // });
    return;
  }
  window.ethereum
    .request({
      method: 'eth_requestAccounts',
      params: [{ eth_accounts: {} }],
    })
    .then(() => {
      getAccounts();
    })
    .catch((err: walletErr) => {
      if (err.code === 4001) {
        // EIP-1193 userRejectedRequest error
        // If this happens, the user rejected the connection request.
        toast.error(t('wallet.userDenied'), {
          timeout: 2000,
        });
      } else {
        toast.error(err.message, {
          timeout: 2000,
        });
      }
    });
  return window.ethereum;
}
