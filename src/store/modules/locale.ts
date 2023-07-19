import { LocaleSetting, localeSetting, LocaleType } from '../../locales/config';

import { defineStore } from 'pinia';
import { store } from '/@/store';

interface LocaleState {
  localInfo: LocaleSetting;
}
const lsLocaleSetting = ({ locale: localStorage.getItem('lang') } || localeSetting) as LocaleSetting;
export const useLocaleStore = defineStore({
  id: 'app-locale',
  state: (): LocaleState => ({
    localInfo: lsLocaleSetting,
  }),
  getters: {
    getLocale(): LocaleType {
      return this.localInfo?.locale;
    },
  },
  actions: {
    /**
     * Set up multilingual information and cache
     * @param info multilingual info
     */
    setLocaleInfo(info: Partial<LocaleSetting>) {
      this.localInfo = { ...this.localInfo, ...info };
    },
    /**
     * Initialize multilingual information and load the existing configuration from the local cache
     */
    initLocale() {
      this.setLocaleInfo({
        ...this.localInfo,
      });
    },
  },
});

// Need to be used outside the setup
export function useLocaleStoreWithOut() {
  return useLocaleStore(store);
}

export function useLocale() {
  const locale = useLocaleStoreWithOut();
  const getLocale = computed(() => locale.getLocale);
  return { locale, getLocale };
}
