<template>
  <Teleport to="body">
    <transition
      :enter-active-class="'animate__animated fast animate__fadeIn'"
      :leave-active-class="'animate__animated fast animate__fadeOut'"
      appear
    >
      <div class="global_overlay" v-if="visible && isOverlay"></div>
    </transition>
    <transition
      :enter-active-class="'animate__animated middle animate__fadeIn'"
      :leave-active-class="'animate__animated middle animate__fadeOut'"
      appear
    >
      <div class="global_components_wrap" v-if="visible">
        <div
          class="global_components_modal"
          :class="[name, type === 'custom' ? 'global_components_custom_modal' : 'global_components_common_modal']"
        >
          <div class="common_modal_wrap">
            <div class="common_modal">
              <button class="close_icon" @click="closeModal" v-if="closeIcon">
                <CloseSvg />
              </button>
              <h2 class="modal_title" v-if="title"> {{ title }}</h2>
              <div class="modal_con">
                <slot></slot>
              </div>
              <div v-if="tips" class="tips">{{ tips }}</div>
              <template v-if="isButton">
                <div class="modal_button_wrap" v-if="isOk || isNo" :class="{ single: !isOk || !isNo }">
                  <a href="javascript:;" v-if="isOk" class="comfirm_button" @click="comfirmModal('comfirm')">{{ $t('common.yes') }}</a>
                  <a href="javascript:;" v-if="isNo" class="cance_button" @click="cancelModal">{{ $t('common.no') }}</a>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup lang="ts" name="">
  import { defaultState } from './types';
  interface Props {
    visible: boolean;
    isOverlay?: boolean;
    closeIcon?: boolean;
    isButton?: boolean;
    isOk?: boolean;
    isNo?: boolean;
    title?: string;
    type?: string;
    name?: string;
    content?: string;
    tips?: string;
    cance?: Function;
    success?: Function;
  }
  // 传参
  const prors = withDefaults(defineProps<Props>(), {
    ...defaultState,
  });
  // emit事件
  const emit = defineEmits<{
    (e: 'comfirm', type: string): void;
    (e: 'colse'): void;
    (e: 'update:visible', type: boolean): void;
  }>();
  const visibleEmit = (value: boolean) => {
    emit('update:visible', value);
  };

  // 监听visible
  const visible = ref(prors.visible);
  watchEffect(() => {
    visible.value = prors.visible;
  });

  // 关闭
  const closeModal = () => {
    emit('colse');
    visible.value = false;
    visibleEmit(visible.value);
  };
  // 确定回调
  const comfirmModal = (type: string) => {
    emit('comfirm', type);
    prors.success && prors.success(type);
    closeModal();
  };
  // 取消回调
  const cancelModal = () => {
    prors.cance && prors.cance();
    closeModal();
  };
</script>

<!-- <script lang="ts">
  // defineComponent写法
  import { ModalProps } from './types';
  export default defineComponent({
    props: {
      visible: { type: Boolean },
      isOverlay: { type: Boolean },
      closeIcon: { type: Boolean },
      isButton: { type: Boolean },
      isOk: { type: Boolean },
      isNo: { type: Boolean },
      title: { type: String },
      type: { type: String },
      name: { type: String },
      content: { type: String },
      cance: { type: Function },
      success: { type: Function },
    },
    emits: ['comfirm', 'update:visible'],
    setup(props, { emit }) {
      const state = reactive<ModalProps>({
        visible: props.visible,
        isOverlay: props.isOverlay || true,
        closeIcon: props.closeIcon || true,
        isButton: props.isButton,
        isOk: props.isOk || true,
        isNo: props.isNo || true,
        title: props.title,
        type: props.type,
        name: props.name,
        content: props.content,
        cance: () => {},
        success: () => {},
      });
      const visibleEmit = (value: boolean) => {
        emit('update:visible', value);
      };

      // 监听visible
      watchEffect(() => {
        state.visible = props.visible;
      });

      // 关闭
      const closeModal = () => {
        state.visible = false;
        visibleEmit(state.visible);
      };
      // 确定回调
      const comfirmModal = (type: string) => {
        emit('comfirm', type);
        state.success && state.success(type);
        closeModal();
      };
      // 取消回调
      const cancelModal = () => {
        state.cance && state.cance();
        closeModal();
      };
      return {
        ...toRefs(state),
        closeModal,
        comfirmModal,
        cancelModal,
      };
    },
  });
</script> -->
