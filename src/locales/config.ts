// 1.默认语言
export const DEFAULTLANG = 'en_US';

// 2.可选择的语言列表
export type LocaleType = 'zh_CN' | 'en_US';

// 3.设置语言默认的配置
export interface LocaleSetting {
  showPicker: boolean;
  // Current language
  locale: LocaleType;
  // default language
  fallback: LocaleType;
  // available Locales
  availableLocales: LocaleType[];
}
export const LOCALE: { [key: string]: LocaleType } = {
  EN_US: 'en_US',
  zh_CN: 'zh_CN',
};
export const localeSetting: LocaleSetting = {
  showPicker: true,
  // Locale
  locale: LOCALE.zh_CN,
  // Default locale
  fallback: LOCALE.zh_CN,
  // available Locales
  availableLocales: [LOCALE.zh_CN, LOCALE.EN_US],
};
// 4.语言对应列表
export interface LangListType {
  text: string;
  value: LocaleType;
}
export const LOCALELANG: LangListType[] = [
  {
    text: 'English',
    value: 'en_US',
  },
  {
    text: '简体中文',
    value: 'zh_CN',
  },
];

// 5.语言文件
export interface LangModule {
  message: Recordable;
  dateLocale: Recordable;
  dateLocaleName: string;
}
