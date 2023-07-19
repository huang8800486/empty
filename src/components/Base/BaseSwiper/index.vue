<template>
  <div class="swiper_content">
    <swiper
      :direction="'vertical'"
      :modules="[Navigation]"
      :navigation="{
        nextEl: '.swiper-button-next' + '.' + typs,
        prevEl: '.swiper-button-prev' + '.' + typs,
      }"
      :speed="1000"
      :loop="loop"
      :grabCursor="true"
      :autoWidth="autoWidth"
      :slidesPerView="currentSlidesPerView"
      :spaceBetween="currentSpaceBetween"
      :slidesPerGroup="currentSlidesPerGroup"
      @swiper="setControlledSwiper"
    >
      <swiper-slide v-for="(item, index) in swiperList" :key="index">
        <div class="slide_box">
          <div class="slide_text">
            <slot :item="item" :index="index"></slot>
          </div>
        </div>
      </swiper-slide>
    </swiper>
    <div class="swiper-button-wrap">
      <div class="swiper-button-prev" :class="typs"></div>
      <div class="swiper-button-next" :class="typs"></div>
    </div>
  </div>
</template>
<script setup lang="ts" name="">
  import { Navigation } from 'swiper';
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import { useStoreMethod } from '/@/utils/publicMethod';
  import 'swiper/css';
  import 'swiper/css/navigation';
  interface Props {
    swiperList: any;
    typs?: string;
    loop?: boolean;
    slidesPerView?: number | 'auto' | undefined;
    spaceBetween?: number;
    slidesPerGroup?: number;
    autoWidth?: boolean;
    isAuton?: boolean;
  }
  const props = withDefaults(defineProps<Props>(), {
    swiperList: () => [],
    typs: '',
    loop: false,
    slidesPerView: 4,
    spaceBetween: 12,
    slidesPerGroup: 1,
    autoWidth: false,
    isAuton: false,
  });
  const { getScreen } = useStoreMethod();
  const currentSlidesPerView = ref(props.slidesPerView);
  const currentSpaceBetween = ref(props.spaceBetween);
  const currentSlidesPerGroup = ref(props.slidesPerGroup);
  const controlledSwiper = ref(null);
  const setControlledSwiper = (swiper: any) => {
    controlledSwiper.value = swiper;
  };
  watch(
    () => getScreen.value.index,
    (newValue, oldValue) => {
      if (props.isAuton) {
        let idx = 0;
        const Array = [1.1, 2.1, 3, 3, 4, 4];
        const Array2 = [20, 20, 28, 28, 32, 32];
        const Array3 = [1, 2, 3, 3, 4, 4];
        currentSlidesPerView.value = Array[getScreen.value.index];
        currentSpaceBetween.value = Array2[getScreen.value.index];
        currentSlidesPerGroup.value = Array3[getScreen.value.index];
        controlledSwiper.value && (controlledSwiper.value as any).update();
      }
    },
    { deep: true, immediate: true }
  );
</script>
