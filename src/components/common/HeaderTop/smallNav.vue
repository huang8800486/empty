<template>
  <transition
    :enter-active-class="'animate__animated animate__slideInLeft'"
    :leave-active-class="'animate__animated animate__slideOutLeft'"
  >
    <div class="small_nav_wrap" v-if="show">
      <div class="nav_pop_wrap">
        <div class="nav_pop_list htmlScroll">
          <div exact class="nav_item" v-for="(item, index) in navList" :key="index">
            <div class="top_list" @click="closeShow">
              <router-link class="nav" :to="item.path" v-if="item.isOpen">{{ item.text }}</router-link>
              <a class="nav" href="javascript:;" @click="waitFun" v-else>{{ item.text }}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
  <transition :enter-active-class="'animate__animated animate__fadeIn'" :leave-active-class="'animate__animated animate__fadeOut'">
    <div class="small_mark" v-if="show" @click="closeShow"></div>
  </transition>
</template>

<script setup lang="ts" name="">
  import { navListManager } from './config';
  const { waitFun, navList } = navListManager();
  interface Props {
    show: boolean;
  }
  withDefaults(defineProps<Props>(), {
    show: false,
  });
  const emit = defineEmits<{
    (e: 'callback', type: boolean): void;
  }>();
  const closeShow = () => {
    emit('callback', false);
  };
</script>
