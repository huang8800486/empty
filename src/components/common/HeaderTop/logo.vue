<template>
  <router-link to="/" class="header_logo">
    <img src="@/assets/images/white_logo.png" v-if="isMarket" />
    <img src="@/assets/images/logo.png" v-else />
  </router-link>
</template>

<script setup lang="ts" name="">
  interface Props {
    isMarket: boolean;
  }
  withDefaults(defineProps<Props>(), {
    isMarket: false,
  });
</script>
