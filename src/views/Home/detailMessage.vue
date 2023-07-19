<template>
  <div class="h_swiper_box">
    <div class="msg">
      <img src="@/assets/images/mes.png" alt="" />
    </div>
    <swiper
      :modules="[Navigation, Autoplay]"
      :speed="1000"
      :loop="true"
      @swiper="setControlledSwiper"
      :autoplay="{
        delay: 2500,
        disableOnInteraction: false,
      }"
      @mouseover="moreOver"
      @mouseout="moreOut"
    >
      <swiper-slide v-for="(item, index) in hotList" :key="index">
        <div class="slide_box">
          <span>{{ item.text }}</span>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup lang="ts" name="">
  import { Navigation, Autoplay } from 'swiper';
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import { useStoreMethod } from '/@/utils/publicMethod';
  import 'swiper/css';
  import 'swiper/css/navigation';
  const hotList = [
    {
      text: '1VPG Protocol Welcome to VPG !!2023-02-28 23:27:49',
    },
    {
      text: '2VPG Protocol Welcome to VPG !!2023-02-28 23:27:49',
    },
  ];
  const controlledSwiper = ref<any>(null);
  const setControlledSwiper = (swiper: any) => {
    controlledSwiper.value = swiper;
  };
  const moreOver = () => {
    console.log('controlledSwiper.value', controlledSwiper.value);
    controlledSwiper.value && controlledSwiper.value?.autoplay?.stop();
  };
  const moreOut = () => {
    controlledSwiper.value && controlledSwiper.value?.autoplay?.start();
  };
</script>
