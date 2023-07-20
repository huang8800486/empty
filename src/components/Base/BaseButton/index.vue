<template>
  <div
    class="base_components_button_layout"
    ref="wrapEl"
    @click="callback"
    :style="{ borderRadius: borderRadius + 'px' }"
    :class="[{ disabled: disabled, isLoading: isClickLoading }, type]"
    v-wave
  >
    <a href="javascript:;">
      <slot></slot>
      <template v-if="isClickLoading">
        <div class="pay_loading">
          <p>...</p>
          <span><LoadingSvg /></span>
        </div>
      </template>
    </a>
  </div>
</template>
<script setup lang="ts" name="BaseButton">
  import { useStoreMethod } from '/@/utils/publicMethod';
  interface Props {
    disabled?: boolean;
    type?: string;
    borderRadius?: number | string;
    btnId?: string;
  }
  const props = withDefaults(defineProps<Props>(), {
    disabled: false,
    type: '',
    btnId: '',
  });
  const { options, getIsButtonLoading } = useStoreMethod();
  const newbtnId = ref('');
  watch(
    () => getIsButtonLoading.value,
    (newValue) => {
      // currentFlag.value = false;
      if (newValue && props.btnId) {
        newbtnId.value = '';
      }
    },
    { deep: true }
  );
  // emit事件
  const emit = defineEmits<{
    (e: string, value?: string | number): void;
  }>();
  const isClickLoading = computed(() => {
    return props.btnId && newbtnId.value === props.btnId;
  });
  const callback = () => {
    if (props.disabled) return;
    if (props.btnId) {
      if (newbtnId.value === props.btnId) return;
      newbtnId.value = props.btnId;
    }
    emit('callback');
  };
</script>
