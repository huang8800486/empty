import type { App } from 'vue';
import { createRouter, createWebHistory, RouteRecordRaw, createWebHashHistory } from 'vue-router';
import Main from './main';
import Home from '@/views/index.vue';
import { useStoreMethod } from '/@/utils/publicMethod';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'index',
    component: Home,
    redirect: '/index',
    children: Main,
  },
  // 不存在路由默认跳转
  {
    path: '/:pathMatch(.*)',
    redirect: '/index',
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  // scrollBehavior: () => ({ left: 0, top: 0 }),
  scrollBehavior(to, from, savedPosition) {
    // keep-alive 返回缓存页面后记录浏览位置
    if (savedPosition && to.meta.keepAlive) {
      return savedPosition;
    }
    // 异步滚动操作
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ left: 0, top: 0 });
      }, 0);
    });
  },
});
/**
 * to 表示去往哪个路由
 * from 表示从哪个路由离开
 * next 是一个方法，代表的是是否展示路由页面，如果不使用next方法，那么指定页面无法显示
 */
router.beforeEach((to, from, next) => {
  if (to.name === 'card') {
    if (to.params && to.params.address && to.params.id) {
      next();
    } else {
      setTimeout(() => {
        next(from.fullPath);
      }, 2000);
    }
  } else {
    next();
  }
});

/**
 * 全局后置钩子
 * @param {Object} to: Route: 即将要进入的目标 路由对象
 * @param {Object} from: Route: 当前导航正要离开的路由
 * @param {Function} next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
 */
// router.afterEach((): void => {
// 	// 路由切换时跳回滚动到顶部
// 	setTimeout(() => {
// 		window.scrollTo(0, 0);
// 	}, 0);
// });

// config router
export function setupRouter(app: App<Element>) {
  app.use(router);
}
