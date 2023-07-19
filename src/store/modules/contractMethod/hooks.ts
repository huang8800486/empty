import { useContractStoreWithOut } from './index';
/**
 * getters计算处理
 */
export function useGetters() {
  return {};
}
/**
 * 使用store数据
 */
export function useContract() {
  const contract = useContractStoreWithOut();
  const getUserInfo = computed(() => contract.userInfo);
  const getUserCode = computed(() => contract.userCode);
  const getLedgerInstance = computed(() => contract.ledgerInstance);
  const getLedgerToken = computed(() => contract.ledgerToken);
  const getUSDTToken = computed(() => contract.USDTToken);
  const getWTToken = computed(() => contract.WTToken);
  const getUsdtInstance = computed(() => contract.usdtInstance);
  const getWtInstance = computed(() => contract.wtInstance);
  const getIsUsdtApprove = computed(() => contract.isUsdtApprove);
  const getIsWtApprove = computed(() => contract.isWtApprove);
  return {
    contract,
    getUserInfo,
    getUserCode,
    getLedgerInstance,
    getLedgerToken,
    getUSDTToken,
    getWTToken,
    getIsUsdtApprove,
    getIsWtApprove,
    getUsdtInstance,
    getWtInstance,
  };
}
