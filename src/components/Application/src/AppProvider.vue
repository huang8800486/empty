<script lang="ts">
  import { defineComponent, toRefs, ref, unref } from 'vue';
  import { createAppProviderContext } from './useAppContext';
  import { createBreakpointListen } from '/@/hooks/event/useBreakpoint';
  const prefixCls = 'Alan';
  const props = {
    /**
     * class style prefix
     */
    prefixCls: { type: String, default: prefixCls },
  };

  export default defineComponent({
    name: 'AppProvider',
    inheritAttrs: false,
    props,
    setup(props, { slots }) {
      const isMobile = ref(false);

      // const appStore = useAppStore();

      // Monitor screen breakpoint information changes
      createBreakpointListen(({ screenMap, sizeEnum, width }) => {
        const typeWidth = screenMap.get(sizeEnum.MD);
        if (typeWidth) {
          isMobile.value = width.value - 1 < typeWidth;
        }
        handleRestoreState();
      });

      const { prefixCls } = toRefs(props);

      // Inject variables into the global
      createAppProviderContext({ prefixCls, isMobile });

      /**
       * Used to maintain the state before the window changes
       */
      function handleRestoreState() {
        // console.log('isMobile', isMobile.value);
      }
      return () => slots.default?.();
    },
  });
</script>
