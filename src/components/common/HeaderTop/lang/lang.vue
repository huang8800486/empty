<template>
  <div class="lang_content">
    <div class="lang_text" @mouseenter="mouseEnter" @mouseleave="mouseLeave">
      <!-- <img src="@/assets/images/lang_black.png" alt="" /> -->
      <div class="lang_svg"><LangSvg /></div>
      <!-- <span>{{ currentLang }}</span> -->
    </div>
    <div class="lang_list" @mouseenter="mouseEnter" @mouseleave="mouseLeave" v-if="moreNav">
      <a href="javascript:;" v-for="(item, index) in langsList" :key="index" @click="switchLangFun(item)">
        {{ item.text }}
      </a>
    </div>
  </div>
</template>

<script setup lang="ts" name="">
  import { langConfig } from './config';
  const { mouseEnter, mouseLeave, langsList, moreNav, switchLangFun, currentLang } = langConfig();
</script>
