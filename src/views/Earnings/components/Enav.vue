<template>
  <div class="wrap">
    <div class="earning_title_nav">
      <h2 class="title_nav"> {{ $t('common.Investmentgain') }} </h2>
      <div class="earning_nav_wrap">
        <a href="javascript:;" class="earning_nav" v-if="isReturn" @click="gotoRoute('index')">
          <img src="@/assets/images/return.png" alt="" /> {{ $t('common.return') }}
        </a>
        <a
          href="javascript:;"
          class="earning_nav"
          :class="{ on: item.name === route.name }"
          v-for="(item, index) in navList"
          :key="index"
          @click="gotoRoute(item.name)"
        >
          {{ item.text }}
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="">
  const route = useRoute();
  const router = useRouter();
  import { usePublicMethod, useStoreMethod } from '/@/utils/publicMethod';
  const { Toast, t } = usePublicMethod();
  const navList = computed(() => {
    return [
      {
        text: t('common.Revenuerecord'),
        name: 'revenueRecord',
      },
      {
        text: t('common.Currentpledge'),
        name: 'currentPledge',
      },
    ];
  });
  const isReturn = computed(() => {
    if (route.name === 'earningsHome') {
      return false;
    }
    return true;
  });
  const gotoRoute = (name: string) => {
    router.push(`/earnings/${name}`);
  };
</script>
