import { ethers } from "ethers";
import axios from "axios";
import { useWeb3React } from "@web3-react/core";
import { getOwnedNfts, getSellingNfts } from ".";
import { getNFTMarketContract, getNFTContract } from '../../utils/contractHelper'


export const fetchMyNFTs = (library=null) => async (dispath) => {
  
  // const { library } = useWeb3React()
  const nftMarketContract = getNFTMarketContract(library.getSigner())
  const nftContract = getNFTContract(library.getSigner())
  const data = await nftMarketContract.fetchMyNFTs()
  const items = await Promise.all(data.map(async i => {
    const tokenUri = await nftContract.tokenURI(i.tokenId)
    const meta = await axios.get(tokenUri)
    let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
    let item = {
      price,
      tokenId: i.tokenId.toNumber(),
      seller: i.seller,
      owner: i.owner,
      image: meta.data.image,
      name: meta.data.name,
      description: meta.data.description,
      sold: i.sold,
    }
    return item
  }))
  dispath(getOwnedNfts(items))
}


export const fetchItemsCreated = (library=null) => async (dispath) => {
  // const { library } = useWeb3React()
  const nftMarketContract = getNFTMarketContract(library.getSigner())
  const nftContract = getNFTContract(library.getSigner())
  const data = await nftMarketContract.fetchItemsCreated()
  const items = await Promise.all(data.map(async i => {
    const tokenUri = await nftContract.tokenURI(i.tokenId)
    const meta = await axios.get(tokenUri)
    let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
    let item = {
      price,
      tokenId: i.tokenId.toNumber(),
      seller: i.seller,
      owner: i.owner,
      image: meta.data.image,
      name: meta.data.name,
      description: meta.data.description,
      sold: i.sold,
      itemId: i.itemId.toNumber()
    }
    return item
  }))
  dispath(getSellingNfts(items))
}