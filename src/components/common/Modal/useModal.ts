import { app } from '/@/mount'; // 全局createApp的实例
import { createVNode, VNode, render } from 'vue';
import { ModalProps, defaultState } from './types';
import ModalConstructor from './index.vue'; // 组件

export function useModal(options: ModalProps) {
  let vm: Nullable<VNode> = null;
  // 参数merge
  const config = { ...defaultState, ...options };
  const ModalWrap = defineComponent({
    render() {
      // 完整参数签名
      // h(type: string | Component, props?: object | null, children?: Children | Slot | Slots): VNode;
      return h(ModalConstructor, config, { default: () => config.content });
    },
  });
  vm = createVNode(ModalWrap);
  // 生成的虚拟dom共享根app的上下文
  vm.appContext = app._context;
  // 渲染到dom
  render(vm, document.createElement('div'));
}
