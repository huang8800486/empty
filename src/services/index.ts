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
