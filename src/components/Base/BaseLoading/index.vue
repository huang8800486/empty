<template>
  <transition :enter-active-class="'animate__animated animate__fadeIn'" :leave-active-class="'animate__animated nimate__fadeOut'">
    <div class="comLoading" v-if="isLoading">
      <div class="loading">
        <div class="rect rect1"></div>
        <div class="rect rect2"></div>
        <div class="rect rect3"></div>
        <div class="rect rect4"></div>
        <div class="rect rect5"></div>
      </div>
    </div>
  </transition>
</template>
<script setup lang="ts" name="loading">
  interface Props {
    isLoading: boolean;
  }
  withDefaults(defineProps<Props>(), {
    isLoading: false,
  });
</script>
