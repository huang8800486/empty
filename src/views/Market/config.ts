import { getImages } from '/@/utils/common';
export function markTextManage() {
  const markText = computed(() => {
    return [
      {
        name: '总市场规模',
        value: '$2.27B',
        image: getImages('time_img.png'),
      },
      {
        name: '总可用',
        value: '$1.50B',
        image: getImages('rate_img.png'),
      },
      {
        name: '借款总额',
        value: '$1.50B',
        image: getImages('rate_img.png'),
      },
    ];
  });
  return {
    markText,
  };
}
