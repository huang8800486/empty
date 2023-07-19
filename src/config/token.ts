interface Token {
  [key: string]: string | number;
}
// BSC主网
export const prepro: Token = {
  name: 'prepro',
  chainId: '0x61',
  chainNetWork: 97,
  chainName: 'BSC-Test',
  rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
  blockExplorerUrls: 'https://testnet.bscscan.com/',
  ledgerToken: '0x795fB374b035914C8Be79CA3728987e387ad299C',
  USDTToken: '0x7ff56a5407830AfdFcD862b73AB8Abc1b1e87F2A',
  WTToken: '0xA0269737bd1237f68F64CCAa918573F0D916C979',
  DEFAULTREFERRERADDRESS: '0xd8d2F757107d69F3f0E0cCf38CF2feD10604b108',
};
// BSC测试网, Kintsugi测试网
export const test: Token = {
  name: 'test',
  chainId: '0x61',
  chainNetWork: 97,
  chainName: 'BSC-Test',
  rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
  blockExplorerUrls: 'https://testnet.bscscan.com/',
  ledgerToken: '0x795fB374b035914C8Be79CA3728987e387ad299C',
  USDTToken: '0x7ff56a5407830AfdFcD862b73AB8Abc1b1e87F2A',
  WTToken: '0xA0269737bd1237f68F64CCAa918573F0D916C979',
  DEFAULTREFERRERADDRESS: '0xd8d2F757107d69F3f0E0cCf38CF2feD10604b108',
};
// BSC主网
export const main: Token = {
  name: 'main',
  chainId: '0x38',
  chainNetWork: 56,
  chainName: 'BSC-MianNet',
  rpcUrl: 'https://bsc-dataseed.binance.org/',
  blockExplorerUrls: 'https://bscscan.com',
  ledgerToken: '0x795fB374b035914C8Be79CA3728987e387ad299C',
  USDTToken: '0x7ff56a5407830AfdFcD862b73AB8Abc1b1e87F2A',
  WTToken: '0xA0269737bd1237f68F64CCAa918573F0D916C979',
  DEFAULTREFERRERADDRESS: '0xd8d2F757107d69F3f0E0cCf38CF2feD10604b108',
};
