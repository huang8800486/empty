import { ethers } from 'ethers';
import { setVerifySignature, getWebGeUserNonce } from '/@/services';
import { useToast } from 'vue-toastification';
import { useI18n } from '/@/hooks/web/useI18n';
import { useStoreMethod } from '/@/utils/publicMethod';

export const aesCryptoJs = (address: string, invite: string | null) => {
  const { t } = useI18n();
  const Toast = useToast();
  const { contract, getProvider } = useStoreMethod();
  // const msg = `0x${Buffer.from(res, 'utf8').toString('hex')}`;
  // const provider = new ethers.providers.Web3Provider(toRaw(getProvider.value));
  // signer对象
  const signer = toRaw(getProvider.value);
  getWebGeUserNonce({ address })
    .then((res: any) => {
      contract.setUserInfo(res.message);
      contract.setUserCode(res.code);
    })
    .catch((err) => {
      // console.error('getWebGeUserNonce', err);
      if (err.code === -1) {
        Toast.info('请绑定推荐关系');
        signer
          .signMessage(invite + '')
          .then((sign: any) => {
            Toast.clear();
            const obj = {
              address: address,
              signature: sign,
              data: invite,
            };
            setVerifySignature(obj)
              .then((result: any) => {
                aesCryptoJs(address, invite);
                if (result.message) {
                  Toast.success(result.message, {
                    timeout: 2000,
                  });
                }
              })
              .catch((err) => {
                if (err.message) {
                  Toast.error(err.message, {
                    timeout: 2000,
                  });
                }
              });
          })
          .catch((err: any) => {
            if (err.message) {
              Toast.error(err.message, {
                timeout: 2000,
              });
            }
            Toast.clear();
          });
      }
    });
};
