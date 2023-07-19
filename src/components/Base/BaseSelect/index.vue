<template>
  <div class="base_components_select" ref="target">
    <h2 @click="open" :class="{ select: selectFlag }">{{ currentSelect }}</h2>
    <transition :enter-active-class="'animate__animated animate__fadeIn'" :leave-active-class="'animate__animated animate__fadeOut'">
      <div class="select_list" :class="{ right: isRight, select: selectFlag }" v-if="selectFlag">
        <a
          class="select"
          href="javascript:;"
          v-for="(item, index) in selectList"
          :key="index"
          :class="{ on: index === selectIndex }"
          @click="selectItme(index)"
        >
          {{ item }} {{ selectUnit }}
        </a>
      </div>
    </transition>
  </div>
</template>
<script setup lang="ts">
  import { onClickOutside } from '@vueuse/core';
  interface Props {
    selectList?: Array<number | string>;
    selectUnit?: string;
    selectIndex: number;
    isRight?: boolean;
  }
  const emit = defineEmits<{
    (e: string, value: number): void;
  }>();
  const props = withDefaults(defineProps<Props>(), {
    select: () => [],
    selectUnit: '',
    selectIndex: 0,
    isRight: false,
  });
  const currentSelect = computed(() => {
    if (props.selectList && props.selectList.length > 0) {
      return `${props.selectList[props.selectIndex]} ${props.selectUnit}`;
    }
    return -1;
  });

  // 显示隐藏数据
  const selectFlag = ref(false);
  // 提供打开和关闭函数
  const open = () => {
    selectFlag.value = !selectFlag.value;
  };
  const close = () => {
    selectFlag.value = false;
  };
  // 实现点击组件外部元素关闭操作
  const target = ref(null);
  onClickOutside(target, () => {
    close();
  });
  const selectItme = (index: number) => {
    close();
    emit('callback', index);
  };
</script>
