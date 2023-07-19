<template>
  <router-view v-slot="{ Component }">
    <component :is="Component" />
  </router-view>
</template>

<script lang="ts" setup>
  import { useStoreMethod } from '/@/utils/publicMethod';
  // import VConsole from 'vconsole';
  const { options } = useStoreMethod();
  const getScrrenWidth = () => {
    options.setScreen({
      clientWidth: document.documentElement.clientWidth || window.innerWidth,
      clientHeight: document.documentElement.clientHeight || window.innerHeight,
    });
  };
  onMounted(() => {
    // const vConsole = new VConsole();
    getScrrenWidth();
    window.onresize = () => {
      return (() => {
        options.setScreen({
          clientWidth: document.documentElement.clientWidth || window.innerWidth,
          clientHeight: document.documentElement.clientHeight || window.innerHeight,
        });
      })();
    };
  });
</script>
