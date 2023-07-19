import type { App } from 'vue';
import type { I18n, I18nOptions } from 'vue-i18n';
import { createI18n } from 'vue-i18n';
import { localeSetting, LOCALE, DEFAULTLANG } from './config';
import { useLocaleStoreWithOut } from '/@/store/modules/locale';

// 全局i18n对象
export let i18n: ReturnType<any>;

// 默认设置
const { fallback, availableLocales } = localeSetting;

// 创建i18n实例
async function createI18nOptions(): Promise<I18nOptions> {
  // 从自定的环境中取当前语言, 如果没有, 则设置默认的
  const localeStore = useLocaleStoreWithOut();
  let locale = localeStore.getLocale;
  if (!Object.values(LOCALE).includes(locale)) {
    locale = DEFAULTLANG;
    localStorage.setItem('lang', locale);
  }

  // 循环获取lang目录下国际化的文件
  const defaultLocal = await import(`./lang/${locale}.ts`);
  const message = defaultLocal.default?.message ?? {};

  // 配置
  return {
    legacy: false, // 设置为false, 使用Composition API, 这样可以在setup中使用 const { t } = VueI18n.useI18n()
    locale, // 当前语言环境
    fallbackLocale: fallback, // 备用默认语言环境
    messages: {
      [locale]: message, // 本地化的语言对象列表 zh_CN: {} | en: {}
    },
    availableLocales: availableLocales, // 语言环境列表 ["en", "ja"]
    sync: true, // 如果不想从全局范围继承语言环境，则需要将 i18n 组件选项的同步设置为 false。
    silentTranslationWarn: true, // true - 是否取消本地化失败时输出的警告
    missingWarn: false, // 是否抑制本地化失败时输出的警告。
    silentFallbackWarn: true, // 如果为 true，则仅在根本没有可用的转换时生成警告，而不是在回退时。
  };
}

// 全局设置i18n实例, 抛出方法, vue中注册
export async function setupI18n(app: App) {
  const options = await createI18nOptions();
  i18n = createI18n(options) as I18n;
  app.use(i18n);
}
