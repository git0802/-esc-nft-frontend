import React, { Component, useState } from "react";
import Clock from "../components/Clock";
import Footer from '../components/footer';
import { createGlobalStyle } from 'styled-components';
import axios from "axios";

import { ethers } from 'ethers'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import { useWeb3React } from "@web3-react/core";

import NFT from '../../config/abis/NFT.json'
import Market from '../../config/abis/NFTMarket.json'
import { NFTMarketaddress, NFTaddress } from '../../config'

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.sticky.white {
    background: #403f83;
    border-bottom: solid 1px #403f83;
  }
  header#myHeader.navbar .search #quick_search{
    color: #fff;
    background: rgba(255, 255, 255, .1);
  }
  header#myHeader.navbar.white .btn, .navbar.white a, .navbar.sticky.white a{
    color: #fff;
  }
  header#myHeader .dropdown-toggle::after{
    color: rgba(255, 255, 255, .5);
  }
  header#myHeader .logo .d-block{
    display: none !important;
  }
  header#myHeader .logo .d-none{
    display: block !important;
  }
  @media only screen and (max-width: 1199px) {
    .navbar{
      background: #403f83;
    }
    .navbar .menu-line, .navbar .menu-line1, .navbar .menu-line2{
      background: #fff;
    }
    .item-dropdown .dropdown a{
      color: #fff !important;
    }
  }
`;

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')


const validFileExtensions = ["jpg", "jpeg", "bmp", "gif", "png"]

const Createpage = () => {

  const [loading, setLoading] = useState(false)
  const [pending, setPending] = useState(false)
  const [fileUrl, setFileUrl] = useState(null)
  const [formInput, updateFormInput] = useState({ price: 0, name: '', description: '' })
  const { account, library } = useWeb3React()

  async function onChange(e) {
    const file = e.target.files[0]
    const fileName = file.name;
    
    const [fileExt, ...fileTitle] = fileName.split(".").reverse()

    console.info('filename', file, file.size,  fileTitle, fileExt, fileName, validFileExtensions.indexOf(fileExt.toLowerCase()))
    if(validFileExtensions.indexOf(fileExt.toLowerCase())<0)  return alert("Invalid file type.")
    if(file.size/1024/1024 > 1) return alert("File size exceeded")

    setLoading(true)
    try {
      const added = await client.add(
        file,
        {
          progress: (prog) => console.log(`received: ${prog}`)
        }
      )
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      await axios.get(url)
      setFileUrl(url)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      alert("Sorry. Please try again later")
      console.log('Error uploading file: ', error)
    }
  }

  async function createMarket() {
    const { name, description, price } = formInput
    if (!name || !description || !price || isNaN(price) || !fileUrl) {
      alert("Please input valid values")
      return
    }
    setPending(true)
    /* first, upload to IPFS */
    try {
      const data = JSON.stringify({
        name, description, image: fileUrl
      })
      const added = await client.add(data)
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      await axios.get(url)
      /* after file is uploaded to IPFS, pass the URL to save it on ethereum net */
      createSale(url)
    } catch (error) {
      setPending(false)
      alert("Sorry. Please try again later")
      console.log('Error uploading metadata: ', error)
    }
  }

  async function createSale(url) {

    /* next, create the item */
    try {

      let NFTcontract = new ethers.Contract(NFTaddress, NFT.abi, library.getSigner())
      let transaction = await NFTcontract.createToken(url)
      let tx = await transaction.wait()
      let event = tx.events[0]
      let value = event.args[2]
      let tokenId = value.toNumber()
      const price = ethers.utils.parseUnits(formInput.price, 'ether')

      /* then list the item for sale on the marketplace */
      let NFTMarketPlcaecontract = new ethers.Contract(NFTMarketaddress, NFT.abi, library.getSigner())
      transaction = await NFTMarketPlcaecontract.createMarketItem(NFTaddress, tokenId, price)
      await transaction.wait()
      setPending(false)
      alert("Created and listed NFT item successfully")
      setFileUrl(null)
      updateFormInput({ price: 0, name: '', description: '' })
    } catch(error) {

      setPending(false)
      alert("Sorry. Please try again later")
      console.log('Error: failed to create nft Item', error)
    }
  }


  return (
    <div>
      <GlobalStyles />

      <section className='jumbotron breadcumb no-bg' style={{ backgroundImage: `url(${'./img/background/subheader.jpg'})` }}>
        <div className='mainbreadcumb'>
          <div className='container'>
            <div className='row m-10-hor'>
              <div className='col-12'>
                <h1 className='text-center'>Create</h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='container'>

        <div className="row">
          <div className="col-lg-7 offset-lg-1 mb-5">
            <form id="form-create-item" className="form-border" action="#">
              <div className="field-set">
                <h5>Upload file</h5>

                <div className="d-create-file">
                  <p id="file_name">PNG, JPG, JPEG, BMP, JFIF. (Please make sure image size is less than 1 Mbyte</p>
                  <div className='browse'>
                    <input type="button" id="get_file" className="btn-main" value="Browse" />
                    <input id='upload_file' type="file" accept="image/gif, image/jpeg, image/png, image/bmp" name='Asset' onChange={onChange} />
                  </div>

                </div>

                <div className="spacer-single"></div>

                <h5>Title</h5>
                <input type="text" value={formInput.name} onChange={e => updateFormInput({ ...formInput, name: e.target.value })} id="item_title" className="form-control" placeholder="e.g. 'Crypto Funk" />

                <div className="spacer-10"></div>

                <h5>Description</h5>
                <textarea data-autoresize id="item_desc" value={formInput.description} onChange={e => updateFormInput({ ...formInput, description: e.target.value })} className="form-control" placeholder="e.g. 'This is very limited item'"></textarea>

                <div className="spacer-10"></div>

                <h5>Price</h5>
                <input type="text" onChange={e => updateFormInput({ ...formInput, price: e.target.value })} value={formInput.price} id="item_price" className="form-control" placeholder="enter price for one item (ESC)" />

                <div className="spacer-10"></div>

                <div className="spacer-10"></div>

                <input type="button" id="submit" onClick={(account || pending) ? createMarket : () => { }} className={(account || pending) ? "btn-main" : "btn-main disabled"} value={pending ? "Creating Item" : "Create Item"} />
              </div>
            </form>
          </div>

          <div className="col-lg-3 col-sm-6 col-xs-12">
            <h5>{loading ? "Uploading File" : "Preview Item"}</h5>
            <div className="nft__item m-0">
              <div className="nft__item_wrap">
                <span>
                  {fileUrl ? <img src={fileUrl} id="get_file_2" className="lazy nft__item_preview" alt="" />
                    : loading ? <img src="./img/loading.gif" id="get_file_2" className="lazy nft__item_preview" alt="" /> : <img src="./img/empty.png" id="get_file_2" className="lazy nft__item_preview" alt="" />}
                </span>
              </div>
            </div>
          </div>
        </div>

      </section>

      <Footer />
    </div>
  );
}

export default Createpage