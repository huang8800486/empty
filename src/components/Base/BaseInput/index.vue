<template>
  <div class="base_components_input_layout" :class="{ disabled: disabled }">
    <div class="input_wrap" :class="{ hasImg: icon, maxBox: maxIcon, focus: focusFlag }">
      <img :src="icon" v-if="icon" alt="" />
      <input
        :type="text"
        ref="input"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        @input="updateValue"
        @focus="focusValue"
        @blur="focusValue"
      />
      <a href="javascript:;" class="max" v-if="maxIcon" @click="callback"> 最大 </a>
    </div>
  </div>
</template>
<script setup lang="ts">
  // 定义类型
  export interface Props {
    text?: string;
    icon?: string;
    maxIcon?: boolean;
    placeholder?: string;
    disabled?: boolean;
    isNumber?: boolean;
    modelValue: string | number;
    maxValue?: string;
    isNoChian?: boolean;
  }
  // 传参
  const props = withDefaults(defineProps<Props>(), {
    text: 'text',
    maxIcon: false,
    disabled: false,
    isNoChian: false,
    icon: '',
    placeholder: '',
    modelValue: '',
    maxValue: '-1',
  });
  // emit事件
  const emit = defineEmits<{
    (e: string, value?: string | number): void;
  }>();
  const inputEmit = (value: string | number) => {
    emit('update:modelValue', value);
  };

  // 输入的值
  const inputRef = ref<string | number>(props.modelValue || '');

  watchEffect(() => {
    inputRef.value = props.modelValue;
  });
  // 更新数据
  const updateValue = (e: Event) => {
    let targetValue = (e.target as HTMLInputElement).value;
    if (props.isNumber) {
      targetValue = targetValue.replace(/[^0-9]+/, '');
    }
    if (props.isNoChian) {
      targetValue = targetValue.replace(/[\u4e00-\u9fa5]/gi, '');
    }
    if (!isNaN(+props.maxValue) && +props.maxValue >= 0) {
      targetValue = +targetValue > +props.maxValue ? props.maxValue : targetValue;
    }
    inputRef.value = targetValue;
    inputEmit(targetValue);
  };
  const focusFlag = ref(false);
  const focusValue = (e: Event) => {
    focusFlag.value = !focusFlag.value;
  };
  // 最大值
  const callback = () => {
    emit('callback');
  };
</script>
