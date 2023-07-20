<template>
  <div class="record_detail">
    <BaseList :titleList="['货币', '可用', '冻结中', '总量', '操作']" :isFlex="true" :custom="true" v-slot="scope" :listItem="listItemCom">
      <span>{{ scope.item.name }}</span>
      <span>{{ scope.item.balance }}</span>
      <span>{{ scope.item.freeze }}</span>
      <!-- <span>{{ scope.item.profit }}</span> -->
      <span>{{ scope.item.allbalance }}</span>
      <span>
        <div class="operate" v-if="scope.item.isApprove">
          <BaseButton @callback="openRecharge(scope.item.name)">充值</BaseButton>
          <BaseButton @callback="openWithdraw(scope.item.name)" :disabled="scope.item.balance == 0">提现</BaseButton>
        </div>
        <div class="operate" v-else>
          <BaseButton :btnId="nanoid()" @callback="approve(scope.item.name)">授权</BaseButton>
        </div>
      </span>
    </BaseList>
  </div>
  <Modal v-model:visible="rechargeFlag" type="custom" :closeIcon="true" :title="'充值'" @colse="closeFun">
    <div class="nick_box_wrap">
      <BaseInput v-model="rechargeValue" :placeholder="'请输入数量'" :isDemi="true" />
      <!-- <span class="note">*不能输入中文</span> -->
      <BaseButton :btnId="nanoid()" @callback="comfirmRecharge">确定</BaseButton>
    </div>
  </Modal>
  <Modal v-model:visible="withdrawFlag" type="custom" :closeIcon="true" :title="'提现'" @colse="closeFun">
    <div class="nick_box_wrap">
      <BaseInput v-model="withdrawValue" :placeholder="'请输入数量'" :isDemi="true" />
      <!-- <span class="note">*不能输入中文</span> -->
      <BaseButton :btnId="nanoid()" @callback="comfirmWithdraw">确定</BaseButton>
    </div>
  </Modal>
</template>

