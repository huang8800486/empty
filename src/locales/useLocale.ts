import { LocaleType, LangModule } from './config';
import { i18n } from './setupI18n';
import { useLocaleStoreWithOut } from '/@/store/modules/locale';
import { unref, computed } from 'vue';

// 设置切换语言到store里
function setI18nLanguage(locale: LocaleType) {
  const localeStore = useLocaleStoreWithOut();

  if (i18n.mode === 'legacy') {
    i18n.global.locale = locale;
  } else {
    (i18n.global.locale as any).value = locale;
  }
  localeStore.setLocaleInfo({ locale });
  localStorage.setItem('lang', locale);
}
// 获取当前语言和切换语言
export function useLocale() {
  // 获取当前语言
  const localeStore = useLocaleStoreWithOut();
  const getLocale = computed(() => localeStore.getLocale);

  // 切换语言将改变useI18n的区域设置
  // 并提交配置修改
  async function changeLocale(locale: LocaleType) {
    const globalI18n = i18n.global;
    const currentLocale = unref(globalI18n.locale);
    if (currentLocale === locale) {
      return locale;
    }
    const langModule = ((await import(`./lang/${locale}.ts`)) as any).default as LangModule;
    if (!langModule) return;

    const { message } = langModule;
    // 设置语言环境的 locale 信息。
    globalI18n.setLocaleMessage(locale, message);

    setI18nLanguage(locale);
    return locale;
  }

  return {
    getLocale,
    changeLocale,
  };
}
