<template>
  <div>
    <Enav />
    <router-view v-slot="{ Component }">
      <transition
        :enter-active-class="'animate__animated fast animate__fadeIn'"
        :leave-active-class="'animate__animated fast animate__fadeOut'"
        mode="out-in"
      >
        <component class="fast" :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts" name="">
  import Enav from './components/Enav.vue';

  import { coinListManage } from './config';
  coinListManage();
</script>
