<template>
  <div class="container">
    <HeaderTop />
    <appProvider>
      <router-view v-slot="{ Component }">
        <Transition
          :enter-active-class="'animate__animated fast animate__fadeIn'"
          :leave-active-class="'animate__animated fast animate__fadeOut'"
          mode="out-in"
        >
          <component class="inner_content fast" :is="Component" />
        </Transition>
      </router-view>
    </appProvider>
    <FooterBottom />
    <BaseLoading :isLoading="getLoading" />
  </div>
</template>
<script setup lang="ts">
  import { updateTheme, getScrollOffsets } from '/@/utils';
  import { useStoreMethod } from '/@/utils/publicMethod';
  import { addClass, hasClass, removeClass } from '/@/utils/domUtils';
  import tokenObj from '/@/config';
  import { useEthers } from './useEthers';
  import { getInviteCode } from '/@/utils/inviteCod';
  const { getLoading, getDarkMode, options, getScroll, getScreen } = useStoreMethod();
  updateTheme(getDarkMode.value);
  const scrollChange = () => {
    const data = getScrollOffsets(window);
    options.setScrollPostion({
      scrollLeft: data.x,
      scrollTop: data.y,
    });
  };

  watch(
    () => getScroll.value.scrollTop,
    (newValue, oldValue) => {
      // console.log('sum发生了变化', newValue, oldValue);
      if (!oldValue || newValue > oldValue) {
        // console.log('向下滚动动');
        options.setScrollRection({
          scrollUp: false,
          scrollDown: true,
        });
      } else {
        options.setScrollRection({
          scrollUp: true,
          scrollDown: false,
        });
      }
    },
    { deep: true, immediate: true }
  );
  watch(
    () => getScreen.value.index,
    (newValue, oldValue) => {
      if (newValue >= 2) {
        const htmlRoot = document.documentElement;
        removeClass(htmlRoot, 'hide');
      }
    },
    { deep: true, immediate: true }
  );

  onMounted(() => {
    getInviteCode();
    useEthers();
    window.addEventListener('scroll', scrollChange);
  });
</script>
