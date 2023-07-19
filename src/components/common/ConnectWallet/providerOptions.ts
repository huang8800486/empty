import WalletConnectProvider from '@walletconnect/web3-provider';
import CoinbaseWalletSDK from '@coinbase/wallet-sdk';
import requestAccounts from './requestAccounts';
import walletList from './walletImg';
// import { Bitski } from 'bitski';

const providerOptions = {
  injected: {
    display: {
      name: 'Metamask',
    },
    package: null,
  },
  // https://docs.walletconnect.org/
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: 'xxxxxxxxxx', // TODO infuraId
    },
  },
  coinbasewallet: {
    display: {
      name: 'Coinbase Wallet',
    },
    package: CoinbaseWalletSDK, // Required
    options: {
      appName: 'Coinbase', // Required
      infuraId: 'xxxxxxxxxx', // Required
      chainId: 4, //4 for Rinkeby, 1 for mainnet (default)
    },
  },
  bitkeep: {
    package: true,
  },
  'custom-tokenpocket': {
    display: walletList.tokenpocketImg,
    package: true,
    connector: async () => {
      return requestAccounts();
    },
  },
  'custom-binancechainwallet': {
    display: walletList.binancechainImg,
    package: true,
    connector: async () => {
      return requestAccounts();
    },
  },
  'custom-trust': {
    display: walletList.trustImg,
    package: true,
    connector: async () => {
      return requestAccounts();
    },
  },
  'custom-math': {
    display: walletList.mathwalletImg,
    package: true,
    connector: async () => {
      return requestAccounts();
    },
  },
  'custom-coin98': {
    display: walletList.coin98Img,
    package: true,
    connector: async () => {
      return requestAccounts();
    },
  },
  'custom-safepal': {
    display: walletList.safepalImg,
    package: true,
    connector: async () => {
      return requestAccounts();
    },
  },
  'custom-brave': {
    display: walletList.braveImg,
    package: true,
    connector: async () => {
      return requestAccounts();
    },
  },
  'custom-itoken': {
    display: walletList.itokenImg,
    package: true,
    connector: async () => {
      return requestAccounts();
    },
  },
  // // https://docs.bitski.com/
  // bitski: {
  //   package: Bitski,
  //   options: {
  //     clientId: 'xxxxxxxxxx', // TODO
  //     callbackUrl: `${window.location.href}bitski-callback.html`,
  //   },
  // },
};

export { providerOptions };
