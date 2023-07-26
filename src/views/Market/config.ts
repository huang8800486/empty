import { getImages } from '/@/utils/common';
import { usePublicMethod, useStoreMethod } from '/@/utils/publicMethod';
export function markTextManage() {
  const { t } = usePublicMethod();
  const markText = computed(() => {
    return [
      {
        name: t('common.totalMarketSize'),
        value: '$2.27B',
        image: getImages('time_img.png'),
      },
      {
        name: t('common.AlwaysAvailable'),
        value: '$1.50B',
        image: getImages('rate_img.png'),
      },
      {
        name: t('common.TotalBorrowing'),
        value: '$1.50B',
        image: getImages('rate_img.png'),
      },
    ];
  });
  return {
    markText,
  };
}
