<template>
  <div>
    <template v-if="getFullAccount">
      <slot></slot>
    </template>
    <template v-else>
      <BaseButton @callback="handleWalletConnect"> {{ title || $t('wallet.connectWallet') }} </BaseButton>
    </template>
  </div>
</template>

<script setup lang="ts" name="">
  import { useStoreMethod, usePublicMethod } from '/@/utils/publicMethod';
  interface Props {
    title?: string;
  }
  withDefaults(defineProps<Props>(), {
    title: '',
  });
  const { bus } = usePublicMethod();
  const { getFullAccount } = useStoreMethod();

  const handleWalletConnect = async () => {
    bus.emit('handleWalletConnect');
  };
</script>
