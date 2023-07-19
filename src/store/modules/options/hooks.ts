import { useOptionsStoreWithOut } from './index';
import { OptionsState, darkMode, ThemeEnum } from './types';
import { updateTheme } from '/@/utils';
/**
 * getters计算处理
 */
export function useGetters() {
  return {
    getDarkMode(this: OptionsState): 'light' | 'dark' | string {
      return this.darkMode || localStorage.getItem('theme') || darkMode;
    },
    getSmallScreen(this: OptionsState): boolean {
      return this.screen.index <= 2;
    },
    getBigScreen(this: OptionsState): boolean {
      return this.screen.index > 2;
    },
  };
}
/**
 * 使用store数据
 */
export function useOptions() {
  const options = useOptionsStoreWithOut();
  const getLoading = computed(() => options.isLoading);
  const getFooterWhite = computed(() => options.isFooterWhite);
  const getUpdataTime = computed(() => options.updataTime);
  const getDarkMode = computed(() => options.getDarkMode);
  const getScroll = computed(() => options.scroll);
  const getScreen = computed(() => options.screen);
  const getSmallScreen = computed(() => options.getSmallScreen);
  const getBigScreen = computed(() => options.getBigScreen);
  const getCurrentRate = computed(() => options.currentRate);
  const getIsButtonLoading = computed(() => options.isButtonLoading);
  return {
    options,
    getLoading,
    getFooterWhite,
    getUpdataTime,
    getDarkMode,
    getScroll,
    getScreen,
    getSmallScreen,
    getBigScreen,
    getCurrentRate,
    getIsButtonLoading,
  };
}

export function switchTheme(theme: ThemeEnum) {
  const options = useOptionsStoreWithOut();
  updateTheme(theme);
  options.setDarkMode(theme);
}
