import { usePublicMethod, useStoreMethod } from '/@/utils/publicMethod';
import { aesCryptoJs } from '/@/utils/sign';
import ledger from '/@/contract/ledger.json';
import tokenObj from '/@/config';
import { ethers } from 'ethers';
import ERC20ABI from '/@/contract/ERC20ABI.json';
import { getContract, getErc20Contract } from '/@/utils/contractHelpers';
export function useEthers() {
  const { contract, getUpdataTime, getFullAccount, getInviteAddress, getUserCode } = useStoreMethod();
  const { getProvider, getLedgerInstance } = useStoreMethod();

  watchEffect(() => {
    if (getFullAccount.value && getInviteAddress.value && getProvider.value) {
      contract.setUserCode(-1);
      aesCryptoJs(getFullAccount.value, getInviteAddress.value);
    }
    if (getFullAccount.value) {
      contract.initApproveMethod(getFullAccount.value);
    }
    if (getLedgerInstance.value) {
      contract.initContractMethod();
    }
  });
  let timer: null | NodeJS.Timeout = null;
  const flag = ref(true);
  watchEffect(() => {
    // if (getFullAccount.value && getLoofPool.value) {
    if (getLedgerInstance.value && flag.value) {
      flag.value = false;
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
      if (!timer) {
        timer = setInterval(() => {
          if (getUserCode.value > -1) {
            aesCryptoJs(getFullAccount.value, getInviteAddress.value);
          }
        }, 10 * 1000);
      }
    }
  });
  const updataFun = () => {
    if (getFullAccount.value) {
      aesCryptoJs(getFullAccount.value, getInviteAddress.value);
    }
    // if (getLedgerInstance.value) {
    //   contract.initContractMethod();
    // }
    // if (getFullAccount.value) {
    //   contract.initAccountMethod(getFullAccount.value);
    // }
  };
  watch(
    () => getUpdataTime.value,
    (newValue) => {
      if (newValue) {
        updataFun();
      }
    }
  );
  const startEther = () => {
    const signer = toRaw(getProvider.value); //获取原始数据设置
    const ledgerInstance = getContract({ abi: ledger, address: tokenObj.ledgerToken, signer: signer });
    const rechargeInstance = getContract({ abi: ledger, address: tokenObj.rechargeToken, signer: signer });
    contract.SETLEDGERINSTANCE(ledgerInstance);
    contract.SETLEDGERTOKEN(tokenObj.ledgerToken);
    contract.SETRECHARGEINSTANCE(rechargeInstance);
    contract.SETRECHARGETOKEN(tokenObj.rechargeToken);
    const usdtInstance = new ethers.Contract(tokenObj.USDTToken + '', ERC20ABI, signer);
    const wtInstance = new ethers.Contract(tokenObj.WTToken + '', ERC20ABI, signer);
    contract.SETUSDTINSTANCE(usdtInstance);
    contract.SETWTINSTANCE(wtInstance);
    contract.SETUSDTTOKEN(tokenObj.USDTToken);
    contract.SETWTTOKEN(tokenObj.WTToken);
    // cardContract.SETCARMARKETTOKEN(tokenObj.marketToken);

    // const auctionInstance = getAuctionContract(tokenObj.auctionToken, signer);
    // cardContract.SETCARAUCTIONINSTANCE(auctionInstance);
    // cardContract.SETCARAUCTIONTOKEN(tokenObj.auctionToken);

    // const nftInstance = getErc721Contract(tokenObj.nftToken, signer);
    // cardContract.SETNFTINSTANCE(nftInstance);
    // cardContract.SETNFTTOKEN(tokenObj.nftToken);
    // cardContract.initAccountHomeMethod();
  };

  const flagStart = ref(true);
  watchEffect(() => {
    if (getProvider.value && flagStart.value) {
      flagStart.value = false;
      startEther();
    }
  });
}
