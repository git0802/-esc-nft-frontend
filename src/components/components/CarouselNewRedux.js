import React, { memo, useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import Slider from "react-slick";
import styled from "styled-components";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { carouselNew } from './constants';
import { getNFTMarketContract, getNFTContract, getESCContract } from '../../utils/contractHelper';
import { NFTMarketaddress, NFTaddress } from '../../config';
import { ethers } from 'ethers';

const Outer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
`;

const CarouselNewRedux = ({ nfts }) => {

	const [height, setHeight] = useState(0);
	const [pending, setPending] = useState(false)
	const [currentitem, setCurrentItem] = useState(null)

	const onImgLoad = ({ target: img }) => {
		let currentHeight = height;
		if (currentHeight < img.offsetHeight) {
			setHeight(img.offsetHeight);
		}
	}

	// useEffect(() => {
	// 	dispatch(fetchNftsBreakdown());
	// }, [dispatch]);
	const { account, library } = useWeb3React()
	const onCollect = async (nft) => {
		if (account) {
	    setCurrentItem(nft)
			setPending(true)
			try {
				const signer = library.getSigner()
				const escTokenContract = getESCContract(signer)
				const nftMarketContract = getNFTMarketContract(signer)
				const allowance = await escTokenContract.allowance(account, NFTMarketaddress)
				if (allowance < ethers.utils.parseEther(nft.price)) {
					const tx = await escTokenContract.approve(NFTMarketaddress, ethers.constants.MaxUint256)
					await tx.wait()
				}
				const tx = await nftMarketContract.createMarketSale(NFTaddress, nft.itemId)
				await tx.wait()
				alert("Collected item sucessfully.")
			} catch (error) {
				console.error("Error", error)
				// alert("Sorry. please try again")
			} finally {
				setPending(false)
				setCurrentItem(null)
			}
		}
	}

	return (
		<div className='nft'>
			<Slider {...carouselNew}>
				{nfts && nfts.map((nft, index) => (
					<div className='itm' index={index + 1} key={index}>
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
										{account && nft.seller !== account && <button className='btn-buy' onClick={() => onCollect(nft)}>{(pending && currentitem.tokenId===nft.tokenId) ? "Collecting" : "Collect"}</button>}
									</div>
								</div>
							</div>
						</div>
					</div>
				))}
				{nfts.length === 0 && <p></p>}
			</Slider>
		</div>
	);
}

export default memo(CarouselNewRedux);
