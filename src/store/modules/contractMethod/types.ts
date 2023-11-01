export interface userInfoType {
  id: number;
  address: string;
  nick_name: string;
  referrer: string;
  wt_balance: string;
  wt_profit: string;
  usdt_balance: string;
  usdt_profit: string;
  usdt_freeze: string;
  wt_freeze: string;
  invitation_data: string;
  nonce: number;
  is_blacklist: number;
  is_node: number;
  total_invitation: number;
  create_time: string;
  update_time: string;
}
export interface ContratStateType {
  coinList: any;
  originList: any;
  ledgerInstance: any;
  usdtInstance: any;
  wtInstance: any;
  rechargeInstance: any;
  isUsdtApprove: boolean;
  isWtApprove: boolean;
  isReUsdtApprove: boolean;
  isReWtApprove: boolean;
  ledgerToken: string | number;
  rechargeToken: string | number;
  USDTToken: string | number;
  WTToken: string | number;
  userInfo: userInfoType;
  userCode: number;
  ledgerPirce: number;
}
