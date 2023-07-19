import { OptionsState, DEFAULTRATE, RateType, RATELIST } from './types';

const currentRate: RateType = (localStorage.getItem('rate') || DEFAULTRATE) as RateType;
if (!Object.values(RATELIST).includes(localStorage.getItem('rate') as RateType)) {
  localStorage.setItem('rate', DEFAULTRATE);
}
export const initialState: OptionsState = {
  darkMode: undefined,
  isLoading: false,
  isFooterWhite: false,
  updataTime: 0,
  isButtonLoading: 0,
  scroll: {
    scrollLeft: 0,
    scrollTop: 0,
    scrollUp: false,
    scrollDown: true,
  },
  screen: {
    index: 0, // 0-xs, 1-ms, 2-md, 3-lg, 4-xl, 5-xxl
    type: 'xs', // xs sm md lg xl xxl
    clientWidth: document.documentElement.clientWidth || window.innerWidth, // window的宽度
    clientHeight: document.documentElement.clientHeight || window.innerHeight, // window的宽度
  },
  currentRate: currentRate,
};
