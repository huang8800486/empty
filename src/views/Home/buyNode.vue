<template>
  <BaseButton :btnId="nanoid()" @callback="buyNode" :disabled="getUserInfo.is_node == 1">节点认购</BaseButton>
</template>

<script setup lang="ts" name="">
  import { nanoid } from 'nanoid';
  import { usePublicMethod, useStoreMethod } from '/@/utils/publicMethod';
  import { getbuyNode } from '/@/services';

  const { options, contract, getFullAccount, getIsButtonLoading, getUserInfo, getProvider } = useStoreMethod();
  const { Toast, t } = usePublicMethod();
  const buyNode = () => {
    const signer = toRaw(getProvider.value);
    signer
      .signMessage('buy_node')
      .then((sign: any) => {
        options.setIsButtonLoading(new Date().getTime());
        Toast.clear();
        const obj = {
          address: getFullAccount.value,
          signature: sign,
          data: 'buy_node',
        };
        getbuyNode(obj)
          .then((result: any) => {
            options.setUpdataTime(new Date().getTime());
            options.setIsButtonLoading(new Date().getTime());
            if (result.message) {
              Toast.success(result.message, {
                timeout: 2000,
              });
            } else {
              Toast.success(t('common.comfirm'), {
                timeout: 2000,
              });
            }
          })
          .catch((err) => {
            options.setIsButtonLoading(new Date().getTime());
            if (err.message) {
              Toast.error(err.message, {
                timeout: 2000,
              });
            }
          });
      })
      .catch((err: any) => {
        console.log('err', err);
        options.setIsButtonLoading(new Date().getTime());
        Toast.clear();
        if (err.message) {
          Toast.error(err.message, {
            timeout: 2000,
          });
        }
      });
  };
</script>
