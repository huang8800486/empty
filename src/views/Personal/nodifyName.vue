<template>
  <h2>
    <!-- <BaseInput v-model="getUserInfo.nick_name" /> -->
    <em>{{ getUserInfo.nick_name }}</em>
    <a href="javascript:;" @click="openModify">{{ $t('common.Revise') }}</a>
  </h2>
  <Modal v-model:visible="nickFlag" type="custom" :closeIcon="true" :title="$t('common.Changeusername')">
    <div class="nick_box_wrap">
      <BaseInput v-model="nickName" :placeholder="$t('common.Pleaseenternickname')" :isNoChian="true" />
      <!-- <span class="note">*不能输入中文</span> -->
      <BaseButton @callback="modifyName">{{ $t('common.Sure') }}</BaseButton>
    </div>
  </Modal>
</template>

<script setup lang="ts" name="">
  import { usePublicMethod, useStoreMethod } from '/@/utils/publicMethod';
  import { setUpdateNick } from '/@/services';
  const { options, getUserInfo, getProvider, getFullAccount } = useStoreMethod();
  const { Toast } = usePublicMethod();
  const nickFlag = ref(false);
  const nickName = ref();
  const openModify = () => {
    nickFlag.value = true;
  };

  const modifyName = () => {
    const signer = toRaw(getProvider.value);
    signer
      .signMessage(nickName.value)
      .then((sign: any) => {
        Toast.clear();
        const obj = {
          address: getFullAccount.value,
          signature: sign,
          data: nickName.value,
        };
        setUpdateNick(obj)
          .then((result: any) => {
            options.setUpdataTime(new Date().getTime());
            nickFlag.value = false;
          })
          .catch((err: any) => {
            nickFlag.value = false;
            if (err.message) {
              Toast.error(err.message, {
                timeout: 2000,
              });
            }
          });
      })
      .catch((err: any) => {
        nickFlag.value = false;
        if (err.message) {
          Toast.error(err.message, {
            timeout: 2000,
          });
        }
        Toast.clear();
      });
  };
</script>
