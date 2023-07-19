<template>
  <p class="time_out" style="display: inline-block" v-if="count > 0">{{ count }} </p>
</template>

<script setup lang="ts" name="BaseButton">
  interface Props {
    time: number;
  }
  const props = withDefaults(defineProps<Props>(), {
    time: 0,
  });
  let timer: null | NodeJS.Timeout = null;
  const emit = defineEmits<{
    (e: string): void;
  }>();
  const callback = () => {
    emit('callback');
  };
  const count = ref<number>(props.time);
  watch(
    () => props.time,
    (newValue, oldValue) => {
      count.value = newValue;
      if (newValue > 0) {
        timer = setInterval(() => {
          if (count.value > 0) {
            count.value = count.value - 1;
          }
          if (timer && count.value <= 0) {
            clearInterval(timer);
            callback();
          }
        }, 1000);
      }
    }
  );
</script>
