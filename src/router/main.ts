import Home from '@/views/Home/index.vue';
import Exchange from '@/views/Exchange/index.vue';
import Personal from '@/views/Personal/index.vue';
export default [
  {
    path: '/index',
    name: 'index',
    meta: { title: 'home' },
    component: Home,
  },
  {
    path: '/exchange',
    name: 'exchange',
    meta: { title: 'exchange' },
    component: Exchange,
  },
  {
    path: '/personal',
    name: 'personal',
    meta: { title: 'personal' },
    component: Personal,
  },
  {
    path: '/market',
    name: 'market',
    meta: { title: 'market' },
    component: () => import('@/views/Market/index.vue'),
  },
  {
    path: '/earnings',
    name: 'earnings',
    meta: { title: 'earnings' },
    redirect: '/earnings/index',
    component: () => import('@/views/Earnings/index.vue'),
    children: [
      {
        path: '/earnings/index',
        name: 'earningsHome',
        component: () => import('@/views/Earnings/Ehome/index.vue'),
      },
      {
        path: '/earnings/revenueRecord',
        name: 'revenueRecord',
        component: () => import('@/views/Earnings/RevenueRecord/index.vue'),
      },
      {
        path: '/earnings/currentPledge',
        name: 'currentPledge',
        component: () => import('@/views/Earnings/CurrentPledge/index.vue'),
      },
    ],
  },
];
