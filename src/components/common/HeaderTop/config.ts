import { usePublicMethod } from '/@/utils/publicMethod';
import VueScrollTo from 'vue-scrollto';
export function navListManager() {
  const { Toast } = usePublicMethod();
  const router = useRouter();
  const navList = computed(() => {
    return [
      { text: '首页', path: '/index', isOpen: true },
      { text: '理财', path: '/earnings', isOpen: true },
      { text: '节点认购', path: '#buyNode', isOpen: false, isScroll: true },
      { text: '兑换', path: '/exchange', isOpen: true },
      { text: '邀请', path: '/personal?type=5', isOpen: true },
      { text: '借贷', path: '/market', isOpen: true },
      { text: '个人中心', path: '/personal', isOpen: true },
      // { text: 'swap', path: 'https://pancakeswap.finance/swap', isOpen: false, isHref: true },
    ];
  });
  const waitFun = () => {
    Toast.info('即将开启');
  };
  const scrollTo = () => {
    router.push('/index');
    setTimeout(() => {
      VueScrollTo.scrollTo('#buyNode');
    }, 600);
  };
  return {
    waitFun,
    navList,
    scrollTo,
  };
}
