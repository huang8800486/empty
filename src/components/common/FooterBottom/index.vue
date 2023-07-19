<template>
  <div class="footer_bottom_wrap" :class="route.name !== 'index' ? 'white' : 'normal'">
    <div class="footer_bottom">
      <div class="footer_box">
        <div class="footer_logo">
          <div class="f_logo">
            <img src="@/assets/images/logo.png" />
          </div>
          <div class="f_text"> WELCOME TO World token </div>
        </div>
        <div class="footer_relate">
          <div class="brelate">
            <a :href="item.path" target="_blank" v-for="(item, index) in relateList" :key="index"> <img :src="item.image" alt="" /></a>
          </div>
          <div class="f_text"> Copyright©2023 World token </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="">
  import { getImages } from '/@/utils/common';
  const route = useRoute();

  const relateList = computed(() => {
    return [
      {
        path: 'https://twitter.com/worldtokendao',
        image: getImages('twitter.svg'),
      },
      // {
      //   path: 'javascript:;',
      //   image: getImages('discord.svg'),
      // },
      {
        path: 'https://t.me/worldtoken_dao',
        image: getImages('telegram.svg'),
      },
      // {
      //   path: 'jjavascript:;',
      //   image: getImages('medium.svg'),
      // },
    ];
  });
</script>
