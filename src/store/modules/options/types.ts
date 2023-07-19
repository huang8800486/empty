export enum ThemeEnum {
  DARK = 'dark',
  LIGHT = 'light',
}
export interface ScreenType {
  index: number;
  type: string;
  clientWidth: number;
  clientHeight: number;
}
export interface ScrollType {
  scrollLeft: number;
  scrollTop: number;
  scrollUp: boolean;
  scrollDown: boolean;
}
export interface OptionsState {
  isLoading: boolean;
  isFooterWhite: boolean;
  updataTime: number;
  darkMode?: ThemeEnum;
  scroll: ScrollType;
  screen: ScreenType;
  currentRate: RateType;
  isButtonLoading: number;
}

export const darkMode = ThemeEnum.LIGHT;

// 1.默认汇率
export const DEFAULTRATE = 'USD';

// 2.可选择的汇率列表
export type RateType = 'USD' | 'CNY' | 'EUR' | 'JPY' | 'KRW';

export const RATELIST: { [key: string]: RateType } = {
  USD: 'USD',
  CNY: 'CNY',
  EUR: 'EUR',
  JPY: 'JPY',
  KRW: 'KRW',
};

export interface RateListType {
  text: string;
  sign: string;
  value: RateType;
}

export const LOCALELANG: RateListType[] = [
  {
    text: 'USD',
    value: 'USD',
    sign: '$',
  },
  {
    text: 'CNY',
    value: 'CNY',
    sign: '¥',
  },
  {
    text: 'EUR',
    value: 'EUR',
    sign: '€',
  },
  {
    text: 'JPY',
    value: 'JPY',
    sign: '¥',
  },
  {
    text: 'KRW',
    value: 'KRW',
    sign: '₩',
  },
];
