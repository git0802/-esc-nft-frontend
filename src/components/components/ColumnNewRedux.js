import React, { memo, useEffect, useState } from 'react';

import NftCard from './NftCard';

//react functional component
const ColumnNewRedux = ({ nftItems = [],showLoadMore = true, shuffle = false, isShow=false }) => {

    const nfts = nftItems ? nftItems : [];
    const [height, setHeight] = useState(0);

    const onImgLoad = ({target:img}) => {
        let currentHeight = height;
        if(currentHeight < img.offsetHeight) {
            setHeight(img.offsetHeight);
        }
    }
    
    return (
        <div className='row'>
            {nfts && nfts.map( (nft, index) => (
                <NftCard nft={nft} key={index} onImgLoad={onImgLoad} height={height} isShow={isShow}/>
            ))}
        </div>              
    );
};

export default memo(ColumnNewRedux);