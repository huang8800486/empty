<template>
  <div class="base_components_title_layout" :class="type">
    <div class="base_components_title">
      <h2>{{ title }}</h2>
      <img src="@/assets/images/title_img.png" alt="" />
    </div>
    <div class="base_components_text" v-if="text" v-html="text"></div>
  </div>
</template>
<script setup lang="ts">
  import { getImages } from '/@/utils/common';
  interface Props {
    type?: string;
    text?: string;
    title: string;
    img?: string;
  }
  const props = withDefaults(defineProps<Props>(), {
    title: '',
    img: '',
    type: '',
    text: '',
  });
</script>
