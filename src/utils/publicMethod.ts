import bus from '/@/utils/bus';
import { useI18n } from '/@/hooks/web/useI18n';
import { useToast } from 'vue-toastification';
import { useAddress } from '/@/store/modules/address/hooks';
import { useOptions } from '/@/store/modules/options/hooks';
import { useContract } from '/@/store/modules/contractMethod/hooks';
import { useModal } from '/@/components/common/Modal/useModal';

export function usePublicMethod() {
  const { t } = useI18n(); // 国际化
  const Toast = useToast(); // 弹窗
  return {
    t,
    bus,
    Toast,
    useModal,
  };
}
/**
 * 所有store管理
 */
export function useStoreMethod() {
  return {
    ...useAddress(),
    ...useOptions(),
    ...useContract(),
  };
}
