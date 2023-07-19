<template>
  <transition :enter-active-class="'animate__animated animate__fadeIn'" :leave-active-class="'animate__animated animate__fadeOut'">
    <div class="base_components_bottom_mark" v-if="visible" @click="closeModal"> </div>
  </transition>
  <transition :enter-active-class="'animate__animated animate__slideInUp'" :leave-active-class="'animate__animated animate__slideOutDown'">
    <div class="base_components_bottom_layout" v-if="visible">
      <div class="base_components_bottom_box">
        <div class="bottom_title">
          <span>{{ title }}</span>
          <a href="javascript:;" @click="closeModal"><CloseSvg /></a>
        </div>
        <div class="bottom_content">
          <slot></slot>
        </div>
      </div>
    </div>
  </transition>
</template>
<script setup lang="ts" name="BaseBottom">
  import { hideScroll } from '/@/utils/common';
  import { useStoreMethod } from '/@/utils/publicMethod';
  interface Props {
    title?: string;
    visible: boolean;
  }
  const prors = withDefaults(defineProps<Props>(), {
    title: '',
    visible: false,
  });
  // emit事件
  const emit = defineEmits<{
    (e: 'update:visible', type: boolean): void;
  }>();
  const visibleEmit = (value: boolean) => {
    emit('update:visible', value);
  };

  // 监听visible
  const visible = ref(prors.visible);
  watch(
    () => prors.visible,
    (newValue) => {
      // currentFlag.value = false;
      visible.value = newValue;
      // hideScroll();
    }
  );

  // 关闭
  const closeModal = () => {
    visible.value = false;
    visibleEmit(visible.value);
  };
</script>
