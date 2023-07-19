<template>
  <transition :enter-active-class="'animate__animated animate__fadeIn'" :leave-active-class="'animate__animated animate__fadeOut'">
    <div class="base_components_strat_layout" v-if="flag">
      <img src="@/assets/images/start.gif" alt="" />
    </div>
  </transition>
</template>

<script lang="ts" setup>
  import NProgress from 'nprogress';
  import 'nprogress/nprogress.css';
  NProgress.configure({
    easing: 'ease', // 动画方式
    speed: 1000, // 递增进度条的速度
    showSpinner: false, // 是否显示加载ico
    trickleSpeed: 70, // 自动递增间隔
    minimum: 0.3, // 初始化时的最小百分比
  });
  NProgress.start();
  const flag = ref(true);
  let timer: null | NodeJS.Timeout = null;

  timer = setTimeout(() => {
    NProgress.done();
    flag.value = false;
  }, 7000);
</script>
