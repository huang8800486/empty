import { defineStore } from 'pinia';
import { store } from '/@/store';
import { OptionsState, ThemeEnum, ScrollType, ScreenType, RateType } from './types';
import { scrrenTypeList, setScrrenType } from '/@/utils/mediaWidth.ts';
import { initialState } from './reducer';
import { useGetters } from './hooks';

export const useOptionsStore = defineStore({
  id: 'app-options',
  state: (): OptionsState => initialState,
  getters: useGetters(),
  actions: {
    /**
     * Set up multilingual information and cache
     * @param info multilingual info
     */
    setLoadingInfo(info: Partial<boolean>) {
      this.isLoading = info;
    },
    setFooterWhiteInfo(info: Partial<boolean>) {
      this.isFooterWhite = info;
    },
    setUpdataTime(info: Partial<number>) {
      this.updataTime = info;
    },
    setDarkMode(mode: ThemeEnum): void {
      this.darkMode = mode;
      localStorage.setItem('theme', mode);
    },
    setScrollPostion(info: Partial<ScrollType>): void {
      this.scroll.scrollLeft = info.scrollLeft || 0;
      this.scroll.scrollTop = info.scrollTop || 0;
    },
    setScrollRection(info: Partial<ScrollType>): void {
      this.scroll.scrollUp = !!info.scrollUp;
      this.scroll.scrollDown = !!info.scrollDown;
    },
    setScreen(info: Partial<ScreenType>): void {
      this.screen.clientWidth = info.clientWidth || initialState.screen.clientWidth;
      this.screen.clientHeight = info.clientHeight || initialState.screen.clientHeight;
      this.screen.index = setScrrenType(this.screen.clientWidth);
      this.screen.type = scrrenTypeList[this.screen.index];
    },
    setRate(info: RateType): void {
      this.currentRate = info;
      localStorage.setItem('rate', info);
    },
    setIsButtonLoading(info: number): void {
      this.isButtonLoading = info;
    },
  },
});

// Need to be used outside the setup
export function useOptionsStoreWithOut() {
  return useOptionsStore(store);
}
