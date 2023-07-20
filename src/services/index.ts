import { defHttp } from '/@/utils/http';
export function getWebGeUserNonce(data: any) {
  return defHttp.post<void>({
    url: `/api/getUser`,
    data,
  });
}

export function setVerifySignature(data: any) {
  return defHttp.post<void>({
    url: `/api/register`,
    data,
  });
}
// 修改昵称
export function setUpdateNick(data: any) {
  return defHttp.post<void>({
    url: `/api/updateNick`,
    data,
  });
}
// 我的直推
export function setInvitationData(data: any) {
  return defHttp.post<void>({
    url: `/api/getInvitationData`,
    data,
  });
}
// 充值USDT
export function setRechargeUSDT(data: any) {
  return defHttp.post<void>({
    url: `/api/rechargeusdt`,
    data,
  });
}
// 充值WT
export function setRechargeWT(data: any) {
  return defHttp.post<void>({
    url: `/api/rechargewt`,
    data,
  });
}
// 提现USDT
export function setWithdrawUSDT(data: any) {
  return defHttp.post<void>({
    url: `/api/withdrawUSDT`,
    data,
  });
}
// 提现WT
export function setWithdrawWT(data: any) {
  return defHttp.post<void>({
    url: `/api/withdrawWT`,
    data,
  });
}
// 提现WT
export function getbuyNode(data: any) {
  return defHttp.post<void>({
    url: `/api/buynode`,
    data,
  });
}
// 资金记录
export function getFundsRecords(data: any) {
  return defHttp.post<void>({
    url: `/api/getFundsRecords`,
    data,
  });
}
// 交易
export function setSwap(data: any) {
  return defHttp.post<void>({
    url: `/api/swap`,
    data,
  });
}
// 投资理财
export function getProduct() {
  return defHttp.post<void>({
    url: `/api/getProduct`,
  });
}
// 投资理财
export function getOrder(data: any) {
  return defHttp.post<void>({
    url: `/api/getOrder`,
    data,
  });
}
// 认购
export function getDepositUSDT(data: any) {
  return defHttp.post<void>({
    url: `/api/depositUSDT`,
    data,
  });
}
// 认购
export function getDepositWT(data: any) {
  return defHttp.post<void>({
    url: `/api/depositWT`,
    data,
  });
}
// 燃烧
export function setBurnWT(data: any) {
  return defHttp.post<void>({
    url: `/api/burnWT`,
    data,
  });
}
// 赎回
export function setRedemption(data: any) {
  return defHttp.post<void>({
    url: `/api/redemption`,
    data,
  });
}
// 团队
export function getTeamIncome(data: any) {
  return defHttp.post<void>({
    url: `/api/getTeamIncome`,
    data,
  });
}
// 团队
export function getNodeIncome(data: any) {
  return defHttp.post<void>({
    url: `/api/getNodeIncome`,
    data,
  });
}
// 团队
export function getDirectIncome(data: any) {
  return defHttp.post<void>({
    url: `/api/getDirectIncome`,
    data,
  });
}
// 团队
export function getTeamInfo(data: any) {
  return defHttp.post<void>({
    url: `/api/getTeamInfo`,
    data,
  });
}
// 团队
export function getDepositIncome(data: any) {
  return defHttp.post<void>({
    url: `/api/getDepositIncome`,
    data,
  });
}
