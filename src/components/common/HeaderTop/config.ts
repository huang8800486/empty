import { usePublicMethod } from '/@/utils/publicMethod';
export function navListManager() {
  const { Toast } = usePublicMethod();
  const navList = computed(() => {
    return [
      { text: '首页', path: '/index', isOpen: true },
      { text: '理财', path: '/earnings', isOpen: false },
      { text: '节点认购', path: '/2', isOpen: false },
      { text: '兑换', path: '/exchange', isOpen: false },
      { text: '邀请', path: '/4', isOpen: false },
      { text: '借贷', path: '/market', isOpen: false },
      { text: '个人中心', path: '/personal', isOpen: true },
      // { text: 'swap', path: 'https://pancakeswap.finance/swap', isOpen: false, isHref: true },
    ];
  });
  const waitFun = () => {
    Toast.info('即将开启');
  };
  return {
    waitFun,
    navList,
  };
}
