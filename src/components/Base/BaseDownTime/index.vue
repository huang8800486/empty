<template>
  <div class="base_components_down_layout">
    <div class="down_time_box">
      <div class="down_box">
        <span>{{ donwTime.d }}d {{ donwTime.h }} : {{ donwTime.m }} : {{ donwTime.s }}</span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { useStoreMethod } from '/@/utils/publicMethod';
  interface Props {
    currentEndTime: number;
  }
  const props = withDefaults(defineProps<Props>(), {
    currentEndTime: 0,
  });
  const { getBlockTime } = useStoreMethod();
  const flag = ref<boolean>(true);
  let timer: null | NodeJS.Timeout = null;
  const originTime = ref<number>(0);
  const donwTime = ref<{ d: number; h: string; m: string; s: string }>({
    d: 0,
    h: '00',
    m: '00',
    s: '00',
  });
  const addZero = (i: string) => {
    let value = i;
    if (+i < 10) {
      value = '0' + i;
    }
    return value;
  };
  const initTime = () => {
    if (timer) {
      // 调用之前，先清理，防止一直生成对象
      clearTimeout(timer);
      timer = null;
    }
    const d = Math.floor(originTime.value / (24 * 60 * 60));
    let h: any = Math.floor((originTime.value / (60 * 60)) % 24);
    let m: any = Math.floor((originTime.value / 60) % 60);
    let s: any = Math.floor(originTime.value % 60);
    h = addZero(h);
    m = addZero(m);
    s = addZero(s);
    donwTime.value = { d, h, m, s };
    originTime.value -= 1;
    if (originTime.value <= 0) {
      donwTime.value = {
        d: 0,
        h: '00',
        m: '00',
        s: '00',
      };
      originTime.value = 0;
      flag.value = true;
      return;
    }
    if (!timer) {
      timer = setTimeout(initTime, 1000);
    }
  };
  watchEffect(() => {
    if (props.currentEndTime && getBlockTime.value && flag.value) {
      flag.value = false;
      originTime.value = props.currentEndTime - getBlockTime.value;
      initTime();
    }
  });
</script>
