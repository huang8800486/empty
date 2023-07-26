<template>
  <div class="header_nav">
    <div class="nav_item" v-for="(item, index) in navList" :key="index">
      <a href="javascript:;" class="nav_top" v-if="item.isScroll" @click="scrollTo">{{ item.text }}</a>
      <router-link :to="item.path" exact class="nav_top" :class="'nav' + index" v-else-if="item.isOpen">{{ item.text }}</router-link>
      <a class="nav_top" href="javascript:;" @click="waitFun" v-else>{{ item.text }}</a>
    </div>
  </div>
</template>

<script setup lang="ts" name="">
  import { navListManager } from './config';
  const { waitFun, navList, scrollTo } = navListManager();
</script>
