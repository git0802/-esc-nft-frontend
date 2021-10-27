import { ethers } from "ethers";
import { NFTaddress, NFTMarketaddress, ESCTokenaddress } from "../config";
import NFT from '../config/abis/NFT.json';
import NFTMarket from '../config/abis/NFTMarket.json'
import ESC from '../config/abis/ESC.json'

export const simpleRpcProvider = new ethers.providers.JsonRpcProvider(process.env.REACT_APP_NODE_URL)

const getContract = (abi, address, singer = null) => {
  const singerOrProvier = singer || simpleRpcProvider;
  return new ethers.Contract(address,abi, singerOrProvier);
}

export const getESCContract = (singer = null) => {
  return getContract(ESC.abi, ESCTokenaddress, singer)
}

export const getNFTContract = (singer = null) => {
  return getContract(NFT.abi, NFTaddress, singer)
}

export const getNFTMarketContract = (singer = null) => {
  return getContract(NFTMarket.abi, NFTMarketaddress, singer)
}