<template>
  <div class="wallet_button">
    <BaseButton class="connect_bt" v-if="getCurrentAccount" @callback="openWallet">
      {{ getCurrentAccount }}
    </BaseButton>
    <BaseButton class="connect_bt" v-else @callback="handleConnectWallet">
      {{ $t('wallet.connectWallet') }}
    </BaseButton>
    <!-- <BaseButton class="connect_bt" @callback="resetApp"> resetApp </BaseButton> -->
    <Modal v-model:visible="walletFlag" type="custom" :closeIcon="true" :title="$t('common.yourWallet')">
      <div class="wallet_box_wrap">
        <div class="change_box">
          <span>{{ $t('common.walletConnected') }}</span>
          <div class="change_wallet">
            <BaseButton @callback="changeAccount">{{ $t('common.walletChange') }}</BaseButton>
          </div>
        </div>
        <div class="wallet_address">{{ getFullAccount }}</div>
        <div class="copy_check_wrap">
          <a href="javascript:;" class="copy_address" @click="copyText(getFullAccount)">
            {{ $t('common.copyAddress') }} <div class="svg_s"><CopySvg /></div>
          </a>
          <a :href="`${tokenObj.blockExplorerUrls}/address/${getFullAccount}`" target="_blank" class="view_bsc_scan">
            {{ $t('common.viewBscScan') }} <div class="svg_s"><ViewScan /></div>
          </a>
        </div>
        <div class="logout_wallet">
          <BaseButton type="none" @callback="resetAppFun">{{ $t('common.walletLogout') }}</BaseButton>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script lang="ts" setup name="">
  import { usePublicMethod, useStoreMethod } from '/@/utils/publicMethod';
  import { useWallet } from '/@/components/common/ConnectWallet/connectWallet';
  import copyText from '/@/utils/clipboard';
  import { ethers } from 'ethers';
  import tokenObj from '/@/config';
  const { address, getCurrentAccount, getFullAccount } = useStoreMethod();
  const { onConnect, resetApp, web3Modal } = useWallet();
  const { bus } = usePublicMethod();
  const walletFlag = ref(false);
  // onConnect();
  const handleConnectWallet = async () => {
    bus.emit('updateWallet', false);
    await onConnect();
  };
  const handleWalletConnect = async () => {
    await onConnect();
  };

  const changeAccount = () => {
    resetAppFun();
    handleWalletConnect();
  };
  const resetAppFun = () => {
    walletFlag.value = false;
    resetApp();
  };
  const openWallet = () => {
    walletFlag.value = true;
  };
  watchEffect(() => {
    if (web3Modal.cachedProvider) {
      handleWalletConnect();
      return;
    } else {
      // provider对象
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        address.setProvider(provider);
      } else {
        const provider = new ethers.providers.JsonRpcProvider(tokenObj.rpcUrl as any);
        address.setProvider(provider);
      }
    }
  });
  onMounted(() => {
    bus.on('connectWallet', handleWalletConnect);
  });
</script>
