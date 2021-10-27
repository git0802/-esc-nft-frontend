import React, { useState, useEffect } from 'react';
import SliderMain from '../components/SliderMain';
import FeatureBox from '../components/FeatureBox';
import CarouselNewRedux from '../components/CarouselNewRedux';
import Footer from '../components/footer';

import { usenfts } from '../../state/nfts/hooks';
// import axios from 'axios';
// import { ethers } from 'ethers';

// import { getNFTMarketContract, getNFTContract } from '../../utils/contractHelper';

// const nftMarketContract = getNFTMarketContract();
// const nftContract = getNFTContract();

const Home = () => {
  const { nfts } = usenfts()
  return (
    <div>
      <section className="jumbotron breadcumb no-bg h-vh" style={{ backgroundImage: `url(${'./img/bg-shape-1.jpg'})` }}>
        <SliderMain />
      </section>

      <section className='container no-top no-bottom'>
        <FeatureBox />
      </section>

      <section className='container no-bottom'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='text-center'>
              <h2>{nfts.length>0?'Items':'No Items'}</h2>
              <div className="small-border"></div>
            </div>
          </div>
          <div className='col-lg-12'>
            <CarouselNewRedux nfts={nfts}/>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
export default Home;