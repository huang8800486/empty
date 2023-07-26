<template>
  <div class="personal_content_wrapper">
    <div class="personal_warp">
      <div class="personal_content">
        <div class="person_name_box">
          <div class="name_box">
            <div class="name_img">
              <img src="@/assets/images/name_coin.png" alt="" />
            </div>
            <div class="name_text">
              <NodifyName v-if="getUserCode === 1" />
              <span v-if="getUserCode === 1">{{ getCurrentAccount }}</span>
              <BaseButton v-else @callback="register">{{ $t('common.register') }}</BaseButton>
              <!-- <p>UID:12345</p> -->
            </div>
          </div>
          <div class="address_box">
            <div class="invite_button">
              <span>{{ $t('common.Numberinvites') }}: {{ getUserInfo.total_invitation }}</span>
              <!-- <BaseButton>绑定邀请码</BaseButton> -->
            </div>
            <div class="invite_text" @click="copyText(invitedCode)">
              <p>{{ $t('common.myInvitedLink') }}:</p>
              <em>{{ invitedText }}</em> <img src="@/assets/images/copy.png" alt="" />
            </div>

            <div class="invite_text">
              {{ $t('common.Whethernode') }}:<em>{{ getUserInfo.is_node == 1 ? $t('common.Yes') : $t('common.No') }}</em>
            </div>
          </div>
        </div>
        <centerRecord />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="">
  import NodifyName from './nodifyName.vue';
  import { usePublicMethod, useStoreMethod } from '/@/utils/publicMethod';
  import copyText from '/@/utils/clipboard';
  import { getWebSite, getString } from '/@/utils/common';
  import centerRecord from './centerRecord/index.vue';
  import { signerUser } from '/@/utils/sign';
  const { getCurrentAccount, getScreen, getFullAccount, getUserInfo, getUserCode, getInviteAddress } = useStoreMethod();
  const bigScreen = computed(() => {
    return getScreen.value.index > 1;
  });
  const invitedText = computed(() => {
    if (bigScreen.value) {
      return getWebSite(getCurrentAccount.value);
    }
    return getString(getCurrentAccount.value, 4, 0);
  });
  const invitedCode = computed(() => {
    return getWebSite(getFullAccount.value);
  });
  const register = () => {
    if (getFullAccount.value) {
      signerUser(getFullAccount.value, getInviteAddress.value);
    }
  };
</script>
