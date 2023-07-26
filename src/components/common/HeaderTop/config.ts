import { usePublicMethod } from '/@/utils/publicMethod';
import VueScrollTo from 'vue-scrollto';
export function navListManager() {
  const { Toast, t } = usePublicMethod();
  const router = useRouter();
  const navList = computed(() => {
    return [
      { text: t('common.Home'), path: '/index', isOpen: true },
      { text: t('common.Stake'), path: '/earnings', isOpen: true },
      { text: t('common.NodeSubscription'), path: '#buyNode', isOpen: false, isScroll: true },
      { text: t('common.Swap'), path: '/exchange', isOpen: true },
      { text: t('common.Invite'), path: '/personal?type=4', isOpen: true },
      { text: t('common.Borrowmoney'), path: '/market', isOpen: true },
      { text: t('common.Personalcenter'), path: '/personal', isOpen: true },
      // { text: 'swap', path: 'https://pancakeswap.finance/swap', isOpen: false, isHref: true },
    ];
  });
  const waitFun = () => {
    Toast.info(t('common.comingSoon'));
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
