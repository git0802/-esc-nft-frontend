import React, { memo, useState } from 'react';
import styled from "styled-components";
import Clock from "./Clock";
import { BigNumber } from '@ethersproject/bignumber';

import { useWeb3React } from '@web3-react/core';
import { getNFTMarketContract, getNFTContract, getESCContract } from '../../utils/contractHelper';
import { NFTMarketaddress, NFTaddress } from '../../config';
import { ethers } from 'ethers';

const Outer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 8px;
`;


//react functional component
const NftCard = ({ nft, className = 'd-item col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-4', clockTop = true, height, onImgLoad, isShow=false }) => {
	const { account, library } = useWeb3React()
	const [pending, setPending] = useState(false)
	const onCollect = async () => {
		if (account) {
			setPending(true)
			try {
				const signer = library.getSigner()
				const escTokenContract = getESCContract(signer)
				const nftMarketContract = getNFTMarketContract(signer)
				const allowance = await escTokenContract.allowance(account, NFTMarketaddress)
				// let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
				if (allowance < ethers.utils.parseEther(nft.price)) {
					const tx = await escTokenContract.approve(NFTMarketaddress, ethers.constants.MaxUint256)
					await tx.wait()
				}
				const tx = await nftMarketContract.createMarketSale(NFTaddress, nft.itemId)
				await tx.wait()
				setPending(false)
				alert("Collected item sucessfully.")
			} catch (error) {
				console.error("Error", error)
				alert("Sorry. you can't purchase it. If you wanted to purchase it, please check if you have enough ETH and ESC balance to purchase it")
			} finally {
				setPending(false)
			}
		}
	}

	const onSell = async () => {
		if (account) {
			const new_price = window.prompt('Please input the new price', 20);
			const price = ethers.utils.parseUnits(new_price, 'ether');
			const signer = library.getSigner()
			const nftMarketContract = getNFTMarketContract(signer)
			const nftContract = getNFTContract(signer)

			/* then list the item for sale on the marketplace */
			let listingPrice = await nftMarketContract.getListingPrice()
			listingPrice = listingPrice.toString()

			const txx = await nftContract.approve(NFTMarketaddress, nft.tokenId)
			await txx.wait()

			const tx = await nftMarketContract.createMarketItem(NFTaddress, nft.itemId, price, { value: listingPrice })
			await tx.wait()

		}
	}
	return (
		<div className={className}>
			<div className='itm'>
				<div className="d-item">
					<div className="nft__item">
						<div className="nft__item_wrap" style={{ height: `${height}px` }}>
							<Outer>
								<span>
									<img src={nft.image} className="lazy nft__item_preview" onLoad={onImgLoad} alt="" />
								</span>
							</Outer>
						</div>
						<div className="nft__item_info">
							<h4>{nft.name}</h4>
							<p style={{ "marginBottom": "0.05em" }}>{nft.description}</p>
							<div className="nft__item_price">
								{nft.price} ESC
								{isShow && account && nft.seller !== account && <button className='btn-buy' onClick={onCollect}>{pending ? "Collecting" : "Collect"}</button>}
								{/* { account && nft.sold && <button className='btn-buy' onClick={onSell}>Sell</button>} */}

							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default memo(NftCard);