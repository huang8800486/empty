import { LocaleType, LangListType, LOCALELANG } from '/@/locales/config';
import { useI18n } from '/@/hooks/web/useI18n';
import { useLocale } from '/@/locales/useLocale';

export function langConfig() {
  const { changeLocale, getLocale } = useLocale();
  const moreNav = ref(false);
  const langFlag = ref<boolean>(false);
  const langsList = computed(() => {
    return LOCALELANG;
  });
  const currentLang = computed(() => {
    for (let i = 0; i < LOCALELANG.length; i++) {
      if (LOCALELANG[i].value === getLocale.value) {
        return LOCALELANG[i].text;
      }
    }
    return '';
  });
  const switchLangFun = async (obj: LangListType) => {
    const lang: LocaleType | string = obj.value;
    langFlag.value = false;
    moreNav.value = false;
    await changeLocale(lang as LocaleType);
  };
  let timer: null | NodeJS.Timeout = null;
  const mouseEnter = () => {
    moreNav.value = true;
    if (timer) {
      clearTimeout(timer);
    }
  };
  const mouseLeave = () => {
    timer = setTimeout(() => {
      moreNav.value = false;
    }, 300);
  };
  return {
    moreNav,
    langFlag,
    getLocale,
    langsList,
    currentLang,
    switchLangFun,
    mouseEnter,
    mouseLeave,
  };
}
