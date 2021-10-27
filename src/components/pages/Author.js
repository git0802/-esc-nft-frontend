import React, { useEffect, useState } from "react";
import { ethers } from 'ethers'
import axios from 'axios'
import ColumnNewRedux from '../components/ColumnNewRedux';
import Footer from '../components/footer';
import { createGlobalStyle } from 'styled-components';
import { useWeb3React } from "@web3-react/core";
import { useOwnNfts, useSellingNfts } from "../../state/mydata/hooks";

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.white {
    background: #fff;
  }
  @media only screen and (max-width: 1199px) {
    .navbar{
      background: #403f83;
    }
    .navbar .menu-line, .navbar .menu-line1, .navbar .menu-line2{
      background: #111;
    }
    .item-dropdown .dropdown a{
      color: #111 !important;
    }
  }
`;

const Colection = () => {
  const { library } = useWeb3React()
  const { items: ownData } = useOwnNfts(library)
  const { items: sellData } = useSellingNfts(library)

  const [openMenu, setOpenMenu] = React.useState(true);
  const [openMenu1, setOpenMenu1] = React.useState(false);
  const handleBtnClick = () => {
    setOpenMenu(true);
    setOpenMenu1(false);
    document.getElementById("Mainbtn").classList.add("active");
    document.getElementById("Mainbtn1").classList.remove("active");
  };
  const handleBtnClick1 = () => {
    setOpenMenu1(true);
    setOpenMenu(false);
    document.getElementById("Mainbtn1").classList.add("active");
    document.getElementById("Mainbtn").classList.remove("active");
  };


  // if (loadingState === 'loaded' && !nfts.length) return (<h1 className="py-10 px-20 text-3xl">No assets owned</h1>)

  return (
    <div>
      <GlobalStyles />

      <section id='profile_banner' className='jumbotron breadcumb no-bg' style={{ backgroundImage: `url(${'./img/author_single/author_banner.jpg'})` }}>
        <div className='mainbreadcumb'>
        </div>
      </section>

      <section className='container no-bottom'>
      </section>

      <section className='container no-top'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className="items_filter">
              <ul className="de_nav text-left">
                <li id='Mainbtn' className="active"><span onClick={handleBtnClick}>Purchased History</span></li>
                <li id='Mainbtn1' className=""><span onClick={handleBtnClick1}>Sold History</span></li>
                {/* <li id='Mainbtn2' className=""><span onClick={handleBtnClick2}>Liked</span></li> */}
              </ul>
            </div>
          </div>
        </div>
        {openMenu && (
          <div id='zero1' className='onStep fadeIn'>
            <ColumnNewRedux shuffle showLoadMore={false} nftItems={ownData} />
          </div>
        )}
        {openMenu1 && (
          <div id='zero2' className='onStep fadeIn'>
            <ColumnNewRedux shuffle showLoadMore={false} nftItems={sellData}/>
          </div>
        )}

      </section>


      <Footer />
    </div>
  );
}
export default Colection;