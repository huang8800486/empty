import { getProduct, getOrder } from '/@/services';
import { useStoreMethod } from '/@/utils/publicMethod';
export function coinListManage() {
  const { getFullAccount, getUserCode, contract, getUpdataTime } = useStoreMethod();

  const initProduct = () => {
    console.log('initProduct', initProduct);
    contract.intProductOrder(getFullAccount.value);
  };
  watchEffect(() => {
    if (getUserCode.value > -1 && getFullAccount.value) {
      initProduct();
      setInterval(() => {
        initProduct();
      }, 30 * 1000);
    }
  });
  watch(
    () => getUpdataTime.value,
    (newValue) => {
      if (newValue) {
        initProduct();
      }
    }
  );
}
