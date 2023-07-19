import useClipboard from 'vue-clipboard3';
import { useToast } from 'vue-toastification';
import { useI18n } from '/@/hooks/web/useI18n';
/**
 * 复制文本
 * @param name 复制的文本
 */
export default async function copyText(name: string | undefined) {
  const { toClipboard } = useClipboard();
  const { t } = useI18n();
  const Toast = useToast();
  if (!name)
    return Toast.error(t('common.copyFail'), {
      timeout: 2000,
    });
  try {
    await toClipboard(name);
    Toast.success(t('common.copySuccess'), {
      timeout: 2000,
    });
  } catch (e) {
    Toast.error(t('common.copyFail'), {
      timeout: 2000,
    });
  }
}