<script setup lang="ts" name="">
  import { nanoid } from 'nanoid';
  import { usePublicMethod, useStoreMethod } from '/@/utils/publicMethod';
  import { fixD } from '/@/utils/common';
  import { getContract } from '/@/utils/contractHelpers';
  import { formatDigit, getInstance } from '/@/utils/formatEth';
  import { setRechargeUSDT, setRechargeWT, setWithdrawUSDT, setWithdrawWT } from '/@/services';
  const { options, contract, getFullAccount, getLedgerInstance, getLedgerToken } = useStoreMethod();
  const { getUserInfo, getIsUsdtApprove, getIsWtApprove, getUsdtInstance, getWtInstance, getUSDTToken, getWTToken } = useStoreMethod();
  const { Toast, t } = usePublicMethod();

  const usdtBalance = computed(() => {
    return fixD(+getUserInfo.value.usdt_balance - +getUserInfo.value.usdt_freeze, formatDigit);
  });
  const usdtFreeze = computed(() => {
    return fixD(getUserInfo.value.usdt_freeze, formatDigit);
  });
  const usdtProfi = computed(() => {
    return fixD(getUserInfo.value.usdt_profit, formatDigit);
  });
  const allUsdtBalance = computed(() => {
    return fixD(getUserInfo.value.usdt_balance, formatDigit);
  });
  const wtBalance = computed(() => {
    return fixD(+getUserInfo.value.wt_balance - +getUserInfo.value.wt_freeze, formatDigit);
  });
  const wtFreeze = computed(() => {
    return fixD(getUserInfo.value.wt_freeze, formatDigit);
  });
  const wtProfi = computed(() => {
    return fixD(getUserInfo.value.wt_profit, formatDigit);
  });
  const allWtBalance = computed(() => {
    return fixD(getUserInfo.value.wt_balance, formatDigit);
  });
  const currentObj = computed(() => {
    return {
      USDT: {
        contract: getUsdtInstance.value,
        rechargeMethods: setRechargeUSDT,
        withdrawMethods: setWithdrawUSDT,
        rechargeName: 'rechargeUSDT',
        withdrawName: 'withdrawUSDT',
        balance: usdtBalance.value,
      },
      WT: {
        contract: getWtInstance.value,
        rechargeMethods: setRechargeWT,
        withdrawMethods: setWithdrawWT,
        rechargeName: 'rechargeWT',
        withdrawName: 'withdrawWT',
        balance: wtBalance.value,
      },
    };
  });
  const listItemCom = computed(() => {
    return [
      {
        name: 'USDT',
        balance: usdtBalance.value,
        freeze: usdtFreeze.value,
        profit: usdtProfi.value,
        allbalance: allUsdtBalance.value,
        isApprove: getIsUsdtApprove.value,
      },
      {
        name: 'WT',
        balance: wtBalance.value,
        freeze: wtFreeze.value,
        profit: wtProfi.value,
        allbalance: allWtBalance.value,
        isApprove: getIsWtApprove.value,
      },
    ];
  });
  const rechargeFlag = ref(false);
  const rechargeValue = ref('');
  const withdrawFlag = ref(false);
  const withdrawValue = ref('');
  const currentFlag = ref('');
  const openRecharge = (name: string) => {
    rechargeFlag.value = true;
    currentFlag.value = name;
  };
  const openWithdraw = (name: string) => {
    withdrawFlag.value = true;
    currentFlag.value = name;
  };
  const closeFun = () => {
    rechargeFlag.value = false;
    withdrawFlag.value = false;
    currentFlag.value = '';
    withdrawValue.value = '';
    rechargeValue.value = '';
    options.setUpdataTime(new Date().getTime());
    options.setLoadingInfo(false);
  };
  const comfirmRecharge = () => {
    rechargeValue.value &&
      currentFlag.value &&
      currentObj.value[currentFlag.value]
        .rechargeMethods({ address: getFullAccount.value, value: rechargeValue.value })
        .then((result: any) => {
          getInstance(getLedgerInstance.value, currentObj.value[currentFlag.value].rechargeName, [
            result.amount,
            result.deadline,
            result.hash,
            // { gasPrice: 10000000000 },
          ])
            .then(() => {
              closeFun();
              Toast.success(t('common.comfirm'), {
                timeout: 2000,
              });
              // bigNumber.value = TimeLimit;
            })
            .catch((err: any) => {
              closeFun();
              // bigNumber.value = TimeLimit;
              console.log('err', err);
            });
        })
        .catch((err: any) => {
          closeFun();
          Toast.error(err.message, {
            timeout: 2000,
          });
        });
  };
  const comfirmWithdraw = () => {
    console.log('rechargeValue.value', rechargeValue.value, currentFlag.value);
    withdrawValue.value &&
      currentFlag.value &&
      currentObj.value[currentFlag.value]
        .withdrawMethods({ address: getFullAccount.value, value: withdrawValue.value })
        .then((result: any) => {
          getInstance(getLedgerInstance.value, currentObj.value[currentFlag.value].withdrawName, [
            result.amount,
            result.deadline,
            result.hash,
            // { gasPrice: 10000000000 },
          ])
            .then(() => {
              closeFun();
              options.setUpdataTime(new Date().getTime());
              Toast.success(t('common.comfirm'), {
                timeout: 2000,
              });
              // bigNumber.value = TimeLimit;
            })
            .catch((err: any) => {
              closeFun();
              options.setLoadingInfo(false);
              // bigNumber.value = TimeLimit;
              console.log('err', err);
            });
        })
        .catch((err: any) => {
          closeFun();
          Toast.error(err.message, {
            timeout: 2000,
          });
        });
  };
  const approve = (name: string) => {
    // console.log('name', currentObj.value[name], getLedgerToken.value);
    getInstance(currentObj.value[name].contract, 'approve', [
      getLedgerToken.value,
      '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
    ]).then(() => {
      contract.initApproveMethod(getFullAccount.value);
    });
  };
</script>
