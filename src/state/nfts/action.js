import { ethers } from "ethers";
import axios from "axios";

import { getNfts } from ".";
import { getNFTMarketContract, getNFTContract } from '../../utils/contractHelper'

const nftMarketContract = getNFTMarketContract()
const nftContract = getNFTContract()

export const fetchNfts = () => async (dispath) => {

  try {

    const data = await nftMarketContract.fetchMarketItems()

    console.info('marketplace data',data)
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
    dispath(getNfts(items))
  } catch(error) {
    console.error('error', error)
    dispath(getNfts([]))
  }
}