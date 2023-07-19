import { ethers } from 'ethers';
import ERC721 from '/@/contract/erc721.json';
import ERC20ABI from '/@/contract/ERC20ABI.json';

export const getContract = ({ abi, address, signer }: { abi: any; address: any; signer?: any }) => {
  return new ethers.Contract(address, abi, signer);
};
export const getErc721Contract = (address: any, signer?: any) => {
  return getContract({ abi: ERC721, address, signer });
};
export const getErc20Contract = (address: any, signer?: any) => {
  return getContract({ abi: ERC20ABI, address, signer });
};
// export const getMarketContract = (address: any, signer?: any) => {
//   return getContract({ abi: marketABI, address, signer });
// };
// export const getAuctionContract = (address: any, signer?: any) => {
//   return getContract({ abi: auctionABI, address, signer });
// };
