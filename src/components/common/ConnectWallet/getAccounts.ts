import token from '/@/config';
import { getString } from '/@/utils/common';
import { usePublicMethod, useStoreMethod } from '/@/utils/publicMethod';
/**
 * 获取用户地址
 * @param type
 */
type AccountData = [string];
export default function getAccounts() {
  const { Toast, t, bus } = usePublicMethod();
  const { options, address } = useStoreMethod();
  window.ethereum
    .request({ method: 'eth_accounts' })
    .then((accounts: AccountData) => {
      const fullAccount = accounts[0];
      address.setFullAccount(fullAccount);
      address.setCurrentAccount(getString(fullAccount, 4, 3));
      // 获取chainId
      // window.ethereum.request({ method: 'eth_chainId' }).then((result: any) => {
      //   if (result !== token.chainId) {
      //     Toast.error(t('wallet.notWallet'));
      //   }
      //   address.setChianId(result);
      // });
    })
    .catch((err: string) => {
      if (err) {
        Toast.error(err);
        address.setChianId('');
        address.setFullAccount('');
        address.setCurrentAccount('');
      }
    });

  watchEffect(() => {
    //监听chainId
    window.ethereum.on('chainChanged', (chainId: string) => {
      address.setChianId(chainId);
      options.setUpdataTime(new Date().getTime());
      // bus.emit('notWallet');
    });
    // 监听切换帐户
    window.ethereum.on('accountsChanged', () => {
      getAccounts();
      // window.location.reload();
    });
  });
}
