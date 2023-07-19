<template>
  <div class="wrap">
    <div class="earning_title_nav">
      <h2 class="title_nav"> 投资获得收益 </h2>
      <div class="earning_nav_wrap">
        <a href="javascript:;" class="earning_nav" v-if="isReturn" @click="gotoRoute('index')">
          <img src="@/assets/images/return.png" alt="" /> 返回
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
  const navList = computed(() => {
    return [
      {
        text: '收益记录',
        name: 'revenueRecord',
      },
      {
        text: '当前质押',
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
