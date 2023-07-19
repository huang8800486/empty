<template>
  <div class="base_components_async_layout">
    <ArticleList />
  </div>
</template>

<script setup lang="ts" name="">
  import ErrorComponent from './ErrorComponent.vue';
  import LoadingComponent from './LoadingComponent.vue';
  import { defineAsyncComponent } from 'vue';
  interface Props {
    href: string;
  }
  const props = withDefaults(defineProps<Props>(), {
    href: '',
  });
  // const ArticleList = defineAsyncComponent(() => import('/@/views/Home/bonusPool.vue'));
  let endAttempts = 3; // 重试次数
  const timeout = ref(1000);
  const ArticleList = defineAsyncComponent({
    // 工厂函数
    loader: () => {
      // return new Promise<any>((resolve, reject) => {
      //   (async function () {
      //     const res = await import('/@/views/Home/bonusPool.vue');
      //     resolve(res);
      //   })();
      // });
      return new Promise<any>((resolve, reject) => {
        const modules: Record<string, any> = import.meta.glob('../../../views/**/*.vue', { eager: true });
        const path = modules[`../../../views/${props.href}.vue`];
        setTimeout(() => {
          resolve(path);
        }, timeout.value);
      });
    },
    loadingComponent: LoadingComponent,
    errorComponent: ErrorComponent,
    delay: 0,
    timeout: 20 * 1000,
    suspensible: false,
    onError(error, retry, fail, attempts) {
      // 请求发生错误时重试，最多可尝试 3 次
      if (attempts < endAttempts) {
        retry();
      } else {
        fail();
      }
    },
  });
</script>
